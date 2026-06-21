# Student Database Sync Service (Computer B)

This service is a separate utility that fetches student registration numbers, emails, and names from the **Computer B (MSSQL)** database and stores them in your **Supabase** database automatically.

## ✨ Features
- **Read-Only:** Uses only `SELECT` commands for the MSSQL database.
- **Auto-Sync:** Designed to be scheduled (e.g., every 3 months).
- **Safe Upsert:** Updates existing records in Supabase based on the registration number (`reg_no`).

---

## 🛠️ One-Time Setup (Supabase)

Before running the sync for the first time, you **MUST** create the table in your Supabase SQL Editor:

```sql
-- 1. Create the students table
create table students (
  reg_no text primary key,
  email text,
  name text,
  updated_at timestamp with time zone default now()
);

-- 2. Optional: Enable Row Level Security (RLS) if you need protection
-- alter table students enable row level security;
```

---

## 🚀 How to Run the Sync

### Step 1: Install Dependencies
Open a command prompt in this folder and run:
```cmd
npm install
```

### Step 2: Configure `.env`
Ensure the `.env` file in this folder has the correct:
1. `DB_SERVER` (The IP of the computer with MSSQL - usually `127.0.0.1` locally).
2. `DB_USER` & `DB_PASSWORD`.
3. `SUPABASE_URL` and `SUPABASE_ANON_KEY`.

### Step 3: Run Manually
Double-click `run_sync.bat`.

---

## ⏰ How to Schedule for Every 3 Months

1. Open **Windows Task Scheduler**.
2. Click **Create Basic Task**.
3. Name: `Supabase Student Sync`.
4. Trigger: **Monthly**.
5. Start: [Today's Date].
6. Recurrence: **Every 3 Months**.
7. Action: **Start a Program**.
8. Program/script: Browse to `run_sync.bat` in this folder.
9. **IMPORTANT**: In "Start in (optional)", paste the full path to this directory:
   `C:\Users\samiu\OneDrive\Desktop\Library_App\student_sync_service`
10. Click **Finish**.

---

## 📝 Logs
All activity and errors are recorded in `sync_log.txt` in this folder.
