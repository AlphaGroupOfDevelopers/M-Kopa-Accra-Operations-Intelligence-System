"""Database base class and common utilities."""

from datetime import datetime
from typing import Any

from sqlalchemy import DateTime, Integer
from sqlalchemy.orm import DeclarativeBase, Mapped, mapped_column


class Base(DeclarativeBase):
    """Base class for all database models."""

    pass


class TimestampMixin:
    """Mixin to add created_at and updated_at timestamps to models."""

    created_at: Mapped[datetime] = mapped_column(
        DateTime,
        default=datetime.utcnow,
        nullable=False,
        comment="Record creation timestamp"
    )
    updated_at: Mapped[datetime] = mapped_column(
        DateTime,
        default=datetime.utcnow,
        onupdate=datetime.utcnow,
        nullable=False,
        comment="Record last update timestamp"
    )


class SoftDeleteMixin:
    """Mixin to add soft delete functionality to models."""

    deleted_at: Mapped[datetime | None] = mapped_column(
        DateTime,
        nullable=True,
        default=None,
        comment="Soft delete timestamp"
    )

    @property
    def is_deleted(self) -> bool:
        """Check if record is soft deleted."""
        return self.deleted_at is not None

    def soft_delete(self) -> None:
        """Mark record as deleted."""
        self.deleted_at = datetime.utcnow()

    def restore(self) -> None:
        """Restore soft deleted record."""
        self.deleted_at = None
