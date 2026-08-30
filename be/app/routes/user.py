from fastapi import APIRouter, Request, Depends
from sqlalchemy.orm import Session 

from app.controllers.user import get_self
from app.controllers.chat import get_user_chats
from app.database.database import get_db
from app.core.cache import get_redis
from app.utils.redis import Cache


router = APIRouter(prefix="/users", tags=["Users"])

# Fetch User
@router.get("/")
def get_users():
    return {"users":["rohit","vicky"]}


# Create User
@router.post("/")
def create_user(user_payload):
    print("User payload:", user_payload)
    return

@router.get("/profile")
async def self_user(req: Request, db: Session = Depends(get_db), redis: Cache = Depends(get_redis) ):
    return await get_self(req, db, redis)

@router.get("/{user_id}/chats")
def get_chats(user_id: str, db: Session = Depends(get_db)):
    return get_user_chats(user_id, db)