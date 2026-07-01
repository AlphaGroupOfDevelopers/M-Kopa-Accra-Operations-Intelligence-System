"""Bulk import service for intelligent data seeding from Excel."""

from typing import List, Dict, Any, Tuple, Optional
import math
from loguru import logger
from sqlalchemy.orm import Session

try:
    import pandas as pd
    PANDAS_AVAILABLE = True
except ImportError:
    PANDAS_AVAILABLE = False
    pd = None

from app.models.dsr import DSR, EmploymentStatus, EducationLevel
from app.models.shop import Shop
from app.models.assignment import Assignment, AssignmentStatus
from app.services.assignment_service import AssignmentService
from app.utils.data_processing import (
    DataTransformer,
    ShopNameStandardizer,
    EmploymentDateCalculator,
    EducationLevelMapper
)


class BulkImportService:
    """Service for highly intelligent bulk importing data from Excel files."""
    
    @staticmethod
    def _is_nan(value: Any) -> bool:
        """Intelligently detect Pandas NaT/NaN and convert to None."""
        if value is None:
            return True
        if isinstance(value, float) and math.isnan(value):
            return True
        if pd and pd.isna(value):
            return True
        if str(value).strip().lower() in ['nan', 'nat', 'none', 'null', '']:
            return True
        return False

    @staticmethod
    def _clean_value(value: Any) -> Any:
        """Sanitize values by returning None for NaN, otherwise returning stripped string/number."""
        if BulkImportService._is_nan(value):
            return None
        if isinstance(value, str):
            return value.strip()
        return value

    @staticmethod
    def import_from_excel(
        file_path: str,
        db: Session
    ) -> Dict[str, Any]:
        """
        Extremely intelligent import algorithm for DSRs, Shops, and Assignments.
        Handles dirty data, prevents duplicates, and dynamically tracks transfers.
        """
        if not PANDAS_AVAILABLE:
            return {
                "success": False,
                "error": "Pandas is not installed. Run: pip install pandas openpyxl",
                "shops_created": 0,
                "dsrs_created": 0,
                "assignments_processed": 0,
                "total_rows": 0,
                "errors": []
            }
        
        try:
            logger.info(f"Loading data from {file_path}")
            df = pd.read_excel(file_path)
            
            stats = {
                "shops_created": 0,
                "dsrs_created": 0,
                "dsrs_updated": 0,
                "assignments_processed": 0,
                "errors": []
            }
            
            # Caches to drastically reduce DB hits
            shop_cache: Dict[str, Shop] = {}
            dsr_cache: Dict[str, DSR] = {}
            
            for idx, row in df.iterrows():
                try:
                    # Sanitize row into a dictionary of python native types
                    clean_row = {str(k): BulkImportService._clean_value(v) for k, v in row.to_dict().items()}
                    
                    # 1. Process Shop
                    shop = BulkImportService._process_shop(clean_row, db, shop_cache, stats)
                    
                    # 2. Process DSR
                    dsr = BulkImportService._process_dsr(clean_row, db, dsr_cache, stats)
                    
                    # 3. Process Assignment (using Historical Transfer logic)
                    if shop and dsr:
                        BulkImportService._process_assignment(clean_row, dsr, shop, db, stats)
                        
                except Exception as e:
                    error_msg = f"Row {idx + 2} Failed: {str(e)}"
                    stats["errors"].append(error_msg)
                    logger.error(error_msg)
            
            db.commit()
            
            logger.success(
                f"Import complete: {stats['shops_created']} shops created, "
                f"{stats['dsrs_created']} DSRs created, {stats['dsrs_updated']} DSRs updated, "
                f"{stats['assignments_processed']} assignments/transfers tracked."
            )
            
            return {
                "success": True,
                "shops_created": stats["shops_created"],
                "dsrs_created": stats["dsrs_created"],
                "assignments_processed": stats["assignments_processed"],
                "total_rows": len(df),
                "errors": stats["errors"]
            }
            
        except Exception as e:
            logger.error(f"Excel import critically failed: {e}")
            return {"success": False, "error": str(e)}
    
    @staticmethod
    def _process_shop(
        row: Dict[str, Any],
        db: Session,
        shop_cache: Dict[str, Shop],
        stats: Dict[str, Any]
    ) -> Shop:
        """Process shop intelligently with fuzzy matching deduplication."""
        # Use exact column names from the Excel file
        raw_shop_name = row.get('Which shop are you currently working from?')
        if not raw_shop_name:
            raise ValueError("Shop name is absolutely required.")
        
        # Standardize name
        standardized_name = ShopNameStandardizer.standardize(str(raw_shop_name))
        
        # Check cache
        if standardized_name in shop_cache:
            return shop_cache[standardized_name]
        
        # Check DB
        existing = db.query(Shop).filter(Shop.name == standardized_name).first()
        if existing:
            shop_cache[standardized_name] = existing
            return existing
        
        # District and description mapping
        district_mapping = {
            'MTN Madina': 'La Nkwantanang Madina Municipal',
            'MTN Dansoman': 'Ablekuma West Municipal',
            'MTN Accra Central': 'Accra Metropolitan',
            'MTN Accra High Street': 'Accra Metropolitan',
            'Telecel Circle': 'Korle Klottey Municipal',
            'MTN Tudu': 'Korle Klottey Municipal',
            'MTN Mccarthy Hill': 'Weija Gbawe Municipal',
            'MTN Roman Ridge': 'Ayawaso West Municipal',
            'MTN Community 1': 'Tema Metropolitan',
            'MTN Westhills Mall': 'Weija Gbawe Municipal',
            'MTN Akweteyman': 'Okaikwei North Municipal',
            'Telecel Westhills': 'Weija Gbawe Municipal',
            'MTN Ablekuma': 'Ablekuma North Municipal',
            'MTN Achimota Mall': 'Okaikwei North Municipal',
            'MTN North Industrial Area': 'Okaikwei North Municipal',
            'MTN Circle': 'Korle Klottey Municipal',
            'MTN Haatso': 'Ga East Municipal',
            'MTN Darkuman': 'Ablekuma North Municipal',
            'MTN Tesano': 'Okaikwei North Municipal'
        }
        
        description_mapping = {
            'MTN Madina': 'Major retail outlet near Madina Zongo Junction.',
            'MTN Dansoman': 'Located adjacent to Zodiac Pharmacy in Dansoman.',
            'MTN Accra Central': 'Central business district branch serving Accra Central.',
            'MTN Accra High Street': 'Key branch located near the Accra Post Office.',
            'Telecel Circle': 'Telecel branch at Circle Post Office.',
            'MTN Tudu': 'High-traffic retail branch in Tudu, Accra.',
            'MTN Mccarthy Hill': 'Branch serving the Mallam Junction and McCarthy Hill area.',
            'MTN Roman Ridge': 'Outlet adjacent to Ecobank in Roman Ridge.',
            'MTN Community 1': 'Primary MTN branch in Tema Community 1.',
            'MTN Westhills Mall': 'Major MTN outlet inside Westhills Mall (SCC).',
            'MTN Akweteyman': 'Branch at Akweteyman Flat Top.',
            'Telecel Westhills': 'Telecel retail center located inside West Hills Mall.',
            'MTN Ablekuma': 'Branch serving the Ablekuma Junction area.',
            'MTN Achimota Mall': 'Main MTN retail center at Achimota Mall.',
            'MTN North Industrial Area': 'Outlet opposite Cowbell in North Industrial Area.',
            'MTN Circle': 'Major hub opposite GRA at Kwame Nkrumah Circle.',
            'MTN Haatso': 'Branch located near Haatso Station.',
            'MTN Darkuman': 'Outlet near Darkuman Junction.',
            'MTN Tesano': 'Branch located at Abeka Junction, Tesano.'
        }
        
        shop = Shop(
            name=standardized_name,
            location=str(row.get('Where is this shop located?') or 'Greater Accra'),
            region='Greater Accra',
            district=district_mapping.get(standardized_name),
            description=description_mapping.get(standardized_name)
        )
        
        db.add(shop)
        db.commit()
        db.refresh(shop)
        
        shop_cache[standardized_name] = shop
        stats["shops_created"] += 1
        logger.debug(f"Created new shop: {standardized_name}")
        return shop
    
    @staticmethod
    def _process_dsr(
        row: Dict[str, Any],
        db: Session,
        dsr_cache: Dict[str, DSR],
        stats: Dict[str, Any]
    ) -> DSR:
        """Process DSR intelligently, mapping all fields correctly."""
        acc_num = row.get("DSR's Account Number?")
        full_name = row.get("DSR's full name name?")
        
        if not acc_num or not full_name:
            raise ValueError("Account Number and Full Name are mandatory.")
        
        acc_num = str(acc_num).replace(' ', '').replace('-', '').replace('+233', '0')
        
        if acc_num in dsr_cache:
            return dsr_cache[acc_num]
            
        existing = db.query(DSR).filter(DSR.account_number == acc_num).first()
        
        # Prepare Data using correct columns
        dsr_data = {
            'account_number': acc_num,
            'full_name': str(full_name),
            'email': row.get('What is your email address?'),
            'secondary_number': row.get("DSR's Alternative Contact"),
            'gender': row.get('How would you describe your gender?'),
            'address': row.get('What is your current residential address? (GPS Address)'),
            'education_institution': None, # Not in this form
            'emergency_contact_name': row.get('Who should we contact in case of an emergency?'),
            'emergency_contact_phone': row.get('What is their phone number?'),
            'employment_status': EmploymentStatus.ACTIVE,
        }
        
        # Safely parse dates and numbers
        dob = row.get('What is your date of birth?')
        if dob:
            try:
                dsr_data['date_of_birth'] = pd.to_datetime(dob).date()
            except:
                pass
                
        # Transformations (Tenure and Education Enum)
        years = row.get('How many years have you worked with M-kopa?')
        if years is not None:
            dsr_data['years_worked'] = years
            
        ed_level = row.get('What is the highest level of education you have completed?')
        if ed_level:
            dsr_data['education_level'] = ed_level

            
        transformed_data = DataTransformer.transform_agent_data(dsr_data)
        
        # Ensure enums are exactly right or None
        if isinstance(transformed_data.get('education_level'), EducationLevel):
            pass # Keep it
        else:
            transformed_data.pop('education_level', None)
            
        if existing:
            # Update missing info
            for k, v in transformed_data.items():
                if getattr(existing, k, None) is None and v is not None:
                    setattr(existing, k, v)
            dsr_cache[acc_num] = existing
            stats["dsrs_updated"] += 1
            return existing
            
        # Create new
        new_dsr = DSR(**transformed_data)
        db.add(new_dsr)
        db.commit()
        db.refresh(new_dsr)
        
        dsr_cache[acc_num] = new_dsr
        stats["dsrs_created"] += 1
        return new_dsr
    
    @staticmethod
    def _process_assignment(
        row: Dict[str, Any],
        dsr: DSR,
        shop: Shop,
        db: Session,
        stats: Dict[str, Any]
    ):
        """Intelligently assign or transfer a DSR based on historical rules."""
        team_name = row.get('What team are you on?')
        role = row.get('What role do you currently perform at this shop?')
        
        from datetime import date
        # Utilize the AssignmentService to handle blank-slate transfers
        transfer_record = AssignmentService.transfer_dsr(
            db=db,
            dsr_id=dsr.id,
            to_shop_id=shop.id,
            transfer_date=date.today()
        )

        
        # Update team/role on the active assignment
        active_assignment = db.query(Assignment).filter(
            Assignment.dsr_id == dsr.id,
            Assignment.shop_id == shop.id,
            Assignment.status == AssignmentStatus.ACTIVE
        ).first()
        
        if active_assignment:
            active_assignment.team_name = team_name if team_name else active_assignment.team_name
            active_assignment.role = role if role else active_assignment.role
            db.commit()
            
        stats["assignments_processed"] += 1
