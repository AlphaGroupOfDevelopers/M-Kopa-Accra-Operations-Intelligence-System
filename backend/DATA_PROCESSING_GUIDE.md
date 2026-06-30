# Data Processing & Transformation Guide

**Status:** ✅ Complete  
**Date:** June 25, 2026

---

## ✅ Implemented Features

### 1. **Shop Name Standardization**
**Rule:** All shop names must follow `[Outlet] [Location]` format.

**Examples:**
```
"MTN Madina Office"           → "MTN Madina"
"madina mtn"                  → "MTN Madina"
"Telecel-North Industrial"    → "Telecel North Industrial"
"Franko Trading Lapaz"        → "Franko Lapaz"
"Busy Internet SSNIT"         → "Busy Internet SSNIT"
```

**Implementation:** `ShopNameStandardizer` class
- Detects outlet (MTN, Telecel, Franko, etc.)
- Removes common suffixes (Office, Shop, Branch)
- Applies proper title casing
- Preserves acronyms (SSNIT, UG, KNUST)

---

### 2. **Employment Date Calculation**
**Rule:** Calculate employment date from "years worked" field.

**Formula:** `employment_date = today - (years × 365 days)`

**Examples:**
```
Today: June 25, 2026
Years Worked: 2.5
Result: December 25, 2023

Today: June 25, 2026
Years Worked: 5
Result: June 25, 2021
```

**Implementation:** `EmploymentDateCalculator` class
- Handles integers and floats (2, 2.5, etc.)
- Parses strings ("2 years", "2.5", etc.)
- Returns exact date object

---

### 3. **Education Level Enum Mapping**
**Rule:** Map human-readable education levels to strict enum values.

**Mappings:**
| Input | Mapped To |
|-------|-----------|
| "High School", "SHS", "Secondary" | `high_school` |
| "Diploma", "HND" | `diploma` |
| "Bachelor's Degree", "BSc", "BA" | `bachelor` |
| "Master's Degree", "MSc", "MBA" | `master` |
| "PhD", "Doctorate" | `phd` |
| "Certificate", "Professional" | `other` |

**Implementation:** `EducationLevelMapper` class
- Case-insensitive matching
- Fuzzy matching for variations
- Falls back to `other` for unknowns

---

### 4. **Shop Deduplication**
**Business Rule:** Multiple DSRs (Main + Supporting) work at the same shop. System must create only ONE shop record.

**How it Works:**
1. Standardize shop name
2. Check if shop already exists (cache or database)
3. If exists → reuse existing shop
4. If new → create shop
5. Link all DSRs to the same shop

**Example:**
```
Row 1: "Main DSR" at "MTN Madina"      → Create shop
Row 2: "Supporting DSR" at "mtn madina" → Reuse same shop
```

---

## 📊 Bulk Import Service

### Excel Format

**Required Columns:**
- Full Name
- Account Number
- Shop Name
- Years Worked

**Optional Columns:**
- Secondary Number
- Email
- Team Name
- Role (Main DSR / Supporting DSR)
- Education Level
- Education Institution
- Education Year
- Gender
- Date of Birth
- Address
- Emergency Contact Name
- Emergency Contact Phone
- Location
- Region
- District

### Import Process

```
Excel File
    ↓
1. Read with pandas
    ↓
2. For each row:
    ├── Standardize shop name
    ├── Check for duplicate shop → Create or reuse
    ├── Calculate employment date from years
    ├── Map education level to enum
    ├── Create DSR record
    └── Create assignment (DSR → Shop)
    ↓
3. Return statistics
```

### API Endpoint

```http
POST /api/v1/integrations/bulk-import/excel
Content-Type: multipart/form-data

file: [Excel file]
```

**Response:**
```json
{
  "success": true,
  "shops_created": 15,
  "agents_created": 30,
  "assignments_created": 30,
  "total_rows": 30,
  "errors": [],
  "message": "Successfully imported 30 DSRs, 15 shops, and 30 assignments"
}
```

---

## 🧪 Testing Examples

### Shop Name Standardization

```python
from app.utils.data_processing import ShopNameStandardizer

# Test cases
assert ShopNameStandardizer.standardize("MTN Madina Office") == "MTN Madina"
assert ShopNameStandardizer.standardize("madina mtn") == "MTN Madina"
assert ShopNameStandardizer.standardize("Telecel-North Industrial Area") == "Telecel North Industrial Area"
assert ShopNameStandardizer.standardize("FRANKO TRADING LAPAZ") == "Franko Lapaz"
```

### Employment Date Calculation

```python
from app.utils.data_processing import EmploymentDateCalculator
from datetime import date

# Test cases
calculator = EmploymentDateCalculator()

# 2.5 years ago
result = calculator.calculate_employment_date(2.5)
# Result: ~December 2023 (from June 2026)

# Parse various formats
assert calculator.parse_years_worked(2) == 2.0
assert calculator.parse_years_worked("2.5") == 2.5
assert calculator.parse_years_worked("2 years") == 2.0
```

### Education Level Mapping

```python
from app.utils.data_processing import EducationLevelMapper
from app.models.agent import EducationLevel

# Test cases
assert EducationLevelMapper.map_to_enum("Bachelor's Degree") == EducationLevel.BACHELOR
assert EducationLevelMapper.map_to_enum("high school") == EducationLevel.HIGH_SCHOOL
assert EducationLevelMapper.map_to_enum("HND") == EducationLevel.DIPLOMA
assert EducationLevelMapper.map_to_enum("MBA") == EducationLevel.MASTER
```

---

## 🔧 Usage Examples

### Manual Data Transformation

```python
from app.utils.data_processing import DataTransformer

# Agent data
raw_agent = {
    "account_number": "0501234567",
    "full_name": "John Doe",
    "years_worked": 2.5,
    "education_level": "Bachelor's Degree"
}

transformed = DataTransformer.transform_agent_data(raw_agent)

# Result:
# {
#   "account_number": "0501234567",
#   "full_name": "John Doe",
#   "employment_date": date(2023, 12, 25),
#   "education_level": EducationLevel.BACHELOR
# }
```

```python
# Shop data
raw_shop = {
    "name": "MTN Madina Office",
    "location": "Madina, Greater Accra"
}

transformed = DataTransformer.transform_shop_data(raw_shop)

# Result:
# {
#   "name": "MTN Madina",
#   "location": "Madina, Greater Accra"
# }
```

### Bulk Import via Python

```python
from app.services.integrations.bulk_import_service import BulkImportService
from app.db.session import SessionLocal

db = SessionLocal()
result = BulkImportService.import_from_excel("data.xlsx", db)

print(f"Imported {result['agents_created']} DSRs")
print(f"Created {result['shops_created']} shops")
print(f"Errors: {len(result['errors'])}")
```

---

## 📝 Excel Template

Create your Excel file with these columns:

| Full Name | Account Number | Shop Name | Years Worked | Role | Team Name | Education Level | Secondary Number | Email |
|-----------|----------------|-----------|--------------|------|-----------|----------------|------------------|-------|
| John Doe | 0501234567 | MTN Madina Office | 2.5 | Main DSR | Team Alpha | Bachelor's Degree | 0241234567 | john@example.com |
| Jane Smith | 0509876543 | mtn madina | 3 | Supporting DSR | Team Alpha | High School | 0249876543 | jane@example.com |
| Bob Wilson | 0551112233 | Telecel North Industrial | 5 | Main DSR | Team Beta | Diploma | 0261112233 | bob@example.com |

**Download template:** [excel-template.xlsx](./templates/bulk-import-template.xlsx)

---

## ⚠️ Important Notes

### Shop Name Standardization
- **Always runs automatically** during bulk import
- Ensures consistency across the database
- Handles typos and variations
- Case-insensitive matching for deduplication

### Employment Date
- Calculated from **years worked**, not manual date entry
- Approximate calculation (365 days/year)
- Leap years not accounted for (acceptable margin)
- Used for tenure analytics

### Education Level
- Unknown levels default to `other`
- Add new mappings in `EducationLevelMapper.MAPPINGS`
- Case-insensitive and fuzzy matching

### Shop Deduplication
- Critical for data integrity
- Uses standardized name for matching
- Prevents duplicate shop entries
- All DSRs at same location share one shop record

---

## 🚀 Quick Start

1. **Prepare Excel file** with required columns
2. **Standardize data** (optional - will be done automatically)
3. **Upload via API** or use Python script
4. **Review results** and handle errors
5. **Verify data** in database or dashboard

---

## 🔍 Troubleshooting

### "Shop name is required"
**Fix:** Ensure "Shop Name" column exists and has values

### "Account number is required"
**Fix:** Ensure "Account Number" column exists and has values

### "Cannot parse years worked from: XYZ"
**Fix:** Years worked must be a number (2, 2.5, "2 years")

### "Duplicate account number"
**Fix:** Each DSR must have unique account number

### Shop created multiple times
**Check:** 
- Shop name standardization working?
- Different spellings treated as same shop?
- Review shop deduplication logic

---

## ✅ Implementation Checklist

- [x] Shop name standardization logic
- [x] Employment date calculation from years
- [x] Education level enum mapping
- [x] Shop deduplication in bulk import
- [x] Data transformer utilities
- [x] Bulk import service
- [x] API endpoint for Excel upload
- [x] Error handling and reporting
- [x] Testing examples
- [x] Documentation

---

**All data processing requirements from the implementation plan are now complete!** 🎉
