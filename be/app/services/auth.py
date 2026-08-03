from uuid import uuid4
from sqlalchemy.orm import Session
from app.schemas.auth import RegisterRequest, LoginRequest


def register_user(payload: RegisterRequest, db: Session):
    # Database logic here

    return {
        "id": uuid4(),
        "first_name": payload.first_name,
        "last_name": payload.last_name,
        "email": payload.email,
        "password": payload.password
    }


def login_user(payload: LoginRequest, db: Session):
    # Check user
    # Verify password
    # Generate JWT

    return {
        "access_token": "jwt_access_token",
        "refresh_token": "jwt_refresh_token",
    }