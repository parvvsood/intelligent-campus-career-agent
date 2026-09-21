import uuid
from fastapi import APIRouter, HTTPException, status, Header
from typing import Optional
from app.models.user_models import (
    UserRegisterRequest,
    UserLoginRequest,
    UserProfileResponse,
    AuthResponse
)
from app.services.auth_service import auth_service

router = APIRouter()

def _to_profile_response(user: dict) -> UserProfileResponse:
    return UserProfileResponse(
        id=user["id"],
        email=user["email"],
        name=user["name"],
        rollNumber=user["rollNumber"],
        branch=user["branch"],
        cgpa=user["cgpa"],
        graduationYear=user["graduationYear"],
        skills=user.get("skills", []),
        preferredRoles=user.get("preferredRoles", []),
        preferredLocations=user.get("preferredLocations", [])
    )

@router.post("/auth/register", response_model=AuthResponse, status_code=status.HTTP_201_CREATED, tags=["Authentication"])
async def register_user(request: UserRegisterRequest):
    try:
        user_dict = request.model_dump()
        new_user = auth_service.register_user(user_dict)
        token = f"token-{new_user['id']}-{uuid.uuid4().hex[:6]}"
        return AuthResponse(
            token=token,
            user=_to_profile_response(new_user),
            message="User registration successful!"
        )
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Registration failed: {str(e)}")

@router.post("/auth/login", response_model=AuthResponse, tags=["Authentication"])
async def login_user(request: UserLoginRequest):
    user = auth_service.authenticate_user(request.email, request.password)
    if not user:
        raise HTTPException(status_code=401, detail="Invalid email or password.")

    token = f"token-{user['id']}-{uuid.uuid4().hex[:6]}"
    return AuthResponse(
        token=token,
        user=_to_profile_response(user),
        message="Login successful!"
    )

@router.get("/auth/me", response_model=UserProfileResponse, tags=["Authentication"])
async def get_current_user(email: Optional[str] = None):
    target_email = email or "alex@campus.edu"
    user = auth_service.get_user_by_email(target_email)
    if not user:
        raise HTTPException(status_code=404, detail="User profile not found.")
    return _to_profile_response(user)
