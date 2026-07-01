"""Holiday integration service for fetching and caching public holidays."""

import httpx
from datetime import date
from typing import List
from loguru import logger
from sqlalchemy.orm import Session

from app.models.public_holiday import PublicHoliday

class HolidayService:
    """Service to fetch and cache public holidays."""

    API_URL = "https://date.nager.at/api/v3/PublicHolidays/{year}/{country}"

    @classmethod
    def get_holidays_for_year(cls, db: Session, year: int, country_code: str = "GH") -> List[PublicHoliday]:
        """
        Get holidays for a specific year and country.
        First checks database, if empty, fetches from API and caches them.
        """
        # Check database first
        start_date = date(year, 1, 1)
        end_date = date(year, 12, 31)
        
        cached_holidays = db.query(PublicHoliday).filter(
            PublicHoliday.country_code == country_code,
            PublicHoliday.date >= start_date,
            PublicHoliday.date <= end_date
        ).all()

        if cached_holidays:
            return cached_holidays

        logger.info(f"No cached holidays found for {country_code} in {year}. Fetching from API...")
        
        # Fetch from API
        try:
            url = cls.API_URL.format(year=year, country=country_code)
            with httpx.Client() as client:
                response = client.get(url, timeout=10.0)
                response.raise_for_status()
                data = response.json()

            new_holidays = []
            for item in data:
                holiday_date = date.fromisoformat(item["date"])
                
                # Check if it already exists to avoid unique constraint violation
                existing = db.query(PublicHoliday).filter_by(date=holiday_date, country_code=country_code).first()
                if not existing:
                    holiday = PublicHoliday(
                        date=holiday_date,
                        name=item["name"],
                        country_code=country_code
                    )
                    db.add(holiday)
                    new_holidays.append(holiday)

            if new_holidays:
                db.commit()
                logger.info(f"Cached {len(new_holidays)} public holidays for {country_code} in {year}.")
            
            return db.query(PublicHoliday).filter(
                PublicHoliday.country_code == country_code,
                PublicHoliday.date >= start_date,
                PublicHoliday.date <= end_date
            ).all()

        except Exception as e:
            logger.error(f"Failed to fetch public holidays: {e}")
            return []

    @classmethod
    def is_public_holiday(cls, db: Session, target_date: date, country_code: str = "GH") -> bool:
        """
        Check if a given date is a public holiday.
        """
        holidays = cls.get_holidays_for_year(db, target_date.year, country_code)
        for h in holidays:
            if h.date == target_date:
                return True
        return False
