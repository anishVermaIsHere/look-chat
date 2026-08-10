from pydantic import BaseModel
from datetime import datetime
from uuid import UUID


# Message Schemas

class Location(BaseModel):
    latitude: str | None = None
    longitude: str | None = None

class Sender(BaseModel):
    id: UUID | str
    location: Location

class Message(BaseModel):
    id: UUID | str
    sender: Sender
    content: str
    created_at: datetime 
    