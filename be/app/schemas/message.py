from pydantic import BaseModel
from datetime import datetime
from uuid import UUID


# Message Schemas

class Sender(BaseModel):
    id: str
    username: str
    location: str | None = None


class Message(BaseModel):
    id: str
    sender: Sender
    content: str
    created_at: datetime 
    