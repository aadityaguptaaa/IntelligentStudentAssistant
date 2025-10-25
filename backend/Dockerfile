# Example Dockerfile Snippet
WORKDIR /app/
# Copy both backend and frontend, or just the necessary backend parts
COPY . /app/

# The command should then correctly resolve 'backend.app'
CMD ["gunicorn", "backend.app:app", "-b", "0.0.0.0:8080"]
