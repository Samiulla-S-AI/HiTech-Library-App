# 🐍 Librarian Mailer - Windows 7 (Python 3.8) Setup Guide

This guide ensures the `librarian_mailer.py` desktop application runs correctly on **Computer B (Windows 7)** using **Python 3.8.10**.

## 🏗️ Prerequisites
Windows 7 requires specific versions of Python and libraries. Follow these steps exactly.

### 1. Install Python 3.8.10
Windows 7 does **not** support Python 3.9+. 
1. Download **Python 3.8.10 (64-bit)** from the official site:
   - [Download Python 3.8.10 x64](https://www.python.org/ftp/python/3.8.10/python-3.8.10-amd64.exe)
2. During installation, **check the box: "Add Python 3.8 to PATH"**.
3. Install as usual.

### 2. Update `pip` and SSL (Critical for Win7)
Windows 7 often has outdated SSL certificates that prevent `pip` from downloading packages.
1. Open **Command Prompt** as Administrator.
2. Run:
   ```cmd
   python -m pip install --upgrade pip
   ```

---

## 📦 Installing Compatible Dependencies
To avoid "automatically installing newer versions" that break on Windows 7, we will install specific, tested versions.

### 1. The "Middleman" for SQL Server (`pymssql`)
Newer `pymssql` versions might require newer C++ runtimes. Version `2.2.0` is generally stable for Win7.
```cmd
pip install pymssql==2.2.8
```

### 2. The Modern UI (`customtkinter`)
This gives the app its premium look.
```cmd
pip install customtkinter==5.2.2
```

### 3. Image Support (`pillow`)
Required by `customtkinter` to show icons.
```cmd
pip install Pillow==9.5.0
```

### 4. Direct Database Connection (Alternative)
The script uses `pymssql` (as seen in line 150). No other heavy database drivers are needed.

---

## 🚀 Running the App
1. Ensure `librarian_mailer.py` and `.env` are in the same folder (e.g., `C:\Library_App\api_bridge`).
2. Open **Command Prompt**.
3. Navigate to the folder:
   ```cmd
   cd C:\Library_App\api_bridge
   ```
4. Run the app:
   ```cmd
   python librarian_mailer.py
   ```

---

## 🆘 Troubleshooting Windows 7 Issues

### Error: "api-ms-win-core-path-l1-1-0.dll is missing"
**Reason:** Your Windows 7 is missing the "Universal C Runtime".
**Fix:**
1. Install **Windows 7 Service Pack 1 (SP1)** if not already installed.
2. Install the **Update for Universal C Runtime in Windows**:
   - [Download KB2999226](https://www.microsoft.com/en-us/download/details.aspx?id=49093)

### Error: "pip install" fails with SSL/TLS error
**Reason:** Windows 7 doesn't support modern TLS 1.2 by default in some environments.
**Fix:** Use the `pip` "trusted-host" workaround:
```cmd
pip install --trusted-host pypi.org --trusted-host files.pythonhosted.org customtkinter==5.2.2 pymssql==2.2.8 Pillow==9.5.0
```

### Error: "pymssql.connect" fails
**Reason:** Computer B cannot "see" Computer A over the LAN.
**Fix:** Check `DB_SERVER` in your `.env` file. It should be the IP of Computer A (e.g., `172.16.0.114`).
