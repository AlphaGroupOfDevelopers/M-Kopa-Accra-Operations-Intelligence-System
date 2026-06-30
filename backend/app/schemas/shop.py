"""Shop schemas."""

from typing import Optional

from pydantic import BaseModel, Field

from app.schemas.common import TimestampSchema


class ShopBase(BaseModel):
    """Base shop schema."""

    name: str = Field(..., min_length=1, max_length=255, description="Shop name")
    location: str = Field(..., min_length=1, max_length=500, description="Physical location")
    region: str = Field("Greater Accra", max_length=100, description="Region")
    district: Optional[str] = Field(None, max_length=100, description="District")
    description: Optional[str] = Field(None, description="Shop description")
    is_active: bool = Field(True, description="Active status")


class ShopCreate(ShopBase):
    """Shop creation schema."""

    pass


class ShopUpdate(BaseModel):
    """Shop update schema."""

    name: Optional[str] = Field(None, min_length=1, max_length=255)
    location: Optional[str] = Field(None, min_length=1, max_length=500)
    region: Optional[str] = Field(None, max_length=100)
    district: Optional[str] = Field(None, max_length=100)
    description: Optional[str] = None
    is_active: Optional[bool] = None


class ShopRead(ShopBase, TimestampSchema):
    """Shop read schema."""

    id: int = Field(..., description="Shop ID")

    model_config = {"from_attributes": True}


class ShopListItem(BaseModel):
    """Shop list item schema (simplified for lists)."""

    id: int
    name: str
    location: str
    region: str
    is_active: bool

    model_config = {"from_attributes": True}
