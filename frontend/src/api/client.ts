import axios from "axios";

const API_BASE_URL = "http://127.0.0.1:5000";

export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: { "Accept": "application/json" },
});

// ---- ASK DOUBT ----
export const askDoubt = async (studentName: string, question: string, file?: File) => {
  const data: any = {
    student_name: studentName,
    question,
  };

  if (file) {
    const fileBytes = await file.arrayBuffer();
    const base64String = btoa(String.fromCharCode(...new Uint8Array(fileBytes)));
    data.attachments = [{ bytes: base64String, filename: file.name }];
  }

  return apiClient.post("/ask_doubt", data);
};

// ---- RESPOND TO DOUBT ----
export const respondDoubt = async (doubtId: string, teacherName: string, answerText: string) => {
  return apiClient.post("/respond_doubt", {
    doubt_id: doubtId,
    teacher_name: teacherName,
    answer_text: answerText,
  });
};

// ---- FETCH DOUBTS ----
export const fetchDoubts = async (studentId?: string, teacherId?: string, visibility?: string) => {
  const params: any = {};
  if (studentId) params.student_id = studentId;
  if (teacherId) params.teacher_id = teacherId;
  if (visibility) params.visibility = visibility;

  return apiClient.get("/get_doubts", { params });
};

// ---- SUMMARIZE FILE ----
export const summarizeFile = async (file: File) => {
  const formData = new FormData();
  formData.append("file", file);
  return apiClient.post("/summarize_file", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
};

// ---- RECOMMEND VIDEOS ----
export const recommendVideos = async (topic: string) => {
  return apiClient.get("/recommend_videos", { params: { topic } });
};

// ---- PERFORMANCE & WEAKNESS PREDICTION ----
export const getLearningPathway = async (studentId: string) => {
  return apiClient.get("/learning_pathway", { params: { student_id: studentId } });
};

export const getPerformanceForecast = async (studentId: string) => {
  return apiClient.get("/performance_forecast", { params: { student_id: studentId } });
};

export const getWeaknessPrediction = async (studentId: string) => {
  return apiClient.get("/weakness_prediction", { params: { student_id: studentId } });
};
