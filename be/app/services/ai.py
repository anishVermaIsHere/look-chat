from openai import OpenAI
from app.config import OPENAI_API_KEY


class AIService():
    def __init__(self):
       self.client = OpenAI(api_key=OPENAI_API_KEY)

    def ask(self, message: str) -> str:
        response = self.client.responses.create(
            model="gpt-4o-mini",  # Make sure model name is correct (e.g. gpt-4o-mini)
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
