"""Public Holiday model for tracking non-working days."""

from datetime import date
from sqlalchemy import String, Date
from sqlalchemy.orm import Mapped, mapped_column

from app.db.base import Base, TimestampMixin

class PublicHoliday(Base, TimestampMixin):
    """
    Public Holiday model.
    
    Stores holidays fetched from external APIs to ensure offline reliability
    and avoid rate limits when running daily intelligence engines.
    
    Attributes:
        id: Primary key
        date: Date of the holiday
        name: Name of the holiday (e.g. Independence Day)
        country_code: ISO country code (e.g. GH)
    """

    __tablename__ = "public_holidays"

    id: Mapped[int] = mapped_column(primary_key=True, index=True)
    date: Mapped[date] = mapped_column(Date, nullable=False, index=True, unique=True)
    name: Mapped[str] = mapped_column(String(255), nullable=False)
    country_code: Mapped[str] = mapped_column(String(2), nullable=False, default="GH", index=True)

    def __repr__(self) -> str:
        return f"<PublicHoliday(id={self.id}, date='{self.date}', name='{self.name}', country='{self.country_code}')>"
