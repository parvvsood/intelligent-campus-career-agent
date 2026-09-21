import uuid
from fastapi import APIRouter, HTTPException, status
from app.schemas.chat_schemas import ChatRequest, ChatResponse
from app.services.foundry_service import foundry_service

router = APIRouter()

@router.post("/chat", response_model=ChatResponse, status_code=status.HTTP_200_OK, tags=["Chat"])
async def process_chat_message(request: ChatRequest):
    try:
        if not request.message or not request.message.strip():
            raise HTTPException(status_code=400, detail="Message content cannot be empty.")

        conv_id = request.conversation_id or f"conv-{uuid.uuid4().hex[:8]}"
        profile_dict = request.student_profile.model_dump() if request.student_profile else {}

        # Invoke Foundry Service Adapter
        result = await foundry_service.send_message_to_agent(
            message=request.message,
            conversation_id=conv_id,
            student_profile=profile_dict
        )

        return ChatResponse(
            answer=result.get("answer", "No response generated."),
            conversation_id=conv_id,
            metadata=result.get("metadata", {})
        )

    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=f"An error occurred while processing career chat request: {str(e)}"
        )
