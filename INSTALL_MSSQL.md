# 🛠️ SQL Server (MSSQL) Installation & Setup Guide

Since you are a beginner, follow these steps exactly to get a real database running on your computer.

---

## 1️⃣ Download & Install SQL Server (The Engine)
This is the "brain" that stores your library data.

1. **Download**: Go to the [Microsoft SQL Server Downloads](https://www.microsoft.com/en-us/sql-server/sql-server-downloads) page.
2. **Choose Express**: Scroll down to "Download a free specialized edition" and click **Download now** under **Express**. (It is free and perfect for your project).
3. **Run the Installer**:
   - Choose **Basic** installation type.
   - Click **Accept** to the terms.
   - Click **Install**.
4. **Wait**: Let it finish. Once done, it will show "Installation has completed successfully". 
   - **DO NOT CLOSE THIS YET.** Look for the button that says **Install SSMS**.

---

## 2️⃣ Install SQL Server Management Studio (SSMS)
This is the "interface" where you type commands and see your tables.

1. If you didn't click the button above, download it here: [Download SSMS](https://aka.ms/ssmsfullsetup).
2. Run the `SSMS-Setup-ENU.exe`.
3. Click **Install** and restart your computer if it asks.

---

## 3️⃣ Setting up your Library Database
Now we will use the script I wrote to create your tables.

1. Open **SQL Server Management Studio (SSMS)** from your Start Menu.
2. **Connect**: 
   - Server Type: Database Engine
   - Server Name: (Should show your computer name, e.g., `LAPTOP-XXXX\SQLEXPRESS`)
   - Authentication: **Windows Authentication**
   - Click **Connect**.
3. **Open the Script**: 
   - Press `Ctrl + O` or go to `File -> Open -> File`.
   - Select the `setup_mssql.sql` file I created in your `Library_App` folder.
4. **Run it**:
   - Click the **! Execute** button (top middle).
   - You should see "Commands completed successfully" at the bottom.

---

## 4️⃣ Enabling Remote Access (VERY IMPORTANT)
To let your Node.js app talk to SQL Server, you must enable "Mixed Mode" and "TCP/IP".

### A. Enable SQL Authentication
1. In SSMS, **Right-click** your Server Name (at the very top left) and click **Properties**.
2. Go to **Security** on the left.
3. Change "Server authentication" to **SQL Server and Windows Authentication mode**.
4. Click **OK**.

### B. Enable the 'sa' user (or create mine)
Since my script already creates `LibraryAppUser`, we just need to restart the server.

### C. Enable TCP/IP (For Network Connection)
1. Open **SQL Server 2022 Configuration Manager** (Search for it in Start).
2. Go to **SQL Server Network Configuration** -> **Protocols for SQLEXPRESS**.
3. **Right-click TCP/IP** and choose **Enable**.
4. **Restart the Service**: Click **SQL Server Services** on the left, right-click **SQL Server (SQLEXPRESS)** and choose **Restart**.

---

## 5️⃣ Verify Connection
In your Node.js `.env` file, you can now use:
- **Server**: `localhost` (or `127.0.0.1` or your computer IP)
- **Database**: `CollegeLibrary`
- **User**: `LibraryAppUser`
- **Password**: `YourSecurePassword123`

---

### 💡 Troubleshooting Tip
If you get a connection error, it's usually because the Windows Firewall is blocking Port **1433**. For a quick demo, you can temporarily turn off your Firewall or "Allow Port 1433" in Advanced Settings.
