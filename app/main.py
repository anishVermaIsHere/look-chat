from fastapi import FastAPI
from app.routes.chat import router as chat_router

app = FastAPI(title="AI Chat API")

app.include_router(chat_router)