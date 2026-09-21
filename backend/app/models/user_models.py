from pydantic import BaseModel, Field, EmailStr
from typing import Optional, List

class UserRegisterRequest(BaseModel):
    email: str
    password: str
    name: str
    rollNumber: str
    branch: str = "Computer Science & Engineering"
    specialization: Optional[str] = "Core Stream / General"
    cgpa: float = 8.0
    graduationYear: int = 2028
    skills: List[str] = []
    preferredRoles: List[str] = []
    preferredLocations: List[str] = []

class UserLoginRequest(BaseModel):
    email: str
    password: str

class UserProfileUpdateRequest(BaseModel):
    email: str
    name: Optional[str] = None
    rollNumber: Optional[str] = None
    branch: Optional[str] = None
    specialization: Optional[str] = None
    cgpa: Optional[float] = None
    graduationYear: Optional[int] = None
    skills: Optional[List[str]] = None
    preferredRoles: Optional[List[str]] = None
    preferredLocations: Optional[List[str]] = None

class UserProfileResponse(BaseModel):
    id: str
    email: str
    name: str
    rollNumber: str
    branch: str
    specialization: Optional[str] = "Core Stream / General"
    cgpa: float
    graduationYear: int
    skills: List[str]
    preferredRoles: List[str]
    preferredLocations: List[str]

class AuthResponse(BaseModel):
    token: str
    user: UserProfileResponse
    message: str = "Authentication successful"
