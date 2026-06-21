# 📚 Library App - Complete Beginner Guide

## 🎯 What We Are Building
A mobile-adaptive website where students can:
- Search for books in the college library (by title, author, keyword, department)
- Check book availability (how many copies, where located)
- View their borrowing history, due dates, and fines using their Roll Number.

## 🏗️ Architecture Overview (The Secure Way)

```
┌──────────────────────┐      ┌──────────────────────┐      ┌──────────────────────┐
│   YOUR FRONTEND      │      │     NODE API API     │      │  COLLEGE DATABASE    │
│(Public Localtunnel URL)│─────▶│    (Local Server)    │ ─────▶│  (Internal MSSQL)  │
│                      │      │   Port: 3000         │      │  Read-Only Access    │
│                      │◀─────│                      │◀─────│                      │
└──────────────────────┘       └──────────────────────┘      └──────────────────────┘
   Students only see             IP & Password are            Hidden behind local
   the Localtunnel URL           HIDDEN here                  network
```

### 🛡️ Why this is "Professional":
1. **IP Hiding**: The students never see the IP address `172.16.0.114`.
2. **API Key**: Only your website can fetch data because it uses a secret key.
3. **Read-Only**: Even if someone hacks the login, they can't delete books.

---

## 🚀 Step-by-Step Setup Guide

### Step 1: Install Required Tools
Open PowerShell and run:
```bash
# Check if Node.js is installed
node --version # If not found, download from nodejs.org
```

### Step 2: Prepare your MSSQL Database
Go to the College PC with SQL Server and:
1. Open **SQL Server Management Studio**.
2. Open the file `setup_mssql.sql` (on your Desktop).
3. Click **Execute** to create the Sample Database and the **Read-Only User**.

### Step 3: Install Project Dependencies
```bash
cd C:\Users\samiu\OneDrive\Desktop\Library_App
npm install
```

### Step 4: Test Locally (The Demo!)
1. Open `.env` in the `api_bridge` folder.
2. Put the IP `172.16.0.114` and the Read-Only User credentials.
3. Run the development server from the terminal:
```bash
node server.js
```
*Your app will start at `http://localhost:3000`. You can test it locally first.*

---

## 🌍 Making it Public (Using Localtunnel)

### Step 5: Go Public (Localtunnel Method)
Since your college server is on a local network, we will use **Localtunnel** to create a secure tunnel and make it accessible over the internet without changing firewall settings.

1. **Start the Localtunnel**:
   Open a *new* PowerShell terminal (keep `node server.js` running in the other one) and run:
   ```bash
   npx localtunnel --port 3000
   ```
   
2. **Access your Public App**:
   *Look for the "url" in the localtunnel output (e.g., `https://random-string.loca.lt`).*
   You can now share this secure link with anyone to access the Library App globally!

---

### 📂 File Structure
- `/public`: The website design (HTML/CSS/JS).
- `api_bridge/server.js`: The "Middleman" proxy API code that talks to the database.
- `setup_mssql.sql`: The database setup instructions.

---

### 🔑 Your Presentation Points
When showing this to the Library Incharge, tell them:
- *"I have used a **Localtunnel** to bridge our internal app to the public internet securely."*
- *"This method doesn't require opening any ports on the college firewall, keeping the network safe."*
- *"Access is protected by a **Custom API Key Header**, so only this specific app can fetch data."*
- *"We are using an **industry-standard MSSQL Read-Only User**, ensuring students cannot change any records."*
