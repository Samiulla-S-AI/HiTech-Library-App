@echo off
title HiTECH Library Server Manager
color 0B
echo =======================================================
echo              HITECH LIBRARY SYSTEM STARTUP
echo =======================================================
echo.
echo Starting Database Server and Public Tunnel...
echo DO NOT CLOSE THE NEW WINDOWS THAT OPEN!
echo.

:: Ensure we are in the correct directory where the zip was extracted
cd /d "C:\Users\Library_APP_Samiulla"

:: Check if the folder exists
if not exist "server.js" (
    color 0C
    echo Error: Could not find server.js in C:\Users\Library_APP_Samiulla
    echo Please make sure you extracted the ZIP file to exactly C:\Users\Library_APP_Samiulla
    echo.
    pause
    exit /b
)

:: Start the Database Server in a new window
start "HiTECH Database Server (DO NOT CLOSE)" cmd /k "color 0A && echo 🟢 STARTING DATABASE SERVER... && node server.js"

:: Wait 3 seconds for the server to start before launching the tunnel
timeout 3 > nul

:: Start the Public Tunnel in another new window
start "HiTECH Public Tunnel (DO NOT CLOSE)" cmd /k "color 0D && echo 🌐 CONNECTING TO INTERNET TUNNEL... && npx localtunnel --port 3000 --subdomain library-app-sami"

:: Wait 2 seconds then launch the Librarian Email Manager
timeout 2 > nul

:: Start the Librarian Email Manager (Python desktop app)
start "HiTECH Librarian Email Manager" cmd /k "color 0E && echo 📧 STARTING LIBRARIAN EMAIL MANAGER... && python librarian_mailer.py"

echo.
echo Server, Tunnel, and Email Manager have been launched successfully!
echo You can now minimize this window or close it.
echo But DO NOT close the two completely black windows.
echo.
pause