from sqlalchemy import create_engine
from sqlalchemy.orm import DeclarativeBase, Session, sessionmaker
from typing import Generator

from app.core.config import DB

class Base(DeclarativeBase):
    pass

engine = None
SessionLocal = None


def init_db() -> None:
    """Initialize the database engine and session factory on app startup."""
    global engine, SessionLocal
    engine = create_engine(
        DB["URI"],
        pool_size=10,        # Number of persistent connections in pool
        max_overflow=20,     # Max temporary connections allowed under high load
        pool_pre_ping=True   # Automatically checks/reconnects stale DB connections
    )
    SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
    Base.metadata.create_all(bind=engine)
    print("DB initialized")

def close_db() -> None:
    """Dispose of the connection pool on app shutdown."""
    global engine
    if engine:
        engine.dispose()  # Safely closes all pooled database connections

def get_db() -> Generator[Session, None, None]:
    """FastAPI Dependency for per-request database sessions."""
    if SessionLocal is None:
        raise RuntimeError("Database engine is not initialized.")
    
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

