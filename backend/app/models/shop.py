"""Shop model for MTN offices/locations."""

from typing import List

from sqlalchemy import String, Text, Float, Integer, UniqueConstraint
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.db.base import Base, TimestampMixin, SoftDeleteMixin


class Shop(Base, TimestampMixin, SoftDeleteMixin):
    """
    Shop/MTN Office model representing physical locations.

    Attributes:
        id: Primary key
        name: Shop name
        location: Physical address/location
        region: Geographic region (e.g., Greater Accra)
        district: District within region
        latitude: GPS latitude coordinate
        longitude: GPS longitude coordinate
        description: Additional shop information
        is_active: Whether shop is currently operational
        assignments: Relationship to agent assignments
        sales_records: Relationship to sales records
    """

    __tablename__ = "shops"

    __table_args__ = (
        UniqueConstraint('name', 'location', name='uq_shop_name_location'),
    )

    id: Mapped[int] = mapped_column(primary_key=True, index=True)
    name: Mapped[str] = mapped_column(String(255), nullable=False)
    location: Mapped[str] = mapped_column(String(500), nullable=False)
    region: Mapped[str] = mapped_column(String(100), nullable=False, default="Greater Accra")
    district: Mapped[str | None] = mapped_column(String(100), nullable=True)
    latitude: Mapped[float | None] = mapped_column(Float, nullable=True)
    longitude: Mapped[float | None] = mapped_column(Float, nullable=True)
    description: Mapped[str | None] = mapped_column(Text, nullable=True)
    is_active: Mapped[bool] = mapped_column(default=True, nullable=False)

    # Relationships
    assignments: Mapped[List["Assignment"]] = relationship(
        "Assignment",
        back_populates="shop",
        cascade="all, delete-orphan"
    )
    sales_records: Mapped[List["SalesRecord"]] = relationship(
        "SalesRecord",
        back_populates="shop",
        cascade="all, delete-orphan"
    )

    def __repr__(self) -> str:
        return f"<Shop(id={self.id}, name='{self.name}', location='{self.location}')>"
