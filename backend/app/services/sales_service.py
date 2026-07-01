"""Sales Service - Business logic for sales record management."""

from datetime import date
from typing import List, Optional

from sqlalchemy import and_, func
from sqlalchemy.orm import Session

from app.models.sales_record import SalesRecord
from app.schemas.sales import SalesRecordCreate, SalesRecordUpdate


class SalesService:
    """Service for managing sales records."""

    @staticmethod
    def create_sales_record(db: Session, sales_data: SalesRecordCreate) -> SalesRecord:
        """
        Create a new sales record.

        Args:
            db: Database session
            sales_data: Sales record creation data

        Returns:
            Created sales record

        Raises:
            ValueError: If duplicate record exists or validation fails
        """
        # Check for duplicate (same agent, shop, date)
        existing = (
            db.query(SalesRecord)
            .filter(
                SalesRecord.dsr_id == sales_data.dsr_id,
                SalesRecord.shop_id == sales_data.shop_id,
                SalesRecord.sale_date == sales_data.sale_date,
            )
            .first()
        )

        if existing:
            raise ValueError(
                f"Sales record already exists for DSR {sales_data.dsr_id} "
                f"at shop {sales_data.shop_id} on {sales_data.sale_date}"
            )

        # Create record
        record = SalesRecord(**sales_data.model_dump())
        db.add(record)
        db.commit()
        db.refresh(record)
        return record

    @staticmethod
    def get_sales_record(db: Session, record_id: int) -> Optional[SalesRecord]:
        """Get sales record by ID."""
        return db.query(SalesRecord).filter(SalesRecord.id == record_id).first()

    @staticmethod
    def list_sales_records(
        db: Session,
        skip: int = 0,
        limit: int = 50,
        dsr_id: Optional[int] = None,
        shop_id: Optional[int] = None,
        start_date: Optional[date] = None,
        end_date: Optional[date] = None,
    ) -> tuple[List[SalesRecord], int]:
        """
        List sales records with pagination and filtering.

        Args:
            db: Database session
            skip: Number of records to skip
            limit: Maximum number of records to return
            dsr_id: Filter by DSR ID
            shop_id: Filter by shop ID
            start_date: Filter by start date
            end_date: Filter by end date

        Returns:
            Tuple of (sales records list, total count)
        """
        query = db.query(SalesRecord)

        if dsr_id:
            query = query.filter(SalesRecord.dsr_id == dsr_id)

        if shop_id:
            query = query.filter(SalesRecord.shop_id == shop_id)

        if start_date:
            query = query.filter(SalesRecord.sale_date >= start_date)

        if end_date:
            query = query.filter(SalesRecord.sale_date <= end_date)

        total = query.count()
        records = query.order_by(SalesRecord.sale_date.desc()).offset(skip).limit(limit).all()

        return records, total

    @staticmethod
    def update_sales_record(
        db: Session,
        record_id: int,
        sales_data: SalesRecordUpdate,
        user_id: Optional[int] = None,
    ) -> Optional[SalesRecord]:
        """
        Update sales record.

        Args:
            db: Database session
            record_id: Sales record ID
            sales_data: Update data
            user_id: User ID for verification tracking

        Returns:
            Updated sales record or None if not found
        """
        record = db.query(SalesRecord).filter(SalesRecord.id == record_id).first()
        if not record:
            return None

        # Update fields
        update_data = sales_data.model_dump(exclude_unset=True)

        # Track verification
        if "verified" in update_data and update_data["verified"] and user_id:
            update_data["verified_by"] = user_id

        for field, value in update_data.items():
            setattr(record, field, value)

        db.commit()
        db.refresh(record)
        return record

    @staticmethod
    def delete_sales_record(db: Session, record_id: int) -> bool:
        """
        Delete a sales record.

        Args:
            db: Database session
            record_id: Sales record ID

        Returns:
            True if deleted, False if not found
        """
        record = db.query(SalesRecord).filter(SalesRecord.id == record_id).first()
        if not record:
            return False

        db.delete(record)
        db.commit()
        return True

    @staticmethod
    def get_daily_summary(
        db: Session,
        target_date: date,
        shop_id: Optional[int] = None,
    ) -> dict:
        """
        Get daily sales summary.

        Args:
            db: Database session
            target_date: Target date
            shop_id: Optional shop filter

        Returns:
            Dictionary with summary statistics
        """
        query = db.query(
            func.sum(SalesRecord.devices_sold).label("total_devices"),
            func.count(SalesRecord.id).label("total_records"),
            func.count(func.distinct(SalesRecord.dsr_id)).label("active_dsrs"),
            func.count(func.distinct(SalesRecord.shop_id)).label("reporting_shops"),
        ).filter(SalesRecord.sale_date == target_date)

        if shop_id:
            query = query.filter(SalesRecord.shop_id == shop_id)

        result = query.first()

        return {
            "date": target_date,
            "total_devices": result.total_devices or 0,
            "total_records": result.total_records or 0,
            "active_dsrs": result.active_dsrs or 0,
            "reporting_shops": result.reporting_shops or 0,
        }

    @staticmethod
    def bulk_create_sales_records(
        db: Session,
        sales_records: List[SalesRecordCreate],
    ) -> tuple[List[SalesRecord], List[str]]:
        """
        Bulk create sales records.

        Args:
            db: Database session
            sales_records: List of sales records to create

        Returns:
            Tuple of (created records, error messages)
        """
        created = []
        errors = []

        for idx, sales_data in enumerate(sales_records):
            try:
                record = SalesService.create_sales_record(db, sales_data)
                created.append(record)
            except ValueError as e:
                errors.append(f"Record {idx + 1}: {str(e)}")
            except Exception as e:
                errors.append(f"Record {idx + 1}: Unexpected error - {str(e)}")

        return created, errors
