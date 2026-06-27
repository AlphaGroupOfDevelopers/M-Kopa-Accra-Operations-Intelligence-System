"""Integration API endpoints for Google Forms/Sheets, QR codes, and bulk import."""

from typing import Optional

from fastapi import APIRouter, Depends, HTTPException, status, BackgroundTasks, UploadFile, File
from sqlalchemy.orm import Session

from app.api.deps import get_current_active_user, get_db
from app.core import settings
from app.models.shop import Shop
from app.models.user import User
from app.schemas.common import SuccessResponse
from app.services.integrations.google_sheets_service import google_sheets_service
from app.services.integrations.qr_code_service import qr_code_service
from app.services.integrations.sync_state_service import SyncStateService
from app.services.integrations.bulk_import_service import BulkImportService

router = APIRouter()


@router.get("/google-sheets/status", summary="Get Google Sheets integration status")
def get_google_sheets_status(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_active_user),
) -> dict:
    """
    Get Google Sheets integration configuration status.

    Returns:
        Integration status and configuration details
    """
    is_configured = google_sheets_service.is_configured()
    
    stats = {}
    if is_configured and settings.GOOGLE_SHEET_ID:
        stats = SyncStateService.get_sync_stats(db, settings.GOOGLE_SHEET_ID)

    return {
        "is_configured": is_configured,
        "sheet_id": settings.GOOGLE_SHEET_ID if is_configured else None,
        "sheet_name": settings.GOOGLE_SHEET_NAME if is_configured else None,
        "sync_interval_hours": settings.SYNC_INTERVAL_HOURS,
        "credentials_file": settings.GOOGLE_SHEETS_CREDENTIALS_FILE,
        "credentials_exist": google_sheets_service.credentials is not None,
        **stats
    }


@router.post("/google-sheets/sync", summary="Trigger Google Sheets sync manually")
def trigger_google_sheets_sync(
    background_tasks: BackgroundTasks,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_active_user),
) -> dict:
    """
    Manually trigger synchronization from Google Sheets.

    This endpoint processes new rows from the configured Google Sheet
    and imports them as sales records.

    Returns:
        Import results and statistics
    """
    if not google_sheets_service.is_configured():
        raise HTTPException(
            status_code=status.HTTP_503_SERVICE_UNAVAILABLE,
            detail="Google Sheets integration not configured"
        )

    if not settings.GOOGLE_SHEET_ID:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="GOOGLE_SHEET_ID not configured"
        )

    # Get last processed row
    last_row = SyncStateService.get_last_processed_row(db, settings.GOOGLE_SHEET_ID)

    # Import new records
    result = google_sheets_service.import_new_sales_records(db, last_row)

    # Update sync state if successful
    if result["success"] and result["last_row"] > last_row:
        SyncStateService.update_last_processed_row(
            db,
            settings.GOOGLE_SHEET_ID,
            result["last_row"]
        )

    return {
        "success": result["success"],
        "processed": result["processed"],
        "created": result["created"],
        "failed": result["failed"],
        "last_processed_row": result["last_row"],
        "errors": result.get("errors", []),
        "message": f"Processed {result['processed']} rows, "
                   f"created {result['created']} records, "
                   f"{result['failed']} failed"
    }


@router.post("/google-sheets/test-connection", summary="Test Google Sheets connection")
def test_google_sheets_connection(
    current_user: User = Depends(get_current_active_user),
) -> dict:
    """
    Test connection to Google Sheets API.

    Returns:
        Connection test results
    """
    if not google_sheets_service.is_configured():
        return {
            "success": False,
            "error": "Google Sheets integration not configured",
            "details": {
                "credentials_exist": google_sheets_service.credentials is not None,
                "sheet_id_configured": settings.GOOGLE_SHEET_ID is not None
            }
        }

    try:
        # Try to fetch just headers
        data = google_sheets_service.get_sheet_data(
            range_name=f"{settings.GOOGLE_SHEET_NAME}!A1:Z1"
        )

        return {
            "success": True,
            "message": "Successfully connected to Google Sheets",
            "headers": data[0] if data else [],
            "sheet_id": settings.GOOGLE_SHEET_ID,
            "sheet_name": settings.GOOGLE_SHEET_NAME
        }

    except Exception as e:
        return {
            "success": False,
            "error": str(e)
        }


@router.post(
    "/qr-codes/generate/{shop_id}",
    summary="Generate QR code for a shop"
)
def generate_shop_qr_code(
    shop_id: int,
    form_url: str,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_active_user),
) -> dict:
    """
    Generate QR code for a specific shop.

    Args:
        shop_id: Shop ID
        form_url: Base Google Form URL

    Returns:
        QR code file path and details
    """
    # Get shop
    shop = db.query(Shop).filter(Shop.id == shop_id).first()
    if not shop:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Shop with ID {shop_id} not found"
        )

    # Generate QR code
    filepath = qr_code_service.generate_shop_qr_code(shop, form_url)

    if not filepath:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Failed to generate QR code"
        )

    return {
        "success": True,
        "shop_id": shop.id,
        "shop_code": shop.code,
        "shop_name": shop.name,
        "qr_code_path": filepath,
        "message": f"QR code generated for {shop.name}"
    }


@router.post(
    "/qr-codes/generate-all",
    summary="Generate QR codes for all active shops"
)
def generate_all_qr_codes(
    form_url: str,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_active_user),
) -> dict:
    """
    Generate QR codes for all active shops.

    Args:
        form_url: Base Google Form URL

    Returns:
        Generation statistics and file paths
    """
    # Get all active shops
    shops = db.query(Shop).filter(Shop.is_active == True).all()

    if not shops:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="No active shops found"
        )

    # Generate QR codes
    result = qr_code_service.generate_qr_codes_for_all_shops(shops, form_url)

    return {
        **result,
        "message": f"Generated {result['success']} QR codes out of {result['total']} shops"
    }


@router.get(
    "/qr-codes/shop/{shop_id}",
    summary="Get QR code for a shop"
)
def get_shop_qr_code(
    shop_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_active_user),
) -> dict:
    """
    Get existing QR code path for a shop.

    Args:
        shop_id: Shop ID

    Returns:
        QR code file path if exists
    """
    # Get shop
    shop = db.query(Shop).filter(Shop.id == shop_id).first()
    if not shop:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Shop with ID {shop_id} not found"
        )

    # Get QR code path
    filepath = qr_code_service.get_qr_code_path(shop)

    if not filepath:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"QR code not found for shop {shop.code}"
        )

    return {
        "success": True,
        "shop_id": shop.id,
        "shop_code": shop.code,
        "shop_name": shop.name,
        "qr_code_path": filepath
    }


@router.post(
    "/bulk-import/excel",
    summary="Bulk import data from Excel file"
)
async def bulk_import_from_excel(
    file: UploadFile = File(..., description="Excel file with DSR and shop data"),
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_active_user),
) -> dict:
    """
    Bulk import DSRs, shops, and assignments from Excel file.
    
    Expected Excel columns:
    - Full Name (required)
    - Account Number (required)
    - Shop Name (required)
    - Team Name (optional)
    - Role (Main DSR / Supporting DSR)
    - Years Worked (required for employment date calculation)
    - Education Level (e.g., "Bachelor's Degree", "High School")
    - Secondary Number (optional)
    - Email (optional)
    - Education Institution (optional)
    - Education Year (optional)
    - Gender (optional)
    - Date of Birth (optional)
    - Address (optional)
    - Emergency Contact Name (optional)
    - Emergency Contact Phone (optional)
    
    Business Rules Applied:
    1. Shop name standardization to [Outlet] [Name] format
    2. Shop deduplication (multiple DSRs can work at same shop)
    3. Employment date calculated from years worked
    4. Education level mapped to enum
    
    Returns:
        Import statistics
    """
    # Validate file type
    if not file.filename.endswith(('.xlsx', '.xls')):
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="File must be an Excel file (.xlsx or .xls)"
        )
    
    # Save uploaded file temporarily
    import tempfile
    import os
    
    try:
        # Create temp file
        with tempfile.NamedTemporaryFile(delete=False, suffix='.xlsx') as temp_file:
            # Write uploaded content
            content = await file.read()
            temp_file.write(content)
            temp_file_path = temp_file.name
        
        # Process import
        result = BulkImportService.import_from_excel(temp_file_path, db)
        
        # Clean up temp file
        os.unlink(temp_file_path)
        
        if not result["success"]:
            raise HTTPException(
                status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                detail=f"Import failed: {result.get('error')}"
            )
        
        return {
            **result,
            "message": (
                f"Successfully imported {result['agents_created']} DSRs, "
                f"{result['shops_created']} shops, and "
                f"{result['assignments_created']} assignments"
            )
        }
    
    except Exception as e:
        # Clean up temp file if it exists
        if 'temp_file_path' in locals() and os.path.exists(temp_file_path):
            os.unlink(temp_file_path)
        
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Import failed: {str(e)}"
        )
