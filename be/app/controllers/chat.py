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
    payload = payload.model_copy(
        update={
            "sender": payload.sender.model_copy(
                update={
                    "id": user_id
                }
            )
        }
    )
    # response = chat_service.send_message(db, payload)

    # return JSONResponse(content=jsonable_encoder(response))

    def generate_message():
            for chunk in chat_service.stream_message(user_id, db, payload):
                yield chunk

    return StreamingResponse(generate_message(), media_type="text/event-stream")


def delete_chat(chat_id: uuid.UUID, db: Session):
    response = chat_service.delete_by_id(chat_id, db)
    return JSONResponse(content=response)