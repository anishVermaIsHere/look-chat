from uuid import uuid4
from sqlalchemy.orm import Session

from app.schemas.auth import RegisterRequest, LoginRequest
from app.database.models.user import User
from app.utils.security import SecurePassword




class AuthService():
    # @staticmethod # it rejects self param
    def register(self, payload: RegisterRequest, db: Session):
        # Check if user already exists
        user = db.query(User).filter(
            User.email == payload.email
        ).first()

        if user:
            raise Exception("Email already exists")
        secure_password = SecurePassword()

        # Create new user
        new_user = User(
            first_name=payload.first_name,
            last_name=payload.last_name,
            email=payload.email,
            password=secure_password.hash_pwd(payload.password)  # setting hash password
        )

        db.add(new_user)
        db.commit()
        db.refresh(new_user)

        return {
            "id": new_user.id,
            "first_name": new_user.first_name,
            "last_name": new_user.last_name,
            "email": new_user.email,
            "password": new_user.password,
            "contact": new_user.contact
        }
    
    def login(self, payload: LoginRequest, db: Session):
        # Check user
        # Verify password
        # Generate JWT

        user = db.query(User).filter(
                User.email == payload.email
            ).first()
    
        if user:
            raise Exception("Email already exists")
        else:
            raise Exception("Email not exist")

        return {
            "access_token": "jwt_access_token",
            "refresh_token": "jwt_refresh_token",
        }