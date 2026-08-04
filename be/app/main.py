from fastapi import FastAPI, APIRouter

from app.database.database import Base, engine
from app.routes.chat import router as chat_router
from app.routes.auth import router as auth_router

app = FastAPI(title="Look Chat API")

Base.metadata.create_all(bind=engine)

app_router = APIRouter(prefix="/api/v1")

@app.get("/")
def read_root():
    return {"message": "Hello!, Your FastAPI Server Started"}

app_router.include_router(auth_router)
app_router.include_router(chat_router)
app.include_router(app_router)
