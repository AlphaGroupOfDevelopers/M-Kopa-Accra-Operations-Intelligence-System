"""Sales API endpoints."""

from datetime import date
from typing import Optional

from fastapi import APIRouter, Depends, HTTPException, Query, status
from sqlalchemy.orm import Session

from app.api.deps import get_current_active_user, get_db
from app.models.user import User
from app.schemas.common import PaginatedResponse, SuccessResponse
from app.schemas.sales import (
    BulkSalesImport,
    SalesRecordCreate,
    SalesRecordListItem,
    SalesRecordRead,
    SalesRecordUpdate,
)
from app.services.sales_service import SalesService

router = APIRouter()


@router.post(
    "",
    response_model=SalesRecordRead,
    status_code=status.HTTP_201_CREATED,
    summary="Create sales record",
)
def create_sales_record(
    sales_data: SalesRecordCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_active_user),
) -> SalesRecordRead:
    """
    Create a new sales record.

    Args:
        sales_data: Sales record creation data
        db: Database session
        current_user: Current authenticated user

    Returns:
        Created sales record

    Raises:
        HTTPException: If duplicate record exists
    """
    try:
        record = SalesService.create_sales_record(db, sales_data)
        return record
    except ValueError as e:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=str(e),
        )


@router.post(
    "/bulk",
    response_model=dict,
    status_code=status.HTTP_201_CREATED,
    summary="Bulk import sales records",
)
def bulk_import_sales(
    bulk_data: BulkSalesImport,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_active_user),
) -> dict:
    """
    Bulk import sales records.

    Args:
        bulk_data: Bulk sales import data
        db: Database session
        current_user: Current authenticated user

    Returns:
        Import summary with created records and errors
    """
    created, errors = SalesService.bulk_create_sales_records(db, bulk_data.records)

    return {
        "success": len(created),
        "failed": len(errors),
        "total": len(bulk_data.records),
        "created_ids": [record.id for record in created],
        "errors": errors,
    }


@router.get(
    "",
    response_model=PaginatedResponse[SalesRecordListItem],
    summary="List sales records",
)
def list_sales_records(
    page: int = Query(1, ge=1, description="Page number"),
    page_size: int = Query(50, ge=1, le=100, description="Items per page"),
    agent_id: Optional[int] = Query(None, description="Filter by agent ID"),
    shop_id: Optional[int] = Query(None, description="Filter by shop ID"),
    start_date: Optional[date] = Query(None, description="Filter from date"),
    end_date: Optional[date] = Query(None, description="Filter to date"),
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_active_user),
) -> PaginatedResponse[SalesRecordListItem]:
    """
    List sales records with pagination and filtering.

    Args:
        page: Page number
        page_size: Items per page
        agent_id: Filter by agent
        shop_id: Filter by shop
        start_date: Filter from date
        end_date: Filter to date
        db: Database session
        current_user: Current authenticated user

    Returns:
        Paginated list of sales records
    """
    skip = (page - 1) * page_size
    records, total = SalesService.list_sales_records(
        db,
        skip=skip,
        limit=page_size,
        agent_id=agent_id,
        shop_id=shop_id,
        start_date=start_date,
        end_date=end_date,
    )

    return PaginatedResponse.create(
        items=records,
        total=total,
        page=page,
        page_size=page_size,
    )


@router.get(
    "/daily-summary",
    response_model=dict,
    summary="Get daily sales summary",
)
def get_daily_summary(
    target_date: date = Query(..., description="Target date"),
    shop_id: Optional[int] = Query(None, description="Filter by shop"),
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_active_user),
) -> dict:
    """
    Get daily sales summary statistics.

    Args:
        target_date: Target date
        shop_id: Optional shop filter
        db: Database session
        current_user: Current authenticated user

    Returns:
        Daily summary statistics
    """
    summary = SalesService.get_daily_summary(db, target_date, shop_id)
    return summary


@router.get(
    "/{record_id}",
    response_model=SalesRecordRead,
    summary="Get sales record by ID",
)
def get_sales_record(
    record_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_active_user),
) -> SalesRecordRead:
    """
    Get sales record details by ID.

    Args:
        record_id: Sales record ID
        db: Database session
        current_user: Current authenticated user

    Returns:
        Sales record details

    Raises:
        HTTPException: If record not found
    """
    record = SalesService.get_sales_record(db, record_id)
    if not record:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Sales record with ID {record_id} not found",
        )
    return record


@router.put(
    "/{record_id}",
    response_model=SalesRecordRead,
    summary="Update sales record",
)
def update_sales_record(
    record_id: int,
    sales_data: SalesRecordUpdate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_active_user),
) -> SalesRecordRead:
    """
    Update sales record information.

    Args:
        record_id: Sales record ID
        sales_data: Update data
        db: Database session
        current_user: Current authenticated user

    Returns:
        Updated sales record

    Raises:
        HTTPException: If record not found
    """
    record = SalesService.update_sales_record(
        db, record_id, sales_data, user_id=current_user.id
    )
    if not record:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Sales record with ID {record_id} not found",
        )
    return record


@router.delete(
    "/{record_id}",
    response_model=SuccessResponse,
    summary="Delete sales record",
)
def delete_sales_record(
    record_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_active_user),
) -> SuccessResponse:
    """
    Delete a sales record.

    Args:
        record_id: Sales record ID
        db: Database session
        current_user: Current authenticated user

    Returns:
        Success response

    Raises:
        HTTPException: If record not found
    """
    success = SalesService.delete_sales_record(db, record_id)
    if not success:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Sales record with ID {record_id} not found",
        )

    return SuccessResponse(
        success=True,
        message=f"Sales record {record_id} deleted successfully",
    )
