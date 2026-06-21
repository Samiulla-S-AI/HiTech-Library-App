@echo off
setlocal
cd /d %~dp0
echo [🚀] Starting Student Sync (MSSQL -> Supabase)...
echo [%date% %time%] >> sync_log.txt
node sync.js >> sync_log.txt 2>&1
if %errorlevel% neq 0 (
    echo [❌] ERROR: Sync failed! See sync_log.txt for details.
    pause
) else (
    echo [✅] SUCCESS: Sync completed.
)
endlocal
