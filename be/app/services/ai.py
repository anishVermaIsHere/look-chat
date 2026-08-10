from app.llm.base import LLMProvider 


class AIService():
    def __init__(self, provider: LLMProvider):
       self.provider = provider

    def ask(self, message: str) -> str:
        return self.provider.ask(message)
