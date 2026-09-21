import pytest
from fastapi.testclient import TestClient
from app.main import app

client = TestClient(app)

def test_health_endpoint():
    response = client.get("/api/health")
    assert response.status_code == 200
    data = response.json()
    assert data["status"] == "healthy"
    assert "Intelligent Campus Career Agent" in data["service"]

def test_companies_endpoint():
    response = client.get("/api/companies")
    assert response.status_code == 200
    data = response.json()
    assert "companies" in data
    assert data["count"] >= 5

def test_chat_endpoint_valid_query():
    payload = {
        "message": "Which companies hire for Data Analyst roles?",
        "conversation_id": "test-session-123",
        "student_profile": {
            "name": "QA Tester",
            "branch": "Computer Science & Engineering",
            "cgpa": 8.5
        }
    }
    response = client.post("/api/chat", json=payload)
    assert response.status_code == 200
    data = response.json()
    assert "answer" in data
    assert data["conversation_id"] == "test-session-123"
    assert "metadata" in data

def test_chat_endpoint_empty_query():
    payload = {"message": "   "}
    response = client.post("/api/chat", json=payload)
    assert response.status_code == 400
