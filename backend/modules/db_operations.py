# db_operations.py
from modules.utils import get_db_connection

# ------------------------------
# STUDENT OPERATIONS
# ------------------------------
def add_student(name, email, class_name, learning_style=None, average_score=None):
    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute("""
        INSERT INTO students (name, email, class, learning_style, average_score)
        VALUES (%s, %s, %s, %s, %s)
    """, (name, email, class_name, learning_style, average_score))
    conn.commit()
    student_id = cursor.lastrowid
    cursor.close()
    conn.close()
    return student_id

def get_student(student_id):
    conn = get_db_connection()
    cursor = conn.cursor(dictionary=True)
    cursor.execute("SELECT * FROM students WHERE id = %s", (student_id,))
    student = cursor.fetchone()
    cursor.close()
    conn.close()
    return student

# ------------------------------
# TEACHER OPERATIONS
# ------------------------------
def add_teacher(name, email, subject):
    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute("""
        INSERT INTO teachers (name, email, subject)
        VALUES (%s, %s, %s)
    """, (name, email, subject))
    conn.commit()
    teacher_id = cursor.lastrowid
    cursor.close()
    conn.close()
    return teacher_id

def get_teacher(teacher_id):
    conn = get_db_connection()
    cursor = conn.cursor(dictionary=True)
    cursor.execute("SELECT * FROM teachers WHERE id = %s", (teacher_id,))
    teacher = cursor.fetchone()
    cursor.close()
    conn.close()
    return teacher

# ------------------------------
# DOUBT OPERATIONS
# ------------------------------
def submit_doubt(student_id, question, teacher_id=None, visibility='public', attachments=None):
    attachments_str = ",".join(attachments) if attachments else None
    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute("""
        INSERT INTO doubts (student_id, teacher_id, question, visibility, attachments)
        VALUES (%s, %s, %s, %s, %s)
    """, (student_id, teacher_id, question, visibility, attachments_str))
    conn.commit()
    doubt_id = cursor.lastrowid
    cursor.close()
    conn.close()
    return doubt_id

def answer_doubt(doubt_id, answer_text, teacher_name):
    conn = get_db_connection()
    cursor = conn.cursor()
    # Get teacher_id from name
    cursor.execute("SELECT id FROM teachers WHERE name = %s", (teacher_name,))
    teacher = cursor.fetchone()
    teacher_id = teacher[0] if teacher else None
    cursor.execute("""
        UPDATE doubts 
        SET answer = %s, teacher_id = %s
        WHERE id = %s
    """, (answer_text, teacher_id, doubt_id))
    conn.commit()
    cursor.close()
    conn.close()
    return True

def get_doubts(student_id=None, teacher_id=None, visibility='public'):
    conn = get_db_connection()
    cursor = conn.cursor(dictionary=True)
    query = "SELECT * FROM doubts WHERE 1=1"
    params = []
    if student_id:
        query += " AND student_id=%s"
        params.append(student_id)
    if teacher_id:
        query += " AND teacher_id=%s"
        params.append(teacher_id)
    if visibility:
        query += " AND visibility=%s"
        params.append(visibility)
    cursor.execute(query, params)
    doubts = cursor.fetchall()
    cursor.close()
    conn.close()
    return doubts

# ------------------------------
# LEARNING PROGRESS (ML Tracking)
# ------------------------------
def add_learning_progress(student_id, topic, quiz_score, time_spent, doubts_asked, weak_flag):
    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute("""
        INSERT INTO learning_progress (student_id, topic, quiz_score, time_spent, doubts_asked, weak_flag)
        VALUES (%s, %s, %s, %s, %s, %s)
    """, (student_id, topic, quiz_score, time_spent, doubts_asked, weak_flag))
    conn.commit()
    cursor.close()
    conn.close()
    return True
