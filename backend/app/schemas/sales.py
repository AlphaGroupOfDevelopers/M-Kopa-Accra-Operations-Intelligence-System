"""Sales record schemas."""

from datetime import date
from typing import Optional

from pydantic import BaseModel, Field

from app.models.sales_record import DataSource
from app.schemas.common import TimestampSchema


class SalesRecordBase(BaseModel):
    """Base sales record schema."""

    agent_id: int = Field(..., gt=0, description="Agent ID")
    shop_id: int = Field(..., gt=0, description="Shop ID")
    sale_date: date = Field(..., description="Sale date")
    devices_sold: int = Field(..., ge=0, description="Number of devices sold")
    remarks: Optional[str] = Field(None, description="Agent remarks/challenges")
    data_source: DataSource = Field(DataSource.MANUAL_ENTRY, description="Data source")
    external_id: Optional[str] = Field(None, max_length=255, description="External system ID")


class SalesRecordCreate(SalesRecordBase):
    """Sales record creation schema."""

    pass


class SalesRecordUpdate(BaseModel):
    """Sales record update schema."""

    devices_sold: Optional[int] = Field(None, ge=0)
    remarks: Optional[str] = None
    verified: Optional[bool] = None


class SalesRecordRead(SalesRecordBase, TimestampSchema):
    """Sales record read schema."""

    id: int = Field(..., description="Sales record ID")
    verified: bool = Field(..., description="Verification status")
    verified_by: Optional[int] = Field(None, description="Verified by user ID")

    model_config = {"from_attributes": True}


class SalesRecordListItem(BaseModel):
    """Sales record list item (simplified)."""

    id: int
    agent_id: int
    shop_id: int
    sale_date: date
    devices_sold: int
    data_source: DataSource
    verified: bool

    model_config = {"from_attributes": True}


class BulkSalesImport(BaseModel):
    """Bulk sales import schema."""

    records: list[SalesRecordCreate] = Field(..., min_length=1, description="List of sales records to import")
