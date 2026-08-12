
def generate_chat_title(content: str) -> str:
    title = content.strip()

    if len(title) > 50:
        title = title[:50].rsplit(" ", 1)[0] + "..."

    return title