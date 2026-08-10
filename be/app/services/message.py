from sqlalchemy.orm import Session

from app.database.models.message import Message
from app.schemas.message import Sender

class MessageService:

    def create(self, db: Session, chat_id, sender: Sender, content: str) -> Message:
        message = Message(chat_id=chat_id, sender=sender, content=content)
        db.add(message)
        db.flush()

        return message