# Google Forms + QR Codes Integration Guide

Complete guide for setting up Google Forms integration with automatic sync to your M-Kopa AOIS system.

---

## 📋 Overview

This integration allows agents to:
1. Scan QR code at their shop
2. Fill Google Form on their phone
3. Data automatically syncs to your system every few hours

---

## 🛠️ Setup Steps

### Step 1: Create Google Form

1. **Go to [Google Forms](https://forms.google.com)**

2. **Create New Form**: "M-Kopa Daily Sales Report"

3. **Add Form Fields:**

   | Field Name | Type | Required | Settings |
   |------------|------|----------|----------|
   | Phone Number / Account Number | Short answer | Yes | Validation: Number |
   | Shop Name | Short answer | No | Pre-filled via QR code |
   | Shop ID | Short answer | No | Pre-filled via QR code, Hidden |
   | Date | Date | Yes | Default: Today |
   | Devices Sold | Short answer | Yes | Validation: Number |
   | Remarks / Challenges | Paragraph | No | Optional notes |

4. **Link to Google Sheets:**
   - Click "Responses" tab
   - Click green Sheets icon
   - Create new spreadsheet: "M-Kopa Sales Data"
   - **Save the Spreadsheet ID** (from URL: `docs.google.com/spreadsheets/d/SPREADSHEET_ID/edit`)

5. **Get Form Entry IDs** (for QR code pre-filling):
   - Open form in edit mode
   - Right-click on "Shop Name" field → Inspect
   - Find `entry.XXXXXXXXX` (numbers after "entry.")
   - Repeat for "Shop ID" and "Shop Code" fields
   - Note these down!

---

### Step 2: Set Up Google Cloud Project

1. **Go to [Google Cloud Console](https://console.cloud.google.com)**

2. **Create New Project:**
   - Name: "M-Kopa AOIS Integration"
   - Click "Create"

3. **Enable Google Sheets API:**
   - Go to "APIs & Services" → "Library"
   - Search "Google Sheets API"
   - Click "Enable"

4. **Create Service Account:**
   - Go to "APIs & Services" → "Credentials"
   - Click "Create Credentials" → "Service Account"
   - Name: "mkopa-sheets-reader"
   - Click "Create and Continue"
   - Role: "Viewer" (read-only access)
   - Click "Done"

5. **Generate JSON Key:**
   - Click on the created service account
   - Go to "Keys" tab
   - Click "Add Key" → "Create new key"
   - Choose "JSON"
   - Download the JSON file
   - **Save it as:** `backend/credentials/google-credentials.json`

6. **Share Google Sheet with Service Account:**
   - Open your "M-Kopa Sales Data" spreadsheet
   - Click "Share" button
   - Add the service account email (looks like: `mkopa-sheets-reader@project-id.iam.gserviceaccount.com`)
   - Permission: "Viewer"
   - Uncheck "Notify people"
   - Click "Share"

---

### Step 3: Configure Backend

1. **Create credentials directory:**
   ```bash
   mkdir backend/credentials
   ```

2. **Place your `google-credentials.json` file in `backend/credentials/`**

3. **Update `.env` file:**
   ```env
   # Google Sheets Integration
   GOOGLE_SHEETS_CREDENTIALS_FILE=./credentials/google-credentials.json
   GOOGLE_SHEET_ID=YOUR_SPREADSHEET_ID_HERE
   GOOGLE_SHEET_NAME=Form Responses 1
   SYNC_INTERVAL_HOURS=4
   ```

4. **Install dependencies:**
   ```bash
   cd backend
   pip install -r requirements.txt
   ```

5. **Create storage directories:**
   ```bash
   mkdir -p storage/qr_codes
   mkdir -p storage/reports
   mkdir -p logs
   ```

---

### Step 4: Update QR Code Service

Edit `backend/app/services/integrations/qr_code_service.py`:

Find the `_build_prefilled_form_url` method and update entry IDs:

```python
def _build_prefilled_form_url(self, base_url: str, shop: Shop) -> str:
    # Replace these with YOUR actual entry IDs from Step 1.5
    params = [
        f"entry.123456789={shop.name.replace(' ', '+')}",  # Shop Name entry
        f"entry.987654321={shop.id}",                      # Shop ID entry
        f"entry.456789123={shop.code}",                    # Shop Code entry
    ]
    
    prefilled_url = f"{base_url}?{'&'.join(params)}"
    return prefilled_url
```

---

### Step 5: Generate QR Codes

1. **Start your backend:**
   ```bash
   cd backend
   python -m uvicorn app.main:app --reload
   ```

2. **Get your Google Form URL:**
   - Open your form
   - Click "Send"
   - Copy the link (looks like: `https://docs.google.com/forms/d/e/FORM_ID/viewform`)

3. **Generate QR codes via API:**

   **For all shops:**
   ```bash
   curl -X POST "http://localhost:8000/api/v1/integrations/qr-codes/generate-all?form_url=YOUR_FORM_URL" \
     -H "Authorization: Bearer YOUR_TOKEN"
   ```

   **For single shop:**
   ```bash
   curl -X POST "http://localhost:8000/api/v1/integrations/qr-codes/generate/1?form_url=YOUR_FORM_URL" \
     -H "Authorization: Bearer YOUR_TOKEN"
   ```

4. **QR codes will be saved to:** `backend/storage/qr_codes/`

5. **Print and distribute QR codes to shops**

---

### Step 6: Test Integration

1. **Test Google Sheets connection:**
   ```bash
   curl -X POST "http://localhost:8000/api/v1/integrations/google-sheets/test-connection" \
     -H "Authorization: Bearer YOUR_TOKEN"
   ```

2. **Submit a test form:**
   - Scan a QR code (or open form manually)
   - Fill in phone number (use an existing agent's phone)
   - Submit

3. **Check Google Sheet:**
   - Open your spreadsheet
   - Verify the submission appears

4. **Manually trigger sync:**
   ```bash
   curl -X POST "http://localhost:8000/api/v1/integrations/google-sheets/sync" \
     -H "Authorization: Bearer YOUR_TOKEN"
   ```

5. **Check your database:**
   - The sales record should now be in your database
   - Check dashboard to see the data

---

## 🔄 Automatic Sync Setup

### Option 1: Using Celery (Recommended for Production)

1. **Install Redis (if not already):**
   ```bash
   # Windows: Download from https://github.com/microsoftarchive/redis/releases
   # Or use Docker
   docker run -d -p 6379:6379 redis:latest
   ```

2. **Create Celery task file:**

   `backend/app/tasks/sync_tasks.py`:
   ```python
   from celery import Celery
   from app.core import settings
   from app.db.session import SessionLocal
   from app.services.integrations.google_sheets_service import google_sheets_service
   from app.services.integrations.sync_state_service import SyncStateService

   celery_app = Celery('mkopa_aois', broker=str(settings.REDIS_URL))

   @celery_app.task
   def sync_google_sheets():
       """Periodic task to sync Google Sheets data."""
       db = SessionLocal()
       try:
           if not settings.GOOGLE_SHEET_ID:
               return {"error": "GOOGLE_SHEET_ID not configured"}

           last_row = SyncStateService.get_last_processed_row(db, settings.GOOGLE_SHEET_ID)
           result = google_sheets_service.import_new_sales_records(db, last_row)

           if result["success"] and result["last_row"] > last_row:
               SyncStateService.update_last_processed_row(db, settings.GOOGLE_SHEET_ID, result["last_row"])

           return result
       finally:
           db.close()

   # Schedule: Run every 4 hours
   celery_app.conf.beat_schedule = {
       'sync-google-sheets': {
           'task': 'app.tasks.sync_tasks.sync_google_sheets',
           'schedule': settings.SYNC_INTERVAL_HOURS * 3600.0,  # Convert hours to seconds
       },
   }
   ```

3. **Start Celery worker:**
   ```bash
   celery -A app.tasks.sync_tasks worker --loglevel=info
   ```

4. **Start Celery beat (scheduler):**
   ```bash
   celery -A app.tasks.sync_tasks beat --loglevel=info
   ```

### Option 2: Using Windows Task Scheduler (Simple)

1. **Create sync script:**

   `backend/sync_google_sheets.py`:
   ```python
   import sys
   from app.db.session import SessionLocal
   from app.core import settings
   from app.services.integrations.google_sheets_service import google_sheets_service
   from app.services.integrations.sync_state_service import SyncStateService

   def main():
       db = SessionLocal()
       try:
           if not settings.GOOGLE_SHEET_ID:
               print("Error: GOOGLE_SHEET_ID not configured")
               sys.exit(1)

           print("Starting Google Sheets sync...")
           last_row = SyncStateService.get_last_processed_row(db, settings.GOOGLE_SHEET_ID)
           result = google_sheets_service.import_new_sales_records(db, last_row)

           if result["success"] and result["last_row"] > last_row:
               SyncStateService.update_last_processed_row(db, settings.GOOGLE_SHEET_ID, result["last_row"])

           print(f"Sync complete: {result['created']} created, {result['failed']} failed")
       except Exception as e:
           print(f"Error: {e}")
           sys.exit(1)
       finally:
           db.close()

   if __name__ == "__main__":
       main()
   ```

2. **Create batch file:**

   `backend/sync_task.bat`:
   ```batch
   @echo off
   cd C:\Dev\WORK\M-Kopa Accra Operations Intelligence System\backend
   python sync_google_sheets.py
   ```

3. **Set up Windows Task Scheduler:**
   - Open Task Scheduler
   - Create Basic Task: "M-Kopa Sheets Sync"
   - Trigger: Daily, every 4 hours
   - Action: Start program → `sync_task.bat`
   - Finish

---

## 📊 API Endpoints

### Check Integration Status
```http
GET /api/v1/integrations/google-sheets/status
```

### Manual Sync
```http
POST /api/v1/integrations/google-sheets/sync
```

### Test Connection
```http
POST /api/v1/integrations/google-sheets/test-connection
```

### Generate QR Code for Shop
```http
POST /api/v1/integrations/qr-codes/generate/{shop_id}?form_url=FORM_URL
```

### Generate All QR Codes
```http
POST /api/v1/integrations/qr-codes/generate-all?form_url=FORM_URL
```

---

## 🔧 Troubleshooting

### Issue: "Google Sheets service not configured"
**Solution:** Check that:
- `google-credentials.json` exists in `backend/credentials/`
- `GOOGLE_SHEET_ID` is set in `.env`
- Service account has access to the sheet

### Issue: "Agent not found for phone number"
**Solution:** 
- Ensure agent exists in database with correct phone number
- Phone number format must match exactly (including country code if used)

### Issue: "Shop not found"
**Solution:**
- Verify shop exists in database
- Check QR code entry IDs match your form
- Test with manual shop ID entry

### Issue: Duplicate records
**Solution:**
- System automatically prevents duplicates using `external_id` (form timestamp)
- Check logs for duplicate warnings

---

## 📝 Form Field Mapping

| Google Form Field | Database Field | Notes |
|-------------------|----------------|-------|
| Phone Number | `agent.phone` | Must match exactly |
| Shop Name | `shop.name` | Partial match supported |
| Shop ID | `shop.id` | Pre-filled from QR |
| Date | `sale_date` | Auto-filled to today |
| Devices Sold | `devices_sold` | Integer, default 0 |
| Remarks | `remarks` | Optional text |
| Timestamp | `external_id` | Auto from Google Forms |

---

## 🎯 Best Practices

1. **Test with one shop first** before rolling out to all
2. **Monitor sync logs** for the first few days
3. **Set up email notifications** for failed syncs
4. **Backup Google Sheet** regularly
5. **Keep service account credentials secure**
6. **Sync every 4 hours** (balance between real-time and API quotas)
7. **Review failed imports** weekly to catch data issues

---

## 📞 Support

For issues or questions:
1. Check logs in `backend/logs/app.log`
2. Review sync statistics via API
3. Test connection endpoint first
4. Verify Google Sheet permissions

---

**You're all set! 🚀**

Agents can now scan QR codes, submit forms, and data will automatically appear in your dashboard.
