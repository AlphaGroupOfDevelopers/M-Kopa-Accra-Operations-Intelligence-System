import os
import sys

# Mock env vars so pydantic Settings doesn't crash
os.environ["SECRET_KEY"] = "mock-secret-key-for-preview"
os.environ["DATABASE_URL"] = "postgresql://user:pass@localhost:5432/mock"
os.environ["DATABASE_URL_SYNC"] = "postgresql://user:pass@localhost:5432/mock"
os.environ["REDIS_URL"] = "redis://localhost:6379"
os.environ["GOOGLE_SHEETS_CREDENTIALS_FILE"] = "mock.json"
os.environ["SPREADSHEET_ID"] = "mock"

sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__))))

from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from app.db.base import Base

# Import all models to ensure they are registered with Base.metadata
from app.models.dsr import DSR
from app.models.shop import Shop
from app.models.assignment import Assignment, TransferRecord
from app.models.public_holiday import PublicHoliday
from app.models.sales_record import SalesRecord

from app.services.integrations.bulk_import_service import BulkImportService

def generate_preview():
    # Setup in-memory SQLite DB
    engine = create_engine("sqlite:///:memory:")
    Base.metadata.create_all(engine)
    Session = sessionmaker(bind=engine)
    db = Session()
    
    file_path = "M-Kopa DSR Profile & Assignment Form(1-25).xlsx"
    print(f"Running seeder on {file_path}...")
    
    results = BulkImportService.import_from_excel(file_path, db)
    
    if not results.get("success"):
        print(f"Seeding failed: {results.get('error')}")
        return
        
    md_content = "# Database Seeding Comprehensive Preview\n\n"
    md_content += "Here is exactly how all data from the Excel file will be mapped and seeded into the database.\n\n"
    
    shops = db.query(Shop).all()
    md_content += f"## 1. Shops Generated ({len(shops)})\n\n"
    md_content += "| ID | Standardized Name | Location | Region | District | Description | Status |\n"
    md_content += "|---|---|---|---|---|---|---|\n"
    for s in shops:
        md_content += f"| {s.id} | **{s.name}** | {s.location} | {s.region} | {s.district or 'N/A'} | {s.description or 'N/A'} | {'Active' if s.is_active else 'Inactive'} |\n"
        
    md_content += "\n---\n\n"
    
    dsrs = db.query(DSR).all()
    md_content += f"## 2. DSR Profiles ({len(dsrs)})\n\n"
    md_content += "| ID | Account No | Full Name | Gender | Email | Alt Contact | DOB | Address | Ed Level | Emg Contact | Emg Phone | Emp Date |\n"
    md_content += "|---|---|---|---|---|---|---|---|---|---|---|---|\n"
    for d in dsrs:
        ed = d.education_level.value if d.education_level else 'N/A'
        md_content += f"| {d.id} | {d.account_number} | **{d.full_name}** | {d.gender or 'N/A'} | {d.email or 'N/A'} | {d.secondary_number or 'N/A'} | {d.date_of_birth or 'N/A'} | {d.address or 'N/A'} | {ed} | {d.emergency_contact_name or 'N/A'} | {d.emergency_contact_phone or 'N/A'} | {d.employment_date} |\n"
        
    md_content += "\n---\n\n"
    
    assignments = db.query(Assignment).all()
    md_content += f"## 3. Assignments & Roles ({len(assignments)})\n\n"
    md_content += "| DSR | Assigned Shop | Role | Team | Start Date | Status |\n"
    md_content += "|---|---|---|---|---|---|\n"
    for a in assignments:
        shop_name = a.shop.name if a.shop else 'Unknown'
        dsr_name = a.dsr.full_name if a.dsr else 'Unknown'
        md_content += f"| {dsr_name} | **{shop_name}** | {a.role or 'N/A'} | {a.team_name or 'N/A'} | {a.start_date} | {a.status.value} |\n"
        
    md_content += "\n---\n\n"
    
    if results.get("errors"):
        md_content += "## ⚠️ Warnings/Errors\n\n"
        for err in results["errors"]:
            md_content += f"- {err}\n"
            
    out_path = r"C:\Users\HP\.gemini\antigravity\brain\51cea425-2c9c-4b20-a814-09b6ba86cb39\seeding_preview.md"
    with open(out_path, "w", encoding="utf-8") as f:
        f.write(md_content)
        
    print(f"Preview generated and saved to {out_path}")
    db.close()

if __name__ == "__main__":
    generate_preview()
