# Use an official Python runtime as a parent image
FROM python:3.12-slim

# Set the working directory in the container
WORKDIR /app

# Install system dependencies including Pango
RUN apt-get update && apt-get install -y \
    libpango1.0-dev \
    libglib2.0-0 \
    libgdk-pixbuf2.0-0 \
    libcairo2 \
    libfontconfig1

# Copy the current directory contents into the container at /app
COPY . /app

# Install Python dependencies
RUN pip install --no-cache-dir -r requirements.txt

# Expose port 80
EXPOSE 80

# Command to run the application
CMD ["python", "manage.py", "runserver", "0.0.0.0:8000"]
