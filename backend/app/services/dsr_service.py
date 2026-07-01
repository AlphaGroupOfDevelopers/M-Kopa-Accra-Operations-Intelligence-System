"""DSR Service - Business logic for DSR management."""

from typing import List, Optional

from sqlalchemy.orm import Session

from app.models.dsr import DSR, EmploymentStatus
from app.schemas.dsr import DSRCreate, DSRUpdate


class DSRService:
    """Service for managing DSRs."""

    @staticmethod
    def create_dsr(db: Session, dsr_data: DSRCreate) -> DSR:
        """
        Create a new DSR.

        Args:
            db: Database session
            dsr_data: DSR creation data

        Returns:
            Created DSR

        Raises:
            ValueError: If account_number or email already exists
        """
        # Check if account_number already exists
        existing = db.query(DSR).filter(DSR.account_number == dsr_data.account_number).first()
        if existing:
            raise ValueError(f"Account Number {dsr_data.account_number} already exists")

        # Check if email already exists (if provided)
        if dsr_data.email:
            existing_email = db.query(DSR).filter(DSR.email == dsr_data.email).first()
            if existing_email:
                raise ValueError(f"Email {dsr_data.email} already exists")

        # Create DSR
        dsr = DSR(**dsr_data.model_dump())
        db.add(dsr)
        db.commit()
        db.refresh(dsr)
        return dsr

    @staticmethod
    def get_dsr(db: Session, dsr_id: int) -> Optional[DSR]:
        """Get DSR by ID."""
        return db.query(DSR).filter(DSR.id == dsr_id, DSR.deleted_at.is_(None)).first()

    @staticmethod
    def get_dsr_by_account_number(db: Session, account_number: str) -> Optional[DSR]:
        """Get DSR by account number."""
        return db.query(DSR).filter(
            DSR.account_number == account_number,
            DSR.deleted_at.is_(None)
        ).first()

    @staticmethod
    def list_dsrs(
        db: Session,
        skip: int = 0,
        limit: int = 50,
        employment_status: Optional[EmploymentStatus] = None,
    ) -> tuple[List[DSR], int]:
        """
        List DSRs with pagination and filtering.

        Args:
            db: Database session
            skip: Number of records to skip
            limit: Maximum number of records to return
            employment_status: Filter by employment status

        Returns:
            Tuple of (DSRs list, total count)
        """
        query = db.query(DSR).filter(DSR.deleted_at.is_(None))

        if employment_status:
            query = query.filter(DSR.employment_status == employment_status)

        total = query.count()
        dsrs = query.order_by(DSR.created_at.desc()).offset(skip).limit(limit).all()

        return dsrs, total

    @staticmethod
    def update_dsr(db: Session, dsr_id: int, dsr_data: DSRUpdate) -> Optional[DSR]:
        """
        Update DSR information.

        Args:
            db: Database session
            dsr_id: DSR ID
            dsr_data: Update data

        Returns:
            Updated DSR or None if not found
        """
        dsr = db.query(DSR).filter(DSR.id == dsr_id, DSR.deleted_at.is_(None)).first()
        if not dsr:
            return None

        # Update fields
        update_data = dsr_data.model_dump(exclude_unset=True)
        for field, value in update_data.items():
            setattr(dsr, field, value)

        db.commit()
        db.refresh(dsr)
        return dsr

    @staticmethod
    def delete_dsr(db: Session, dsr_id: int) -> bool:
        """
        Soft delete a DSR.

        Args:
            db: Database session
            dsr_id: DSR ID

        Returns:
            True if deleted, False if not found
        """
        dsr = db.query(DSR).filter(DSR.id == dsr_id, DSR.deleted_at.is_(None)).first()
        if not dsr:
            return False

        dsr.soft_delete()
        db.commit()
        return True

    @staticmethod
    def search_dsrs(db: Session, search_term: str, limit: int = 50) -> List[DSR]:
        """
        Search DSRs by name, account number, or email.

        Args:
            db: Database session
            search_term: Search term
            limit: Maximum results

        Returns:
            List of matching DSRs
        """
        search_pattern = f"%{search_term}%"
        return (
            db.query(DSR)
            .filter(
                DSR.deleted_at.is_(None),
                (
                    DSR.full_name.ilike(search_pattern)
                    | DSR.account_number.ilike(search_pattern)
                    | DSR.email.ilike(search_pattern)
                ),
            )
            .limit(limit)
            .all()
        )
