from fastapi import APIRouter
from app.schemas.chat import ChatRequest, ChatResponse
from app.services.ai import ask_ai

router = APIRouter(prefix="/chat", tags=["Chat"])


@router.get("/")
def chat_get():
    return { "success": True }

@router.post("/", response_model=ChatResponse)
def chat(data: ChatRequest):
    answer = ask_ai(data.message)
    return ChatResponse(
        response=answer
    )