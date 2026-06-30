# Quick Start: Google Forms Integration

**Get your Google Forms integration running in 15 minutes!**

---

## ⚡ Quick Setup Checklist

- [ ] Google Form created
- [ ] Google Sheet linked to form
- [ ] Service account created
- [ ] JSON credentials downloaded
- [ ] Sheet shared with service account
- [ ] `.env` configured
- [ ] Dependencies installed
- [ ] QR codes generated
- [ ] Test sync successful

---

## 🚀 Fast Track Setup

### 1. Create Google Form (5 min)

1. Go to https://forms.google.com
2. Create form with these fields:
   - **Phone Number** (short answer, required)
   - **Shop Name** (short answer, optional)
   - **Shop ID** (short answer, hidden)
   - **Date** (date, default today)
   - **Devices Sold** (short answer, number)
   - **Remarks** (paragraph, optional)

3. Link to Sheets (Responses tab → green Sheets icon)
4. Copy **Spreadsheet ID** from URL

### 2. Set Up Google API (5 min)

1. Go to https://console.cloud.google.com
2. Create project: "M-Kopa AOIS"
3. Enable "Google Sheets API"
4. Create Service Account:
   - Name: `mkopa-sheets-reader`
   - Role: **Viewer**
5. Generate JSON key → Download
6. Save as: `backend/credentials/google-credentials.json`

### 3. Share Sheet with Service Account

1. Open your Google Sheet
2. Click **Share**
3. Add service account email (from JSON file: `client_email`)
4. Permission: **Viewer**
5. Share (uncheck "Notify people")

### 4. Configure Backend (2 min)

**Edit `backend/.env`:**

```env
GOOGLE_SHEETS_CREDENTIALS_FILE=./credentials/google-credentials.json
GOOGLE_SHEET_ID=1Abc123XYZ-Your-Spreadsheet-ID-Here
GOOGLE_SHEET_NAME=Form Responses 1
SYNC_INTERVAL_HOURS=4
```

### 5. Install & Test (3 min)

```bash
# Install dependencies
cd backend
pip install -r requirements.txt

# Create directories
mkdir -p credentials storage/qr_codes logs

# Place google-credentials.json in credentials/

# Test connection
python sync_google_sheets.py
```

**Expected output:**
```
✓ Sync completed successfully!
  - Processed: 0 rows
  - Created: 0 sales records
```

---

## 🎯 Generate QR Codes

### Start Backend
```bash
cd backend
python -m uvicorn app.main:app --reload
```

### Get Access Token

1. Login via API or use existing token
2. Or use Swagger UI: http://localhost:8000/docs

### Generate QR Codes

**Via curl:**
```bash
curl -X POST "http://localhost:8000/api/v1/integrations/qr-codes/generate-all?form_url=YOUR_GOOGLE_FORM_URL" \
  -H "Authorization: Bearer YOUR_TOKEN"
```

**Via Swagger UI:**
1. Go to http://localhost:8000/docs
2. Authorize with your token
3. Find `POST /integrations/qr-codes/generate-all`
4. Enter your Google Form URL
5. Execute

**QR codes saved to:** `backend/storage/qr_codes/`

---

## 🧪 Test End-to-End

### 1. Submit Test Form

- Scan QR code (or open form manually)
- Enter agent phone number (must exist in database)
- Fill devices sold
- Submit

### 2. Verify in Google Sheet

- Open your Google Sheet
- See the new row

### 3. Run Sync

```bash
cd backend
python sync_google_sheets.py
```

### 4. Check Dashboard

- Login to your dashboard
- See the new sales record

---

## 🔄 Automate Sync

### Option 1: Windows Task Scheduler (Easiest)

1. Create `backend/sync_task.bat`:
   ```batch
   @echo off
   cd C:\Dev\WORK\M-Kopa Accra Operations Intelligence System\backend
   python sync_google_sheets.py >> logs/sync.log 2>&1
   ```

2. Open **Task Scheduler**
3. **Create Basic Task**:
   - Name: "M-Kopa Sheets Sync"
   - Trigger: Daily, repeat every 4 hours
   - Action: Start program → Browse to `sync_task.bat`
   - Finish

### Option 2: Manual Sync via API

```bash
curl -X POST "http://localhost:8000/api/v1/integrations/google-sheets/sync" \
  -H "Authorization: Bearer YOUR_TOKEN"
```

Add this to your dashboard for one-click sync!

---

## 📊 Monitor Integration

### Check Status
```bash
curl "http://localhost:8000/api/v1/integrations/google-sheets/status" \
  -H "Authorization: Bearer YOUR_TOKEN"
```

### View Logs
```bash
# Windows
type backend\logs\app.log

# Or use a text editor
notepad backend\logs\app.log
```

---

## ❗ Common Issues

### "Google Sheets service not configured"
- ✓ Check `google-credentials.json` exists in `credentials/`
- ✓ Check `GOOGLE_SHEET_ID` in `.env`
- ✓ Restart backend after changes

### "Agent not found for phone number"
- ✓ Agent must exist in database first
- ✓ Phone number must match exactly
- ✓ Check phone format (with/without country code)

### "Permission denied" on Google Sheets
- ✓ Share sheet with service account email
- ✓ Use email from `client_email` in JSON file
- ✓ Grant "Viewer" permission

### QR codes not opening form
- ✓ Update entry IDs in `qr_code_service.py`
- ✓ Get entry IDs by inspecting form fields
- ✓ Test form URL in browser first

---

## 🎓 Next Steps

1. **Print QR codes** and distribute to shops
2. **Train agents** on scanning and submitting
3. **Set up automatic sync** (Task Scheduler or Celery)
4. **Monitor for first few days**
5. **Review failed imports** weekly

---

## 📚 Full Documentation

For detailed setup instructions, troubleshooting, and advanced features:
- See: `GOOGLE_FORMS_INTEGRATION_GUIDE.md`

---

## ✅ You're Done!

Your integration is ready. Agents can now:
1. 📱 Scan QR code at shop
2. 📝 Fill form (30 seconds)
3. ✅ Submit
4. ⏰ Data syncs automatically every 4 hours
5. 📊 Appears in dashboard

**No manual data entry needed!** 🎉
