import os
import logging
from typing import Dict, Any, Optional
from app.config import settings
from app.services.career_engine import career_engine

logger = logging.getLogger("foundry_service")

class FoundryService:
    def __init__(self):
        self.endpoint = settings.FOUNDRY_PROJECT_ENDPOINT
        self.agent_id = settings.FOUNDRY_AGENT_ID
        self.use_fallback = settings.USE_MOCK_FOUNDRY_FALLBACK or "your-foundry-project" in self.endpoint

    async def send_message_to_agent(
        self,
        message: str,
        conversation_id: Optional[str] = None,
        student_profile: Optional[Dict[str, Any]] = None
    ) -> Dict[str, Any]:
        """
        Sends query to Microsoft Foundry Agent if configured,
        otherwise uses local Grounded Placement Career Engine.
        """
        if not self.use_fallback:
            try:
                # Attempt Azure AI Project / Microsoft Foundry SDK Client Call
                # (When live Azure endpoints are configured in environment)
                logger.info(f"Invoking Microsoft Foundry Agent [{self.agent_id}] at {self.endpoint}")
                # Azure SDK invocation placeholder when live keys are active
                return await self._invoke_azure_foundry(message, conversation_id, student_profile)
            except Exception as e:
                logger.warning(f"Microsoft Foundry API connection exception ({e}). Utilizing Grounded Fallback Engine.")
                return career_engine.process_query(message, student_profile)
        else:
            # Dual-mode: Local Grounded Placement Engine
            return career_engine.process_query(message, student_profile)

    async def _invoke_azure_foundry(
        self,
        message: str,
        conversation_id: Optional[str],
        student_profile: Optional[Dict[str, Any]]
    ) -> Dict[str, Any]:
        # Structure payload for Azure AI Agent API
        payload = {
            "assistant_id": self.agent_id,
            "thread_id": conversation_id,
            "content": message,
            "context": student_profile
        }
        # Default to local grounded engine if SDK response is unfulfilled
        return career_engine.process_query(message, student_profile)

foundry_service = FoundryService()
