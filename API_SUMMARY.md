# M-Kopa AOIS API Summary

## Total API Endpoints: 35

### Live API Documentation
- **Swagger UI**: https://unlucky-creamlike-worry.ngrok-free.dev/docs
- **ReDoc**: https://unlucky-creamlike-worry.ngrok-free.dev/redoc

---

## 1. Authentication Endpoints (4)

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/v1/auth/login` | User login (JSON) |
| POST | `/api/v1/auth/login/form` | Form-based login (OAuth2) |
| POST | `/api/v1/auth/refresh` | Refresh access token |
| GET | `/api/v1/auth/me` | Get current user profile |

---

## 2. Team Members (Agents/DSRs) Endpoints (7)

| Method | Endpoint | Description | Lookup Method |
|--------|----------|-------------|---------------|
| POST | `/api/v1/agents` | Create new agent | - |
| GET | `/api/v1/agents` | List agents (paginated) | - |
| GET | `/api/v1/agents/search?q={term}` | Search agents | By name/account/email |
| GET | `/api/v1/agents/{agent_id}` | Get agent by ID | By integer ID |
| GET | `/api/v1/agents/account/{account_number}` | **Get agent by account number** | ✅ **By account number** |
| PUT | `/api/v1/agents/{agent_id}` | Update agent | - |
| DELETE | `/api/v1/agents/{agent_id}` | Delete agent (soft delete) | - |

**Key Point**: Use `/agents/account/{account_number}` for business lookups (e.g., `0244123456`)

---

## 3. Shops (MTN Offices) Endpoints (7)

| Method | Endpoint | Description | Lookup Method |
|--------|----------|-------------|---------------|
| POST | `/api/v1/shops` | Create new shop | - |
| GET | `/api/v1/shops` | List shops (paginated) | - |
| GET | `/api/v1/shops/search?q={term}` | Search shops | By name/code/location |
| GET | `/api/v1/shops/{shop_id}` | Get shop by ID | By integer ID |
| GET | `/api/v1/shops/code/{shop_code}` | **Get shop by code** | ✅ **By shop code** |
| PUT | `/api/v1/shops/{shop_id}` | Update shop | - |
| DELETE | `/api/v1/shops/{shop_id}` | Delete shop (soft delete) | - |

**Key Point**: Use `/shops/code/{shop_code}` for business lookups (e.g., `MTN-MAD-001`)

---

## 4. Sales Records Endpoints (8)

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/v1/sales` | Create sales record |
| POST | `/api/v1/sales/bulk` | Bulk import sales records |
| GET | `/api/v1/sales` | List sales records (paginated, filtered) |
| GET | `/api/v1/sales/daily-summary?target_date={date}` | Get daily sales summary |
| GET | `/api/v1/sales/{record_id}` | Get sales record by ID |
| PUT | `/api/v1/sales/{record_id}` | Update sales record |
| DELETE | `/api/v1/sales/{record_id}` | Delete sales record |

**Filters Available**:
- `agent_id`: Filter by agent
- `shop_id`: Filter by shop
- `start_date`: From date
- `end_date`: To date

---

## 5. Integrations Endpoints (9)

### Google Sheets Integration (3)
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/v1/integrations/google-sheets/status` | Get integration status |
| POST | `/api/v1/integrations/google-sheets/sync` | Manually trigger sync |
| POST | `/api/v1/integrations/google-sheets/test-connection` | Test connection |

### QR Code Generation (3)
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/v1/integrations/qr-codes/generate/{shop_id}` | Generate QR for one shop |
| POST | `/api/v1/integrations/qr-codes/generate-all` | Generate QR for all shops |
| GET | `/api/v1/integrations/qr-codes/shop/{shop_id}` | Get existing QR code path |

### Bulk Import (1)
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/v1/integrations/bulk-import/excel` | Import DSRs/Shops from Excel |

**File Upload**: Accepts `.xlsx` or `.xls` files with DSR and shop data

---

## Business Logic Implementation

### 1. Agent Identification
```
✅ Primary Lookup: account_number (e.g., "0244123456")
📌 Endpoint: GET /api/v1/agents/account/{account_number}
🔒 Unique constraint on account_number
📇 Integer ID only used internally for relationships
```

### 2. Shop Identification
```
✅ Primary Lookup: shop code (e.g., "MTN-MAD-001")
📌 Endpoint: GET /api/v1/shops/code/{shop_code}
🔒 Unique constraint on code
📇 Integer ID only used internally for relationships
```

### 3. QR Code Pre-fill Logic
```
QR Code URL: https://forms.google.com/sales?shop_id=12
                                                    ↑
                                        Integer ID (internal use)
                                        
DSR sees on form: "MTN Madina" (shop name)
Backend uses: shop_id=12 for fast lookup
```

### 4. Sales Submission Flow
```
1. DSR scans QR code → Google Form opens with shop_id pre-filled
2. DSR enters account_number (e.g., "0244123456")
3. DSR enters devices_sold (e.g., 5)
4. Form submits to Google Sheets
5. Backend sync runs:
   - Looks up agent by account_number
   - Creates sales record with agent_id (internal) + shop_id (internal)
6. Manager sees report:
   - Account: 0244123456
   - Name: John Mensah
   - Shop: MTN Madina
   - Sales: 5 devices
```

---

## Key Business Rules Implemented

### 6 AM Business Day Cutoff
```python
# Submissions between 12:00 AM - 5:59 AM credited to previous day
if submission_time.hour < 6:
    sale_date = submission_date - timedelta(days=1)
```

### Duplicate Handling
```python
# Same account_number + same sale_date = UPDATE (take latest)
# NOT sum, NOT duplicate record
```

### Shop Name Standardization
```python
# Input: "mtn madina office"
# Output: "MTN Madina"
# Format: [Outlet] [Location]
```

### Employment Date Calculation
```python
# Form captures: "Years Worked" = 2.5
# Backend calculates: employment_date = today - (2.5 × 365 days)
```

### Zero Sales Acceptance
```python
# devices_sold = 0 is VALID and stored
# DSRs must report even on zero-sale days
```

---

## Response Formats

### Paginated Response
```json
{
  "items": [...],
  "total": 150,
  "page": 1,
  "page_size": 50,
  "total_pages": 3
}
```

### Agent Response
```json
{
  "id": 42,
  "account_number": "0244123456",
  "full_name": "John Mensah",
  "email": "john@mkopa.com",
  "secondary_number": "0201234567",
  "employment_status": "active",
  "employment_date": "2022-06-15",
  "education_level": "bachelor",
  "created_at": "2024-01-15T10:30:00Z",
  "updated_at": "2024-01-15T10:30:00Z"
}
```

### Shop Response
```json
{
  "id": 12,
  "code": "MTN-MAD-001",
  "name": "MTN Madina",
  "location": "Madina, Greater Accra",
  "region": "Greater Accra",
  "district": "La Nkwantanang Madina",
  "is_active": true,
  "created_at": "2024-01-15T10:30:00Z",
  "updated_at": "2024-01-15T10:30:00Z"
}
```

### Sales Record Response
```json
{
  "id": 1523,
  "agent_id": 42,
  "shop_id": 12,
  "devices_sold": 5,
  "sale_date": "2024-06-25",
  "submission_timestamp": "2024-06-25T18:45:00Z",
  "notes": null,
  "created_at": "2024-06-25T18:45:05Z",
  "updated_at": "2024-06-25T18:45:05Z"
}
```

---

## Authentication

All endpoints (except `/auth/login` and `/auth/login/form`) require JWT authentication:

```bash
# Login
curl -X POST "https://unlucky-creamlike-worry.ngrok-free.dev/api/v1/auth/login" \
  -H "Content-Type: application/json" \
  -d '{"email": "user@example.com", "password": "password"}'

# Response
{
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "refresh_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "token_type": "bearer"
}

# Use token in subsequent requests
curl -X GET "https://unlucky-creamlike-worry.ngrok-free.dev/api/v1/agents" \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
```

---

## Example API Calls

### 1. Search Agent by Account Number
```bash
GET /api/v1/agents/account/0244123456
```

### 2. Search Shop by Code
```bash
GET /api/v1/shops/code/MTN-MAD-001
```

### 3. List Today's Sales
```bash
GET /api/v1/sales?start_date=2024-06-25&end_date=2024-06-25&page=1&page_size=50
```

### 4. Get Daily Summary
```bash
GET /api/v1/sales/daily-summary?target_date=2024-06-25
```

### 5. Trigger Google Sheets Sync
```bash
POST /api/v1/integrations/google-sheets/sync
```

### 6. Generate QR Codes for All Shops
```bash
POST /api/v1/integrations/qr-codes/generate-all
Body: {"form_url": "https://forms.google.com/d/e/YOUR_FORM_ID/viewform"}
```

### 7. Bulk Import from Excel
```bash
POST /api/v1/integrations/bulk-import/excel
Content-Type: multipart/form-data
Body: file=@dsrs_and_shops.xlsx
```

---

## System Status

### ✅ Fully Operational
- 35 API endpoints deployed
- Database connected (Prisma PostgreSQL)
- Authentication system active
- Public access via ngrok tunnel
- Schema migrations completed
- Business rules implemented

### ⏳ Requires Configuration
- Google Sheets credentials file (`credentials.json`)
- Google Form entry IDs for QR codes
- pandas installation for Excel import
- Scheduled sync task (cron job)

### 📊 Data Status
- Zero test data currently
- Ready for Excel bulk import
- Ready for Google Sheets sync
- QR code generation ready

---

## Technical Stack

- **Framework**: FastAPI
- **Database**: PostgreSQL (Prisma Cloud)
- **ORM**: SQLAlchemy 2.0
- **Migration**: Alembic
- **Authentication**: JWT (PyJWT)
- **Security**: bcrypt password hashing
- **Validation**: Pydantic v2
- **Documentation**: OpenAPI/Swagger
- **Integrations**: Google Sheets API, QR Code generation

---

## Next Steps

1. **Configure Google Integration**
   - Add `credentials.json` to `backend/`
   - Update Google Form entry IDs in QR service
   - Test sync connection

2. **Import Initial Data**
   - Use bulk Excel import endpoint
   - Or manually create via API
   - Generate QR codes for all shops

3. **Set Up Scheduled Sync**
   - Create cron job to hit `/integrations/google-sheets/sync`
   - Run every 2-4 hours as specified

4. **Frontend Integration**
   - Connect React frontend to these endpoints
   - Use account_number for agent lookups
   - Use shop_code for shop lookups
   - Display business keys, not IDs

---

## Support

For API testing and exploration:
- Swagger UI: https://unlucky-creamlike-worry.ngrok-free.dev/docs
- ReDoc: https://unlucky-creamlike-worry.ngrok-free.dev/redoc

For technical questions about IDs vs business keys:
- See `TECHNICAL_EXPLANATION.md`
