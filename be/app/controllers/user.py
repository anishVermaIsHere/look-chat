from fastapi import Request
from uuid import UUID, uuid4
from sqlalchemy.orm import Session


from app.schemas.users import CreateUser
from app.services.auth import AuthService


def create_user(user: CreateUser):
    # Business logic

    return {
        "message": "User created successfully",
        "user": user
    }


def get_users():
    # generating unique id
    _uuid = uuid4()
    print(_uuid)
    return [
        {
            "id": _uuid,
            "username": "Robin K"
        }
    ]

def get_self(req: Request, db: Session):
    auth_service = AuthService()
    return auth_service.self(req, db)