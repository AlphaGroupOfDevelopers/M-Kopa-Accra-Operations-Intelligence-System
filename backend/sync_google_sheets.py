"""Standalone script to sync Google Sheets data."""

import sys
from pathlib import Path

# Add parent directory to path
sys.path.insert(0, str(Path(__file__).parent))

from app.db.session import SessionLocal
from app.core import settings
from app.services.integrations.google_sheets_service import google_sheets_service
from app.services.integrations.sync_state_service import SyncStateService
from loguru import logger


def main():
    """Run Google Sheets sync."""
    logger.info("=" * 60)
    logger.info("M-Kopa AOIS - Google Sheets Sync")
    logger.info("=" * 60)

    # Check configuration
    if not google_sheets_service.is_configured():
        logger.error("Google Sheets service is not configured!")
        logger.error("Please check:")
        logger.error(f"  1. Credentials file exists: {settings.GOOGLE_SHEETS_CREDENTIALS_FILE}")
        logger.error(f"  2. GOOGLE_SHEET_ID is set: {settings.GOOGLE_SHEET_ID}")
        sys.exit(1)

    if not settings.GOOGLE_SHEET_ID:
        logger.error("GOOGLE_SHEET_ID is not configured in .env file")
        sys.exit(1)

    db = SessionLocal()
    try:
        logger.info(f"Sheet ID: {settings.GOOGLE_SHEET_ID}")
        logger.info(f"Sheet Name: {settings.GOOGLE_SHEET_NAME}")
        
        # Get last processed row
        last_row = SyncStateService.get_last_processed_row(db, settings.GOOGLE_SHEET_ID)
        logger.info(f"Last processed row: {last_row}")

        # Run sync
        logger.info("Starting import...")
        result = google_sheets_service.import_new_sales_records(db, last_row)

        # Display results
        logger.info("-" * 60)
        if result["success"]:
            logger.info("✓ Sync completed successfully!")
            logger.info(f"  - Processed: {result['processed']} rows")
            logger.info(f"  - Created: {result['created']} sales records")
            logger.info(f"  - Failed: {result['failed']} rows")
            logger.info(f"  - New last row: {result['last_row']}")

            # Update sync state
            if result["last_row"] > last_row:
                SyncStateService.update_last_processed_row(
                    db,
                    settings.GOOGLE_SHEET_ID,
                    result["last_row"]
                )
                logger.info("✓ Sync state updated")

            # Show errors if any
            if result.get("errors"):
                logger.warning(f"\nErrors encountered:")
                for error in result["errors"][:10]:  # Show first 10 errors
                    logger.warning(f"  Row {error['row']}: {error['error']}")
                if len(result["errors"]) > 10:
                    logger.warning(f"  ... and {len(result['errors']) - 10} more errors")

        else:
            logger.error("✗ Sync failed!")
            logger.error(f"  Error: {result.get('error', 'Unknown error')}")
            sys.exit(1)

        logger.info("=" * 60)

    except Exception as e:
        logger.error(f"Error during sync: {e}")
        import traceback
        logger.error(traceback.format_exc())
        sys.exit(1)

    finally:
        db.close()


if __name__ == "__main__":
    main()
