from fastapi import HTTPException
from sqlalchemy.orm import Session

from app.database.models.assistant import Assistant


class AssistantService:

    @staticmethod
    def get_by_name(db: Session, name: str) -> Assistant | None:
        assistant = (db.query(Assistant).filter(Assistant.name == name).first())

        if not assistant:
            raise HTTPException(status_code=404,detail="Assistant not found")

        return assistant