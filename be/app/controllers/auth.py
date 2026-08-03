from uuid import uuid4
from app.schemas.auth import RegisterRequest, LoginRequest


def register(data: RegisterRequest):
    # logic
    return {
        "id": uuid4(),
        "first_name": data.first_name,
        "last_name": data.last_name,
        "email": data.email,
    }


def login(data: LoginRequest):
    # logic
    return {
        "access_token": "jwt_access_token",
        "refresh_token": "jwt_refresh_token",
    }