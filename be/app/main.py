from fastapi import FastAPI, APIRouter
from fastapi.middleware.cors import CORSMiddleware

from app.database.database import Base, engine
from app.routes.chat import router as chat_router
from app.routes.auth import router as auth_router

app = FastAPI(title="Look Chat API")

origins = [
    "http://localhost:3000",
    "http://localhost:5173"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


Base.metadata.create_all(bind=engine)

app_router = APIRouter(prefix="/api/v1")

@app.get("/")
def read_root():
    return {"message": "Hello!, Your FastAPI Server Started"}

app_router.include_router(auth_router)
app_router.include_router(chat_router)
app.include_router(app_router)
