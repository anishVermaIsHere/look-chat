from datetime import datetime, timedelta, timezone

import jwt

from app.config import JWT_SECRET_KEY, JWT_ALGORITHM, ACCESS_TOKEN_EXPIRE_HOURS,REFRESH_TOKEN_EXPIRE_DAYS


class JWTService:

    @staticmethod
    def create_token(user_id: str, token_type: str):

        if token_type == "access":
            expire = datetime.now(timezone.utc) + timedelta(minutes=ACCESS_TOKEN_EXPIRE_HOURS)
        else: 
            expire = datetime.now(timezone.utc) + timedelta(days=REFRESH_TOKEN_EXPIRE_DAYS)

        payload = {
            "sub": user_id,
            "type": token_type,
            "exp": expire,
        }

        return jwt.encode(payload, JWT_SECRET_KEY, algorithm=JWT_ALGORITHM)

