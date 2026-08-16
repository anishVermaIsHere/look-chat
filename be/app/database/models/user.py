import uuid

from sqlalchemy.dialects.postgresql import JSONB, UUID
from sqlalchemy.orm import relationship

from app.database.database import Base
from sqlalchemy import Column, String, TIMESTAMP, text



class User(Base):
    __tablename__ = "users"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4, nullable=False)
    first_name = Column(String, nullable=False)
    last_name = Column(String, nullable=False)
    full_name = Column(String)
    email = Column(String, unique=True, nullable=False)
    password = Column(String, nullable=False)
    contact = Column(JSONB, nullable=False, server_default=text("'{}'::jsonb"))
    chats = relationship("Chat", back_populates="user", cascade="all, delete-orphan")
    created_at = Column(TIMESTAMP(timezone=True), server_default=text('now()'))