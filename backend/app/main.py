from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from app.config import settings
from app.api import health, chat, companies, auth
from app.utils.exception_handlers import custom_http_exception_handler, generic_exception_handler

app = FastAPI(
    title="Intelligent Campus Career Agent API",
    description="FastAPI backend providing career placement analytics, Microsoft Foundry integration, user authentication, and skill preparation workflows.",
    version="1.0.0",
)

# Exception Handlers
app.add_exception_handler(HTTPException, custom_http_exception_handler)
app.add_exception_handler(Exception, generic_exception_handler)

# Configure CORS Middleware
origins = [origin.strip() for origin in settings.CORS_ORIGINS.split(",") if origin.strip()]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins if origins else ["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include Routers
app.include_router(health.router, prefix="/api")
app.include_router(auth.router, prefix="/api")
app.include_router(chat.router, prefix="/api")
app.include_router(companies.router, prefix="/api")

@app.get("/")
async def root():
    return {
        "message": "Welcome to Intelligent Campus Career Agent API",
        "docs": "/docs",
        "health": "/api/health"
    }

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("app.main:app", host=settings.HOST, port=settings.PORT, reload=True)
