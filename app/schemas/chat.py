from pydantic import BaseModel
from app.schemas.message import Message


# Chat Schema
class ChatRequest(BaseModel):
    message: Message


class ChatResponse(BaseModel):
    response: str