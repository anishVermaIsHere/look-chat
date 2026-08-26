from redis.asyncio import Redis
from app.core.config import REDIS

redis = Redis(
    host=REDIS["HOST"],
    port=REDIS["PORT"],
    decode_responses=True,
)