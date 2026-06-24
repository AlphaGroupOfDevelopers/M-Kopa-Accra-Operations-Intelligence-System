"""DSR (Direct Sales Representative) schemas."""

from datetime import date
from typing import Optional

from pydantic import BaseModel, EmailStr, Field

from app.models.dsr import EducationLevel, EmploymentStatus
from app.schemas.common import TimestampSchema


class DSRBase(BaseModel):
    """Base DSR schema."""

    account_number: str = Field(..., min_length=1, max_length=50, description="Account Number")
    first_name: str = Field(..., min_length=1, max_length=100, description="First name")
    last_name: str = Field(..., min_length=1, max_length=100, description="Last name")
    email: Optional[EmailStr] = Field(None, description="Email address")
    phone: str = Field(..., min_length=1, max_length=20, description="Phone number")
    date_of_birth: Optional[date] = Field(None, description="Date of birth")
    gender: Optional[str] = Field(None, max_length=20, description="Gender")
    address: Optional[str] = Field(None, description="Residential address")
    national_id: Optional[str] = Field(None, max_length=50, description="National ID number")
    education_level: Optional[EducationLevel] = Field(None, description="Education level")
    education_institution: Optional[str] = Field(None, max_length=255, description="Educational institution")
    education_year: Optional[int] = Field(None, ge=1900, le=2100, description="Year of graduation")
    employment_date: Optional[date] = Field(None, description="Employment date")
    employment_status: EmploymentStatus = Field(EmploymentStatus.ACTIVE, description="Employment status")
    emergency_contact_name: Optional[str] = Field(None, max_length=255, description="Emergency contact name")
    emergency_contact_phone: Optional[str] = Field(None, max_length=20, description="Emergency contact phone")
    notes: Optional[str] = Field(None, description="Additional notes")


class DSRCreate(DSRBase):
    """DSR creation schema."""

    pass


class DSRUpdate(BaseModel):
    """DSR update schema."""

    first_name: Optional[str] = Field(None, min_length=1, max_length=100)
    last_name: Optional[str] = Field(None, min_length=1, max_length=100)
    email: Optional[EmailStr] = None
    phone: Optional[str] = Field(None, min_length=1, max_length=20)
    date_of_birth: Optional[date] = None
    gender: Optional[str] = Field(None, max_length=20)
    address: Optional[str] = None
    national_id: Optional[str] = Field(None, max_length=50)
    education_level: Optional[EducationLevel] = None
    education_institution: Optional[str] = Field(None, max_length=255)
    education_year: Optional[int] = Field(None, ge=1900, le=2100)
    employment_date: Optional[date] = None
    employment_status: Optional[EmploymentStatus] = None
    emergency_contact_name: Optional[str] = Field(None, max_length=255)
    emergency_contact_phone: Optional[str] = Field(None, max_length=20)
    notes: Optional[str] = None


class DSRRead(DSRBase, TimestampSchema):
    """DSR read schema."""

    id: int = Field(..., description="DSR ID")
    full_name: str = Field(..., description="Full name")

    model_config = {"from_attributes": True}


class DSRListItem(BaseModel):
    """DSR list item schema (simplified for lists)."""

    id: int
    account_number: str
    full_name: str
    email: Optional[EmailStr]
    phone: str
    employment_status: EmploymentStatus
    created_at: date

    model_config = {"from_attributes": True}
