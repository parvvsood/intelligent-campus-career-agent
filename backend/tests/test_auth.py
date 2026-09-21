import time
import pytest
from fastapi.testclient import TestClient
from app.main import app

client = TestClient(app)

def test_register_and_login():
    unique_email = f"teststudent_{int(time.time())}@campus.edu"
    reg_payload = {
        "email": unique_email,
        "password": "securepassword123",
        "name": "Test Student",
        "rollNumber": "2210999999",
        "branch": "Computer Science & Engineering",
        "cgpa": 8.9,
        "graduationYear": 2026,
        "skills": ["Python", "SQL", "React", "FastAPI", "Machine Learning"],
        "preferredRoles": ["Data Analyst", "SDE"],
        "preferredLocations": ["Bangalore", "Gurugram"]
    }
    # Test Register
    response = client.post("/api/auth/register", json=reg_payload)
    assert response.status_code == 201
    data = response.json()
    assert "token" in data
    assert data["user"]["email"] == unique_email
    assert data["user"]["rollNumber"] == "2210999999"
    assert len(data["user"]["skills"]) == 5

    # Test Login
    login_payload = {
        "email": unique_email,
        "password": "securepassword123"
    }
    login_response = client.post("/api/auth/login", json=login_payload)
    assert login_response.status_code == 200
    login_data = login_response.json()
    assert login_data["user"]["name"] == "Test Student"

