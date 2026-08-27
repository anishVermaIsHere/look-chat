from redis.asyncio import Redis
from app.core.config import REDIS

redis_client: Redis | None = None

# redis = Redis(
#     host=REDIS["HOST"],
#     port=REDIS["PORT"],
#     decode_responses=True,
# )

async def init_redis() -> Redis:
    global redis_client
    redis_client = Redis(
        host=REDIS["HOST"],
        port=REDIS["PORT"],
        decode_responses=True,
        max_connections=10
    )
    print("Redis initialized")
    return redis_client

async def close_redis() -> None:
    global redis_client
    if redis_client:
        await redis_client.close()

async def get_redis() -> Redis:
    if redis_client is None:
        raise RuntimeError("Redis client is not initialized.")
    return redis_client