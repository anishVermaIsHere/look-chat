from fastapi import Request, HTTPException
from fastapi.responses import JSONResponse
from sqlalchemy.orm import Session
import uuid

from app.database.models.chat import Chat
from app.schemas.chat import MessagePayload


class ChatService:
    def send_message(self, db: Session, payload: MessagePayload):
        # 1. Find existing chat
        chat = None

        chat_id = payload.get("chat_id")
        content = payload.get("content")
        sender = payload.get("sender")

        if chat_id:
            chat = self.get_by_id(chat_id, db)

            if not chat:
                raise HTTPException(status_code=404, detail="Chat not found")

        # 2. Create chat if this is a new conversation
        if chat is None:
            chat = self.create(db)

        # sender = 

        # 3. Save user's message
        user_message = self.message_service.create(
            db=db,
            chat_id=chat.id,
            sender=sender,
            content=content
        )

        # 4. Ask AI
        answer = self.ai_service.ask(content)

        # 5. Save AI response
        assistant_message = self.message_service.create(
            db=db,
            chat_id=chat.id,
            sender=sender,
            content=answer
        )

        # 6. Commit everything
        db.commit()

        return {
            "chat_id": chat.id,
            "user_message": user_message,
            "assistant_message": assistant_message
        }
    def create(self, db: Session) -> Chat:
        chat = Chat(id=uuid.uuid4())
        db.add(chat)
        db.flush()

        return chat

    def get_by_id(self, chat_id: uuid.UUID, db: Session) -> Chat | None:
        return (db.query(Chat).filter(Chat.id == chat_id).first())