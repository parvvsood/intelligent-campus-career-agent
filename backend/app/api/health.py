from fastapi import APIRouter
from app.config import settings

router = APIRouter()

@router.get("/health", tags=["Health"])
async def health_check():
    return {
        "status": "healthy",
        "service": "Intelligent Campus Career Agent API",
        "environment": settings.ENVIRONMENT,
        "foundry_integration": "active" if not settings.USE_MOCK_FOUNDRY_FALLBACK else "mock_fallback_active",
        "version": "1.0.0"
    }
