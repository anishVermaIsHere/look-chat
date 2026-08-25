from datetime import datetime, timedelta, timezone

import jwt

from app.core.config import JWT_SECRET_KEY, JWT_ALGORITHM, ACCESS_TOKEN_EXPIRE_HOURS, REFRESH_TOKEN_EXPIRE_DAYS


class JWTService:

    @staticmethod
    def create_token(user_id: str, token_type: str) -> str:
        if token_type == "access":
            expire = datetime.now(timezone.utc) + timedelta(hours=int(ACCESS_TOKEN_EXPIRE_HOURS))
        else: 
            expire = datetime.now(timezone.utc) + timedelta(days=int(REFRESH_TOKEN_EXPIRE_DAYS))

        payload = {
            "sub": str(user_id),
            "type": token_type,
            "exp": expire,
        }

        return jwt.encode(payload, JWT_SECRET_KEY, algorithm=JWT_ALGORITHM)


    @staticmethod
    def verify_token(token: str) -> dict:
        try:
            payload = jwt.decode(token, JWT_SECRET_KEY, algorithms=[JWT_ALGORITHM])
            return payload
        except jwt.ExpiredSignatureError:
            raise Exception("Token has expired")
        except jwt.InvalidTokenError:
            raise Exception("Invalid token")
