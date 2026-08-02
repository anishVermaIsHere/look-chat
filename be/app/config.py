import os
from dotenv import load_dotenv

load_dotenv(".env")


# API keys
OPENAI_API_KEY = os.getenv("OPENAI_API_KEY")

# Base URL
BASE_URL = os.getenv("BASE_URL", "http://localhost:8000")
DATABASE_URL = os.getenv("DATABASE_URL")
