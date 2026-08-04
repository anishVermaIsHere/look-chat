from uuid import UUID, uuid4

from app.schemas.users import CreateUser



def create_user(user: CreateUser):
    # Business logic

    return {
        "message": "User created successfully",
        "user": user
    }


def get_users():
    # generating unique id
    _uuid = uuid4()
    print(_uuid)
    return [
        {
            "id": _uuid,
            "username": "Robin K"
        }
    ]