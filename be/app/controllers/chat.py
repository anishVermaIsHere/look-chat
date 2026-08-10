from fastapi import Request
from fastapi.responses import JSONResponse
from sqlalchemy.orm import Session

from app.schemas.chat import MessagePayload
from app.services.chat import ChatService



def create_message(payload: MessagePayload, db: Session, req: Request):
    chat_service = ChatService()
    payload.sender.update({ "id": req.state.user["sub"] })

    print("HELLO", payload)
    response = chat_service.send_message(db, payload)

    return JSONResponse(data=response)
