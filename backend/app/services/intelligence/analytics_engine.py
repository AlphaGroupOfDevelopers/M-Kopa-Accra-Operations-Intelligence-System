"""Analytics Engine for intelligence features."""

from datetime import date
from typing import List
from loguru import logger
from sqlalchemy.orm import Session

from app.models.shop import Shop
from app.models.sales_record import SalesRecord
from app.services.integrations.holiday_service import HolidayService

class AnalyticsEngine:
    """Core engine for business intelligence features."""

    @staticmethod
    def detect_silent_shops(db: Session, target_date: date) -> List[Shop]:
        """
        Detect active shops that have not submitted a sales record for the target date.
        
        Operating-Days Aware:
        - Returns empty list on Sundays.
        - Returns empty list on public holidays (checks automatically).
        
        Args:
            db: Database session
            target_date: The date to check for silence
            
        Returns:
            List of silent shops
        """
        # 1. Check if it's a Sunday (0 = Monday, 6 = Sunday)
        if target_date.weekday() == 6:
            logger.info(f"Silent Shop Detection skipped: {target_date} is a Sunday.")
            return []

        # 2. Check if it's a Public Holiday
        if HolidayService.is_public_holiday(db, target_date):
            logger.info(f"Silent Shop Detection skipped: {target_date} is a public holiday.")
            return []

        # 3. Get all active shops
        active_shops = db.query(Shop).filter(
            Shop.is_active == True,
            Shop.deleted_at.is_(None)
        ).all()

        # 4. Get shops with sales on target date
        shops_with_sales = db.query(SalesRecord.shop_id).filter(
            SalesRecord.sale_date == target_date
        ).distinct().all()
        
        reporting_shop_ids = {row[0] for row in shops_with_sales}

        # 5. Find silent shops
        silent_shops = [shop for shop in active_shops if shop.id not in reporting_shop_ids]
        
        if silent_shops:
            logger.warning(f"Found {len(silent_shops)} silent shops on {target_date}.")
        
        return silent_shops
