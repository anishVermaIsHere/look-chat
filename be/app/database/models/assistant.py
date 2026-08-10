import uuid

from sqlalchemy.dialects.postgresql import UUID

from app.database.database import Base
from sqlalchemy import Column, String, TIMESTAMP, text



class Assistant(Base):
    __tablename__ = "assistants"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4, nullable=False)
    name = Column(String, nullable=False)
    created_at = Column(TIMESTAMP(timezone=True), server_default=text('now()'), nullable=False)