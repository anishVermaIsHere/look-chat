from fastapi import FastAPI, APIRouter
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import configure_mappers
from contextlib import asynccontextmanager

from app.routes.chat import router as chat_router
from app.routes.auth import router as auth_router
from app.routes.user import router as user_router
from app.middleware.auth import verify_auth
from app.core.cache import init_redis, close_redis
from app.database.database import init_db, close_db

@asynccontextmanager
async def lifespan(app: FastAPI):
    # 1. Startup phase
    init_db()
    await init_redis()
    
    try:
        yield
    finally:
        # 2. Shutdown phase (LIFO - Last In, First Out)
        await close_redis()  # Close Redis first
        close_db()     # Close DB second




configure_mappers()


app = FastAPI(title="Look Chat API", lifespan=lifespan)

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


app_router = APIRouter(prefix="/api/v1")
app.middleware("http")(verify_auth)


@app.get("/")
def read_root():
    return {"message": "Hello!, Your FastAPI Server Started"}

app_router.include_router(auth_router)
app_router.include_router(user_router)
app_router.include_router(chat_router)
app.include_router(app_router)
