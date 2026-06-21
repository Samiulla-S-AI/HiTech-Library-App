import pymssql
import datetime

# Database Configuration
DB_SERVER = "172.16.0.114"
DB_NAME = "lips5_sql"
DB_USER = "LibraryUserReader1"
DB_PASSWORD = "hitlibrary@123"

ROLL_NO = "720823103188"

def mssql_connect():
    for tds in ["7.0", "7.1", "7.2"]:
        try:
            print(f"Trying TDS {tds}...")
            return pymssql.connect(
                server=DB_SERVER, user=DB_USER, password=DB_PASSWORD,
                database=DB_NAME, port=1433, login_timeout=10,
                charset="UTF-8", tds_version=tds
            )
        except Exception as e:
            if tds == "7.2":
                raise e
            continue

def find_all_possible_fines():
    try:
        print(f"🔍 SEARCHING ALL FINE COLUMNS FOR ROLL NO: {ROLL_NO}")
        print("--------------------------------------------------")
        
        conn = mssql_connect()
        cur = conn.cursor(as_dict=True)
        
        # 1. Check book_circle (Current issues)
        print("\n--- [1] CURRENT ISSUES (book_circle) ---")
        cur.execute("SELECT acc_no, due_date, fine_cancel FROM [dbo].[book_circle] WHERE id_no = %s", (ROLL_NO,))
        rows = cur.fetchall()
        for r in rows:
            print(f"Acc No: {r['acc_no']} | Due Date: {r['due_date']} | Fine Cancel: {r['fine_cancel']}")

        # 2. Check due_list_temp (System calculated fines)
        print("\n--- [2] SYSTEM CALCULATION (due_list_temp) ---")
        cur.execute("SELECT pat_no, pat_detail, due_date, over_due_period, fine_amt FROM [dbo].[due_list_temp] WHERE id_no = %s", (ROLL_NO,))
        rows = cur.fetchall()
        for r in rows:
            print(f"Book No: {r['pat_no']} | Due Date: {r['due_date']} | Days: {r['over_due_period']} | FINE AMT: ₹{r['fine_amt']}")

        # 3. Check return_recon (Reconciled fines)
        print("\n--- [3] RECONCILIATION (return_recon) ---")
        # Note: schema shows [id.no] with a dot
        cur.execute("SELECT acc_no, due_date, over_due_days, over_due_amt FROM [dbo].[return_recon] WHERE [id.no] = %s", (ROLL_NO,))
        rows = cur.fetchall()
        for r in rows:
            print(f"Acc No: {r['acc_no']} | Due Date: {r['due_date']} | Days: {r['over_due_days']} | OVERDUE AMT: ₹{r['over_due_amt']}")

        # 4. Check fine_receipt (Paid/Unpaid Receipts)
        print("\n--- [4] RECEIPTS (fine_receipt) ---")
        cur.execute("SELECT acc_no, rec_date, rec_amt, paid, remarks FROM [dbo].[fine_receipt] WHERE id_no = %s", (ROLL_NO,))
        rows = cur.fetchall()
        for r in rows:
            status = "PAID" if r['paid'] == 1 else "UNPAID"
            print(f"Acc No: {r['acc_no']} | Date: {r['rec_date']} | Receipt Amt: ₹{r['rec_amt']} | Status: {status}")

        # 5. Check fine_receipt1 (Alternative Receipts)
        print("\n--- [5] ALTERNATIVE RECEIPTS (fine_receipt1) ---")
        cur.execute("SELECT acc_no, due_date, noday, rec_amt, paid FROM [dbo].[fine_receipt1] WHERE id_no = %s", (ROLL_NO,))
        rows = cur.fetchall()
        for r in rows:
            status = "PAID" if r['paid'] == 1 else "UNPAID"
            print(f"Acc No: {r['acc_no']} | Due Date: {r['due_date']} | Days: {r['noday']} | Rec Amt: ₹{r['rec_amt']} | Status: {status}")

        # 6. Check Category Rate
        print("\n--- [6] CATEGORY RATE (catagory) ---")
        cur.execute("""
            SELECT c.cat_name, c.fine_day 
            FROM [dbo].[personal] p 
            JOIN [dbo].[catagory] c ON p.cat_no = c.cat_no 
            WHERE p.id_no = %s
        """, (ROLL_NO,))
        r = cur.fetchone()
        if r:
            print(f"Category: {r['cat_name']} | System Rate: ₹{r['fine_day']} per day")

        conn.close()
    except Exception as e:
        print(f"❌ Error: {e}")

if __name__ == "__main__":
    find_all_possible_fines()
