@echo off
REM M-Kopa Management System - Development Server Startup Script

echo ========================================
echo M-Kopa Management System Backend Dev Server
echo ========================================
echo.

REM Check if virtual environment exists
if not exist "venv\Scripts\activate.bat" (
    echo [ERROR] Virtual environment not found!
    echo Please run setup first:
    echo   python -m venv venv
    echo   venv\Scripts\activate
    echo   pip install -r requirements.txt
    pause
    exit /b 1
)

REM Activate virtual environment
call venv\Scripts\activate.bat

REM Check if .env file exists
if not exist ".env" (
    echo [WARNING] .env file not found!
    echo Creating from .env.example...
    copy .env.example .env
    echo.
    echo [ACTION REQUIRED] Please edit .env file with your configuration
    echo Press any key to open .env in notepad...
    pause
    notepad .env
)

echo [INFO] Starting development server...
echo [INFO] API Documentation will be available at:
echo        http://localhost:8000/docs
echo.
echo [INFO] Press Ctrl+C to stop the server
echo.

REM Start the development server
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000

REM Deactivate on exit
deactivate
