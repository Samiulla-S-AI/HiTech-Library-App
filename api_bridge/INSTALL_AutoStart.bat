@echo off
title Install HiTECH Library Auto-Start
color 0B
echo =======================================================
echo     HITECH LIBRARY - AUTO START INSTALLER
echo =======================================================
echo.
echo This will make the Library System start automatically
echo every time this computer is turned ON.
echo.

:: Set the path to the main startup batch file
set "BAT_PATH=C:\Users\Library_APP_Samiulla\Library_System_Server.bat"

:: Check if the file exists
if not exist "%BAT_PATH%" (
    color 0C
    echo ERROR: Cannot find Library_System_Server.bat at:
    echo   %BAT_PATH%
    echo.
    echo Please make sure the file exists at the correct path.
    echo.
    pause
    exit /b
)

:: Create a shortcut in the Windows Startup folder
set "STARTUP=%APPDATA%\Microsoft\Windows\Start Menu\Programs\Startup"
set "SHORTCUT=%STARTUP%\HiTECH_Library_Server.lnk"

echo Creating startup shortcut...
echo   Target: %BAT_PATH%
echo   Startup Folder: %STARTUP%
echo.

:: Use PowerShell to create the shortcut
powershell -Command "$ws = New-Object -ComObject WScript.Shell; $s = $ws.CreateShortcut('%SHORTCUT%'); $s.TargetPath = '%BAT_PATH%'; $s.WorkingDirectory = 'C:\Users\Library_APP_Samiulla'; $s.WindowStyle = 1; $s.Description = 'HiTECH Library System Auto-Start'; $s.Save()"

if exist "%SHORTCUT%" (
    color 0A
    echo =============================================
    echo   SUCCESS! Auto-start has been installed.
    echo =============================================
    echo.
    echo The Library System will now start automatically
    echo every time this PC is turned on.
    echo.
    echo To REMOVE auto-start, simply delete this file:
    echo   %SHORTCUT%
    echo.
    echo Or run UNINSTALL_AutoStart.bat
) else (
    color 0C
    echo FAILED to create startup shortcut.
    echo Please try running this as Administrator.
)

echo.
pause
