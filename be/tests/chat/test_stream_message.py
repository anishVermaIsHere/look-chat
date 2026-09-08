from app.core.config import LOGIN


SAMPLE_MESSAGE="Why AWS is mostly used rather than other cloud service providers?"

def test_streaming_message(client):
    payload ={
        "content": SAMPLE_MESSAGE,
        "sender": { "id": "user-667", "location": {} }
    }

    login_response = client.post("/api/v1/auth/login", json={ "email": LOGIN["EMAIL"], "password": LOGIN["PASSWORD"] })
    assert login_response.status_code == 200

    with client.stream("POST", f"/api/v1/chats", json=payload) as response:
        if response.status_code == 422:
            response.read()
            print("VALIDATION ERROR:", response.json())
        assert response.status_code == 200

        stream_iterator = response.iter_text()
        first_chunk = next(stream_iterator, None)

        assert first_chunk is not None
        assert len(first_chunk) > 0
        print("Stream started successfully! first chunk is:", first_chunk)



    