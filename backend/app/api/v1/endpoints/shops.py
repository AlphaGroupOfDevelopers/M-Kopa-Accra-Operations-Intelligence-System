"""Shop API endpoints."""

from typing import Optional

from fastapi import APIRouter, Depends, HTTPException, Query, status
from sqlalchemy.orm import Session

from app.api.deps import get_current_active_user, get_db
from app.models.user import User
from app.schemas.common import PaginatedResponse, SuccessResponse
from app.schemas.shop import ShopCreate, ShopListItem, ShopRead, ShopUpdate
from app.services.shop_service import ShopService

router = APIRouter()


@router.post(
    "",
    response_model=ShopRead,
    status_code=status.HTTP_201_CREATED,
    summary="Create new shop",
)
def create_shop(
    shop_data: ShopCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_active_user),
) -> ShopRead:
    """
    Create a new shop/MTN office.

    Args:
        shop_data: Shop creation data
        db: Database session
        current_user: Current authenticated user

    Returns:
        Created shop

    Raises:
        HTTPException: If shop name and location combination already exists
    """
    try:
        shop = ShopService.create_shop(db, shop_data)
        return shop
    except ValueError as e:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=str(e),
        )


@router.get(
    "",
    response_model=PaginatedResponse[ShopListItem],
    summary="List shops",
)
def list_shops(
    page: int = Query(1, ge=1, description="Page number"),
    page_size: int = Query(50, ge=1, le=100, description="Items per page"),
    region: Optional[str] = Query(None, description="Filter by region"),
    is_active: Optional[bool] = Query(None, description="Filter by active status"),
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_active_user),
) -> PaginatedResponse[ShopListItem]:
    """
    List shops with pagination and filtering.

    Args:
        page: Page number
        page_size: Items per page
        region: Filter by region
        is_active: Filter by active status
        db: Database session
        current_user: Current authenticated user

    Returns:
        Paginated list of shops
    """
    skip = (page - 1) * page_size
    shops, total = ShopService.list_shops(
        db,
        skip=skip,
        limit=page_size,
        region=region,
        is_active=is_active,
    )

    return PaginatedResponse.create(
        items=shops,
        total=total,
        page=page,
        page_size=page_size,
    )


@router.get(
    "/search",
    response_model=list[ShopListItem],
    summary="Search shops",
)
def search_shops(
    q: str = Query(..., min_length=1, description="Search term"),
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_active_user),
) -> list[ShopListItem]:
    """
    Search shops by name or location.

    Args:
        q: Search term
        db: Database session
        current_user: Current authenticated user

    Returns:
        List of matching shops
    """
    shops = ShopService.search_shops(db, q)
    return shops


@router.get(
    "/{shop_id}",
    response_model=ShopRead,
    summary="Get shop by ID",
)
def get_shop(
    shop_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_active_user),
) -> ShopRead:
    """
    Get shop details by ID.

    Args:
        shop_id: Shop ID
        db: Database session
        current_user: Current authenticated user

    Returns:
        Shop details

    Raises:
        HTTPException: If shop not found
    """
    shop = ShopService.get_shop(db, shop_id)
    if not shop:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Shop with ID {shop_id} not found",
        )
    return shop


@router.get(
    "/lookup",
    response_model=ShopRead,
    summary="Get shop by name and location",
)
def get_shop_by_name_and_location(
    name: str = Query(..., description="Shop name"),
    location: str = Query(..., description="Shop location"),
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_active_user),
) -> ShopRead:
    """
    Get shop details by shop name and location.

    Args:
        name: Shop name
        location: Shop location
        db: Database session
        current_user: Current authenticated user

    Returns:
        Shop details

    Raises:
        HTTPException: If shop not found
    """
    shop = ShopService.get_shop_by_name_and_location(db, name, location)
    if not shop:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Shop with name '{name}' and location '{location}' not found",
        )
    return shop


@router.put(
    "/{shop_id}",
    response_model=ShopRead,
    summary="Update shop",
)
def update_shop(
    shop_id: int,
    shop_data: ShopUpdate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_active_user),
) -> ShopRead:
    """
    Update shop information.

    Args:
        shop_id: Shop ID
        shop_data: Update data
        db: Database session
        current_user: Current authenticated user

    Returns:
        Updated shop

    Raises:
        HTTPException: If shop not found
    """
    shop = ShopService.update_shop(db, shop_id, shop_data)
    if not shop:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Shop with ID {shop_id} not found",
        )
    return shop


@router.delete(
    "/{shop_id}",
    response_model=SuccessResponse,
    summary="Delete shop",
)
def delete_shop(
    shop_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_active_user),
) -> SuccessResponse:
    """
    Soft delete a shop.

    Args:
        shop_id: Shop ID
        db: Database session
        current_user: Current authenticated user

    Returns:
        Success response

    Raises:
        HTTPException: If shop not found
    """
    success = ShopService.delete_shop(db, shop_id)
    if not success:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Shop with ID {shop_id} not found",
        )

    return SuccessResponse(
        success=True,
        message=f"Shop {shop_id} deleted successfully",
    )
