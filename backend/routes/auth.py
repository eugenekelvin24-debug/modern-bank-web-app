from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
import json
from auth.auth_token import create_access_token
from auth.security import verify_password

router = APIRouter()


class LoginRequest(BaseModel):
    email: str
    password: str


@router.post("")
def login(payload: LoginRequest):

    # Load credentials
    with open("Data/credentials.json") as f:
        credentials = json.load(f)

    # Find user by email
    user = credentials.get(payload.email)

    if not user:
        raise HTTPException(status_code=404, detail="User not found")

    # Verify password
    if not verify_password(payload.password, user["password"]):
        raise HTTPException(status_code=401, detail="Incorrect password")

    # Create token
    token_data = {
        "id": user["id"],
        "email": payload.email,
    }

    token = create_access_token(token_data)

    return {
        "access_token": token,
        "token_type": "bearer"
    }