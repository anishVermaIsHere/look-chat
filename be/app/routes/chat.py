import uuid

from fastapi import APIRouter, Request, Depends, Query
from fastapi.responses import JSONResponse
from sqlalchemy.orm import Session
from typing import Annotated

from app.database.database import get_db
from app.schemas.chat import MessagePayload
from app.controllers.chat import create_message, delete_chat, get_chat, search_chat

router = APIRouter(prefix="/chats", tags=["Chat"])


@router.get("")
def chat_get():
    return { "success": True }

@router.post("", response_class=JSONResponse, summary="Chat with AI", description="Accepts a user message and returns an AI-generated response.")
def chat(req: Request, payload: MessagePayload, db: Session = Depends(get_db)):
    """
    Request Payload Example
    {
        "message": {
            "id": "322h2hry292",
            "sender": {
                "id": "2hf92624r2h2",
                "username": "vicky08",
                "location": "India"
            },
            "content": "What is Jenkin?",
            "created_at": "2026-08-02T18:30:00Z"
        }
    }
    """
    data = create_message(payload, db, req)
    return data

@router.delete("/{chat_id}", response_class=JSONResponse, summary="Chat delete", description="Accepts chat_id and pass it to controller")
def chat_delete(chat_id: uuid.UUID, db: Session = Depends(get_db)):
    return delete_chat(chat_id, db)


@router.get("/search", response_class=JSONResponse, summary="Chat search", description="Accepts query string and pass it to chat controller to fetch chat based on query")
def chat_query(req: Request, query: Annotated[str | None, Query(min_length=3, max_length=50, alias="q")] = None, db: Session = Depends(get_db)):
    return search_chat(query, db, req)


@router.get("/{chat_id}", response_class=JSONResponse, summary="Chat fetch", description="Accepts chat_id and pass it to controller to fetch chat")
def chat_fetch(chat_id: uuid.UUID, db: Session = Depends(get_db)):
    return get_chat(chat_id, db)
