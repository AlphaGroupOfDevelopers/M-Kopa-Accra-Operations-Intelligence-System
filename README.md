# M-Kopa Accra Operations Intelligence System (AOIS)

A comprehensive operations intelligence platform for managing M-Kopa agents across MTN offices in Accra.

## Overview

The M-Kopa AOIS provides real-time visibility, performance tracking, and actionable insights for operations managers to effectively oversee sales agents, shop performance, and daily operations.

## Project Structure

```
M-Kopa-Accra-Operations-Intelligence-System/
├── backend/                          # FastAPI Backend
│   ├── app/                         # Application code
│   │   ├── api/                    # API endpoints
│   │   ├── core/                   # Configuration & security
│   │   ├── db/                     # Database setup
│   │   ├── models/                 # SQLAlchemy models
│   │   ├── schemas/                # Pydantic schemas
│   │   └── services/               # Business logic
│   ├── tests/                      # Test suite
│   ├── alembic/                    # Database migrations
│   └── README.md                   # Backend documentation
├── docs/                            # Architecture documents
│   ├── M-Kopa AOIS - API & Backend Architecture.md
│   ├── MKopa_AOIS_Architecture_Design.md
│   └── MKopa_AOIS_Demo_PRD.md
└── README.md                        # This file
```

## Features

### ✅ Implemented

**API Layer (22 Endpoints)**
- JWT Authentication
- Team Member (Agent) Management
- Shop Management
- Sales Data Management with Bulk Import

**Business Services**
- Team Service - Agent CRUD and search
- Shop Service - Shop CRUD and search
- Sales Service - Sales tracking and daily summaries

**Database**
- PostgreSQL with 6 core models
- Complete relationship tracking
- Historical data support
- Soft delete capability

### 🚧 Planned

- Performance Engine (rankings, KPIs)
- Analytics Engine (trends, insights)
- Forecaster Service (predictions)
- Google/Microsoft Forms Integration
- Report Generator (PDF/Excel)

## Quick Start

### Prerequisites

- Python 3.11+
- PostgreSQL 14+
- Redis 7+ (optional)

### Backend Setup

```bash
cd backend

# Create virtual environment
python -m venv venv
venv\Scripts\activate  # Windows
# or
source venv/bin/activate  # Linux/Mac

# Install dependencies
pip install -r requirements.txt

# Configure environment
copy .env.example .env
# Edit .env with your database credentials

# Run migrations
alembic upgrade head

# Initialize database
python -m app.db.init_db

# Start server
python -m app.main
```

Visit: http://localhost:8000/docs

## API Documentation

- **Swagger UI**: http://localhost:8000/docs
- **ReDoc**: http://localhost:8000/redoc
- **Health Check**: http://localhost:8000/health

See `backend/API_REFERENCE.md` for detailed API documentation.

## Technology Stack

### Backend
- **Framework**: FastAPI
- **Database**: PostgreSQL + SQLAlchemy
- **Cache**: Redis
- **Authentication**: JWT
- **Validation**: Pydantic

### Development Tools
- **Migrations**: Alembic
- **Testing**: Pytest
- **Code Quality**: Black, Ruff, MyPy

## Architecture

The system follows a layered architecture:

```
API Layer → Business Logic Layer → Data Layer
```

See architecture documents in `/docs` for detailed design.

## Development

### Code Quality

```bash
# Format code
black app tests

# Lint code
ruff check app tests

# Type check
mypy app

# Run tests
pytest
```

### Database Migrations

```bash
# Create migration
alembic revision --autogenerate -m "description"

# Apply migrations
alembic upgrade head

# Rollback
alembic downgrade -1
```

## Project Status

**Backend Progress: ~56%**

| Component | Status |
|-----------|--------|
| Data Layer | ✅ 100% |
| API Layer | ✅ 75% |
| Business Logic | 🔄 50% |
| Integration | ⏳ 0% |

See `backend/ARCHITECTURE_STATUS.md` for detailed status.

## Documentation

- `backend/README.md` - Backend quick start
- `backend/SETUP_GUIDE.md` - Detailed setup instructions
- `backend/API_REFERENCE.md` - Complete API documentation
- `backend/ARCHITECTURE_STATUS.md` - Implementation status
- `docs/` - Architecture and design documents

## Contributing

1. Follow PEP 8 style guide
2. Add type hints for all functions
3. Write docstrings
4. Add tests for new features
5. Update documentation

## License

Proprietary - Alpha Group of Developers

## Support

For questions or issues, refer to the documentation or contact the development team.
