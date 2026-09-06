from pydantic import BaseModel, EmailStr
from uuid import UUID, uuid4

# generating unique id
# _uuid = uuid4()
# print(_uuid)


# User Schemas

class UserContact(BaseModel):
    phone: str | None = None
    address: str | None = None
    

class UserBase(BaseModel):
    first_name: str
    last_name: str
    # full_name: str
    # contact: UserContact
    email: EmailStr


class CreateUser(UserBase):
    password: str


class UserResponse(UserBase):
    id: UUID

    class Config:
        from_attributes = True
