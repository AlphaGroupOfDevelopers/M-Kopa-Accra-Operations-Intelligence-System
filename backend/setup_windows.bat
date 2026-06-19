@echo off
REM M-Kopa AOIS - Windows Setup Script

echo ========================================
echo M-Kopa AOIS Backend - Windows Setup
echo ========================================
echo.

REM Check Python version
python --version
if %errorlevel% neq 0 (
    echo [ERROR] Python is not installed or not in PATH
    echo Please install Python 3.11+ from https://www.python.org/downloads/
    pause
    exit /b 1
)

REM Create virtual environment
echo [1/6] Creating virtual environment...
python -m venv venv
if %errorlevel% neq 0 (
    echo [ERROR] Failed to create virtual environment
    pause
    exit /b 1
)

REM Activate virtual environment
echo [2/6] Activating virtual environment...
call venv\Scripts\activate.bat

REM Upgrade pip
echo [3/6] Upgrading pip...
python -m pip install --upgrade pip

REM Install dependencies
echo [4/6] Installing dependencies...
pip install -r requirements.txt
if %errorlevel% neq 0 (
    echo [ERROR] Failed to install dependencies
    echo.
    echo Common fix: If psycopg installation fails, it's already handled.
    echo The requirements use psycopg3 which has binary wheels for Windows.
    pause
    exit /b 1
)

REM Create .env file
echo [5/6] Creating .env file...
if not exist ".env" (
    copy .env.example .env
    echo [INFO] .env file created from .env.example
    echo [ACTION] Please edit .env file with your database credentials
) else (
    echo [INFO] .env file already exists
)

REM Create directories
echo [6/6] Creating directories...
if not exist "logs" mkdir logs
if not exist "storage\reports" mkdir storage\reports

echo.
echo ========================================
echo Setup Complete!
echo ========================================
echo.
echo Next steps:
echo 1. Edit .env file with your PostgreSQL credentials
echo 2. Make sure PostgreSQL is running
echo 3. Run: alembic upgrade head
echo 4. Run: python -m app.db.init_db
echo 5. Run: python -m app.main
echo.
echo Or simply run: start_dev.bat
echo.
pause
