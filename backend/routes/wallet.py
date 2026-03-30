from fastapi import APIRouter, Depends
from auth.auth_guard import get_current_user
import json

router = APIRouter()

@router.get("/")
def user_acounts(current_user = Depends(get_current_user)):
    user_id = current_user.get("id")

    with open("Data/accounts.json") as f:
        accounts = json.load(f)

        #filter user

        user_accounts = [
            acc for acc in accounts if acc.get("user_id") == user_id
        ]


        return user_accounts