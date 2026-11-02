from fastapi import FastAPI
from pydantic import BaseModel
from typing import List
from uuid import uuid4

app = FastAPI(
    title="UrbanEye API",
    description="AI-Powered Urban Infrastructure Intelligence System",
    version="1.0.0"
)

# Temporary storage for complaints
complaints = []


# Complaint data structure
class Complaint(BaseModel):
    category: str
    location: str
    description: str


# Home endpoint
@app.get("/")
def home():
    return {
        "message": "Welcome to UrbanEye API!",
        "status": "running"
    }


# Health check
@app.get("/health")
def health_check():
    return {
        "status": "healthy"
    }


# Submit a citizen complaint
@app.post("/complaints")
def submit_complaint(complaint: Complaint):
    new_complaint = {
        "id": str(uuid4()),
        "category": complaint.category,
        "location": complaint.location,
        "description": complaint.description,
        "status": "Pending"
    }

    complaints.append(new_complaint)

    return {
        "message": "Complaint submitted successfully!",
        "complaint": new_complaint
    }


# View all complaints
@app.get("/complaints")
def get_complaints():
    return {
        "total": len(complaints),
        "complaints": complaints
    }