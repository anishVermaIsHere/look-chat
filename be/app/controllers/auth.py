from sqlalchemy.orm import Session
from app.schemas.auth import RegisterRequest, LoginRequest
from app.services.auth import register_user, login_user



def register(data: RegisterRequest, db: Session):
    return register_user(data, db)

def login(data: LoginRequest, db: Session):
    return login_user(data, db)