from openai import OpenAI

from app.config import OPENAI_API_KEY
from app.llm.base import LLMProvider


class OpenAIProvider(LLMProvider):
    
    def __init__(self, model: str = "gpt-4o-mini"):
        self.client = OpenAI(api_key=OPENAI_API_KEY)
        self.model = model

    def ask(self, message: str) -> str:
        response = self.client.responses.create(
            model=self.model,  # Make sure model name is correct (e.g. gpt-4o-mini)
            input=[
                { 
                    "role": "user", 


                    "content": [
                        {
                            "type": "input_text",
                            "text": message
                        },
                    ] 
                }
            ]
        )
        return response.output_text