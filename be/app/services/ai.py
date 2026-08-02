from openai import OpenAI
from app.config import OPENAI_API_KEY


class AIService():
    def __init__(self):
       self.client = OpenAI(api_key=OPENAI_API_KEY)

    def ask_ai(self, message: str) -> str:
        response = self.client.chat.completions.create(
            model="gpt-4o-mini",  # Make sure model name is correct (e.g. gpt-4o-mini)
            messages=[
                {"role": "user", "content": message}
            ]
        )
        # print('Response: ', response)
        return response.choices[0].message.content
