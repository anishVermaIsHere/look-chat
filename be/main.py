from fastapi import FastAPI
from pydantic import BaseModel
from app.integrations.user import router as user_router


app = FastAPI(title="API | AI Chat")

class Item(BaseModel):
    name: str
    price: float
    is_offer: bool | None = None


@app.get("/")
def read_root():
    return {"message": "Hello, FastAPI Server Started"}


@app.get("/items/{item_id}")
def read_item(item_id: int, q: str | None = None):
    return {"item_id": item_id, "q": q}


@app.put("/items/{item_id}")
def update_item(item_id: int, item: Item):
    return {"item_name": item.name, "item_id": item_id}


@app.get("/res")
def resume():
    res = {
        "name": "Max Doe",
        "dob": "12-12-1990",
        "location": "Goa",
        "contact": {
            "phone": "9876543210",
            "email": "maxdoe_13@gmail.com"
        }
    }
    print("Response:",res)
    return res



app.include_router(user_router)