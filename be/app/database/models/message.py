from sqlalchemy import Uuid, Column, String, TIMESTAMP, text, ForeignKey
from sqlalchemy.orm import relationship
from sqlalchemy.dialects.postgresql import JSONB
import uuid 

from app.database.database import Base



class Message(Base):
    __tablename__ = "messages"

    id = Column(Uuid, primary_key=True, default=uuid.uuid4, nullable=False)
    chat_id = Column(Uuid, ForeignKey("chats.id"), nullable=False)
    sender = Column(JSONB, nullable=False, server_default=text("'{}'::jsonb"))
    content = Column(String, nullable=False)
    # relationship("Chat"): Optional but recommended. It lets SQLAlchemy automatically navigate between related objects (message.chat and chat.messages) without you writing extra queries.
    chat = relationship("Chat", back_populates="messages")
    created_at = Column(TIMESTAMP(timezone=True), server_default=text('now()'))