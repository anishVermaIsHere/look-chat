from sqlalchemy.orm import Session

from app.database.models.message import Message
from app.schemas.message import Sender

class MessageService:

    def create(self, db: Session, chat_id, sender: dict, content: str, role: str) -> Message:
        message = Message(chat_id=chat_id, sender=sender, content=content, role=role)
        db.add(message)
        db.flush()

        return message

    def to_dict(self, message: Message):
        return {
            "id": message.id,
            "chat_id": message.chat_id,
            "sender": message.sender,
            "content": message.content,
            "role": message.role.value if hasattr(message.role, "value") else message.role,
            "created_at": message.created_at,
        }
    