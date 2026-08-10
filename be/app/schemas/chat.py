from pydantic import BaseModel
from uuid import UUID

from app.schemas.message import Sender


class MessagePayload(BaseModel):
    chat_id: str | None = None
    content: str
    sender: Sender


class ChatResponse(BaseModel):
    chat_id: str
    

