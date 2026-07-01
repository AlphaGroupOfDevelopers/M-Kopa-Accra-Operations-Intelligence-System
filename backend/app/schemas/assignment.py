"""Assignment schemas."""

from datetime import date
from typing import Optional

from pydantic import BaseModel, Field

from app.models.assignment import AssignmentStatus
from app.schemas.common import TimestampSchema


class AssignmentBase(BaseModel):
    """Base assignment schema."""

    dsr_id: int = Field(..., gt=0, description="DSR ID")
    shop_id: int = Field(..., gt=0, description="Shop ID")
    start_date: date = Field(..., description="Assignment start date")
    end_date: Optional[date] = Field(None, description="Assignment end date")
    status: AssignmentStatus = Field(default=AssignmentStatus.ACTIVE, description="Assignment status")
    team_name: Optional[str] = Field(None, max_length=100, description="Team name")
    role: Optional[str] = Field(None, max_length=100, description="Role")
    notes: Optional[str] = Field(None, description="Notes")


class AssignmentCreate(AssignmentBase):
    """Assignment creation schema."""

    pass


class AssignmentUpdate(BaseModel):
    """Assignment update schema."""

    end_date: Optional[date] = None
    status: Optional[AssignmentStatus] = None
    team_name: Optional[str] = Field(None, max_length=100)
    role: Optional[str] = Field(None, max_length=100)
    notes: Optional[str] = None


class AssignmentRead(AssignmentBase, TimestampSchema):
    """Assignment read schema."""

    id: int = Field(..., description="Assignment ID")

    model_config = {"from_attributes": True}


class AssignmentListItem(BaseModel):
    """Assignment list item schema (simplified for lists)."""

    id: int
    dsr_id: int
    shop_id: int
    start_date: date
    end_date: Optional[date]
    status: AssignmentStatus
    role: Optional[str]

    model_config = {"from_attributes": True}
