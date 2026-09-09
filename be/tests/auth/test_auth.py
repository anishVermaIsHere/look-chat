from tests.conftest import LOGIN, auth_client

# Test case - Unauthorised
def test_user_unauthorised(client):
    response = client.get("/api/v1/users/profile")
    assert response.status_code == 401
    assert response.json() == {"message": "Unauthorised"}

#  Test case - Authenticated
def test_user_authentication(client):
    response = client.post("/api/v1/auth/login", json={ "email": LOGIN["EMAIL"], "password": LOGIN["PASSWORD"] })
    assert response.status_code == 200

# # Test case - Authorised
def test_user_authorised(auth_client):
    response = auth_client.get("/api/v1/users/profile")
    assert response.status_code == 200
