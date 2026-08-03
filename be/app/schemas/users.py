from pydantic import BaseModel, EmailStr
from uuid import UUID, uuid4

# generating unique id
_uuid = uuid4()
print(_uuid)


# User Schemas

class UserContact(BaseModel):
    phone: str
    address: str
    

class CreateUser(BaseModel):
    id: UUID
    first_name: str
    last_name: str
    full_name: str
    contact: UserContact
    email: EmailStr
    password: str
