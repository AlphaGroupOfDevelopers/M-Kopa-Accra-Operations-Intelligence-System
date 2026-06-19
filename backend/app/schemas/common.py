"""Common Pydantic schemas used across the application."""

from datetime import datetime
from typing import Generic, List, Optional, TypeVar

from pydantic import BaseModel, Field


class TimestampSchema(BaseModel):
    """Mixin for timestamp fields."""

    created_at: datetime = Field(..., description="Creation timestamp")
    updated_at: datetime = Field(..., description="Last update timestamp")


class PaginationParams(BaseModel):
    """Pagination parameters."""

    page: int = Field(1, ge=1, description="Page number")
    page_size: int = Field(50, ge=1, le=100, description="Items per page")


DataT = TypeVar("DataT")


class PaginatedResponse(BaseModel, Generic[DataT]):
    """Generic paginated response."""

    items: List[DataT] = Field(..., description="List of items")
    total: int = Field(..., description="Total number of items")
    page: int = Field(..., description="Current page number")
    page_size: int = Field(..., description="Items per page")
    total_pages: int = Field(..., description="Total number of pages")

    @classmethod
    def create(
        cls,
        items: List[DataT],
        total: int,
        page: int,
        page_size: int,
    ) -> "PaginatedResponse[DataT]":
        """Create a paginated response."""
        total_pages = (total + page_size - 1) // page_size
        return cls(
            items=items,
            total=total,
            page=page,
            page_size=page_size,
            total_pages=total_pages,
        )


class MessageResponse(BaseModel):
    """Generic message response."""

    message: str = Field(..., description="Response message")
    detail: Optional[str] = Field(None, description="Additional details")


class SuccessResponse(BaseModel):
    """Generic success response."""

    success: bool = Field(True, description="Success status")
    message: str = Field(..., description="Success message")
    data: Optional[dict] = Field(None, description="Additional data")
