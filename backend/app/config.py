import os
from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    HOST: str = "0.0.0.0"
    PORT: int = 8000
    ENVIRONMENT: str = "development"
    LOG_LEVEL: str = "info"
    CORS_ORIGINS: str = "http://localhost:5173,http://127.0.0.1:5173"

    FOUNDRY_PROJECT_ENDPOINT: str = "https://your-foundry-project.cognitiveservices.azure.com/"
    FOUNDRY_AGENT_ID: str = "agent-campus-career-v1"
    FOUNDRY_AGENT_NAME: str = "CAMPUS-PLACEMENT-ASSISTENT"
    FOUNDRY_AGENT_VERSION: str = "2"
    FOUNDRY_API_KEY: str = ""
    FOUNDRY_API_VERSION: str = "2024-05-01-preview"

    AZURE_TENANT_ID: str = "placeholder-tenant-id"
    AZURE_CLIENT_ID: str = "placeholder-client-id"
    AZURE_CLIENT_SECRET: str = "placeholder-client-secret"

    PLACEMENT_DATA_PATH: str = "app/data/campus_placements.json"
    USE_MOCK_FOUNDRY_FALLBACK: bool = True

    class Config:
        env_file = ".env"
        env_file_encoding = "utf-8"
        extra = "ignore"

settings = Settings()
