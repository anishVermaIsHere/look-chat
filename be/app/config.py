import os
from dotenv import load_dotenv

load_dotenv(".env")


# API keys
OPENAI_API_KEY = os.getenv("OPENAI_API_KEY")

# Base URL
BASE_URL = os.getenv("BASE_URL", "http://localhost:8000")

# DB
DATABASE_URL = os.getenv("DATABASE_URL")
DB_HOST = os.getenv("DB_HOST")
DB_PORT = os.getenv("DB_PORT")
DB_NAME = os.getenv("DB_NAME")
DB_USER = os.getenv("DB_USER")
DB_PASSWORD = os.getenv("DB_PASSWORD")

# JWT
JWT_SECRET_KEY = os.getenv("JWT_SECRET_KEY")
JWT_ALGORITHM = os.getenv("JWT_ALGORITHM")
ACCESS_TOKEN_EXPIRE_HOURS = os.getenv("JWT_ACCESS_TOKEN_LIFETIME_HOURS")
REFRESH_TOKEN_EXPIRE_DAYS = os.getenv("JWT_REFRESH_TOKEN_LIFETIME_DAYS")


# USER
LOGIN_EMAIL = os.getenv("LOGIN_EMAIL")
LOGIN_PASSWORD = os.getenv("LOGIN_PASSWORD")

