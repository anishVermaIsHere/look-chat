from fastapi import FastAPI, APIRouter
from app.routes.chat import router as chat_router
from app.routes.auth import router as auth_router

app = FastAPI(title="Look Chat API")

app_router = APIRouter(prefix="/api/v1")

app_router.include_router(auth_router)
app_router.include_router(chat_router)