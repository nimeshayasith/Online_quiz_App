@echo off
echo Stopping all Java processes...
taskkill /F /IM java.exe /T

echo.
echo Starting backend server...
cd /d "%~dp0"
call mvnw.cmd spring-boot:run
