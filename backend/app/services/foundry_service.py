import os
import time
import logging
from typing import Dict, Any, Optional
from azure.core.credentials import AccessToken
from app.config import settings
from app.services.career_engine import career_engine

logger = logging.getLogger("foundry_service")


class KeyTokenCredential:
    """Credential adapter for Azure AI Projects SDK using API Key."""
    def __init__(self, key: str):
        self.key = key

    def get_token(self, *scopes, **kwargs) -> AccessToken:
        return AccessToken(self.key, int(time.time()) + 3600)


class FoundryService:
    def __init__(self):
        self.endpoint = settings.FOUNDRY_PROJECT_ENDPOINT
        self.agent_id = settings.FOUNDRY_AGENT_ID
        self.agent_name = settings.FOUNDRY_AGENT_NAME
        self.agent_version = settings.FOUNDRY_AGENT_VERSION
        self.api_key = settings.FOUNDRY_API_KEY
        self.use_fallback = (
            settings.USE_MOCK_FOUNDRY_FALLBACK
            or "your-foundry-project" in self.endpoint
            or not self.api_key
        )
        self._project_client = None
        self._openai_client = None

    def _get_openai_client(self):
        if self._openai_client is None:
            from azure.ai.projects import AIProjectClient
            credential = KeyTokenCredential(self.api_key)
            self._project_client = AIProjectClient(
                endpoint=self.endpoint,
                credential=credential
            )
            self._openai_client = self._project_client.get_openai_client()
        return self._openai_client

    async def send_message_to_agent(
        self,
        message: str,
        conversation_id: Optional[str] = None,
        student_profile: Optional[Dict[str, Any]] = None
    ) -> Dict[str, Any]:
        """
        Sends query to Microsoft AI Foundry Agent if active,
        otherwise fails over seamlessly to local Grounded Placement Engine.
        """
        if not self.use_fallback:
            try:
                logger.info(f"Invoking Azure AI Foundry Agent [{self.agent_name}:{self.agent_version}] at {self.endpoint}")
                return await self._invoke_azure_foundry(message, conversation_id, student_profile)
            except Exception as e:
                logger.warning(f"Microsoft Foundry API exception ({e}). Failing over to Grounded Placement Engine.")
                res = career_engine.process_query(message, student_profile)
                if "metadata" in res and isinstance(res["metadata"], dict):
                    res["metadata"]["fallback_reason"] = str(e)
                return res
        else:
            return career_engine.process_query(message, student_profile)

    async def _invoke_azure_foundry(
        self,
        message: str,
        conversation_id: Optional[str],
        student_profile: Optional[Dict[str, Any]]
    ) -> Dict[str, Any]:
        openai_client = self._get_openai_client()

        # Build clean student context if provided
        context_parts = []
        if student_profile:
            name = student_profile.get("name")
            degree = student_profile.get("degree")
            specialization = student_profile.get("specialization")
            cgpa = student_profile.get("cgpa")

            if name: context_parts.append(f"Name: {name}")
            if degree: context_parts.append(f"Degree: {degree}")
            if specialization: context_parts.append(f"Specialization: {specialization}")
            if cgpa: context_parts.append(f"CGPA: {cgpa}")

        prompt = message
        if context_parts:
            prompt = f"{message}\n[Student Profile Context: {', '.join(context_parts)}]"

        response = openai_client.responses.create(
            input=[{"role": "user", "content": prompt}],
            extra_body={
                "agent_reference": {
                    "name": self.agent_name,
                    "version": self.agent_version,
                    "type": "agent_reference"
                }
            }
        )

        answer_text = None
        if hasattr(response, "output_text") and response.output_text:
            answer_text = response.output_text
        elif hasattr(response, "choices") and response.choices:
            choice = response.choices[0]
            if hasattr(choice, "message") and hasattr(choice.message, "content"):
                answer_text = choice.message.content

        if not answer_text:
            answer_text = str(response)

        return {
            "answer": answer_text,
            "conversation_id": conversation_id,
            "metadata": {
                "provider": "azure_ai_foundry",
                "agent_name": self.agent_name,
                "agent_version": self.agent_version,
                "endpoint": self.endpoint
            }
        }


foundry_service = FoundryService()

