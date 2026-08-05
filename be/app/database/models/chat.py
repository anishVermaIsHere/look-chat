from sqlalchemy import Uuid, Column, String, TIMESTAMP, text
from sqlalchemy.orm import relationship
from sqlalchemy.dialects.postgresql import JSONB
import uuid 

from app.database.database import Base

class Chat(Base):
    __tablename__ = "chats"
    id: Column(Uuid, primary_key=True, default=uuid.uuid4, nullable=False)
    messages = relationship("Message", back_populates="chat", cascade="all, delete-orphan")

