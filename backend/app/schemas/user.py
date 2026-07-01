"""User schemas."""

from pydantic import BaseModel, EmailStr, Field

from app.schemas.common import TimestampSchema


class UserBase(BaseModel):
    """Base user schema."""

    email: EmailStr = Field(..., description="User email address")
    full_name: str = Field(..., min_length=1, max_length=255, description="Full name")


class UserCreate(UserBase):
    """User creation schema."""

    password: str = Field(..., min_length=5, description="User password")
    is_superuser: bool = Field(False, description="Superuser status")


class UserUpdate(BaseModel):
    """User update schema."""

    email: EmailStr | None = Field(None, description="User email address")
    full_name: str | None = Field(None, min_length=1, max_length=255, description="Full name")
    password: str | None = Field(None, min_length=5, description="New password")
    is_active: bool | None = Field(None, description="Active status")


class UserRead(UserBase, TimestampSchema):
    """User read schema."""

    id: int = Field(..., description="User ID")
    is_active: bool = Field(..., description="Active status")
    is_superuser: bool = Field(..., description="Superuser status")

    model_config = {"from_attributes": True}


class UserProfile(UserRead):
    """Current user profile schema."""

    pass
