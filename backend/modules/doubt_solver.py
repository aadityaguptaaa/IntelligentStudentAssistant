# modules/doubt_solver.py
import io
from PIL import Image
import pytesseract
import PyPDF2
from sentence_transformers import SentenceTransformer, util
import google.generativeai as genai
from config import GEMINI_API_KEY

# Configure Gemini API key
genai.configure(api_key=GEMINI_API_KEY)
model_gemini = genai.GenerativeModel("gemini-2.0-flash")

# Embedder for semantic similarity
embedder = SentenceTransformer('all-MiniLM-L6-v2')

# In-memory database for doubts (replace with proper DB later)
doubt_db = []
last_doubt_id = 0  # Track the latest doubt ID

def extract_text(file_bytes, filename):
    filename = filename.lower()
    if filename.endswith(".pdf"):
        reader = PyPDF2.PdfReader(io.BytesIO(file_bytes))
        text = ""
        for page in reader.pages:
            text += page.extract_text() or ""
        return text
    elif filename.endswith((".jpg", ".jpeg", ".png")):
        image = Image.open(io.BytesIO(file_bytes))
        return pytesseract.image_to_string(image)
    else:
        return file_bytes.decode("utf-8", errors="ignore")

def ask_doubt(student_name, question_text, attachments=[], teacher_id=None, visibility='public'):
    global last_doubt_id

    # Extract text from attachments
    full_text = question_text
    for file_bytes, filename in attachments:
        full_text += "\n" + extract_text(file_bytes, filename)

    last_doubt_id += 1
    doubt_db.append({
        "id": last_doubt_id,
        "student": student_name,
        "question": full_text,
        "answer": None,
        "teacher_id": teacher_id,
        "attachments": [f[1] for f in attachments],
        "visibility": visibility
    })

    # Always generate a response using Gemini model
    try:
        prompt = f"Answer the student doubt in clear, simple language:\n{full_text}"
        response = model_gemini.generate_content(prompt)
        answer_text = response.text
    except Exception as e:
        answer_text = f"Could not generate answer automatically: {str(e)}"

    # Save the answer
    doubt_db[-1]['answer'] = answer_text
    return f"Doubt submitted successfully with ID {last_doubt_id}. Answer: {answer_text}"

def respond_to_doubt(doubt_id, teacher_name, answer_text, attachments=[]):
    doubt = next((d for d in doubt_db if d['id'] == doubt_id), None)
    if not doubt:
        return "Doubt ID not found"

    doubt['answer'] = answer_text
    doubt['teacher_name'] = teacher_name
    doubt['attachments'].extend([f[1] for f in attachments])
    return f"Response submitted for doubt ID {doubt_id}"
