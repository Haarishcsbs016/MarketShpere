@echo off
echo Starting MarketSphere Frontend...
echo.

REM Check if node_modules exists
if not exist "node_modules" (
    echo Installing dependencies...
    call npm install
    echo.
)

REM Check if .env exists
if not exist ".env" (
    echo Creating .env file...
    echo VITE_API_URL=http://localhost:5000/api > .env
    echo.
)

echo Starting Vite development server...
echo Server will be available at: http://localhost:3000
echo.
call npm run dev

