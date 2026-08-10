from sqlalchemy import Uuid, Column, String, TIMESTAMP, text
from sqlalchemy.orm import relationship
from sqlalchemy.dialects.postgresql import UUID
import uuid 


from app.database.database import Base
from app.database.models.message import Message

class Chat(Base):
    __tablename__ = "chats"
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4, nullable=False)
    title = Column(String, nullable=True)
    messages = relationship("Message", back_populates="chat", cascade="all, delete-orphan")
    created_at = Column(TIMESTAMP(timezone=True), server_default=text('now()'))

