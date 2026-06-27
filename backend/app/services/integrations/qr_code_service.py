"""QR Code generation service for shops."""

import os
from typing import Optional
from pathlib import Path

import qrcode
from qrcode.image.styledpil import StyledPilImage
from qrcode.image.styles.moduledrawers import RoundedModuleDrawer
from PIL import Image, ImageDraw, ImageFont
from loguru import logger

from app.core import settings
from app.models.shop import Shop


class QRCodeService:
    """Service for generating QR codes for shops."""

    def __init__(self):
        """Initialize QR code service."""
        self.storage_path = Path(settings.QR_CODES_STORAGE_PATH)
        self._ensure_storage_directory()

    def _ensure_storage_directory(self) -> None:
        """Ensure QR codes storage directory exists."""
        try:
            self.storage_path.mkdir(parents=True, exist_ok=True)
            logger.info(f"QR codes storage directory ready: {self.storage_path}")
        except Exception as e:
            logger.error(f"Failed to create QR codes directory: {e}")

    def generate_shop_qr_code(
        self,
        shop: Shop,
        form_url: str,
        size: int = 10,
        border: int = 2,
        add_label: bool = True
    ) -> Optional[str]:
        """
        Generate QR code for a shop that links to pre-filled Google Form.

        Args:
            shop: Shop object
            form_url: Base Google Form URL
            size: QR code size (1-40, larger = more data capacity)
            border: Border size in modules
            add_label: Whether to add shop name label below QR code

        Returns:
            Path to generated QR code image file, or None if failed
        """
        try:
            # Build pre-filled form URL
            prefilled_url = self._build_prefilled_form_url(form_url, shop)

            # Create QR code
            qr = qrcode.QRCode(
                version=size,
                error_correction=qrcode.constants.ERROR_CORRECT_H,
                box_size=10,
                border=border,
            )
            
            qr.add_data(prefilled_url)
            qr.make(fit=True)

            # Generate image with rounded style
            img = qr.make_image(
                image_factory=StyledPilImage,
                module_drawer=RoundedModuleDrawer(),
                fill_color="black",
                back_color="white"
            )

            # Add label if requested
            if add_label:
                img = self._add_label_to_qr(img, shop)

            # Save to file
            filename = f"shop_{shop.id}_{shop.code}.png"
            filepath = self.storage_path / filename

            img.save(str(filepath))
            logger.info(f"Generated QR code for shop {shop.code}: {filepath}")

            return str(filepath)

        except Exception as e:
            logger.error(f"Error generating QR code for shop {shop.id}: {e}")
            return None

    def _build_prefilled_form_url(self, base_url: str, shop: Shop) -> str:
        """
        Build Google Form URL with pre-filled shop ID.

        QR Code Method: Each shop gets a QR code that pre-fills the Shop ID
        in a hidden field. This eliminates manual shop selection and ensures
        accurate shop attribution for floating DSRs.

        Google Forms uses entry IDs for pre-filling:
        https://docs.google.com/forms/d/e/FORM_ID/viewform?entry.123456=value

        **IMPORTANT:** You must replace the entry IDs below with actual ones from your form!
        
        To get entry IDs:
        1. Open your Google Form in edit mode
        2. Right-click on the "Shop ID" field → Inspect
        3. Find the input element with name="entry.XXXXXXXXX"
        4. Copy the number after "entry."

        Args:
            base_url: Base form URL
            shop: Shop object

        Returns:
            Pre-filled form URL with Shop ID
        """
        # Clean base URL (remove trailing params if any)
        if '?' in base_url:
            base_url = base_url.split('?')[0]

        # Add viewform if not present
        if '/viewform' not in base_url:
            base_url = base_url.rstrip('/') + '/viewform'

        # Pre-fill shop ID (CRITICAL: This ensures accurate shop attribution)
        # Replace 'SHOP_ID_ENTRY' with your actual entry ID from Google Form
        params = [
            f"entry.SHOP_ID_ENTRY={shop.id}",  # 🔴 REPLACE THIS ENTRY ID!
        ]
        
        # Optional: You can also pre-fill shop name for DSR reference (read-only)
        # params.append(f"entry.SHOP_NAME_ENTRY={shop.name.replace(' ', '+')}")

        prefilled_url = f"{base_url}?{'&'.join(params)}"
        
        logger.debug(f"Generated QR URL for shop {shop.code}: {prefilled_url}")
        
        return prefilled_url

    def _add_label_to_qr(self, qr_img: Image.Image, shop: Shop) -> Image.Image:
        """
        Add shop name label below QR code.

        Args:
            qr_img: QR code image
            shop: Shop object

        Returns:
            QR code image with label
        """
        try:
            # Create new image with extra space for label
            label_height = 80
            new_width = qr_img.width
            new_height = qr_img.height + label_height

            new_img = Image.new('RGB', (new_width, new_height), 'white')
            
            # Paste QR code at top
            new_img.paste(qr_img, (0, 0))

            # Draw label
            draw = ImageDraw.Draw(new_img)
            
            # Try to use a nice font, fallback to default
            try:
                font = ImageFont.truetype("arial.ttf", 24)
                small_font = ImageFont.truetype("arial.ttf", 16)
            except:
                font = ImageFont.load_default()
                small_font = ImageFont.load_default()

            # Shop name (centered)
            shop_name_text = shop.name
            name_bbox = draw.textbbox((0, 0), shop_name_text, font=font)
            name_width = name_bbox[2] - name_bbox[0]
            name_x = (new_width - name_width) // 2
            name_y = qr_img.height + 10

            draw.text((name_x, name_y), shop_name_text, fill='black', font=font)

            # Shop code (centered)
            shop_code_text = f"Code: {shop.code}"
            code_bbox = draw.textbbox((0, 0), shop_code_text, font=small_font)
            code_width = code_bbox[2] - code_bbox[0]
            code_x = (new_width - code_width) // 2
            code_y = name_y + 35

            draw.text((code_x, code_y), shop_code_text, fill='gray', font=small_font)

            return new_img

        except Exception as e:
            logger.warning(f"Failed to add label to QR code: {e}")
            return qr_img

    def generate_qr_codes_for_all_shops(
        self,
        shops: list[Shop],
        form_url: str
    ) -> dict[str, any]:
        """
        Generate QR codes for multiple shops.

        Args:
            shops: List of Shop objects
            form_url: Base Google Form URL

        Returns:
            Dictionary with generation statistics
        """
        success_count = 0
        failed_count = 0
        generated_files = []

        for shop in shops:
            filepath = self.generate_shop_qr_code(shop, form_url)
            
            if filepath:
                success_count += 1
                generated_files.append({
                    "shop_id": shop.id,
                    "shop_code": shop.code,
                    "shop_name": shop.name,
                    "file_path": filepath
                })
            else:
                failed_count += 1

        logger.info(
            f"QR code generation complete: {success_count} succeeded, "
            f"{failed_count} failed out of {len(shops)} shops"
        )

        return {
            "total": len(shops),
            "success": success_count,
            "failed": failed_count,
            "files": generated_files
        }

    def get_qr_code_path(self, shop: Shop) -> Optional[str]:
        """
        Get path to existing QR code for a shop.

        Args:
            shop: Shop object

        Returns:
            Path to QR code file if exists, None otherwise
        """
        filename = f"shop_{shop.id}_{shop.code}.png"
        filepath = self.storage_path / filename

        if filepath.exists():
            return str(filepath)
        
        return None


# Create singleton instance
qr_code_service = QRCodeService()
