from fastapi import APIRouter

router = APIRouter(prefix="/users", tags=["Users"])

# Fetch User
@router.get("/")
def get_users():
    return {"users":["rohit","vicky"]}


# Create User
@router.post("/")
def create_user(user_payload):
    print("User payload:", user_payload)
    return


