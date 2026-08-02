from database import Base
from sqlalchemy import Uuid, Column, String, TIMESTAMP, text
from sqlalchemy.dialects.postgresql import JSONB
import uuid



class User(Base):
    __tablename__ = "users"

    id = Column(Uuid, primary_key=True, default=uuid.uuid4, nullable=False)
    first_name = Column(String, nullable=False)
    last_name = Column(String, nullable=False)
    full_name = Column(String)
    contact = Column(JSONB, nullable=False, server_default=text("'{}'::jsonb"))
    created_at = Column(TIMESTAMP(timezone=True), server_default=text('now()'))