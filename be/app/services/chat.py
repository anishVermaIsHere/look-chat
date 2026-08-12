from fastapi import Request, HTTPException
from fastapi.responses import JSONResponse
from sqlalchemy.orm import Session
import uuid

from app.database.models.chat import Chat
from app.database.models.message import MessageRole
from app.schemas.chat import MessagePayload
from app.services.assistant import AssistantService
from app.services.message import MessageService
from app.services.ai import AIService
from app.llm.open_ai import OpenAIProvider
from app.utils.chat import generate_chat_title


class ChatService:
    def send_message(self, db: Session, payload: MessagePayload):
        # 1. Find existing chat
        chat = None

        chat_id = payload.chat_id
        content = payload.content
        sender = payload.sender

        if chat_id:
            chat = self.get_by_id(chat_id, db)

            if not chat:
                raise HTTPException(status_code=404, detail="Chat not found")

        # 2. Create chat if this is a new conversation
        if chat is None:
            chat_title = generate_chat_title(content)
            chat = self.create(db, chat_title)

        message_service = MessageService()
        # 3. Save user's message
        user_message = message_service.create(
            db=db,
            chat_id=chat.id,
            sender=sender.model_dump(mode="json"),
            content=content,
            role=MessageRole.USER.value
        )

        # 4. Ask AI
        open_ai_provider = OpenAIProvider()
        ai_service = AIService(open_ai_provider)
        answer = ai_service.ask(content)

        assistant_service = AssistantService()
        assistant = assistant_service.get_by_name(db, "Look AI")
        assistant_sender = {
            "id": str(assistant.id),
            "location": None
        }

        # 5. Save AI response
        assistant_message = message_service.create(
            db=db,
            chat_id=chat.id,
            sender=assistant_sender,
            content=answer,
            role=MessageRole.ASSISTANT.value
        )

        # 6. Commit everything
        db.commit()

        return {
            "chat_id": chat.id,
            "user_message": user_message,
            "assistant_message": assistant_message
        }
    
    def create(self, db: Session, chat_title: str) -> Chat:
        chat = Chat(title=chat_title)
        db.add(chat)
        db.flush()

        return chat

    def get_by_id(self, chat_id: uuid.UUID, db: Session) -> Chat | None:
        return (db.query(Chat).filter(Chat.id == chat_id).first())