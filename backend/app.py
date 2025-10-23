# app.py
from flask import Flask, request, jsonify
from modules import doubt_solver, recommendation, summarizer
from flask_cors import CORS
from modules import ml_models
# Initialize Flask app
app = Flask(__name__)

# ✅ Enable CORS before defining routes
CORS(app, resources={r"/*": {"origins": "*"}})

# -------------------------
# Routes
# -------------------------


@app.route("/student_pathway/<int:student_id>", methods=["GET"])
def student_pathway(student_id):
    topics = ml_models.predict_learning_pathway(student_id)
    return jsonify({"learning_pathway": topics})

@app.route("/performance_forecast/<int:student_id>", methods=["GET"])
def performance_forecast(student_id):
    forecast = ml_models.forecast_performance(student_id)
    return jsonify({"forecast": forecast})

@app.route("/weakness_predictor/<int:student_id>", methods=["GET"])
def weakness_predictor(student_id):
    result = ml_models.predict_weakness(student_id)
    return jsonify(result)




@app.route("/ask_doubt", methods=['POST'])
def ask_doubt_route():
    data = request.json
    if not data or 'student_name' not in data or 'question' not in data:
        return jsonify({"error": "Missing student_name or question"}), 400

    student_name = data['student_name']
    question = data['question']
    attachments = []

    # Optional attachments in base64 (if sent)
    for f in data.get('attachments', []):
        attachments.append((f['bytes'], f['filename']))

    response = doubt_solver.ask_doubt(student_name, question, attachments)
    return jsonify({"message": response})


@app.route("/respond_doubt", methods=['POST'])
def respond_doubt_route():
    data = request.json
    doubt_id = data.get('doubt_id')
    teacher_name = data.get('teacher_name')
    answer_text = data.get('answer_text')

    if not doubt_id or not teacher_name or not answer_text:
        return jsonify({"error": "Missing fields"}), 400

    response = doubt_solver.respond_to_doubt(doubt_id, teacher_name, answer_text)
    return jsonify({"message": response})


@app.route("/recommend_videos", methods=['GET'])
def recommend_videos_route():
    topic = request.args.get('topic')
    if not topic:
        return jsonify({"error": "Missing topic parameter"}), 400
    videos = recommendation.fetch_youtube_videos(topic)
    return jsonify({"videos": videos})




@app.route("/summarize_file", methods=['POST'])
def summarize_file_route():
    if 'file' not in request.files:
        return jsonify({"error": "No file provided"}), 400

    file = request.files['file']
    content = summarizer.summarize_file(file.read(), file.filename)
    return jsonify({"summary": content})


@app.route("/")
def home():
    return "🎓 Intelligent Student Assistant API is running!"


# -------------------------
# Run the app
# -------------------------
if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, debug=True)
