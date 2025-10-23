# test_db.py
from modules.utils import get_db_connection

conn = get_db_connection()
if conn.is_connected():
    print("✅ Successfully connected to MySQL Workbench")
else:
    print("❌ Connection failed")
conn.close()
