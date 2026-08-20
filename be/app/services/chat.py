import uuid

from fastapi import Request, HTTPException, status
from fastapi.responses import JSONResponse
from sqlalchemy.orm import Session, selectinload

from app.database.models.chat import Chat
from app.database.models.message import MessageRole
from app.schemas.chat import MessagePayload
from app.services.assistant import AssistantService
from app.services.message import MessageService
from app.services.ai import AIService
from app.llm.open_ai import OpenAIProvider
from app.utils.chat import generate_chat_title, convert_messages


class ChatService:
    def send_message(self, user_id: uuid.UUID, db: Session, payload: MessagePayload):
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
            chat = self.create(user_id, db, chat_title)

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
            "messages": [
                message_service.to_dict(user_message),
                message_service.to_dict(assistant_message)
            ]
        }

    def stream_message(self, user_id: uuid.UUID, chat_id: uuid.UUID, db: Session, payload: MessagePayload):
        message_service = MessageService()

        # Save user message
        message_service.create(
            db=db,
            chat_id=chat_id,
            sender=payload.sender.model_dump(mode="json"),
            content=payload.content,
            role=MessageRole.USER.value
        )

        db.commit()

        # Stream AI
        open_ai_provider = OpenAIProvider()
        ai_service = AIService(open_ai_provider)
        assistant_service = AssistantService()

        answer = ""

        messages = [
            {
                "role": "user",
                "content": payload.content
            }
        ]

        for chunk in ai_service.stream(messages):
            answer += chunk

            yield chunk

        # Save complete assistant response
        assistant = assistant_service.get_by_name(db, "Look AI")

        assistant_sender = {
            "id": str(assistant.id),
            "location": None
        }

        message_service.create(
            db=db,
            chat_id=chat_id,
            sender=assistant_sender,
            content=answer,
            role=MessageRole.ASSISTANT.value
        )

        db.commit()


    def get_or_create_chat(self, user_id: uuid.UUID, db: Session, payload: MessagePayload) -> Chat:
        if payload.chat_id:
            chat = self.get_by_id(payload.chat_id, db)
            if not chat:
                raise HTTPException(status_code=404, detail="Chat not found")
            return chat
        
        chat_title = generate_chat_title(payload.content)
        return self.create(user_id, db, chat_title)

    def create(self, user_id: uuid.UUID, db: Session, chat_title: str) -> Chat:
        chat = Chat(title=chat_title, user_id=user_id)
        db.add(chat)
        db.flush()

        return chat

    def get_by_id(self, chat_id: uuid.UUID, db: Session, is_messages: bool = False) -> Chat | None:
        if is_messages:
            return (db.query(Chat).options(selectinload(Chat.messages)).filter(Chat.id == chat_id).first())
        return (db.query(Chat).filter(Chat.id == chat_id).first())

    def get_by_user_id(self, user_id: uuid.UUID, db: Session):
        return (db.query(Chat).filter(Chat.user_id == user_id).order_by(Chat.created_at.desc()).all())

    def delete_by_id(self, chat_id: uuid.UUID, db: Session):
        delete_chat = (db.query(Chat).filter(Chat.id == chat_id).first())
        # deleted_chat = db.query(models.Item).filter(models.Item.id == item_id).delete(synchronize_session=False) # alternative way

        if delete_chat is None:
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail=f"Chat with id {chat_id} not found")
        db.delete(delete_chat)
        db.commit()

        return { "success": True }