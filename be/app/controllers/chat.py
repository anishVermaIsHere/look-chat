from fastapi import Request
from fastapi.responses import JSONResponse
from fastapi.encoders import jsonable_encoder
from sqlalchemy.orm import Session

from app.schemas.chat import MessagePayload
from app.services.chat import ChatService



def create_message(payload: MessagePayload, db: Session, req: Request):
    chat_service = ChatService()
    user_id = req.state.user["sub"]
    payload = payload.model_copy(
        update={
            "sender": payload.sender.model_copy(
                update={
                    "id": user_id
                }
            )
        }
    )
    response = chat_service.send_message(db, payload)

    return JSONResponse(content=jsonable_encoder(response))
