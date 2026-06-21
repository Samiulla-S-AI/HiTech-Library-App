import sqlite3
import os

SCRIPT_DIR = r"c:\Users\samiu\OneDrive\Desktop\Library_App\api_bridge"
LOCAL_DB_PATH = os.path.join(SCRIPT_DIR, "librarian_mailer.db")

try:
    conn = sqlite3.connect(LOCAL_DB_PATH, timeout=20)
    c = conn.cursor()
    c.execute(
        "INSERT INTO sent_history(roll_no,name,email,mail_type,subject,sent_at,details) VALUES(?,?,?,?,?,?,?)",
        ("TEST_ROLL", "Test Name", "test@test.com", "test_mail", "Test Subject",
         "2026-03-25 12:00:00", "test details")
    )
    conn.commit()
    conn.close()
    print("SUCCESS")
except Exception as e:
    import traceback
    traceback.print_exc()
    print("FAILED:", e)
