from openai import OpenAI
import os
from config import BASE_URL

client = OpenAI(api_key=BASE_URL)

def ask_ai(message: str):
    response = client.chat.completions.create(
        model="gpt-4o-mini",  # Make sure model name is correct (e.g. gpt-4o-mini)
        messages=[
            {"role": "user", "content": message}
        ]
    )
    # print('Response: ', response)
    return response.choices[0].message.content
