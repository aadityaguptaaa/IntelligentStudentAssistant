# Use official Python 3.13 image
FROM python:3.13-slim

# Set working directory
WORKDIR /app

# Copy backend code
COPY . /app

# Upgrade pip
RUN python -m pip install --upgrade pip

# Install dependencies
RUN pip install -r requirements.txt

# Expose the port (Render uses $PORT environment variable)
ENV PORT 10000
EXPOSE $PORT

# Command to run the app with Gunicorn
CMD ["gunicorn", "--bind", "0.0.0.0:$PORT", "app:app", "--workers=3"]
