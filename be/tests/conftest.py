import os
from dotenv import load_dotenv

# Load .env.test before any test or app module imports
load_dotenv(".env.test", override=True)


TEST_DATABASE_URL = os.getenv("DATABASE_URL")

LOGIN = {
    "EMAIL": os.getenv("LOGIN_EMAIL"),
    "PASSWORD": os.getenv("LOGIN_PASSWORD")
}

if not TEST_DATABASE_URL:
    raise RuntimeError(
        "TEST_DATABASE_URL is not set! Aborting to protect database."
    )

import pytest
from fastapi.testclient import TestClient
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from app.database.database import Base, get_db
from app.main import app 


engine = create_engine(TEST_DATABASE_URL)

TestingSessionLocal = sessionmaker(
    autocommit=False,
    autoflush=False,
    bind=engine,
)

@pytest.fixture
def db():
    connection = engine.connect()
    transaction = connection.begin()
    db = TestingSessionLocal(bind=connection)

    try:
        yield db
    finally:
        db.close()
        transaction.rollback()
        connection.close()

Base.metadata.create_all(bind=engine)


@pytest.fixture
def client(db):
    # 6. Override FastAPI get_db dependency so requests hit the test session
    def _override_get_db():
        try:
            yield db
        finally:
            pass

    app.dependency_overrides[get_db] = _override_get_db

    with TestClient(app) as test_client:
        yield test_client

    # 7. Clean up dependency overrides after test
    app.dependency_overrides.clear()


@pytest.fixture
def auth_client(client):
    """Returns a TestClient instance that is pre-logged in with valid cookies."""
    response = client.post(
        "/api/v1/auth/login",
        json={"email": LOGIN["EMAIL"], "password": LOGIN["PASSWORD"]},
    )
    assert response.status_code == 200
    return client