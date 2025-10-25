# 🎓 AI-Powered Student Dashboard: Personalized Learning & Performance Forecasting

| Component | Status | Environment | License |
| :---: | :---: | :---: | :---: |
| **Backend (API + ML)** | Python / FastAPI | [![Python](https://img.shields.io/badge/Python-3.11+-blue.svg)](https://www.python.org/) | [![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE) |
| **Frontend (UI)** | React / TypeScript | [![React](https://img.shields.io/badge/React-TS-61DAFB.svg)](https://react.dev/) | [![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=flat&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/) |
| **ML Models** | Scikit-learn / Pickle | [![Scikit-learn](https://img.shields.io/badge/scikit--learn-F7931E.svg?logo=scikit-learn&logoColor=white)](https://scikit-learn.org/) | |

## ✨ Project Overview

This is a **Full-Stack, AI-Integrated Student Dashboard** designed to modernize the learning experience by providing personalized guidance and performance forecasting. It moves beyond static content delivery, utilizing **Machine Learning** models to analyze student input, predict academic outcomes, and deliver hyper-relevant study materials and tools.

The application serves as a central hub for continuous self-assessment, targeted study, and academic support.

***

## 🚀 Key Features & AI Modules

The project is driven by several interconnected components, focusing on prediction and personalization:

### 1. Skill Assessment & Performance Forecasting
* **Dynamic Quiz:** Students complete a quick assessment in a specific domain (e.g., DSA, Web Development).
* **Predictive Insights:** The system feeds the assessment results into a trained **Performance Forecast Model (`performance_forecast.pkl`)** to predict a normalized score (0-100) and highlight the student's **Critical Weakness** area.

### 2. Personalized Learning Pathway
* **Targeted Recommendations:** The assessment output is used by the **Learning Pathway Model (`learning_pathway.pkl`)** to filter and recommend curated YouTube videos and resources, ensuring the content difficulty matches the student's assessed proficiency (Beginner, Intermediate, Advanced).

### 3. AI Support Tools
* **Doubt Solver (`doubt_solver.py`):** An integrated module for students to ask questions and receive instant, context-aware answers.
* **Notes Summarizer (`summarizer.py`):** Allows students to paste large blocks of lecture notes or text to generate concise summaries, promoting efficient review and test preparation.

***

## ⚙️ Tech Stack & Architecture

The project is separated into robust backend and user-friendly frontend applications.

### Backend & Machine Learning (Python/FastAPI)

* **API Framework:** **FastAPI** for high-performance, asynchronous endpoints.
* **ML Engine:** **Python (3.11+), Scikit-learn, Pandas**.
* **Model Deployment:** Trained models are serialized using **Pickle** and loaded directly into the `app.py` service via the `ml_models.py` module for real-time prediction upon quiz completion.
* **Structure:** Core logic for data handling, ML inference, and utility functions resides in the modular `modules/` directory.

### Frontend (React/TypeScript)

* **Framework:** **React** powered by **Vite** for fast development and build times.
* **Language:** **TypeScript** ensures robust, scalable, and type-safe component logic.
* **Styling:** **Tailwind CSS** provides a modern, utility-first approach for responsive and polished UI design.
* **Data Flow:** The `frontend/src/api/client.ts` handles communication with the FastAPI backend.

***

## 📂 Project Structure
```
├── backend/ # Python API, ML Models, and Logic
│   ├── app.py # FastAPI entry point
│   ├── models/ # Trained ML models (.pkl files)
│   ├── modules/ # Core business/ML logic (e.g., ml_models.py, summarizer.py)
│   ├── requirements.txt # Python dependencies
│   └── sample_data/ # Data used for training (e.g., StudentsPerformance.csv)
├── frontend/ # React/TypeScript User Interface
│   ├── src/
│   │   ├── components/ # UI building blocks (Dashboard, SkillsAssessment)
│   │   └── pages/ # Application views (StudentDashboard, SubjectQuiz)
│   └── package.json # Frontend dependencies
└── LICENSE # MIT License
```

***

## 🛠️ Local Setup Guide

Follow these steps to get the development environment running on your machine.

### 1. Prerequisites
* Python 3.11+
* Node.js (LTS)

### 2. Backend Installation & Setup

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/aadityaguptaaa/IntelligentStudentAssistant
    cd IntelligentStudentAssistant/backend
    ```
2.  **Create and activate a virtual environment:**
    ```bash
    python -m venv venv
    source venv/bin/activate  # On Windows: .\venv\Scripts\activate
    ```
3.  **Install dependencies:**
    ```bash
    pip install -r requirements.txt
    ```
4.  **Train and save the ML Models:**
    ```bash
    python modules/ml_train.py
    ```
5.  **Run the Backend Server:**
    ```bash
    uvicorn app:app --reload
    # Server running on: [http://127.0.0.1:8000](http://127.0.0.1:8000)
    ```

### 3. Frontend Installation & Setup

1.  **Open a new terminal and navigate to the frontend directory:**
    ```bash
    cd IntelligentStudentAssistant/frontend
    ```
2.  **Install Node dependencies:**
    ```bash
    npm install
    ```
3.  **Run the Frontend Development Server:**
    ```bash
    npm run dev
    # App running on: http://localhost:5173 (or similar)
    ```

***

## 📬 Contact

© 2025 **Aaditya Gupta**

If you want to contact me, you can reach me through the below handle:

* **LinkedIn:** [https://www.linkedin.com/in/aadityaxgupta/](https://www.linkedin.com/in/aadityaxgupta/)
