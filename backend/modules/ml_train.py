import os
import pandas as pd
import pickle
from sklearn.ensemble import RandomForestClassifier
from sklearn.cluster import KMeans
from sklearn.linear_model import LinearRegression

# ✅ Create folders if missing
os.makedirs("models", exist_ok=True)
os.makedirs("sample_data", exist_ok=True)

# Load dataset
df = pd.read_csv("sample_data/StudentsPerformance.csv")

# --- Weakness Predictor ---
df['weak_flag'] = ((df['math score']<60) | (df['reading score']<60) | (df['writing score']<60)).astype(int)
X = df[['math score','reading score','writing score']]
y = df['weak_flag']

rf_model = RandomForestClassifier(n_estimators=100, random_state=42)
rf_model.fit(X, y)

# ✅ Save model files safely
pickle.dump(rf_model, open("models/weakness_predictor.pkl","wb"))

# --- Performance Forecasting ---
X_reg = df[['math score','reading score','writing score']]
y_reg = X_reg.sum(axis=1)
reg_model = LinearRegression()
reg_model.fit(X_reg, y_reg)
pickle.dump(reg_model, open("models/performance_forecast.pkl","wb"))

# --- Learning Pathways Clustering ---
kmeans = KMeans(n_clusters=3, random_state=42)
df['cluster'] = kmeans.fit_predict(X)
pickle.dump(kmeans, open("models/learning_pathway.pkl","wb"))

print("✅ All ML models trained and saved successfully!")
