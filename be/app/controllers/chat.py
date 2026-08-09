from fastapi import Request
from sqlalchemy.orm import Session

from app.services.ai import AIService



def create_chat(payload: any, db: Session, req: Request):
    ai_service = AIService()
    answer = ai_service.ask(payload.message.content)
    
    return 
