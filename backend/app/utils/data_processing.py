"""Data processing utilities for ingestion and transformation."""

import re
from datetime import date, timedelta
from typing import Optional, Dict, Any
from loguru import logger

from app.models.dsr import EducationLevel


class ShopNameStandardizer:
    """Standardize shop names to [Outlet] [Shop Name] format."""
    
    # Known outlets/carriers
    OUTLETS = [
        'MTN', 'Telecel', 'AirtelTigo', 'Vodafone', 'Franko', 
        'Busy Internet', 'Franko Trading', 'Busy'
    ]
    
    @classmethod
    def standardize(cls, raw_shop_name: str) -> str:
        """
        Standardize shop name to [Outlet] [Shop Name] format.
        
        Examples:
        - "MTN Madina Office" → "MTN Madina"
        - "madina mtn" → "MTN Madina"
        - "Telecel-North Industrial Area" → "Telecel North Industrial Area"
        - "Franko Trading Lapaz" → "Franko Lapaz"
        
        Args:
            raw_shop_name: Raw shop name from form/Excel
            
        Returns:
            Standardized shop name
        """
        if not raw_shop_name:
            raise ValueError("Shop name cannot be empty")
        
        # Clean up punctuation and spacing
        name = raw_shop_name.strip()
        name = re.sub(r'[,.]', '', name)  # Remove commas and periods
        name = re.sub(r'\s+', ' ', name)  # Multiple spaces to single
        name = name.replace('-', ' ')     # Dashes to spaces
        
        # Remove common suffixes
        suffixes_to_remove = [
            'office', 'shop', 'branch', 'outlet', 'store', 
            'location', 'point', 'center', 'centre'
        ]
        
        name_lower = name.lower()
        for suffix in suffixes_to_remove:
            if name_lower.endswith(" " + suffix) or name_lower == suffix:
                name = name[:-(len(suffix))].strip()
                break
                
        # Extract outlet and location
        outlet = None
        location = name
        
        # Check for outlet at the beginning
        for known_outlet in cls.OUTLETS:
            # Case-insensitive check
            if name.lower().startswith(known_outlet.lower()):
                outlet = known_outlet
                location = name[len(known_outlet):].strip()
                break
        
        # Check for outlet at the end
        if not outlet:
            for known_outlet in cls.OUTLETS:
                if name.lower().endswith(known_outlet.lower()):
                    outlet = known_outlet
                    location = name[:-(len(known_outlet))].strip()
                    break
        
        # Check for outlet in the middle
        if not outlet:
            for known_outlet in cls.OUTLETS:
                pattern = re.compile(r'\b' + re.escape(known_outlet) + r'\b', re.IGNORECASE)
                if pattern.search(name):
                    outlet = known_outlet
                    location = pattern.sub('', name).strip()
                    break
        
        # If no outlet found, treat entire name as location with MTN as default
        if not outlet:
            logger.warning(f"No outlet found in '{raw_shop_name}', defaulting to MTN")
            outlet = "MTN"
            location = name
            
        # Clean up location prefix and spelling
        location = location.strip()
        location_lower = location.lower()
        for prefix in suffixes_to_remove:
            if location_lower.startswith(prefix + " "):
                location = location[(len(prefix) + 1):].strip()
                break
                
        # Fix specific spelling mistakes
        location = re.sub(r'(?i)\bdarkumah\b', 'Darkuman', location)
        location = re.sub(r'(?i)\bachimota mall\b', 'Achimota Mall', location)
        
        # If location is exactly Achimota, let's map it to Achimota Mall as per request
        if location.lower() == 'achimota':
            location = 'Achimota Mall'
            
        # Title case the location
        location = cls._title_case_location(location)
        
        # Build standardized name
        standardized = f"{outlet} {location}"
        
        logger.debug(f"Standardized: '{raw_shop_name}' → '{standardized}'")
        
        return standardized
    
    @staticmethod
    def _title_case_location(location: str) -> str:
        """Apply title case to location, preserving acronyms."""
        # Split into words
        words = location.split()
        
        # Words that should stay uppercase (acronyms)
        acronyms = ['SSNIT', 'UG', 'KNUST', 'GCB', 'STC']
        
        # Words that should stay lowercase (prepositions, articles)
        lowercase_words = ['of', 'and', 'the', 'in', 'at', 'by', 'for']
        
        result = []
        for i, word in enumerate(words):
            if word.upper() in acronyms:
                result.append(word.upper())
            elif i > 0 and word.lower() in lowercase_words:
                result.append(word.lower())
            else:
                result.append(word.capitalize())
        
        return ' '.join(result)


class EmploymentDateCalculator:
    """Calculate employment date from years worked."""
    
    @staticmethod
    def calculate_employment_date(years_worked: float) -> date:
        """
        Calculate employment date from years worked.
        
        Business Rule: Subtract years worked from current date.
        Formula: employment_date = today - (years * 365 days)
        
        Args:
            years_worked: Number of years worked (can be decimal, e.g., 2.5)
            
        Returns:
            Calculated employment date
            
        Examples:
            Today: June 25, 2026
            Years: 2.5
            Result: December 25, 2023 (approx)
        """
        if years_worked < 0:
            raise ValueError("Years worked cannot be negative")
        
        if years_worked > 50:
            logger.warning(f"Unusually high years worked: {years_worked}")
        
        # Calculate days
        days = int(years_worked * 365)
        
        # Subtract from today
        employment_date = date.today() - timedelta(days=days)
        
        logger.debug(
            f"Calculated employment date: {years_worked} years → {employment_date}"
        )
        
        return employment_date
    
    @staticmethod
    def parse_years_worked(value: Any) -> float:
        """
        Parse years worked from various input formats.
        
        Handles:
        - Integers: 2 → 2.0
        - Floats: 2.5 → 2.5
        - Strings: "2", "2.5", "2 years" → 2.5
        
        Args:
            value: Years worked value in any format
            
        Returns:
            Parsed float value
        """
        if value is None:
            raise ValueError("Years worked cannot be None")
        
        # Already a number
        if isinstance(value, (int, float)):
            return float(value)
        
        # String parsing
        if isinstance(value, str):
            # Remove common suffixes
            cleaned = value.lower().strip()
            cleaned = cleaned.replace('years', '').replace('year', '').strip()
            
            try:
                return float(cleaned)
            except ValueError:
                raise ValueError(f"Cannot parse years worked from: {value}")
        
        raise ValueError(f"Unsupported type for years worked: {type(value)}")


class EducationLevelMapper:
    """Map human-readable education levels to Enum values."""
    
    # Mapping dictionary
    MAPPINGS = {
        # High School variations
        'high school': EducationLevel.HIGH_SCHOOL,
        'highschool': EducationLevel.HIGH_SCHOOL,
        'secondary': EducationLevel.HIGH_SCHOOL,
        'secondary school': EducationLevel.HIGH_SCHOOL,
        'shs': EducationLevel.HIGH_SCHOOL,
        'senior high': EducationLevel.HIGH_SCHOOL,
        'senior high school': EducationLevel.HIGH_SCHOOL,
        
        # Diploma variations
        'diploma': EducationLevel.DIPLOMA,
        'hnd': EducationLevel.DIPLOMA,
        'higher national diploma': EducationLevel.DIPLOMA,
        'advanced diploma': EducationLevel.DIPLOMA,
        
        # Bachelor's variations
        'bachelor': EducationLevel.BACHELOR,
        'bachelors': EducationLevel.BACHELOR,
        "bachelor's": EducationLevel.BACHELOR,
        "bachelor's degree": EducationLevel.BACHELOR,
        'undergraduate': EducationLevel.BACHELOR,
        'bsc': EducationLevel.BACHELOR,
        'ba': EducationLevel.BACHELOR,
        'btech': EducationLevel.BACHELOR,
        'bed': EducationLevel.BACHELOR,
        
        # Master's variations
        'master': EducationLevel.MASTER,
        'masters': EducationLevel.MASTER,
        "master's": EducationLevel.MASTER,
        "master's degree": EducationLevel.MASTER,
        'postgraduate': EducationLevel.MASTER,
        'msc': EducationLevel.MASTER,
        'ma': EducationLevel.MASTER,
        'mba': EducationLevel.MASTER,
        'mphil': EducationLevel.MASTER,
        
        # PhD variations
        'phd': EducationLevel.PHD,
        'ph.d': EducationLevel.PHD,
        'doctorate': EducationLevel.PHD,
        'doctoral': EducationLevel.PHD,
        
        # Other
        'other': EducationLevel.OTHER,
        'certificate': EducationLevel.OTHER,
        'professional': EducationLevel.OTHER,
    }
    
    @classmethod
    def map_to_enum(cls, raw_education: str) -> EducationLevel:
        """
        Map human-readable education level to Enum.
        
        Args:
            raw_education: Raw education string from form/Excel
            
        Returns:
            EducationLevel enum value
            
        Examples:
            "Bachelor's Degree" → EducationLevel.BACHELOR
            "High School" → EducationLevel.HIGH_SCHOOL
            "HND" → EducationLevel.DIPLOMA
        """
        if not raw_education:
            logger.warning("Empty education level, defaulting to OTHER")
            return EducationLevel.OTHER
        
        # Normalize
        normalized = raw_education.lower().strip()
        
        # Direct match
        if normalized in cls.MAPPINGS:
            result = cls.MAPPINGS[normalized]
            logger.debug(f"Mapped education: '{raw_education}' → {result.value}")
            return result
        
        # Fuzzy match (contains)
        for key, value in cls.MAPPINGS.items():
            if key in normalized or normalized in key:
                logger.debug(f"Fuzzy mapped education: '{raw_education}' → {value.value}")
                return value
        
        # No match found
        logger.warning(f"Unknown education level: '{raw_education}', defaulting to OTHER")
        return EducationLevel.OTHER


class DataTransformer:
    """Main data transformation orchestrator."""
    
    @staticmethod
    def transform_agent_data(raw_data: Dict[str, Any]) -> Dict[str, Any]:
        """
        Transform raw agent data from Excel/form to database format.
        
        Applies:
        1. Employment date calculation from years worked
        2. Education level enum mapping
        
        Args:
            raw_data: Raw data dictionary
            
        Returns:
            Transformed data ready for database
        """
        transformed = raw_data.copy()
        
        # Calculate employment date from years worked
        if 'years_worked' in transformed:
            years = EmploymentDateCalculator.parse_years_worked(
                transformed.pop('years_worked')
            )
            transformed['employment_date'] = EmploymentDateCalculator.calculate_employment_date(years)
        
        # Map education level
        if 'education_level' in transformed and isinstance(transformed['education_level'], str):
            transformed['education_level'] = EducationLevelMapper.map_to_enum(
                transformed['education_level']
            )
        
        return transformed
    
    @staticmethod
    def transform_shop_data(raw_data: Dict[str, Any]) -> Dict[str, Any]:
        """
        Transform raw shop data from Excel/form to database format.
        
        Applies:
        1. Shop name standardization to [Outlet] [Name] format
        
        Args:
            raw_data: Raw data dictionary
            
        Returns:
            Transformed data ready for database
        """
        transformed = raw_data.copy()
        
        # Standardize shop name
        if 'name' in transformed:
            transformed['name'] = ShopNameStandardizer.standardize(transformed['name'])
        
        return transformed
