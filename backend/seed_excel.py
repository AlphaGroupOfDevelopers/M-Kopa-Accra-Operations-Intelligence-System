import os
import sys
import argparse
from sqlalchemy.orm import Session
from loguru import logger

# Add backend directory to path
sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__))))

from app.db.session import SessionLocal
from app.services.integrations.bulk_import_service import BulkImportService


def seed_database(file_path: str):
    """Seed the database from an Excel file using the advanced BulkImportService."""
    if not os.path.exists(file_path):
        logger.error(f"File not found: {file_path}")
        sys.exit(1)

    logger.info(f"Starting seed process using file: {file_path}")
    
    db: Session = SessionLocal()
    try:
        results = BulkImportService.import_from_excel(file_path, db)
        
        print("\n" + "="*50)
        print("SEED RESULTS SUMMARY")
        print("="*50)
        if results.get("success"):
            print(f"Status: \033[92mSUCCESS\033[0m")
            print(f"Total Rows Processed: {results.get('total_rows')}")
            print(f"Shops Created: {results.get('shops_created')}")
            print(f"DSRs Created: {results.get('dsrs_created')}")
            print(f"Assignments/Transfers Tracked: {results.get('assignments_processed')}")
            
            if results.get("errors"):
                print("\n\033[93mWarnings / Errors encountered:\033[0m")
                for err in results.get("errors")[:10]: # Print top 10
                    print(f" - {err}")
                if len(results.get("errors")) > 10:
                    print(f" - ...and {len(results.get('errors')) - 10} more.")
        else:
            print(f"Status: \033[91mFAILED\033[0m")
            print(f"Error: {results.get('error')}")
            
        print("="*50 + "\n")
        
    except Exception as e:
        logger.exception("An unhandled error occurred during seeding")
    finally:
        db.close()


if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="Seed database from M-Kopa DSR Excel Profile form.")
    parser.add_argument(
        "file",
        nargs="?",
        default=os.path.join(os.path.dirname(__file__), "M-Kopa DSR Profile & Assignment Form(1-25).xlsx"),
        help="Path to the Excel file to import"
    )
    
    args = parser.parse_args()
    seed_database(args.file)
