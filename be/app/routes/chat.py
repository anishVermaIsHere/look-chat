from fastapi import APIRouter, Request, Depends
from fastapi.responses import JSONResponse
from sqlalchemy.orm import Session

from app.database.database import get_db
from app.schemas.chat import MessagePayload
from app.controllers.chat import create_message

router = APIRouter(prefix="/chat", tags=["Chat"])


@router.get("/")
def chat_get():
    return { "success": True }

@router.post("/", response_class=JSONResponse, summary="Chat with AI", description="Accepts a user message and returns an AI-generated response.")
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
    print("COME")
    data = create_message(payload, db, req)
    return JSONResponse(data=data)