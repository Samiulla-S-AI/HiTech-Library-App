# 🎓 The Ultimate Deployment Mentor Guide

Hello Samiulla! As your technical mentor, I completely understand your setup now. It is a very classic networking scenario:

🖥️ **Computer A (The Server):** Windows Server 2008 `(IP: 172.16.0.114)`
*   This is the "Brain". It holds all the library data in the `lips5_sql` database. 
*   It does **not** run your Node.js app. It just passively holds data.

💻 **Computer B (The Client):** Windows 7 `(IP: 172.16.0.106)`
*   This is the "Worker". 
*   It runs your Node.js (`server.js`) app. 
*   It reaches across the LAN cable to Computer A, asks for database records, and then serves them to the internet via Localtunnel.

Because they are two different computers, **Firewalls** and **Network Protocols** will try to block them from talking to each other. Here is your fail-proof, step-by-step guide to making them talk perfectly. 

---

## 🛠️ PHASE 1: Prepare Computer A (The Server - 172.16.0.114)
*Do these steps physically sitting at the large Windows Server 2008 computer.*

### Step 1: Tell SQL Server to "Listen" to the Network Cable
By default, SQL Server only talks to itself. We must tell it to listen to Computer B.
1. Click **Start** and search for `SQL Server Configuration Manager`. Open it.
2. In the left panel, expand **SQL Server Network Configuration** and click on **Protocols for MSSQLSERVER** (or the instance name).
3. Look at the right panel. By default, **TCP/IP** is usually "Disabled". 
4. Right-click **TCP/IP** and select **Enable**.
5. Right-click **TCP/IP** again and select **Properties**.
6. Click the **IP Addresses** tab at the top.
7. Scroll all the way down to the **IPAll** section at the very bottom.
8. Make sure **TCP Dynamic Ports** is completely EMPTY (delete any zero or number there).
9. Make sure **TCP Port** is exactly `1433`.
10. Click **OK**.
11. Now, in the left panel, click **SQL Server Services**. Right-click **SQL Server (MSSQLSERVER)** and click **Restart**.

### Step 2: Open the Windows Firewall Door
Windows Server has a massive steel door (Firewall) that blocks port 1433. We have to unlock it.
1. Click **Start**, type `Windows Firewall with Advanced Security`, and press Enter.
2. On the left side, click **Inbound Rules**.
3. On the far right, click **New Rule...**
4. Choose **Port** and click Next.
5. Choose **TCP**. In the "Specific local ports" box, type exactly: `1433`. Click Next.
6. Choose **Allow the connection** and click Next.
7. Check all three boxes (Domain, Private, Public) and click Next.
8. Name it: `Library SQL Port Unlock_Samiulla` and click **Finish**.

*(Computer A is now 100% ready. You can leave it alone.)*

---

## 🚀 PHASE 2: Prepare Computer B (The Windows 7 Client - 172.16.0.106)
*Do these steps physically sitting at the Windows 7 computer.*

### Step 3: Install Node.js (If not already installed)
Because Windows 7 is older, you cannot install the newest Node.js. 
1. Open a web browser.
2. Download Node.js **Version 13.14.0** (This is the best version for Windows 7). 
   * Link: `https://nodejs.org/dist/latest-v13.x/node-v13.14.0-x64.msi`
3. Install it exactly like a normal Windows program (Next -> Next -> Finish).

### Step 4: Transfer Your Code
1. Copy the entire `Library_App` folder from your laptop using a Pen Drive.
2. Paste it directly onto Computer B's desktop (e.g., `C:\Users\Admin\Desktop\Library_App`).

### Step 5: The Magic Network Connection (.env)
We must tell your code exactly where the Brain (Computer A) is.
1. Open `Library_App/api_bridge/.env` in Notepad.
2. Update the file to look EXACTLY like this:

```ini
# User details you already created!
DB_USER=LibraryUserReader1
DB_PASSWORD=hitlibrary@123
DB_NAME=lips5_sql

# 👉 CRITICAL: This points your code to Computer A across the LAN cable!
DB_SERVER=172.16.0.114

PORT=3000
MY_SECRET_KEY=prototype_key_123
```
3. Save and close the file.

### Step 6: Start the Engine
1. Open a **Command Prompt** (Press `Win + R`, type `cmd`, hit Enter).
2. "Change Directory" into your folder (change the path if you put it somewhere else):
   `cd C:\Users\Admin\Desktop\Library_App\api_bridge`
3. Just to be safe, install the packages:
   `npm install`
4. Now, run your server:
   `node server.js`

If everything worked, you will see a green success message saying:
`✅ Connection Successful! Connected to LIPS5 Production Database at 172.16.0.114`

### Step 7: Make it Public (Localtunnel)
Localtunnel is a great alternative to expose your local server to the internet.

1.  **Install Localtunnel:**
    In your Command Prompt, run:
    ```cmd
    npm install -g localtunnel
    ```
2.  **Start the Tunnel:**
    Run the following command while your `node server.js` is running:
    ```cmd
    lt --port 3000
    ```
3.  **Copy the Link:** Look for the URL provided (e.g., `https://xxxx.loca.lt`). This is the link you share with students!

---

## 🆘 Mentor Troubleshooting (If it fails!)

**Error:** `localtunnel` command not found.
**Reason:** The package was not installed globally or the path is not set.
*   **Mentor Fix:** Try running it using `npx localtunnel --port 3000` instead of `lt --port 3000`.

**Error:** `Connection timeout` or `TCP Provider error` in `node server.js` window.
**Reason:** The Windows 7 computer (B) cannot reach the Server computer (A).
*   **Mentor Fix 1:** Did you definitely Restart the SQL Server Service after changing the TCP/IP settings on Computer A? It won't work until you restart the service in the Configuration Manager.
*   **Mentor Fix 2:** Did you create the Firewall Inbound Rule on Computer A? If the firewall blocks it, the connection dies immediately.
*   **Mentor Fix 3:** Go to Computer B, open Command Prompt, and type: `ping 172.16.0.114`. If it says "Destination host unreachable", the LAN cable is unplugged or they are on different Wi-Fi/subnets.

You've got this, Samiulla! Follow this step-by-step and it will work perfectly on the first try. Let me know if you hit any roadblocks.
