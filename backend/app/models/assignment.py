"""Assignment and Transfer models for dsr-shop relationships."""

from datetime import date
from typing import Optional

from sqlalchemy import String, Text, Date, ForeignKey, Enum as SQLEnum, Integer
from sqlalchemy.orm import Mapped, mapped_column, relationship
import enum

from app.db.base import Base, TimestampMixin


class AssignmentStatus(str, enum.Enum):
    """Assignment status options."""
    ACTIVE = "active"
    COMPLETED = "completed"
    TERMINATED = "terminated"


class TransferReason(str, enum.Enum):
    """Transfer reason categories."""
    PERFORMANCE_IMPROVEMENT = "performance_improvement"
    SHOP_NEEDS = "shop_needs"
    AGENT_REQUEST = "agent_request"
    DISCIPLINARY = "disciplinary"
    RESTRUCTURING = "restructuring"
    OTHER = "other"


class Assignment(Base, TimestampMixin):
    """
    Assignment model tracking DSR assignments to shops over time.

    This model maintains historical records of all DSR-shop assignments,
    enabling performance tracking and transfer analysis.

    Attributes:
        id: Primary key
        dsr_id: Foreign key to DSR
        shop_id: Foreign key to Shop
        start_date: Assignment start date
        end_date: Assignment end date (None if current)
        status: Assignment status
        team_name: Team name for this assignment
        role: DSR's role at the shop (Main DSR, Supporting DSR)
        notes: Additional assignment notes
        dsr: Relationship to DSR
        shop: Relationship to Shop
    """

    __tablename__ = "assignments"

    id: Mapped[int] = mapped_column(primary_key=True, index=True)
    dsr_id: Mapped[int] = mapped_column(
        ForeignKey("dsrs.id", ondelete="CASCADE"),
        nullable=False,
        index=True
    )
    shop_id: Mapped[int] = mapped_column(
        ForeignKey("shops.id", ondelete="CASCADE"),
        nullable=False,
        index=True
    )
    start_date: Mapped[date] = mapped_column(Date, nullable=False, index=True)
    end_date: Mapped[date | None] = mapped_column(Date, nullable=True, index=True)
    status: Mapped[AssignmentStatus] = mapped_column(
        SQLEnum(AssignmentStatus, name="assignment_status_enum", create_constraint=True),
        default=AssignmentStatus.ACTIVE,
        nullable=False,
        index=True
    )
    team_name: Mapped[str | None] = mapped_column(String(100), nullable=True)
    role: Mapped[str | None] = mapped_column(String(100), nullable=True)
    notes: Mapped[str | None] = mapped_column(Text, nullable=True)

    # Relationships
    dsr: Mapped["DSR"] = relationship("DSR", back_populates="assignments")
    shop: Mapped["Shop"] = relationship("Shop", back_populates="assignments")

    @property
    def is_current(self) -> bool:
        """Check if this is the current active assignment."""
        return self.end_date is None and self.status == AssignmentStatus.ACTIVE

    @property
    def duration_days(self) -> int:
        """Calculate assignment duration in days."""
        end = self.end_date or date.today()
        return (end - self.start_date).days

    def __repr__(self) -> str:
        return f"<Assignment(id={self.id}, dsr_id={self.dsr_id}, shop_id={self.shop_id}, status='{self.status}')>"


class TransferRecord(Base, TimestampMixin):
    """
    Transfer record tracking DSR movements between shops.

    This model specifically records transfers with additional context like
    reason, approver, and effectiveness tracking.

    Attributes:
        id: Primary key
        dsr_id: Foreign key to DSR
        from_shop_id: Foreign key to previous Shop
        to_shop_id: Foreign key to new Shop
        transfer_date: Date of transfer
        reason: Transfer reason category
        reason_detail: Detailed explanation
        approved_by: User ID who approved transfer
        effectiveness_score: Post-transfer effectiveness rating (1-10)
        notes: Additional transfer notes
    """

    __tablename__ = "transfer_records"

    id: Mapped[int] = mapped_column(primary_key=True, index=True)
    dsr_id: Mapped[int] = mapped_column(
        ForeignKey("dsrs.id", ondelete="CASCADE"),
        nullable=False,
        index=True
    )
    from_shop_id: Mapped[int] = mapped_column(
        ForeignKey("shops.id", ondelete="CASCADE"),
        nullable=False,
        index=True
    )
    to_shop_id: Mapped[int] = mapped_column(
        ForeignKey("shops.id", ondelete="CASCADE"),
        nullable=False,
        index=True
    )
    transfer_date: Mapped[date] = mapped_column(Date, nullable=False, index=True)
    reason: Mapped[TransferReason] = mapped_column(
        SQLEnum(TransferReason, name="transfer_reason_enum", create_constraint=True),
        nullable=False
    )
    reason_detail: Mapped[str | None] = mapped_column(Text, nullable=True)
    approved_by: Mapped[int | None] = mapped_column(
        ForeignKey("users.id", ondelete="SET NULL"),
        nullable=True
    )
    effectiveness_score: Mapped[int | None] = mapped_column(Integer, nullable=True)
    notes: Mapped[str | None] = mapped_column(Text, nullable=True)

    # Relationships
    dsr: Mapped["DSR"] = relationship("DSR", foreign_keys=[dsr_id])
    from_shop: Mapped["Shop"] = relationship("Shop", foreign_keys=[from_shop_id])
    to_shop: Mapped["Shop"] = relationship("Shop", foreign_keys=[to_shop_id])

    def __repr__(self) -> str:
        return f"<TransferRecord(id={self.id}, dsr_id={self.dsr_id}, from={self.from_shop_id}, to={self.to_shop_id})>"
