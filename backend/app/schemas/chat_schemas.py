from pydantic import BaseModel, Field
from typing import Optional, Dict, Any, List

class StudentProfileSchema(BaseModel):
    name: Optional[str] = "Student"
    branch: Optional[str] = "Computer Science & Engineering"
    cgpa: Optional[float] = 8.0
    graduationYear: Optional[int] = 2026
    skills: Optional[List[str]] = []
    preferredRoles: Optional[List[str]] = []
    preferredLocations: Optional[List[str]] = []

class ChatRequest(BaseModel):
    message: str = Field(..., example="Which companies hire for Data Analyst roles?")
    conversation_id: Optional[str] = Field(None, example="session-101")
    student_profile: Optional[StudentProfileSchema] = None

class ChatResponse(BaseModel):
    answer: str
    conversation_id: str
    metadata: Dict[str, Any] = {}
