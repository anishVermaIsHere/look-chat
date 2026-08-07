from fastapi import Response
from sqlalchemy.orm import Session

from app.schemas.auth import RegisterRequest, LoginRequest
from app.services.auth import AuthService
from app.config import ACCESS_TOKEN_EXPIRE_HOURS, REFRESH_TOKEN_EXPIRE_DAYS


auth_service = AuthService()

def register(data: RegisterRequest, db: Session, res: Response):
    return auth_service.register(data, db)

def login(data: LoginRequest, db: Session, res: Response):
    auth_res = auth_service.login(data,db)
    if not auth_res["success"]:
        return res
    if auth_res["access_token"]:
        res.set_cookie(
            key="_at", 
            value=auth_res["access_token"], 
            httponly=True,   # Protects against XSS attacks
            secure=False,     # Forces HTTPS
            samesite="lax",   # Protects against CSRF attacks
            max_age=int(ACCESS_TOKEN_EXPIRE_HOURS)*3600,
        )
        res.set_cookie(
            key="_rt", 
            value=auth_res["refresh_token"], 
            httponly=True,   # Protects against XSS attacks
            secure=False,     # Forces HTTPS
            samesite="lax",   # Protects against CSRF attacks
            max_age=int(REFRESH_TOKEN_EXPIRE_DAYS)*3600*24,
        )
    return { "success": auth_res["success"], "user": auth_res["user"] }