
BASE_PREFIX="/api/v1/"

ENDPOINTS = {
    "auth/login",
    "auth/register",
    "health",
}

PUBLIC_PATHS = {
    f'{BASE_PREFIX}{ep}'
    for ep in ENDPOINTS
}