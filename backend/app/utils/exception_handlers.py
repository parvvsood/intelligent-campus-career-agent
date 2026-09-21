from fastapi import Request, status
from fastapi.responses import JSONResponse
import logging

logger = logging.getLogger("api_exceptions")

async def custom_http_exception_handler(request: Request, exc):
    logger.error(f"HTTP Error {exc.status_code} on {request.url.path}: {exc.detail}")
    return JSONResponse(
        status_code=exc.status_code,
        content={
            "error": True,
            "status_code": exc.status_code,
            "message": exc.detail or "An error occurred while processing your request.",
            "path": request.url.path
        }
    )

async def generic_exception_handler(request: Request, exc: Exception):
    logger.error(f"Unhandled Server Exception on {request.url.path}: {str(exc)}")
    return JSONResponse(
        status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
        content={
            "error": True,
            "status_code": 500,
            "message": "Internal server error. The career agent engine is recovering gracefully.",
            "path": request.url.path
        }
    )
