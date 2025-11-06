@echo off
REM FoodShare Connect - Development Startup Script for Windows

echo Starting FoodShare Connect in Development Mode...
echo.

REM Check if .env files exist
if not exist "backend\.env" (
    echo Backend .env file not found!
    echo Creating from .env.example...
    copy "backend\.env.example" "backend\.env"
    echo Please configure backend/.env with your settings before continuing.
    pause
    exit /b 1
)

if not exist "frontend\.env" (
    echo Frontend .env file not found. Creating from example...
    copy "frontend\.env.example" "frontend\.env"
)

REM Install dependencies if needed
if not exist "backend\node_modules" (
    echo Installing backend dependencies...
    cd backend
    call npm install
    cd ..
)

if not exist "frontend\node_modules" (
    echo Installing frontend dependencies...
    cd frontend
    call npm install
    cd ..
)

echo.
echo Setup complete!
echo.
echo Starting servers...
echo    Backend: http://localhost:5000
echo    Frontend: http://localhost:3000
echo.
echo Press Ctrl+C to stop all servers
echo.

REM Start both servers in separate windows
start "FoodShare Backend" cmd /k "cd backend && npm run dev"
start "FoodShare Frontend" cmd /k "cd frontend && npm start"

echo.
echo Both servers are starting in separate windows...
echo Close this window or press any key to exit.
pause
