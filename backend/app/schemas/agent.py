"""Agent (DSR - Direct Sales Representative) schemas."""

from datetime import date
from typing import Optional

from pydantic import BaseModel, EmailStr, Field

from app.models.agent import EducationLevel, EmploymentStatus
from app.schemas.common import TimestampSchema


class AgentBase(BaseModel):
    """Base agent schema."""

    account_number: str = Field(..., min_length=1, max_length=20, description="Account number (primary phone)")
    full_name: str = Field(..., min_length=1, max_length=255, description="Full name")
    email: Optional[EmailStr] = Field(None, description="Email address")
    secondary_number: Optional[str] = Field(None, max_length=20, description="Alternative contact number")
    date_of_birth: Optional[date] = Field(None, description="Date of birth")
    gender: Optional[str] = Field(None, max_length=20, description="Gender")
    address: Optional[str] = Field(None, description="Residential address")
    education_level: Optional[EducationLevel] = Field(None, description="Education level")
    education_institution: Optional[str] = Field(None, max_length=255, description="Educational institution")
    education_year: Optional[int] = Field(None, ge=1900, le=2100, description="Year of graduation")
    employment_date: Optional[date] = Field(None, description="Employment date")
    employment_status: EmploymentStatus = Field(
        default=EmploymentStatus.ACTIVE, 
        description="Employment status (defaults to ACTIVE)"
    )
    emergency_contact_name: Optional[str] = Field(None, max_length=255, description="Emergency contact name")
    emergency_contact_phone: Optional[str] = Field(None, max_length=20, description="Emergency contact phone")
    notes: Optional[str] = Field(None, description="Additional notes")


class AgentCreate(AgentBase):
    """Agent creation schema."""

    pass


class AgentUpdate(BaseModel):
    """Agent update schema."""

    full_name: Optional[str] = Field(None, min_length=1, max_length=255)
    email: Optional[EmailStr] = None
    secondary_number: Optional[str] = Field(None, max_length=20)
    date_of_birth: Optional[date] = None
    gender: Optional[str] = Field(None, max_length=20)
    address: Optional[str] = None
    education_level: Optional[EducationLevel] = None
    education_institution: Optional[str] = Field(None, max_length=255)
    education_year: Optional[int] = Field(None, ge=1900, le=2100)
    employment_date: Optional[date] = None
    employment_status: Optional[EmploymentStatus] = None
    emergency_contact_name: Optional[str] = Field(None, max_length=255)
    emergency_contact_phone: Optional[str] = Field(None, max_length=20)
    notes: Optional[str] = None


class AgentRead(AgentBase, TimestampSchema):
    """Agent read schema."""

    id: int = Field(..., description="Agent ID")

    model_config = {"from_attributes": True}


class AgentListItem(BaseModel):
    """Agent list item schema (simplified for lists)."""

    id: int
    account_number: str
    full_name: str
    email: Optional[EmailStr]
    employment_status: EmploymentStatus
    created_at: date

    model_config = {"from_attributes": True}
