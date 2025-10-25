# Use official Python image
FROM python:3.13-slim

# Set working directory inside container
WORKDIR /app

# Copy backend folder contents into container
COPY . /app

# Install dependencies
RUN pip install --upgrade pip
RUN pip install -r requirements.txt

# Expose port (optional, just documentation)
EXPOSE 5000

# Set environment variable for default port
ENV PORT 5000

# Run the app with gunicorn, listening on all interfaces and dynamic PORT
CMD gunicorn app:app --bind 0.0.0.0:$PORT --workers 1
