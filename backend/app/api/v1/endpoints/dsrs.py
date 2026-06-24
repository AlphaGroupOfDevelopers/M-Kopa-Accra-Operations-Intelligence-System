"""DSR API endpoints."""

from typing import Optional

from fastapi import APIRouter, Depends, HTTPException, Query, status
from sqlalchemy.orm import Session

from app.api.deps import get_current_active_user, get_db
from app.models.dsr import EmploymentStatus
from app.models.user import User
from app.schemas.dsr import DSRCreate, DSRListItem, DSRRead, DSRUpdate
from app.schemas.common import MessageResponse, PaginatedResponse, SuccessResponse
from app.services.dsr_service import DSRService

router = APIRouter()


@router.post(
    "",
    response_model=DSRRead,
    status_code=status.HTTP_201_CREATED,
    summary="Create new DSR",
)
def create_dsr(
    dsr_data: DSRCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_active_user),
) -> DSRRead:
    """
    Create a new DSR.

    Args:
        dsr_data: DSR creation data
        db: Database session
        current_user: Current authenticated user

    Returns:
        Created DSR

    Raises:
        HTTPException: If account_number or email already exists
    """
    try:
        dsr = DSRService.create_dsr(db, dsr_data)
        return dsr
    except ValueError as e:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=str(e),
        )


@router.get(
    "",
    response_model=PaginatedResponse[DSRListItem],
    summary="List DSRs",
)
def list_dsrs(
    page: int = Query(1, ge=1, description="Page number"),
    page_size: int = Query(50, ge=1, le=100, description="Items per page"),
    employment_status: Optional[EmploymentStatus] = Query(None, description="Filter by employment status"),
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_active_user),
) -> PaginatedResponse[DSRListItem]:
    """
    List DSRs with pagination and filtering.

    Args:
        page: Page number
        page_size: Items per page
        employment_status: Filter by employment status
        db: Database session
        current_user: Current authenticated user

    Returns:
        Paginated list of DSRs
    """
    skip = (page - 1) * page_size
    dsrs, total = DSRService.list_dsrs(
        db,
        skip=skip,
        limit=page_size,
        employment_status=employment_status,
    )

    return PaginatedResponse.create(
        items=dsrs,
        total=total,
        page=page,
        page_size=page_size,
    )


@router.get(
    "/search",
    response_model=list[DSRListItem],
    summary="Search DSRs",
)
def search_dsrs(
    q: str = Query(..., min_length=1, description="Search term"),
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_active_user),
) -> list[DSRListItem]:
    """
    Search DSRs by name, account number, or email.

    Args:
        q: Search term
        db: Database session
        current_user: Current authenticated user

    Returns:
        List of matching DSRs
    """
    dsrs = DSRService.search_dsrs(db, q)
    return dsrs


@router.get(
    "/{dsr_id}",
    response_model=DSRRead,
    summary="Get DSR by ID",
)
def get_dsr(
    dsr_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_active_user),
) -> DSRRead:
    """
    Get DSR details by ID.

    Args:
        dsr_id: DSR ID
        db: Database session
        current_user: Current authenticated user

    Returns:
        DSR details

    Raises:
        HTTPException: If DSR not found
    """
    dsr = DSRService.get_dsr(db, dsr_id)
    if not dsr:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"DSR with ID {dsr_id} not found",
        )
    return dsr


@router.get(
    "/account/{account_number}",
    response_model=DSRRead,
    summary="Get DSR by account number",
)
def get_dsr_by_account_number(
    account_number: str,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_active_user),
) -> DSRRead:
    """
    Get DSR details by account number.

    Args:
        account_number: Account Number
        db: Database session
        current_user: Current authenticated user

    Returns:
        DSR details

    Raises:
        HTTPException: If DSR not found
    """
    dsr = DSRService.get_dsr_by_account_number(db, account_number)
    if not dsr:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"DSR with account number {account_number} not found",
        )
    return dsr


@router.put(
    "/{dsr_id}",
    response_model=DSRRead,
    summary="Update DSR",
)
def update_dsr(
    dsr_id: int,
    dsr_data: DSRUpdate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_active_user),
) -> DSRRead:
    """
    Update DSR information.

    Args:
        dsr_id: DSR ID
        dsr_data: Update data
        db: Database session
        current_user: Current authenticated user

    Returns:
        Updated DSR

    Raises:
        HTTPException: If DSR not found
    """
    dsr = DSRService.update_dsr(db, dsr_id, dsr_data)
    if not dsr:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"DSR with ID {dsr_id} not found",
        )
    return dsr


@router.delete(
    "/{dsr_id}",
    response_model=SuccessResponse,
    summary="Delete DSR",
)
def delete_dsr(
    dsr_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_active_user),
) -> SuccessResponse:
    """
    Soft delete a DSR.

    Args:
        dsr_id: DSR ID
        db: Database session
        current_user: Current authenticated user

    Returns:
        Success response

    Raises:
        HTTPException: If DSR not found
    """
    success = DSRService.delete_dsr(db, dsr_id)
    if not success:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"DSR with ID {dsr_id} not found",
        )

    return SuccessResponse(
        success=True,
        message=f"DSR {dsr_id} deleted successfully",
    )
