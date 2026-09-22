import uuid
import json

from fastapi import Request, HTTPException
from fastapi.responses import JSONResponse, StreamingResponse
from fastapi.encoders import jsonable_encoder
from sqlalchemy.orm import Session

from app.database.models.chat import Chat
from app.schemas.chat import MessagePayload, ChatUpdate
from app.services.chat import ChatService


chat_service = ChatService()


def get_user_chats(user_id: str, db: Session):
    response = chat_service.get_by_user_id(user_id, db)
    return JSONResponse(content=jsonable_encoder(response))

def create_message(payload: MessagePayload, db: Session, req: Request):
    try:
        is_new_chat = not payload.chat_id
        user_id = req.state.user["sub"]
        chat = chat_service.get_or_create_chat(user_id, db, payload)

        def generate_message():
            try:
                res = chat_service.stream_message(user_id, chat.id, db, payload)
                for chunk in res:
                    yield chunk

            except Exception as stream_err:
                print("Mid-stream LLM Error:", stream_err)
                
                if is_new_chat:
                    try:
                        db.rollback() # Discard current session state
                        chat_service.delete_by_id(chat.id, db)
                    except Exception as cleanup_err:
                        print("Failed to cleanup chat:", cleanup_err)
                
                raise stream_err

        response = StreamingResponse(generate_message(), media_type="text/event-stream")
        response.headers["x-chat-id"] = str(chat.id)
        response.headers["Access-Control-Expose-Headers"] = "x-chat-id"

        return response

    except Exception as error:
        db.rollback()
        print("LLM Error:", error)
        raise HTTPException(status_code=502, detail="LLM request failed")


def delete_chat(chat_id: uuid.UUID, db: Session):
    response = chat_service.delete_by_id(chat_id, db)
    return JSONResponse(content=response)

def update_chat(chat_id: uuid.UUID, payload: ChatUpdate, db: Session):
    response = chat_service.update_by_id(chat_id, payload, db)
    return JSONResponse(content=jsonable_encoder(response))

def get_chat(chat_id: uuid.UUID, db: Session):
    response = chat_service.get_by_id(chat_id, db, True)
    return JSONResponse(content=jsonable_encoder(response))

def search_chat(query: str| None, db: Session, req: Request):
    user_id = req.state.user["sub"]
    response = chat_service.search(query, user_id, db)
    return JSONResponse(content=jsonable_encoder(response))