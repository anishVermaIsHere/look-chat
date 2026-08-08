from fastapi import APIRouter, Request, Depends
from sqlalchemy.orm import Session 

from app.controllers.user import get_self
from app.database.database import get_db

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
def self_user(req: Request, db: Session = Depends(get_db)):
    return get_self(req, db)
