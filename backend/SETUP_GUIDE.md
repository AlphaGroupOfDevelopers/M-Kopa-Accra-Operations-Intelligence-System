# M-Kopa AOIS Backend - Setup Guide

This guide will walk you through setting up the M-Kopa AOIS backend development environment.

## Prerequisites

Ensure you have the following installed:

- **Python 3.11 or higher** - [Download](https://www.python.org/downloads/)
- **PostgreSQL 14 or higher** - [Download](https://www.postgresql.org/download/)
- **Redis 7 or higher** - [Download](https://redis.io/download/)
- **Git** - [Download](https://git-scm.com/downloads/)

For Windows users, you may need:
- **Windows Subsystem for Linux (WSL2)** for Redis
- Or use Redis for Windows: [Microsoft Archive](https://github.com/microsoftarchive/redis/releases)

## Step 1: Database Setup

### PostgreSQL Setup

1. Start PostgreSQL service:
```bash
# Windows (as admin)
net start postgresql

# Linux/Mac
sudo service postgresql start
```

2. Create database and user:
```bash
# Connect to PostgreSQL
psql -U postgres

# In PostgreSQL shell:
CREATE DATABASE mkopa_aois;
CREATE USER mkopa_user WITH PASSWORD 'mkopa_password';
GRANT ALL PRIVILEGES ON DATABASE mkopa_aois TO mkopa_user;
\q
```

### Redis Setup

1. Start Redis service:
```bash
# Windows (if using WSL)
wsl
sudo service redis-server start

# Linux/Mac
sudo service redis-server start

# Or using Docker
docker run -d -p 6379:6379 redis:7-alpine
```

## Step 2: Python Environment Setup

1. Navigate to backend directory:
```bash
cd "c:\Dev\WORK\M-Kopa Accra Operations Intelligence System\backend"
```

2. Create virtual environment:
```bash
python -m venv venv
```

3. Activate virtual environment:
```bash
# Windows
venv\Scripts\activate

# Linux/Mac
source venv/bin/activate
```

4. Upgrade pip:
```bash
python -m pip install --upgrade pip
```

5. Install dependencies:
```bash
pip install -r requirements.txt
```

6. Install development dependencies (optional):
```bash
pip install -r requirements-dev.txt
```

## Step 3: Environment Configuration

1. Copy example environment file:
```bash
copy .env.example .env  # Windows
# OR
cp .env.example .env    # Linux/Mac
```

2. Edit `.env` file with your configuration:
```env
# Update these values
DATABASE_URL=postgresql://mkopa_user:mkopa_password@localhost:5432/mkopa_aois
SECRET_KEY=your-super-secret-key-change-this-in-production
REDIS_URL=redis://localhost:6379/0
```

**Important**: Generate a secure SECRET_KEY:
```python
# Run this in Python shell
import secrets
print(secrets.token_urlsafe(32))
```

## Step 4: Database Migrations

1. Create initial migration:
```bash
alembic revision --autogenerate -m "Initial migration"
```

2. Apply migrations:
```bash
alembic upgrade head
```

3. Initialize database with default data:
```bash
python -m app.db.init_db
```

This creates a default admin user:
- Email: `admin@mkopa-aois.com`
- Password: `admin123` (change this immediately!)

## Step 5: Run the Application

1. Start the development server:
```bash
python -m app.main
# OR
uvicorn app.main:app --reload
```

2. Verify the application is running:
   - API Documentation: http://localhost:8000/docs
   - Alternative Docs: http://localhost:8000/redoc
   - Health Check: http://localhost:8000/health

## Step 6: Verify Installation

Run the following checks:

1. **Check API Health**:
```bash
curl http://localhost:8000/health
```

Expected response:
```json
{
  "status": "healthy",
  "app_name": "M-Kopa AOIS API",
  "version": "1.0.0",
  "environment": "development"
}
```

2. **Check Database Connection**:
```bash
psql -U mkopa_user -d mkopa_aois -c "\dt"
```

You should see tables: agents, shops, assignments, transfer_records, sales_records, users

3. **Check Redis Connection**:
```bash
redis-cli ping
```

Expected response: `PONG`

## Step 7: Development Tools

### Code Formatting
```bash
black app tests
```

### Linting
```bash
ruff check app tests
```

### Type Checking
```bash
mypy app
```

### Running Tests
```bash
pytest
```

## Common Issues and Solutions

### Issue: PostgreSQL Connection Error
**Solution**: Check if PostgreSQL is running and credentials are correct in `.env`

### Issue: Redis Connection Error
**Solution**: Ensure Redis is running on port 6379 or update REDIS_URL in `.env`

### Issue: Import Errors
**Solution**: Ensure virtual environment is activated and dependencies are installed

### Issue: Alembic Migration Errors
**Solution**: 
```bash
# Reset migrations (development only!)
alembic downgrade base
alembic upgrade head
```

## Next Steps

1. Review the API documentation at http://localhost:8000/docs
2. Start building API endpoints in `app/api/v1/endpoints/`
3. Implement business logic services in `app/services/`
4. Write tests in `tests/`

## Useful Commands

```bash
# Create new migration
alembic revision --autogenerate -m "description"

# Apply migrations
alembic upgrade head

# Rollback migration
alembic downgrade -1

# View current migration
alembic current

# View migration history
alembic history

# Run with custom host/port
uvicorn app.main:app --host 0.0.0.0 --port 8080 --reload
```

## Support

For issues or questions, refer to:
- Project documentation in `/docs`
- FastAPI documentation: https://fastapi.tiangolo.com/
- SQLAlchemy documentation: https://docs.sqlalchemy.org/
