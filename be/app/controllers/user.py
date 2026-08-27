from fastapi import Request
from uuid import UUID, uuid4
from redis.asyncio import Redis
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

async def get_self(req: Request, db: Session, redis: Redis):
    auth_service = AuthService()
    return await auth_service.self(req, db, redis)