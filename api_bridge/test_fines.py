import os
import datetime
import pymssql

# Load database configuration from .env or use defaults
DB_SERVER = "172.16.0.114"
DB_NAME = "lips5_sql"
DB_USER = "LibraryUserReader1"
DB_PASSWORD = "hitlibrary@123"

def mssql_connect():
    clean_server = DB_SERVER.split(',')[0].strip()
    for tds in ["7.0", "7.1", "7.2"]:
        try:
            print(f"📡 Connecting to {clean_server} (TDS: {tds})...")
            return pymssql.connect(
                server=clean_server, 
                user=DB_USER, 
                password=DB_PASSWORD,
                database=DB_NAME, 
                port=1433, 
                login_timeout=10, 
                charset="UTF-8",
                tds_version=tds
            )
        except Exception:
            pass
    print("❌ Connection failed!")
    return None

def check_fines():
    conn = mssql_connect()
    if not conn:
        return
    
    cur = conn.cursor(as_dict=True)

    print("\n--- 📝 LIBRARY CONTROL SETTINGS ---")
    cur.execute("SELECT skip_sunday, skip_holiday, fine_slab FROM [dbo].[controls]")
    ctrl = cur.fetchone() or {}
    print(f"Skip Sunday: {ctrl.get('skip_sunday')}")
    print(f"Skip Holiday: {ctrl.get('skip_holiday')}")
    print(f"Use Fine Slab: {ctrl.get('fine_slab')}")

    print("\n--- 📅 RECENT HOLIDAYS ---")
    cur.execute("SELECT TOP 5 holy_date FROM [dbo].[holiday] ORDER BY holy_date DESC")
    holidays = cur.fetchall()
    for h in holidays:
        print(f"Holiday: {h.get('holy_date')}")

    print("\n--- 💰 FINE SLABS ---")
    cur.execute("SELECT * FROM [dbo].[fine_slab] ORDER BY cat_no, day_from")
    slabs = cur.fetchall()
    for s in slabs:
        print(f"CatNo: {s.get('cat_no')} | Days: {s.get('day_from')} to {s.get('day_to')} | Amt: ₹{s.get('day_amt')}")

    print("\n--- 📚 SAMPLE OVERDUE BOOKS ---")
    query = """
        SELECT TOP 10
            bc.id_no,
            p.name,
            b.title,
            bc.due_date,
            DATEDIFF(day, bc.due_date, GETDATE()) AS raw_days_overdue,
            c.cat_name,
            c.fine_day AS fixed_fine_rate,
            c.cat_no
        FROM [dbo].[book_circle] bc
        LEFT JOIN [dbo].[book]       b  ON bc.acc_no = CAST(b.acc_no AS VARCHAR)
        LEFT JOIN [dbo].[personal]   p  ON bc.id_no  = p.id_no
        LEFT JOIN [dbo].[catagory]   c  ON p.cat_no  = c.cat_no
        WHERE bc.due_date < CAST(GETDATE() AS DATE)
        ORDER BY bc.due_date DESC
    """
    cur.execute(query)
    rows = cur.fetchall()
    
    today = datetime.date.today()
    for r in rows:
        print("-" * 50)
        print(f"Student: {r['name']} ({r['id_no']})")
        print(f"Book: {r['title']}")
        print(f"Due Date: {r['due_date']}")
        print(f"Raw Days Overdue: {r['raw_days_overdue']}")
        print(f"Category: {r['cat_name']} (Cat No: {r['cat_no']})")
        print(f"Fixed Fine Rate: ₹{r['fixed_fine_rate']} per day")
        print("-" * 50)

    conn.close()
    
if __name__ == "__main__":
    check_fines()
