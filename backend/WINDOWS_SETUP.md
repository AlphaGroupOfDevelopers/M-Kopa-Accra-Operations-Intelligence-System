# Windows Setup Guide - M-Kopa AOIS Backend

## Quick Setup

Run the automated setup script:
```cmd
setup_windows.bat
```

## Manual Setup

### 1. Install Prerequisites

**Python 3.11+**
- Download from: https://www.python.org/downloads/
- ✅ Check "Add Python to PATH" during installation

**PostgreSQL 14+**
- Download from: https://www.postgresql.org/download/windows/
- Remember your postgres password during installation

**Redis** (Optional but recommended)
- Option 1: Use WSL2 (Windows Subsystem for Linux)
  ```bash
  wsl --install
  # In WSL terminal:
  sudo apt update
  sudo apt install redis-server
  sudo service redis-server start
  ```
- Option 2: Use Docker Desktop
  ```cmd
  docker run -d -p 6379:6379 --name redis redis:7-alpine
  ```
- Option 3: Use Memurai (Redis alternative for Windows)
  - Download from: https://www.memurai.com/

### 2. Setup Project

```cmd
cd backend

REM Create virtual environment
python -m venv venv

REM Activate virtual environment
venv\Scripts\activate

REM Upgrade pip
python -m pip install --upgrade pip

REM Install dependencies
pip install -r requirements.txt
```

### 3. Configure Database

**Create PostgreSQL database:**
```cmd
REM Open psql
psql -U postgres

REM In psql shell:
CREATE DATABASE mkopa_aois;
CREATE USER mkopa_user WITH PASSWORD 'mkopa_password';
GRANT ALL PRIVILEGES ON DATABASE mkopa_aois TO mkopa_user;
\q
```

**Configure .env file:**
```cmd
copy .env.example .env
notepad .env
```

Update the database URL:
```env
DATABASE_URL=postgresql://mkopa_user:mkopa_password@localhost:5432/mkopa_aois
```

### 4. Initialize Database

```cmd
REM Run migrations
alembic upgrade head

REM Initialize with default data
python -m app.db.init_db
```

### 5. Run Application

```cmd
REM Start the server
python -m app.main

REM Or use the shortcut:
start_dev.bat
```

Visit: http://localhost:8000/docs

## Common Issues & Solutions

### Issue 1: psycopg2-binary Installation Fails

**Error:**
```
Error: pg_config executable not found
```

**Solution:**
The requirements.txt has been updated to use `psycopg` (psycopg3) instead, which includes binary wheels for Windows. Just re-run:
```cmd
pip install -r requirements.txt
```

If you still have issues, the package is already fixed in the latest requirements.txt.

### Issue 2: Python Not Found

**Error:**
```
'python' is not recognized as an internal or external command
```

**Solution:**
1. Reinstall Python and check "Add Python to PATH"
2. Or add Python to PATH manually:
   - Open "Environment Variables"
   - Add `C:\Users\YourName\AppData\Local\Programs\Python\Python311` to PATH
   - Restart terminal

### Issue 3: PostgreSQL Connection Error

**Error:**
```
psycopg.OperationalError: connection to server at "localhost" (::1), port 5432 failed
```

**Solution:**
1. Check PostgreSQL is running:
   ```cmd
   REM Start PostgreSQL service
   net start postgresql-x64-14
   ```

2. Verify connection:
   ```cmd
   psql -U postgres -d mkopa_aois
   ```

3. Check firewall settings allow port 5432

### Issue 4: Module Not Found

**Error:**
```
ModuleNotFoundError: No module named 'fastapi'
```

**Solution:**
Make sure virtual environment is activated:
```cmd
venv\Scripts\activate
pip install -r requirements.txt
```

You should see `(venv)` in your terminal prompt.

### Issue 5: Alembic Not Found

**Error:**
```
'alembic' is not recognized
```

**Solution:**
Make sure you're in the virtual environment and dependencies are installed:
```cmd
venv\Scripts\activate
pip install alembic
# Or reinstall all
pip install -r requirements.txt
```

### Issue 6: Redis Connection Error

**Solution:**
Redis is optional for development. To disable Redis errors:

1. Use WSL2 with Redis:
   ```bash
   # In WSL terminal
   sudo service redis-server start
   ```

2. Or update `.env` to point to Docker Redis:
   ```env
   REDIS_URL=redis://localhost:6379/0
   ```

3. Or comment out Redis usage temporarily in development

### Issue 7: Permission Denied on Scripts

**Error:**
```
cannot be loaded because running scripts is disabled on this system
```

**Solution:**
Run PowerShell as Administrator and execute:
```powershell
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
```

Then retry activating the virtual environment.

## Database Tools (Optional)

**pgAdmin 4** - GUI for PostgreSQL
- Download: https://www.pgadmin.org/download/pgadmin-4-windows/
- Easy database management

**DBeaver** - Universal database tool
- Download: https://dbeaver.io/download/
- Supports multiple databases

## Development Tools (Recommended)

**VS Code Extensions:**
- Python
- Pylance
- Python Test Explorer
- REST Client (for API testing)

**API Testing:**
- Postman: https://www.postman.com/downloads/
- Insomnia: https://insomnia.rest/download
- Or use built-in Swagger UI at http://localhost:8000/docs

## Verifying Installation

Run these commands to verify everything works:

```cmd
REM 1. Check Python
python --version

REM 2. Check virtual environment is active (should see (venv))
where python

REM 3. Check packages installed
pip list

REM 4. Check database connection
python -c "from app.db.session import engine; print('Database OK')"

REM 5. Check API health
python -m app.main
REM Then visit: http://localhost:8000/health
```

## Performance Tips

1. **Use SSD** for PostgreSQL data directory
2. **Increase PostgreSQL memory** (postgresql.conf):
   ```
   shared_buffers = 256MB
   effective_cache_size = 1GB
   ```
3. **Disable Windows Defender** scanning on project folder (if safe)
4. **Use WSL2** for better performance with Redis

## Quick Commands Reference

```cmd
REM Activate environment
venv\Scripts\activate

REM Start server
python -m app.main

REM Start server with reload
uvicorn app.main:app --reload

REM Run migrations
alembic upgrade head

REM Create migration
alembic revision --autogenerate -m "description"

REM Rollback migration
alembic downgrade -1

REM Initialize database
python -m app.db.init_db

REM Run tests
pytest

REM Format code
black app tests

REM Lint code
ruff check app tests
```

## Getting Help

1. Check error message carefully
2. Review this troubleshooting guide
3. Check `SETUP_GUIDE.md` for detailed steps
4. Search error on Stack Overflow
5. Check FastAPI docs: https://fastapi.tiangolo.com/
6. Check SQLAlchemy docs: https://docs.sqlalchemy.org/

## Environment Variables Quick Reference

Required in `.env`:
```env
# Database (required)
DATABASE_URL=postgresql://mkopa_user:mkopa_password@localhost:5432/mkopa_aois

# Security (required - generate with: python -c "import secrets; print(secrets.token_urlsafe(32))")
SECRET_KEY=your-secret-key-here

# Redis (optional for development)
REDIS_URL=redis://localhost:6379/0

# App settings
DEBUG=True
ENVIRONMENT=development
```

## Success Checklist

- [ ] Python 3.11+ installed
- [ ] PostgreSQL running
- [ ] Virtual environment created and activated
- [ ] Dependencies installed successfully
- [ ] .env file configured
- [ ] Database created
- [ ] Migrations run successfully
- [ ] Init script run successfully
- [ ] Server starts without errors
- [ ] Can access http://localhost:8000/docs
- [ ] Health endpoint returns "healthy"

If all checkmarks are done, you're ready to develop! 🎉
