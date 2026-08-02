from pydantic import BaseModel
from datetime import datetime
from uuid import UUID


# Message Schemas

class Sender(BaseModel):
    id: UUID
    username: str
    location: str | None = None


class Message(BaseModel):
    id: UUID
    sender: Sender
    content: str
    created_at: datetime
    