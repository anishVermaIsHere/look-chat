from openai import OpenAI
import os

client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))

print('CLIENT', client)

def ask_ai(message: str):
    response = client.chat.completions.create(
        model="gpt-4o-mini",  # Make sure model name is correct (e.g. gpt-4o-mini)
        messages=[
            {"role": "user", "content": message}
        ]
    )

    return response.choices[0].message.content
