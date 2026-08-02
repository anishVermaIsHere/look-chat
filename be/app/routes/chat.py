from fastapi import APIRouter
from app.schemas.chat import ChatRequest, ChatResponse
from app.services.ai import AIService

router = APIRouter(prefix="/chat", tags=["Chat"])


@router.get("/")
def chat_get():
    return { "success": True }

@router.post("/", response_model=ChatResponse, summary="Chat with AI", description="Accepts a user message and returns an AI-generated response.")
def chat(data: ChatRequest):
    """
    Request Payload Example
    {
        "message": {
            "id": "322h2hry292",
            "sender": {
            "id": "2hf92624r2h2",
            "username": "vicky08",
            "location": "India"
            },
            "content": "What is Jenkin?",
            "created_at": "2026-08-02T18:30:00Z"
        }
    }
    """
    ai_service = AIService()
    answer = ai_service.ask(data.message.content)

    return ChatResponse(
        response=answer
    )