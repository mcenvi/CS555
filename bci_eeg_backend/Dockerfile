# Use a base image with the desired runtime environment
FROM python:3.11.5-slim

# Set the working directory inside the container
WORKDIR /app

# Copy the backend service code to the container
COPY . /app

# Install the required dependencies
RUN pip install --no-cache-dir torch fastapi numpy uvicorn pytest pytest-asyncio httpx

# Expose the port on which the backend service will run
EXPOSE 8080

# Start the backend service
CMD ["python", "app.py"]
