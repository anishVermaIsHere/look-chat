import os
import pytest 

from dotenv import load_dotenv

from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from app.database.database import Base

load_dotenv(".env.test", override=True)

DATABASE_URL = os.getenv("DATABASE_URL")

engine = create_engine(DATABASE_URL)

TestingSessionLocal = sessionmaker(
    autocommit=False,
    autoflush=False,
    bind=engine,
)

@pytest.fixture
def db():
    db = TestingSessionLocal()

    try:
        yield db
    finally:
        db.close()

Base.metadata.create_all(bind=engine)