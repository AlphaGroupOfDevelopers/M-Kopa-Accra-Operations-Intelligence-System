"""Google Sheets integration service for importing sales data."""

from datetime import datetime, time, timedelta
from typing import List, Dict, Any, Optional, Tuple
import os

from google.oauth2 import service_account
from googleapiclient.discovery import build
from googleapiclient.errors import HttpError
from loguru import logger
from sqlalchemy.orm import Session

from app.core import settings
from app.models.dsr import DSR
from app.models.shop import Shop
from app.models.sales_record import SalesRecord
from app.schemas.sales import SalesRecordCreate
from app.services.sales_service import SalesService


class GoogleSheetsService:
    """Service for integrating with Google Sheets for sales data import."""

    SCOPES = ['https://www.googleapis.com/auth/spreadsheets.readonly']
    BUSINESS_DAY_CUTOFF_HOUR = 6  # 6:00 AM cutoff for business day

    def __init__(self):
        """Initialize Google Sheets service."""
        self.credentials = None
        self.service = None
        self._initialize_credentials()

    def _initialize_credentials(self) -> None:
        """Initialize Google API credentials from service account file."""
        try:
            credentials_path = settings.GOOGLE_SHEETS_CREDENTIALS_FILE
            
            if not os.path.exists(credentials_path):
                logger.warning(
                    f"Google credentials file not found at {credentials_path}. "
                    "Google Sheets integration will not work."
                )
                return

            self.credentials = service_account.Credentials.from_service_account_file(
                credentials_path,
                scopes=self.SCOPES
            )
            
            self.service = build('sheets', 'v4', credentials=self.credentials)
            logger.info("Google Sheets service initialized successfully")

        except Exception as e:
            logger.error(f"Failed to initialize Google Sheets credentials: {e}")
            self.service = None

    def is_configured(self) -> bool:
        """Check if Google Sheets integration is properly configured."""
        return (
            self.service is not None and
            settings.GOOGLE_SHEET_ID is not None
        )

    def get_sheet_data(
        self,
        range_name: Optional[str] = None,
        include_headers: bool = True
    ) -> List[List[Any]]:
        """
        Fetch data from Google Sheet.

        Args:
            range_name: Sheet range (e.g., 'Sheet1!A1:F100'). If None, uses config.
            include_headers: Whether to include header row

        Returns:
            List of rows, each row is a list of cell values

        Raises:
            ValueError: If service not configured
            HttpError: If API call fails
        """
        if not self.is_configured():
            raise ValueError("Google Sheets service not configured")

        if range_name is None:
            range_name = f"{settings.GOOGLE_SHEET_NAME}!A:Z"

        try:
            result = self.service.spreadsheets().values().get(
                spreadsheetId=settings.GOOGLE_SHEET_ID,
                range=range_name
            ).execute()

            values = result.get('values', [])
            
            if not include_headers and values:
                return values[1:]  # Skip header row
            
            return values

        except HttpError as e:
            logger.error(f"Error fetching Google Sheet data: {e}")
            raise

    def get_new_rows(
        self,
        last_processed_row: int
    ) -> Tuple[List[List[Any]], List[Any]]:
        """
        Get new rows from Google Sheet since last processing.

        Args:
            last_processed_row: Last row number that was processed (1-indexed)

        Returns:
            Tuple of (headers, new_rows)
        """
        if not self.is_configured():
            raise ValueError("Google Sheets service not configured")

        try:
            # Get all data
            all_data = self.get_sheet_data(include_headers=True)
            
            if not all_data:
                logger.warning("Google Sheet is empty")
                return [], []

            headers = all_data[0]
            
            # Get rows after last_processed_row
            # Row 1 is headers, so data starts at row 2
            if last_processed_row < 1:
                last_processed_row = 1  # Start from headers
            
            # Convert to 0-indexed
            start_index = last_processed_row
            new_rows = all_data[start_index:] if start_index < len(all_data) else []
            
            logger.info(
                f"Found {len(new_rows)} new rows "
                f"(last processed: row {last_processed_row})"
            )
            
            return headers, new_rows

        except HttpError as e:
            logger.error(f"Error fetching new rows from Google Sheet: {e}")
            raise

    def map_row_to_sales_record(
        self,
        row: List[Any],
        headers: List[str],
        db: Session
    ) -> Optional[SalesRecordCreate]:
        """
        Map a Google Sheet row to a SalesRecordCreate object.

        Expected columns:
        - Timestamp (auto from Google Forms)
        - Account Number (DSR's phone/account number)
        - Shop ID (from QR code, pre-filled)
        - Date (submission date)
        - Devices Sold
        - Remarks

        Args:
            row: List of cell values
            headers: List of column headers
            db: Database session for lookups

        Returns:
            SalesRecordCreate object or None if validation fails
        """
        try:
            # Create dict from headers and row
            if len(row) != len(headers):
                # Pad row with empty strings if shorter
                row = row + [''] * (len(headers) - len(row))

            row_dict = {
                header.strip().lower(): value
                for header, value in zip(headers, row)
            }

            # Extract fields
            account_number = self._extract_account_number(row_dict)
            shop_id = self._extract_shop_id(row_dict)
            submission_timestamp = self._extract_timestamp(row_dict)
            devices_sold = self._extract_devices_sold(row_dict)
            remarks = self._extract_remarks(row_dict)

            # Apply business day cutoff logic (6 AM rule)
            sale_date = self._apply_business_day_cutoff(submission_timestamp)

            # Lookup DSR by account number
            dsr = db.query(DSR).filter(DSR.account_number == account_number).first()
            if not dsr:
                logger.warning(f"DSR not found for account number: {account_number}")
                return None

            # Lookup shop by ID
            shop = db.query(Shop).filter(Shop.id == shop_id).first()
            if not shop:
                logger.warning(f"Shop not found for ID: {shop_id}")
                return None

            # Create sales record schema
            return SalesRecordCreate(
                dsr_id=dsr.id,
                shop_id=shop.id,
                sale_date=sale_date,
                devices_sold=devices_sold,
                remarks=remarks,
                data_source="google_forms",
                external_id=submission_timestamp  # Use timestamp as external_id for uniqueness
            )

        except Exception as e:
            logger.error(f"Error mapping row to sales record: {e}")
            logger.debug(f"Row data: {row}")
            return None

    def _extract_account_number(self, row_dict: Dict[str, Any]) -> str:
        """Extract account number (DSR's primary phone) from row."""
        # Try common field names
        for field in ['account number', 'account_number', 'phone number', 'phone', 'mobile', 'dsr account']:
            if field in row_dict:
                account = str(row_dict[field]).strip()
                # Clean account number (remove spaces, dashes)
                account = account.replace(' ', '').replace('-', '')
                return account
        
        raise ValueError("Account number field not found")

    def _extract_shop_id(self, row_dict: Dict[str, Any]) -> int:
        """
        Extract shop ID from row (pre-filled from QR code).
        
        This is the preferred method as QR codes contain the exact Shop ID,
        eliminating any ambiguity about which shop the DSR was at.
        """
        for field in ['shop id', 'shop_id', 'shopid', 'location id']:
            if field in row_dict:
                try:
                    shop_id = int(row_dict[field])
                    return shop_id
                except (ValueError, TypeError):
                    logger.warning(f"Invalid shop ID value: {row_dict[field]}")
        
        raise ValueError("Shop ID field not found or invalid")

    def _extract_timestamp(self, row_dict: Dict[str, Any]) -> str:
        """Extract timestamp from row (used as external_id and for business day calculation)."""
        for field in ['timestamp', 'submission time', 'time', 'submitted at']:
            if field in row_dict:
                return str(row_dict[field]).strip()
        
        # Generate a unique identifier if no timestamp
        return f"manual_{datetime.now().isoformat()}"

    def _apply_business_day_cutoff(self, timestamp_str: str) -> datetime.date:
        """
        Apply the 6:00 AM business day cutoff rule.
        
        Business Rule:
        - Forms submitted between 12:00 AM and 5:59 AM are credited to the PREVIOUS day
        - Forms submitted from 6:00 AM onwards are credited to the CURRENT day
        
        This handles DSRs who submit reports after midnight but for the previous day's work.
        
        Args:
            timestamp_str: Timestamp string from Google Forms
            
        Returns:
            Correct business day date
        """
        try:
            # Parse timestamp (Google Forms format: "MM/DD/YYYY HH:MM:SS")
            # Try multiple formats
            submission_time = None
            for fmt in [
                '%m/%d/%Y %H:%M:%S',  # Google Forms format
                '%Y-%m-%d %H:%M:%S',   # ISO format
                '%d/%m/%Y %H:%M:%S',   # Alternative format
            ]:
                try:
                    submission_time = datetime.strptime(timestamp_str, fmt)
                    break
                except ValueError:
                    continue
            
            if submission_time is None:
                logger.warning(f"Could not parse timestamp: {timestamp_str}, using today")
                return datetime.now().date()
            
            # Check if submission was before 6 AM
            cutoff_time = time(self.BUSINESS_DAY_CUTOFF_HOUR, 0, 0)  # 6:00 AM
            
            if submission_time.time() < cutoff_time:
                # Submitted before 6 AM - credit to previous day
                business_day = submission_time.date() - timedelta(days=1)
                logger.debug(
                    f"Submission at {submission_time.time()} is before 6 AM cutoff. "
                    f"Crediting to previous day: {business_day}"
                )
                return business_day
            else:
                # Submitted after 6 AM - credit to current day
                return submission_time.date()
                
        except Exception as e:
            logger.error(f"Error applying business day cutoff: {e}")
            return datetime.now().date()

    def _extract_date(self, row_dict: Dict[str, Any]) -> datetime.date:
        """
        Extract and parse date from row (if explicitly provided).
        
        Note: With the 6 AM cutoff rule, we primarily use the timestamp.
        This method is a fallback if a separate date field exists.
        """
        for field in ['date', 'sale date', 'sales date', 'day']:
            if field in row_dict:
                date_str = str(row_dict[field]).strip()
                # Try parsing common formats
                for fmt in ['%Y-%m-%d', '%d/%m/%Y', '%m/%d/%Y', '%Y/%m/%d']:
                    try:
                        return datetime.strptime(date_str, fmt).date()
                    except ValueError:
                        continue
                
                # If all formats fail, log warning
                logger.warning(f"Could not parse date: {date_str}")
        
        # Default to today if no date field
        return datetime.now().date()

    def _extract_devices_sold(self, row_dict: Dict[str, Any]) -> int:
        """Extract devices sold count from row."""
        for field in ['devices sold', 'devices', 'units sold', 'sales', 'quantity']:
            if field in row_dict:
                try:
                    value = row_dict[field]
                    if isinstance(value, str):
                        value = value.strip()
                    return int(float(value))  # Handle decimal inputs
                except (ValueError, TypeError):
                    logger.warning(f"Invalid devices sold value: {value}")
                    return 0
        
        return 0

    def _extract_remarks(self, row_dict: Dict[str, Any]) -> Optional[str]:
        """Extract remarks/challenges from row."""
        for field in ['remarks', 'challenges', 'comments', 'notes', 'issues']:
            if field in row_dict:
                remarks = str(row_dict[field]).strip()
                return remarks if remarks else None
        
        return None

    def _extract_remarks(self, row_dict: Dict[str, Any]) -> Optional[str]:
        """Extract remarks/challenges from row."""
        for field in ['remarks', 'challenges', 'comments', 'notes', 'issues', 'observations']:
            if field in row_dict:
                remarks = str(row_dict[field]).strip()
                return remarks if remarks else None
        
        return None

    def _lookup_shop(self, db: Session, identifier: str) -> Optional[Shop]:
        """
        Lookup shop by various identifiers (fallback method).
        
        Note: Prefer using shop ID from QR code for accuracy.

        Args:
            db: Database session
            identifier: Shop code, name, or ID

        Returns:
            Shop object or None
        """
        # Try by code first
        shop = db.query(Shop).filter(Shop.code == identifier).first()
        if shop:
            return shop

        # Try by ID if numeric
        try:
            shop_id = int(identifier)
            shop = db.query(Shop).filter(Shop.id == shop_id).first()
            if shop:
                return shop
        except ValueError:
            pass

        # Try by name (case-insensitive partial match)
        shop = db.query(Shop).filter(
            Shop.name.ilike(f"%{identifier}%")
        ).first()
        
        return shop

    def import_new_sales_records(
        self,
        db: Session,
        last_processed_row: int = 1
    ) -> Dict[str, Any]:
        """
        Import new sales records from Google Sheet.
        
        Business Rules Applied:
        1. Lookup agents by account_number (not employee_id)
        2. Use Shop ID from QR code (not shop name)
        3. Apply 6 AM business day cutoff
        4. Handle duplicates: If same agent + same date, take the latest submission

        Args:
            db: Database session
            last_processed_row: Last row that was processed

        Returns:
            Dictionary with import statistics
        """
        if not self.is_configured():
            return {
                "success": False,
                "error": "Google Sheets service not configured",
                "processed": 0,
                "created": 0,
                "updated": 0,
                "failed": 0,
                "last_row": last_processed_row
            }

        try:
            # Get new rows
            headers, new_rows = self.get_new_rows(last_processed_row)

            if not new_rows:
                logger.info("No new rows to process")
                return {
                    "success": True,
                    "processed": 0,
                    "created": 0,
                    "updated": 0,
                    "failed": 0,
                    "last_row": last_processed_row,
                    "errors": []
                }

            # Process each row
            created_count = 0
            updated_count = 0
            failed_count = 0
            errors = []

            for idx, row in enumerate(new_rows, start=last_processed_row + 1):
                try:
                    sales_record = self.map_row_to_sales_record(row, headers, db)
                    
                    if sales_record:
                        # Check for duplicate (same DSR + same date)
                        existing = db.query(SalesRecord).filter_by(
                            dsr_id=sales_record.dsr_id,
                            sale_date=sales_record.sale_date
                        ).first()
                        
                        if existing:
                            # Duplicate found - UPDATE with latest submission
                            logger.info(
                                f"Duplicate found for DSR {sales_record.dsr_id} "
                                f"on {sales_record.sale_date}. Updating with latest submission."
                            )
                            
                            # Update existing record
                            existing.devices_sold = sales_record.devices_sold
                            existing.remarks = sales_record.remarks
                            existing.shop_id = sales_record.shop_id  # Update shop if DSR moved
                            existing.external_id = sales_record.external_id  # Update timestamp
                            existing.data_source = sales_record.data_source
                            
                            db.commit()
                            updated_count += 1
                            logger.debug(f"Updated sales record from row {idx}")
                        else:
                            # No duplicate - CREATE new record
                            from app.models.sales_record import SalesRecord
                            new_record = SalesRecord(**sales_record.model_dump())
                            db.add(new_record)
                            db.commit()
                            created_count += 1
                            logger.debug(f"Created sales record from row {idx}")
                    else:
                        failed_count += 1
                        errors.append({
                            "row": idx,
                            "error": "Failed to map row to sales record"
                        })

                except ValueError as e:
                    # Validation error
                    failed_count += 1
                    errors.append({
                        "row": idx,
                        "error": str(e)
                    })
                    logger.warning(f"Row {idx} validation error: {e}")

                except Exception as e:
                    failed_count += 1
                    errors.append({
                        "row": idx,
                        "error": str(e)
                    })
                    logger.error(f"Error processing row {idx}: {e}")

            # Calculate new last_processed_row
            new_last_row = last_processed_row + len(new_rows)

            logger.info(
                f"Import complete: {created_count} created, {updated_count} updated, "
                f"{failed_count} failed out of {len(new_rows)} rows"
            )

            return {
                "success": True,
                "processed": len(new_rows),
                "created": created_count,
                "updated": updated_count,
                "failed": failed_count,
                "last_row": new_last_row,
                "errors": errors
            }

        except Exception as e:
            logger.error(f"Error during import: {e}")
            return {
                "success": False,
                "error": str(e),
                "processed": 0,
                "created": 0,
                "updated": 0,
                "failed": 0,
                "last_row": last_processed_row
            }


# Create singleton instance
google_sheets_service = GoogleSheetsService()
