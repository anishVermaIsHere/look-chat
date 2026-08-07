from fastapi import APIRouter, Depends, Response
from sqlalchemy.orm import Session

from app.database.database import get_db
from app.schemas.auth import RegisterRequest, LoginRequest
from app.controllers import auth


router = APIRouter(prefix="/auth", tags=["Auth"])

@router.post("/register")
def register(user: RegisterRequest, res: Response, db: Session = Depends(get_db)):
    return auth.register(user, db, res)

@router.post("/login")
def login(user: LoginRequest, res: Response, db:Session = Depends(get_db), ):
    return auth.login(user, db, res)