"""Sales record model for daily sales data."""

from datetime import date as date_type
from typing import Optional

from sqlalchemy import String, Text, Date, ForeignKey, Integer, Enum as SQLEnum
from sqlalchemy.orm import Mapped, mapped_column, relationship
import enum

from app.db.base import Base, TimestampMixin


class DataSource(str, enum.Enum):
    """Source of sales data."""
    GOOGLE_FORMS = "google_forms"
    MICROSOFT_FORMS = "microsoft_forms"
    MANUAL_ENTRY = "manual_entry"
    API = "api"


class SalesRecord(Base, TimestampMixin):
    """
    Sales record model capturing daily sales submissions from agents.

    Each record represents a daily sales report submitted by an agent,
    including devices sold and operational challenges/remarks.

    Attributes:
        id: Primary key
        agent_id: Foreign key to Agent
        shop_id: Foreign key to Shop (current assignment at time of sale)
        sale_date: Date of sales activity
        devices_sold: Number of devices sold
        remarks: Agent's remarks/challenges for the day
        data_source: Source system that created this record
        external_id: ID from external system (forms, etc.)
        verified: Whether record has been verified
        verified_by: User ID who verified the record
        agent: Relationship to Agent
        shop: Relationship to Shop
    """

    __tablename__ = "sales_records"

    id: Mapped[int] = mapped_column(primary_key=True, index=True)
    agent_id: Mapped[int] = mapped_column(
        ForeignKey("agents.id", ondelete="CASCADE"),
        nullable=False,
        index=True
    )
    shop_id: Mapped[int] = mapped_column(
        ForeignKey("shops.id", ondelete="CASCADE"),
        nullable=False,
        index=True
    )
    sale_date: Mapped[date_type] = mapped_column(Date, nullable=False, index=True)
    devices_sold: Mapped[int] = mapped_column(Integer, nullable=False, default=0)
    remarks: Mapped[str | None] = mapped_column(Text, nullable=True)
    data_source: Mapped[DataSource] = mapped_column(
        SQLEnum(DataSource, name="data_source_enum", create_constraint=True),
        default=DataSource.GOOGLE_FORMS,
        nullable=False
    )
    external_id: Mapped[str | None] = mapped_column(String(255), unique=True, index=True, nullable=True)
    verified: Mapped[bool] = mapped_column(default=False, nullable=False)
    verified_by: Mapped[int | None] = mapped_column(
        ForeignKey("users.id", ondelete="SET NULL"),
        nullable=True
    )

    # Relationships
    agent: Mapped["Agent"] = relationship("Agent", back_populates="sales_records")
    shop: Mapped["Shop"] = relationship("Shop", back_populates="sales_records")

    def __repr__(self) -> str:
        return f"<SalesRecord(id={self.id}, agent_id={self.agent_id}, shop_id={self.shop_id}, date={self.sale_date}, devices={self.devices_sold})>"
