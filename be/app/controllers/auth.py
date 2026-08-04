from sqlalchemy.orm import Session

from app.schemas.auth import RegisterRequest, LoginRequest
from app.services.auth import AuthService


auth_service = AuthService()

def register(data: RegisterRequest, db: Session):
    return auth_service.register(data, db)

def login(data: LoginRequest, db: Session):
    return auth_service.login(data, db)