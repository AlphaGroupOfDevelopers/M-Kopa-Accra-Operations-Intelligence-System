"""Bulk import service for initial data loading from Excel."""

from typing import List, Dict, Any, Tuple, Optional

try:
    import pandas as pd
    PANDAS_AVAILABLE = True
except ImportError:
    PANDAS_AVAILABLE = False
    pd = None

from loguru import logger
from sqlalchemy.orm import Session

from app.models.agent import Agent, EmploymentStatus
from app.models.shop import Shop
from app.models.assignment import Assignment, AssignmentStatus
from app.utils.data_processing import (
    DataTransformer,
    ShopNameStandardizer,
    EmploymentDateCalculator,
    EducationLevelMapper
)


class BulkImportService:
    """Service for bulk importing initial data from Excel files."""
    
    @staticmethod
    def import_from_excel(
        file_path: str,
        db: Session
    ) -> Dict[str, Any]:
        """
        Import DSRs, shops, and assignments from Excel file.
        
        Requires pandas to be installed.
        
        Excel Format Expected:
        - Full Name
        - Account Number
        - Secondary Number (optional)
        - Email (optional)
        - Shop Name (raw)
        - Team Name
        - Role (Main DSR / Supporting DSR)
        - Years Worked
        - Education Level (raw)
        - Education Institution (optional)
        - Education Year (optional)
        - Gender (optional)
        - Date of Birth (optional)
        - Address (optional)
        - Emergency Contact Name (optional)
        - Emergency Contact Phone (optional)
        
        Args:
            file_path: Path to Excel file
            db: Database session
            
        Returns:
            Import statistics
        """
        if not PANDAS_AVAILABLE:
            return {
                "success": False,
                "error": "Pandas is not installed. Install it with: pip install pandas openpyxl",
                "shops_created": 0,
                "agents_created": 0,
                "assignments_created": 0,
                "total_rows": 0,
                "errors": []
            }
        
        try:
            # Read Excel file
            df = pd.read_excel(file_path)
            logger.info(f"Loaded {len(df)} rows from {file_path}")
            
            # Statistics
            shops_created = 0
            agents_created = 0
            assignments_created = 0
            errors = []
            
            # Track created shops to avoid duplicates
            shop_cache: Dict[str, Shop] = {}
            
            # Process each row
            for idx, row in df.iterrows():
                try:
                    # 1. Process Shop (with deduplication)
                    shop = BulkImportService._process_shop(
                        row, db, shop_cache
                    )
                    if shop and shop.id not in [s.id for s in shop_cache.values()]:
                        shops_created += 1
                        shop_cache[shop.name] = shop
                    
                    # 2. Process Agent
                    agent = BulkImportService._process_agent(row, db)
                    if agent and not db.query(Agent).filter(
                        Agent.account_number == agent.account_number
                    ).first():
                        db.add(agent)
                        db.commit()
                        db.refresh(agent)
                        agents_created += 1
                    else:
                        # Agent already exists
                        agent = db.query(Agent).filter(
                            Agent.account_number == agent.account_number
                        ).first()
                    
                    # 3. Process Assignment
                    if shop and agent:
                        assignment = BulkImportService._process_assignment(
                            row, agent, shop, db
                        )
                        if assignment:
                            assignments_created += 1
                
                except Exception as e:
                    error_msg = f"Row {idx + 2}: {str(e)}"  # +2 for header and 0-index
                    errors.append(error_msg)
                    logger.error(error_msg)
            
            logger.info(
                f"Import complete: {shops_created} shops, "
                f"{agents_created} agents, {assignments_created} assignments"
            )
            
            return {
                "success": True,
                "shops_created": shops_created,
                "agents_created": agents_created,
                "assignments_created": assignments_created,
                "total_rows": len(df),
                "errors": errors
            }
            
        except Exception as e:
            logger.error(f"Excel import failed: {e}")
            return {
                "success": False,
                "error": str(e),
                "shops_created": 0,
                "agents_created": 0,
                "assignments_created": 0,
                "total_rows": 0,
                "errors": []
            }
    
    @staticmethod
    def _process_shop(
        row: pd.Series,
        db: Session,
        shop_cache: Dict[str, Shop]
    ) -> Shop:
        """
        Process shop from row with deduplication.
        
        Business Rule: Multiple DSRs (Main + Supporting) work at same shop.
        We must deduplicate to create only ONE shop record.
        """
        raw_shop_name = row.get('Shop Name') or row.get('shop_name')
        if not raw_shop_name:
            raise ValueError("Shop name is required")
        
        # Standardize shop name
        standardized_name = ShopNameStandardizer.standardize(str(raw_shop_name))
        
        # Check cache first (already processed in this import)
        if standardized_name in shop_cache:
            logger.debug(f"Shop found in cache: {standardized_name}")
            return shop_cache[standardized_name]
        
        # Check database
        existing = db.query(Shop).filter(Shop.name == standardized_name).first()
        if existing:
            logger.debug(f"Shop found in database: {standardized_name}")
            shop_cache[standardized_name] = existing
            return existing
        
        # Create new shop
        shop_code = BulkImportService._generate_shop_code(standardized_name)
        
        shop = Shop(
            code=shop_code,
            name=standardized_name,
            location=row.get('Location', 'Greater Accra'),  # Default to Greater Accra
            region=row.get('Region', 'Greater Accra'),
            district=row.get('District'),
            is_active=True
        )
        
        db.add(shop)
        db.commit()
        db.refresh(shop)
        
        logger.info(f"Created shop: {standardized_name} ({shop_code})")
        
        return shop
    
    @staticmethod
    def _generate_shop_code(shop_name: str) -> str:
        """
        Generate shop code from standardized name.
        
        Format: [OUTLET]-[LOCATION-INITIALS]
        Example: "MTN Madina" → "MTN-MAD"
        """
        parts = shop_name.split()
        
        if len(parts) < 2:
            # Only one word (unusual)
            return parts[0][:10].upper()
        
        outlet = parts[0].upper()
        location_parts = parts[1:]
        
        # Take first 3 letters of each location word
        location_code = ''.join([word[:3].upper() for word in location_parts[:2]])
        
        return f"{outlet}-{location_code}"
    
    @staticmethod
    def _process_agent(row: pd.Series, db: Session) -> Agent:
        """Process agent/DSR from row."""
        # Required fields
        account_number = row.get('Account Number') or row.get('account_number')
        full_name = row.get('Full Name') or row.get('full_name')
        
        if not account_number:
            raise ValueError("Account number is required")
        if not full_name:
            raise ValueError("Full name is required")
        
        # Clean account number
        account_number = str(account_number).strip().replace(' ', '').replace('-', '')
        
        # Prepare agent data
        agent_data = {
            'account_number': account_number,
            'full_name': str(full_name).strip(),
            'email': row.get('Email') or row.get('email'),
            'secondary_number': row.get('Secondary Number') or row.get('secondary_number'),
            'gender': row.get('Gender') or row.get('gender'),
            'date_of_birth': row.get('Date of Birth') or row.get('date_of_birth'),
            'address': row.get('Address') or row.get('address'),
            'education_institution': row.get('Education Institution') or row.get('education_institution'),
            'education_year': row.get('Education Year') or row.get('education_year'),
            'emergency_contact_name': row.get('Emergency Contact Name') or row.get('emergency_contact_name'),
            'emergency_contact_phone': row.get('Emergency Contact Phone') or row.get('emergency_contact_phone'),
            'employment_status': EmploymentStatus.ACTIVE,
        }
        
        # Calculate employment date from years worked
        years_worked = row.get('Years Worked') or row.get('years_worked')
        if years_worked:
            agent_data['years_worked'] = years_worked
        
        # Map education level
        education_level = row.get('Education Level') or row.get('education_level')
        if education_level:
            agent_data['education_level'] = str(education_level)
        
        # Transform data
        transformed_data = DataTransformer.transform_agent_data(agent_data)
        
        # Remove None values
        transformed_data = {k: v for k, v in transformed_data.items() if v is not None}
        
        return Agent(**transformed_data)
    
    @staticmethod
    def _process_assignment(
        row: pd.Series,
        agent: Agent,
        shop: Shop,
        db: Session
    ) -> Assignment:
        """Process assignment from row."""
        team_name = row.get('Team Name') or row.get('team_name')
        role = row.get('Role') or row.get('role')
        
        # Check for existing active assignment
        existing = db.query(Assignment).filter(
            Assignment.agent_id == agent.id,
            Assignment.shop_id == shop.id,
            Assignment.status == AssignmentStatus.ACTIVE
        ).first()
        
        if existing:
            logger.debug(f"Assignment already exists for {agent.full_name} at {shop.name}")
            return existing
        
        assignment = Assignment(
            agent_id=agent.id,
            shop_id=shop.id,
            team_name=team_name,
            role=role,
            start_date=agent.employment_date or pd.Timestamp.now().date(),
            status=AssignmentStatus.ACTIVE
        )
        
        db.add(assignment)
        db.commit()
        
        logger.info(f"Created assignment: {agent.full_name} → {shop.name} ({role})")
        
        return assignment
