from fastapi import Request, HTTPException
from fastapi.responses import JSONResponse
from uuid import uuid4
from sqlalchemy.orm import Session


from app.database.models.user import User
from app.utils.security import SecurePassword
from app.utils.jwt import JWTService
from app.schemas.auth import RegisterRequest, LoginRequest, RegisterResponse, LoginResponse
from app.schemas.users import UserResponse




class AuthService():
    # @staticmethod # it rejects self param
    def register(self, payload: RegisterRequest, db: Session) -> RegisterResponse:
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
            full_name=f'{payload.first_name} {payload.last_name}',
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
    
    def login(self, payload: LoginRequest, db: Session) -> LoginResponse:
        # Check user
        # Verify password
        # Generate JWT

        user = db.query(User).filter(
                User.email == payload.email
            ).first()
    
        if not user:
            raise Exception("Email does not exist")

        secure_pwd = SecurePassword()
        is_password_matched = secure_pwd.verify_pwd(payload.password, user.password)

        if not is_password_matched:
            raise Exception("Incorrect password")

        jwt_service = JWTService()

        access_token = jwt_service.create_token(user.id, "access")
        refresh_token = jwt_service.create_token(user.id, "refresh")

        return {
            "success": True,
            "access_token": access_token,
            "refresh_token": refresh_token,
            "user": UserResponse.model_validate(user)
        }

    def self(self, req: Request, db: Session):
        
        current_user = req.state.user
        user_id = current_user.get('sub')
        user = db.query(User).filter(User.id == user_id).first()

        if not user:
            raise HTTPException(status_code=404, detail="User not found")

        user_data = {
            column.name: getattr(user, column.name)
            for column in user.__table__.columns
        }
        user_data.pop("password", None)  
        user_data.pop("created_at", None)
        
        return {"authenticated": True, "user": user_data }
        