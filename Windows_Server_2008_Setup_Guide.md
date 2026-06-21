# 🛠️ Windows Server 2008 Setup Guide - Library API Bridge

Since the **Database (lips5_sql)** and **User (LibraryUserReader1)** are already set up, follow these final steps to get the app running on the server.

---

## 1. Network Configuration (CRITICAL)
For the NodeJS app to connect to the SQL Server, TCP/IP must be enabled.

### Enable TCP/IP
1. Open **SQL Server Configuration Manager**.
2. Go to **SQL Server Network Configuration** -> **Protocols for MSSQLSERVER**.
3. Right-click **TCP/IP** and select **Enable**.
4. Right-click **TCP/IP** -> **Properties** -> **IP Addresses**.
5. Scroll to the bottom (**IPAll**) and ensure **TCP Port** is `1433`.
6. **Restart** the SQL Server service in the "SQL Server Services" tab.

---

## 2. Windows Firewall
You must allow the API Bridge to communicate through the firewall.

1. Go to **Start -> Administrative Tools -> Windows Firewall with Advanced Security**.
2. Click **Inbound Rules** (left panel).
3. Click **New Rule...** (right panel).
4. Select **Port** -> Next.
5. Select **TCP** and enter ports: `1433, 3000`.
6. Select **Allow the connection** -> Next.
7. Check all boxes (Domain, Private, Public) -> Next.
8. Name it: `Library_App_Bridge` and click **Finish**.

---

## 3. Node.js Environment
1. Ensure the `Library_App` folder is on the server (e.g., `C:\Library_App`).
2. Update the `api_bridge/.env` file:
   - Since the app is on the SAME machine as the DB, set `DB_SERVER=127.0.0.1`.
3. Open **Command Prompt** (as Administrator).
4. `cd C:\Library_App\api_bridge`
5. Run: `node server.js`

---

## 4. Making it Public (Localtunnel)
1. In a second Command Prompt, run:
   `npx localtunnel --port 3000`
2. Copy the `https://...loca.lt` link and share it with students!

---
*Status: Database & User configured. Ready for deployment.*
