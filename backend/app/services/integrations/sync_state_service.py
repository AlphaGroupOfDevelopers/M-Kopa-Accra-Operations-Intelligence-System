"""Service for managing synchronization state with external systems."""

from datetime import datetime
from typing import Optional

from sqlalchemy import Column, Integer, String, DateTime, Text
from sqlalchemy.orm import Session
from loguru import logger

from app.db.base import Base


class SyncState(Base):
    """Model for tracking synchronization state."""

    __tablename__ = "sync_states"

    id = Column(Integer, primary_key=True, index=True)
    sync_key = Column(String(255), unique=True, index=True, nullable=False)
    last_value = Column(Text, nullable=True)
    last_sync_at = Column(DateTime, nullable=True)
    sync_count = Column(Integer, default=0, nullable=False)
    sync_metadata = Column(Text, nullable=True)  # JSON string for additional data


class SyncStateService:
    """Service for managing sync state persistence."""

    @staticmethod
    def get_last_processed_row(db: Session, sheet_id: str) -> int:
        """
        Get the last processed row number for a Google Sheet.

        Args:
            db: Database session
            sheet_id: Google Sheet ID

        Returns:
            Last processed row number (1-indexed), defaults to 1
        """
        sync_key = f"google_sheet_{sheet_id}_last_row"
        
        state = db.query(SyncState).filter(
            SyncState.sync_key == sync_key
        ).first()

        if state and state.last_value:
            try:
                return int(state.last_value)
            except ValueError:
                logger.warning(
                    f"Invalid last_value for sync_key {sync_key}: {state.last_value}"
                )
                return 1

        return 1  # Start from row 1 (header row)

    @staticmethod
    def update_last_processed_row(
        db: Session,
        sheet_id: str,
        row_number: int,
        sync_metadata: Optional[str] = None
    ) -> None:
        """
        Update the last processed row number for a Google Sheet.

        Args:
            db: Database session
            sheet_id: Google Sheet ID
            row_number: Last processed row number
            sync_metadata: Optional metadata (JSON string)
        """
        sync_key = f"google_sheet_{sheet_id}_last_row"

        state = db.query(SyncState).filter(
            SyncState.sync_key == sync_key
        ).first()

        if state:
            # Update existing state
            state.last_value = str(row_number)
            state.last_sync_at = datetime.utcnow()
            state.sync_count += 1
            if sync_metadata:
                state.sync_metadata = sync_metadata
        else:
            # Create new state
            state = SyncState(
                sync_key=sync_key,
                last_value=str(row_number),
                last_sync_at=datetime.utcnow(),
                sync_count=1,
                sync_metadata=sync_metadata
            )
            db.add(state)

        db.commit()
        logger.debug(f"Updated sync state: {sync_key} = {row_number}")

    @staticmethod
    def get_last_sync_time(db: Session, sheet_id: str) -> Optional[datetime]:
        """
        Get the last sync timestamp for a Google Sheet.

        Args:
            db: Database session
            sheet_id: Google Sheet ID

        Returns:
            Last sync timestamp or None
        """
        sync_key = f"google_sheet_{sheet_id}_last_row"

        state = db.query(SyncState).filter(
            SyncState.sync_key == sync_key
        ).first()

        return state.last_sync_at if state else None

    @staticmethod
    def get_sync_stats(db: Session, sheet_id: str) -> dict:
        """
        Get synchronization statistics for a Google Sheet.

        Args:
            db: Database session
            sheet_id: Google Sheet ID

        Returns:
            Dictionary with sync statistics
        """
        sync_key = f"google_sheet_{sheet_id}_last_row"

        state = db.query(SyncState).filter(
            SyncState.sync_key == sync_key
        ).first()

        if not state:
            return {
                "last_processed_row": 1,
                "last_sync_at": None,
                "sync_count": 0,
                "is_configured": False
            }

        return {
            "last_processed_row": int(state.last_value) if state.last_value else 1,
            "last_sync_at": state.last_sync_at.isoformat() if state.last_sync_at else None,
            "sync_count": state.sync_count,
            "is_configured": True
        }
