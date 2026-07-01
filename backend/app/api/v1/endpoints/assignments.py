"""Assignment API endpoints."""

from fastapi import APIRouter, Depends, Query
from sqlalchemy.orm import Session

from app.api.deps import get_current_active_user, get_db
from app.models.user import User
from app.schemas.assignment import AssignmentListItem
from app.schemas.common import PaginatedResponse
from app.services.assignment_service import AssignmentService

router = APIRouter()


@router.get(
    "",
    response_model=PaginatedResponse[AssignmentListItem],
    summary="List assignments",
)
def list_assignments(
    page: int = Query(1, ge=1, description="Page number"),
    page_size: int = Query(500, ge=1, le=1000, description="Items per page"),
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_active_user),
) -> PaginatedResponse[AssignmentListItem]:
    """List assignments."""
    skip = (page - 1) * page_size
    assignments, total = AssignmentService.list_assignments(
        db,
        skip=skip,
        limit=page_size,
    )

    return PaginatedResponse.create(
        items=assignments,
        total=total,
        page=page,
        page_size=page_size,
    )
