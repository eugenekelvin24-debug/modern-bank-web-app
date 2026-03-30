from fastapi import APIRouter, Depends, HTTPException
from auth.auth_guard import get_current_user
import json

router = APIRouter()

@router.get("/")
def get_user(current_user = Depends(get_current_user)):
    user_id = current_user.get("id")

    with open("Data/user.json") as f:
        user = json.load(f)


        #filter user
    user_info = next(
        (u for u in user if u.get("id") == user_id),
        None
    )

    if not user_info:
        raise HTTPException(status_code=404, detail="User not found")

    return {
        "name": user_info["name"],
        "initials": user_info["initials"],
        "account_type": user_info["account_type"]
    }

