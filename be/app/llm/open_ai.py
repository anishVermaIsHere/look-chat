from openai import OpenAI

from app.core.config import MODEL_API_KEY
from app.llm.base import LLMProvider


class OpenAIProvider(LLMProvider):
    
    def __init__(self, model: str = "gpt-4o-mini"):
        self.client = OpenAI(api_key=MODEL_API_KEY["OPENAI"])
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

    def stream(self, messages):

        response = self.client.chat.completions.create(
            model=self.model,
            messages=messages,
            stream=True
        )

        for chunk in response:

            if not chunk.choices:
                continue

            content = chunk.choices[0].delta.content

            if content:
                yield content