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
            return pymssql.connect(
                server=DB_SERVER, user=DB_USER, password=DB_PASSWORD,
                database=DB_NAME, port=1433, login_timeout=10,
                charset="UTF-8", tds_version=tds
            )
        except Exception:
            if tds == "7.2":
                raise
            continue

def debug_fine_calc():
    try:
        conn = mssql_connect()
        cur = conn.cursor(as_dict=True)

        print(f"==================================================")
        print(f"🔍 DEEP FINE CALCULATION DEBUGGER FOR: {ROLL_NO}")
        print(f"==================================================")

        # 1. Get controls
        cur.execute("SELECT skip_sunday, skip_holiday, fine_slab FROM [dbo].[controls]")
        ctrl = cur.fetchone() or {}
        skip_sunday = (ctrl.get("skip_sunday", 0) == 1)
        skip_holiday = (ctrl.get("skip_holiday", 0) == 1)

        print(f"📋 SETTINGS:")
        print(f"   Skip Sunday: {'YES' if skip_sunday else 'NO'}")
        print(f"   Skip Holiday: {'YES' if skip_holiday else 'NO'}")
        
        # 2. Get holidays
        holidays = {}
        cur.execute("SELECT holy_date, holy_reason FROM [dbo].[holiday]")
        for h in cur.fetchall():
            hd = h.get("holy_date")
            reason = h.get("holy_reason") or "Holiday"
            if hd:
                if isinstance(hd, datetime.datetime):
                    holidays[hd.date()] = reason
                elif isinstance(hd, datetime.date):
                    holidays[hd] = reason
                    
        # 3. Get server date
        cur.execute("SELECT GETDATE() AS server_date")
        server_date_row = cur.fetchone()
        end_date = server_date_row['server_date'].date()
        print(f"   Server Date (Today): {end_date}")
        
        # 4. Get Student Data
        cur.execute("""
            SELECT p.name, c.cat_name, c.fine_day 
            FROM [dbo].[personal] p 
            JOIN [dbo].[catagory] c ON p.cat_no = c.cat_no 
            WHERE p.id_no = %s
        """, (ROLL_NO,))
        person = cur.fetchone()
        if not person:
            print("Student not found!")
            return
            
        rate_per_day = person['fine_day'] or 0
        print(f"   Student: {person['name']} | Category: {person['cat_name']} | Rate: ₹{rate_per_day}/day")
        print(f"==================================================\n")

        # 5. Get Book Circle
        cur.execute("SELECT acc_no, due_date, fine_cancel, cancel_time FROM [dbo].[book_circle] WHERE id_no = %s", (ROLL_NO,))
        books = cur.fetchall()
        
        if not books:
            print("No books currently issued to this student.")
            return

        for b in books:
            acc_no = b['acc_no']
            due_date = b['due_date']
            fine_cancel_amt = b.get('fine_cancel') or 0
            
            if not due_date:
                continue
                
            if isinstance(due_date, datetime.datetime):
                due_date = due_date.date()
                
            print(f"📖 BOOK ACC NO: {acc_no}")
            print(f"   Due Date: {due_date}")
            print(f"   Fine Cancel in DB: {fine_cancel_amt} (Might be subtracted from fine)")
            print(f"   --- Breakdown of Excluded Days ---")
            
            if due_date >= end_date:
                print("   Book is not overdue yet.")
                print(f"==================================================\n")
                continue
                
            chargeable_days = 0
            current_date = due_date + datetime.timedelta(days=1)
            
            total_raw_days = (end_date - due_date).days
            
            excluded_sundays = 0
            excluded_holidays = 0
            
            # Loop through every single day
            while current_date <= end_date:
                is_sunday = (current_date.weekday() == 6)
                is_holiday = (current_date in holidays)
                
                status = "CHARGED"
                reason = ""
                
                if skip_sunday and is_sunday:
                    status = "EXCLUDED"
                    reason = "[Sunday]"
                    excluded_sundays += 1
                elif skip_holiday and is_holiday:
                    status = "EXCLUDED"
                    reason = f"[Holiday: {holidays[current_date]}]"
                    excluded_holidays += 1
                else:
                    chargeable_days += 1
                    
                if status == "EXCLUDED":
                    print(f"   {current_date.strftime('%Y-%m-%d')} ({current_date.strftime('%A')}): {status} {reason}")
                    
                current_date += datetime.timedelta(days=1)
            
            # Calculate final fine
            calculated_initial_fine = chargeable_days * rate_per_day
            final_fine = calculated_initial_fine - fine_cancel_amt
            if final_fine < 0:
                final_fine = 0
                
            print(f"   ----------------------------")
            print(f"   Total Raw Days Overdue:  {total_raw_days}")
            print(f"   (-) Excluded Sundays:    {excluded_sundays}")
            print(f"   (-) Excluded Holidays:   {excluded_holidays}")
            print(f"   (=) Chargeable Days:     {chargeable_days}")
            print(f"   (x) Rate:                ₹{rate_per_day}")
            print(f"   ----------------------------")
            print(f"   Initial Fine:            ₹{calculated_initial_fine}")
            print(f"   (-) fine_cancel col:     ₹{fine_cancel_amt}")
            print(f"   (=) FINAL FINE VALUE:    ₹{final_fine}")
            print(f"==================================================\n")

        conn.close()
    except Exception as e:
        print(f"❌ Error: {e}")

if __name__ == "__main__":
    debug_fine_calc()
