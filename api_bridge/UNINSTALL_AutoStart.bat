@echo off
title Remove HiTECH Library Auto-Start
color 0E
echo =======================================================
echo     HITECH LIBRARY - REMOVE AUTO START
echo =======================================================
echo.

set "SHORTCUT=%APPDATA%\Microsoft\Windows\Start Menu\Programs\Startup\HiTECH_Library_Server.lnk"

if exist "%SHORTCUT%" (
    del "%SHORTCUT%"
    color 0A
    echo Auto-start has been REMOVED successfully.
    echo The Library System will no longer start on boot.
) else (
    echo Auto-start was not installed. Nothing to remove.
)

echo.
pause
