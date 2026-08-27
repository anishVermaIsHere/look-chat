import os

from dotenv import load_dotenv


load_dotenv(".env")



# Base URL
BASE_URL = os.getenv("BASE_URL", "http://localhost:8000")

# API keys
MODEL_API_KEY = {
    "OPENAI": os.getenv("OPENAI_API_KEY")
}

# DB
DB = {
    "URI": os.getenv("DATABASE_URL"),
    "HOST": os.getenv("DB_HOST", "localhost"),
    "PORT": os.getenv("DB_PORT", 5432),
    "NAME": os.getenv("DB_NAME", "ai_chat_db"),
    "USER": os.getenv("DB_USER", "postgres"),
    "PASSWORD": os.getenv("DB_PASSWORD")
}

# JWT
JWT = {
    "SECRET_KEY": os.getenv("JWT_SECRET_KEY"),
    "ALGORITHM": os.getenv("JWT_ALGORITHM","HS256"),
    "ACCESS_TOKEN_EXPIRE_HOURS": os.getenv("JWT_ACCESS_TOKEN_LIFETIME_HOURS", 8),
    "REFRESH_TOKEN_EXPIRE_DAYS": os.getenv("JWT_REFRESH_TOKEN_LIFETIME_DAYS", 4)
}


# USER
LOGIN = {
    "EMAIL": os.getenv("LOGIN_EMAIL"),
    "PASSWORD": os.getenv("LOGIN_PASSWORD")
}

# REDIS
REDIS = {
    "HOST": os.getenv("REDIS_HOST", "localhost"),
    "PORT": os.getenv("REDIS_PORT", 6379)
}
