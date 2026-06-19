"""Shop Service - Business logic for shop management."""

from typing import List, Optional

from sqlalchemy.orm import Session

from app.models.shop import Shop
from app.schemas.shop import ShopCreate, ShopUpdate


class ShopService:
    """Service for managing shops/MTN offices."""

    @staticmethod
    def create_shop(db: Session, shop_data: ShopCreate) -> Shop:
        """
        Create a new shop.

        Args:
            db: Database session
            shop_data: Shop creation data

        Returns:
            Created shop

        Raises:
            ValueError: If shop code already exists
        """
        # Check if shop code already exists
        existing = db.query(Shop).filter(Shop.code == shop_data.code).first()
        if existing:
            raise ValueError(f"Shop code {shop_data.code} already exists")

        # Create shop
        shop = Shop(**shop_data.model_dump())
        db.add(shop)
        db.commit()
        db.refresh(shop)
        return shop

    @staticmethod
    def get_shop(db: Session, shop_id: int) -> Optional[Shop]:
        """Get shop by ID."""
        return db.query(Shop).filter(Shop.id == shop_id, Shop.deleted_at.is_(None)).first()

    @staticmethod
    def get_shop_by_code(db: Session, code: str) -> Optional[Shop]:
        """Get shop by code."""
        return db.query(Shop).filter(Shop.code == code, Shop.deleted_at.is_(None)).first()

    @staticmethod
    def list_shops(
        db: Session,
        skip: int = 0,
        limit: int = 50,
        region: Optional[str] = None,
        is_active: Optional[bool] = None,
    ) -> tuple[List[Shop], int]:
        """
        List shops with pagination and filtering.

        Args:
            db: Database session
            skip: Number of records to skip
            limit: Maximum number of records to return
            region: Filter by region
            is_active: Filter by active status

        Returns:
            Tuple of (shops list, total count)
        """
        query = db.query(Shop).filter(Shop.deleted_at.is_(None))

        if region:
            query = query.filter(Shop.region == region)

        if is_active is not None:
            query = query.filter(Shop.is_active == is_active)

        total = query.count()
        shops = query.order_by(Shop.name).offset(skip).limit(limit).all()

        return shops, total

    @staticmethod
    def update_shop(db: Session, shop_id: int, shop_data: ShopUpdate) -> Optional[Shop]:
        """
        Update shop information.

        Args:
            db: Database session
            shop_id: Shop ID
            shop_data: Update data

        Returns:
            Updated shop or None if not found
        """
        shop = db.query(Shop).filter(Shop.id == shop_id, Shop.deleted_at.is_(None)).first()
        if not shop:
            return None

        # Update fields
        update_data = shop_data.model_dump(exclude_unset=True)
        for field, value in update_data.items():
            setattr(shop, field, value)

        db.commit()
        db.refresh(shop)
        return shop

    @staticmethod
    def delete_shop(db: Session, shop_id: int) -> bool:
        """
        Soft delete a shop.

        Args:
            db: Database session
            shop_id: Shop ID

        Returns:
            True if deleted, False if not found
        """
        shop = db.query(Shop).filter(Shop.id == shop_id, Shop.deleted_at.is_(None)).first()
        if not shop:
            return False

        shop.soft_delete()
        db.commit()
        return True

    @staticmethod
    def search_shops(db: Session, search_term: str, limit: int = 50) -> List[Shop]:
        """
        Search shops by name, code, or location.

        Args:
            db: Database session
            search_term: Search term
            limit: Maximum results

        Returns:
            List of matching shops
        """
        search_pattern = f"%{search_term}%"
        return (
            db.query(Shop)
            .filter(
                Shop.deleted_at.is_(None),
                (
                    Shop.name.ilike(search_pattern)
                    | Shop.code.ilike(search_pattern)
                    | Shop.location.ilike(search_pattern)
                ),
            )
            .limit(limit)
            .all()
        )
