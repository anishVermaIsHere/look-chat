from sqlalchemy import Column, String, TIMESTAMP, text, ForeignKey
from sqlalchemy.orm import relationship
from sqlalchemy.dialects.postgresql import UUID
import uuid 


from app.database.database import Base
from app.database.models.message import Message

class Chat(Base):
    __tablename__ = "chats"
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4, nullable=False)
    title = Column(String, nullable=False)
    messages = relationship("Message", back_populates="chat", cascade="all, delete-orphan")
    user_id = Column(UUID(as_uuid=True),ForeignKey("users.id", ondelete="CASCADE"),nullable=False)
    user = relationship("User", back_populates="chats")
    created_at = Column(TIMESTAMP(timezone=True), server_default=text('now()'))

