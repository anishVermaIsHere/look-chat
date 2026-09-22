import os
from dotenv import load_dotenv

from app.database.models.user import User
from app.utils.security import SecurePassword

# Load .env.test before any test or app module imports
load_dotenv(".env.test", override=True)

# if os.getenv("DATABASE_URL"):
#     os.environ["DATABASE_URL"] = os.getenv("DATABASE_URL")

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


@pytest.fixture(autouse=True)
def create_test_user(db):
    """Automatically creates a test user in the fresh database before tests run."""
    # Check if test user already exists
    existing_user = db.query(User).filter(User.email == LOGIN["EMAIL"]).first()
    if not existing_user:
        secure_pwd = SecurePassword()
        test_user = User(
            first_name="Test",
            last_name="User",
            full_name="Test User",
            contact={},
            email=LOGIN["EMAIL"],
            password=secure_pwd.hash_pwd(LOGIN["PASSWORD"])
        )
        db.add(test_user)
        db.commit()

@pytest.fixture
def auth_client(client):
    """Returns a TestClient instance that is pre-logged in with valid cookies."""
    response = client.post(
        "/api/v1/auth/login",
        json={"email": LOGIN["EMAIL"], "password": LOGIN["PASSWORD"]},
    )
    assert response.status_code == 200
    return client