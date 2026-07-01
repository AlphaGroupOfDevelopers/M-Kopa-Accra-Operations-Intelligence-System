"""Assignment Service for managing DSR assignments and transfers."""

from datetime import date
from sqlalchemy.orm import Session
from loguru import logger

from app.models.assignment import Assignment, TransferRecord, AssignmentStatus, TransferReason

class AssignmentService:
    """Service to handle assignments and historical transfer intelligence."""

    @staticmethod
    def transfer_dsr(
        db: Session,
        dsr_id: int,
        to_shop_id: int,
        reason: TransferReason = TransferReason.OTHER,
        transfer_date: date = None,
        reason_detail: str = None
    ) -> TransferRecord:
        """
        Transfers a DSR to a new shop.
        
        Business Rule: Historical Transfers starts with a blank slate.
        No retroactive scripting needed. This function will automatically track transfers
        moving forward from Day 1.
        
        Args:
            db: Database session
            dsr_id: DSR ID
            to_shop_id: The new Shop ID
            reason: The reason for the transfer
            transfer_date: The date of the transfer (defaults to today)
            reason_detail: Optional explanation
            
        Returns:
            The created TransferRecord
        """
        if not transfer_date:
            transfer_date = date.today()

        # 1. Find the current active assignment
        current_assignment = db.query(Assignment).filter(
            Assignment.dsr_id == dsr_id,
            Assignment.status == AssignmentStatus.ACTIVE
        ).first()

        # If they are already assigned to the target shop, do nothing
        if current_assignment and current_assignment.shop_id == to_shop_id:
            logger.info(f"DSR {dsr_id} is already assigned to shop {to_shop_id}. Transfer skipped.")
            return None

        # 2. Complete the old assignment if it exists
        from_shop_id = None
        if current_assignment:
            current_assignment.status = AssignmentStatus.COMPLETED
            current_assignment.end_date = transfer_date
            from_shop_id = current_assignment.shop_id
            db.add(current_assignment)

        # 3. Create the new assignment
        new_assignment = Assignment(
            dsr_id=dsr_id,
            shop_id=to_shop_id,
            start_date=transfer_date,
            status=AssignmentStatus.ACTIVE
        )
        db.add(new_assignment)

        # 4. If there was a previous shop, create a TransferRecord
        transfer_record = None
        if from_shop_id:
            transfer_record = TransferRecord(
                dsr_id=dsr_id,
                from_shop_id=from_shop_id,
                to_shop_id=to_shop_id,
                transfer_date=transfer_date,
                reason=reason,
                reason_detail=reason_detail
            )
            db.add(transfer_record)
            logger.info(f"Recorded transfer for DSR {dsr_id} from Shop {from_shop_id} to {to_shop_id}")
        else:
            logger.info(f"Created initial assignment for DSR {dsr_id} to Shop {to_shop_id}")

        db.commit()
        
        if transfer_record:
            db.refresh(transfer_record)
            
        return transfer_record

    @staticmethod
    def list_assignments(
        db: Session,
        skip: int = 0,
        limit: int = 100,
    ) -> tuple[list[Assignment], int]:
        """List assignments."""
        query = db.query(Assignment)
        total = query.count()
        assignments = query.offset(skip).limit(limit).all()
        return assignments, total

