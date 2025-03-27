@echo off
 
:: Build Front-end Astro
echo Creating Frontend.
call npm run build

:: Check for errors.
if %errorlevel% neq 0 (
    echo Build failed, Check for errors.
    exit /b %errorlevel%
)

:: Run server.bat
echo Running Server.
node ./dist/server/entry.mjs
