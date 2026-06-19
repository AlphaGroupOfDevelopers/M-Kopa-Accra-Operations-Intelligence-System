# M-Kopa AOIS - Backend API

Production-ready backend for M-Kopa Accra Operations Intelligence System.

## Quick Start

### Prerequisites
- Python 3.11+
- PostgreSQL 14+
- Redis 7+

### Setup

1. **Clone and navigate**
```bash
cd backend
```

2. **Create virtual environment**
```bash
python -m venv venv
venv\Scripts\activate  # Windows
```

3. **Install dependencies**
```bash
pip install -r requirements.txt
```

4. **Configure environment**
```bash
copy .env.example .env
# Edit .env with your database credentials
```

5. **Initialize database**
```bash
alembic upgrade head
python -m app.db.init_db
```

6. **Run server**
```bash
python -m app.main
# Or use: start_dev.bat (Windows)
```

Visit: http://localhost:8000/docs

## API Endpoints Summary

**Total Endpoints: 22**

- Authentication: 4 endpoints
- Team Members: 7 endpoints  
- Shops: 7 endpoints
- Sales: 7 endpoints

See `API_REFERENCE.md` for complete documentation.

## What's Built

### ✅ Complete - API Layer
**Authentication & Authorization**
- JWT-based authentication
- Login & token refresh endpoints
- User profile management
- Protected route dependencies

**Team Member API** (`/api/v1/agents`)
- CRUD operations for agents
- Search and filtering
- Pagination support
- Employee ID lookup

**Shop API** (`/api/v1/shops`)
- CRUD operations for shops
- Search and filtering
- Pagination support
- Shop code lookup

**Sales API** (`/api/v1/sales`)
- Create single sales record
- Bulk import sales records
- List with advanced filtering (agent, shop, date range)
- Daily sales summary
- Update & delete records

### ✅ Complete - Business Logic Layer
- **Team Service**: Agent management logic
- **Shop Service**: Shop management logic
- **Sales Service**: Sales record management with bulk import

### ✅ Complete - Data Layer
- PostgreSQL database with all models
- SQLAlchemy ORM with relationships
- Alembic migrations
- Redis cache configuration
- Timestamp & soft delete mixins

### 🚧 Next Phase
1. Performance Engine (rankings, calculations)
2. Analytics Engine (insights, trends)
3. Forecaster Service (predictions)
4. Integration Layer (Forms connectors)
5. Report Generator (PDF/Excel)

## Project Structure

```
app/
├── core/       # Config, security, logging
├── db/         # Database connection
├── models/     # SQLAlchemy models ✅
├── schemas/    # Pydantic schemas (TODO)
├── api/        # API endpoints (TODO)
├── services/   # Business logic (TODO)
└── main.py     # FastAPI app ✅
```

## Database Models

- **User**: Operations manager authentication
- **Agent**: Team member profiles and history
- **Shop**: MTN office locations
- **Assignment**: Agent-shop relationships over time
- **TransferRecord**: Agent transfer tracking
- **SalesRecord**: Daily sales data with remarks

## Tech Stack

- **FastAPI**: Modern Python web framework
- **PostgreSQL**: Relational database
- **SQLAlchemy**: ORM
- **Alembic**: Database migrations
- **Redis**: Caching
- **Pydantic**: Data validation
- **JWT**: Authentication

## Development

```bash
# Run tests
pytest

# Code formatting
black app tests

# Linting
ruff check app tests
```

## Documentation

- See `SETUP_GUIDE.md` for detailed setup
- API docs: http://localhost:8000/docs (when running)
