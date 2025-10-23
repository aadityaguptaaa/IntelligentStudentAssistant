# modules/summarizer.py
import google.generativeai as genai
import PyPDF2, io
from PIL import Image
import pytesseract
from config import GEMINI_API_KEY

genai.configure(api_key=GEMINI_API_KEY)
model_summarizer = genai.GenerativeModel("gemini-2.0-flash")

def summarize_file(file_bytes, filename):
    try:
        filename = filename.lower()
        if filename.endswith(".pdf"):
            reader = PyPDF2.PdfReader(io.BytesIO(file_bytes))
            text = ""
            for page in reader.pages:
                text += page.extract_text() or ""
        elif filename.endswith((".jpg", ".jpeg", ".png")):
            image = Image.open(io.BytesIO(file_bytes))
            text = pytesseract.image_to_string(image)
        else:
            text = file_bytes.decode("utf-8", errors="ignore")

        prompt = f"Summarize the following content in simple language with bullet points:\n{text[:8000]}"
        response = model_summarizer.generate_content(prompt)
        return response.text
    except Exception as e:
        return f"Failed to summarize file: {str(e)}"
