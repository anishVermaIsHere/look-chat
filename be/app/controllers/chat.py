import uuid

from fastapi import Request
from fastapi.responses import JSONResponse, StreamingResponse
from fastapi.encoders import jsonable_encoder
from sqlalchemy.orm import Session

from app.schemas.chat import MessagePayload
from app.services.chat import ChatService


chat_service = ChatService()


def get_user_chats(user_id: str, db: Session):
    response = chat_service.get_by_user_id(user_id, db)
    return JSONResponse(content=jsonable_encoder(response))

def create_message(payload: MessagePayload, db: Session, req: Request):
    user_id = req.state.user["sub"]
    chat = chat_service.get_or_create_chat(user_id, db, payload)

    def generate_message():
        res = chat_service.stream_message(user_id, chat.id, db, payload)
        for chunk in res:
            yield chunk

    response = StreamingResponse(generate_message(), media_type="text/event-stream")
    response.headers["x-chat-id"] = str(chat.id)
    response.headers["Access-Control-Expose-Headers"] = "x-chat-id"

    return response


def delete_chat(chat_id: uuid.UUID, db: Session):
    response = chat_service.delete_by_id(chat_id, db)
    return JSONResponse(content=response)

def get_chat(chat_id: uuid.UUID, db: Session):
    response = chat_service.get_by_id(chat_id, db, True)
    return JSONResponse(content=jsonable_encoder(response))