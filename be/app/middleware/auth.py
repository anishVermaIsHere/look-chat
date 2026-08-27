from fastapi import Request
from fastapi.responses import JSONResponse

from app.utils.jwt import JWTService
from app.routes.paths import PUBLIC_PATHS

async def verify_auth(req: Request, next):
    if req.method == "OPTIONS":
        return await next(req)

    if req.url.path in PUBLIC_PATHS:
        return await next(req)

    jwt_service = JWTService()
    token = req.cookies.get("_at")


    if not token:
        return JSONResponse(status_code=401, content={ "message": "Unauthorised" })

    current_user = jwt_service.verify_token(token)

    if not current_user:
        return JSONResponse(status_code=401, content={ "message": "Not authenticated" })
    
    req.state.user = current_user
    
    return await next(req)
