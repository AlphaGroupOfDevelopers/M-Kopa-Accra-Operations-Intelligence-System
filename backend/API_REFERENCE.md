# M-Kopa AOIS - API Reference

## Base URL
```
http://localhost:8000
```

## API Documentation
- **Swagger UI**: http://localhost:8000/docs
- **ReDoc**: http://localhost:8000/redoc

## Authentication

All endpoints (except login) require JWT authentication.

### Login
```http
POST /api/v1/auth/login
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "password"
}

Response:
{
  "access_token": "eyJ...",
  "refresh_token": "eyJ...",
  "token_type": "bearer"
}
```

### Use Token
```http
GET /api/v1/agents
Authorization: Bearer eyJ...
```

## API Endpoints

### Authentication (`/api/v1/auth`)
- `POST /login` - User login
- `POST /login/form` - OAuth2 form login
- `POST /refresh` - Refresh access token
- `GET /me` - Get current user profile

### Team Members (`/api/v1/agents`)
- `POST /` - Create new agent
- `GET /` - List agents (paginated)
- `GET /search?q={term}` - Search agents
- `GET /{agent_id}` - Get agent by ID
- `GET /employee/{employee_id}` - Get agent by employee ID
- `PUT /{agent_id}` - Update agent
- `DELETE /{agent_id}` - Delete agent (soft delete)

### Shops (`/api/v1/shops`)
- `POST /` - Create new shop
- `GET /` - List shops (paginated)
- `GET /search?q={term}` - Search shops
- `GET /{shop_id}` - Get shop by ID
- `GET /code/{shop_code}` - Get shop by code
- `PUT /{shop_id}` - Update shop
- `DELETE /{shop_id}` - Delete shop (soft delete)

### Sales (`/api/v1/sales`)
- `POST /` - Create sales record
- `POST /bulk` - Bulk import sales records
- `GET /` - List sales records (paginated, filterable)
- `GET /daily-summary?target_date={date}` - Get daily summary
- `GET /{record_id}` - Get sales record by ID
- `PUT /{record_id}` - Update sales record
- `DELETE /{record_id}` - Delete sales record

## Query Parameters

### Pagination (All List Endpoints)
- `page` (default: 1) - Page number
- `page_size` (default: 50, max: 100) - Items per page

### Filters

**Agents**
- `employment_status` - Filter by status (active, inactive, on_leave, terminated)

**Shops**
- `region` - Filter by region
- `is_active` - Filter by active status (true/false)

**Sales**
- `agent_id` - Filter by agent ID
- `shop_id` - Filter by shop ID
- `start_date` - Filter from date (YYYY-MM-DD)
- `end_date` - Filter to date (YYYY-MM-DD)

## Response Formats

### Paginated Response
```json
{
  "items": [...],
  "total": 100,
  "page": 1,
  "page_size": 50,
  "total_pages": 2
}
```

### Success Response
```json
{
  "success": true,
  "message": "Operation successful",
  "data": {...}
}
```

### Error Response
```json
{
  "detail": "Error message"
}
```

## Status Codes

- `200` - Success
- `201` - Created
- `400` - Bad Request
- `401` - Unauthorized
- `403` - Forbidden
- `404` - Not Found
- `422` - Validation Error
- `500` - Internal Server Error

## Example Usage

### Create Agent
```bash
curl -X POST "http://localhost:8000/api/v1/agents" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "employee_id": "EMP001",
    "first_name": "John",
    "last_name": "Doe",
    "email": "john.doe@example.com",
    "phone": "+233501234567",
    "employment_status": "active"
  }'
```

### Create Shop
```bash
curl -X POST "http://localhost:8000/api/v1/shops" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "code": "MTN-ACC-01",
    "name": "MTN Accra Central",
    "location": "High Street, Accra",
    "region": "Greater Accra",
    "is_active": true
  }'
```

### Create Sales Record
```bash
curl -X POST "http://localhost:8000/api/v1/sales" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "agent_id": 1,
    "shop_id": 1,
    "sale_date": "2024-06-19",
    "devices_sold": 5,
    "remarks": "Good day, no issues",
    "data_source": "manual_entry"
  }'
```

### Bulk Import Sales
```bash
curl -X POST "http://localhost:8000/api/v1/sales/bulk" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "records": [
      {
        "agent_id": 1,
        "shop_id": 1,
        "sale_date": "2024-06-19",
        "devices_sold": 5,
        "data_source": "google_forms"
      },
      {
        "agent_id": 2,
        "shop_id": 1,
        "sale_date": "2024-06-19",
        "devices_sold": 3,
        "data_source": "google_forms"
      }
    ]
  }'
```

### List Agents with Filters
```bash
curl "http://localhost:8000/api/v1/agents?page=1&page_size=20&employment_status=active" \
  -H "Authorization: Bearer YOUR_TOKEN"
```

### Get Daily Sales Summary
```bash
curl "http://localhost:8000/api/v1/sales/daily-summary?target_date=2024-06-19" \
  -H "Authorization: Bearer YOUR_TOKEN"
```

## Architecture Alignment

### ✅ Implemented (from Architecture Document)

**API Layer**
- ✅ Auth Service (JWT)
- ✅ Team Member API
- ✅ Shop API
- ✅ Sales API

**Business Logic Layer**
- ✅ Team Service
- ✅ Shop Service
- ✅ Sales Service

**Data Layer**
- ✅ PostgreSQL Database
- ✅ Redis Cache (configured)
- ✅ File Storage (configured)

### 🚧 To Be Implemented

**API Layer**
- ⏳ Reports API

**Business Logic Layer**
- ⏳ Performance Engine
- ⏳ Analytics Engine
- ⏳ Forecaster Service

**Integration Layer**
- ⏳ Google Forms Connector
- ⏳ Microsoft Forms Connector
- ⏳ Report Generator (PDF/Excel)
