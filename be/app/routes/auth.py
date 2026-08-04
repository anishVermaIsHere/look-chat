from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.database.database import get_db
from app.schemas.auth import RegisterRequest, LoginRequest
from app.controllers import auth


router = APIRouter(prefix="/auth", tags=["Auth"])

@router.post("/register")
def register(user: RegisterRequest,db: Session = Depends(get_db)):
    return auth.register(user, db)

@router.post("/login")
def login(user: LoginRequest, db:Session = Depends(get_db)):
    return auth.login(user, db)