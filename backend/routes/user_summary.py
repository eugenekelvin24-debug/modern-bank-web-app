from fastapi import APIRouter, Depends, HTTPException
from auth.auth_guard import get_current_user
import json

router = APIRouter()

@router.get("/")
async def account_services(user=Depends(get_current_user)):
    user_id = user.get("id")

    # Load accounts
    with open("Data/accounts.json") as f:
        accounts = json.load(f)

    if not accounts:
        raise HTTPException(status_code=500, detail="Error fetching accounts")

    # Make sure user_id exists in accounts.json
    user_accounts = [
        acc for acc in accounts if acc.get("user_id") == user_id
    ]

    total_balance = sum(acc["balance"] for acc in user_accounts)

    # Load users
    with open("Data/user.json") as f:
        user_data = json.load(f)

    if not user_data:
        raise HTTPException(status_code=500, detail="Error fetching users")

    # Find current user
    current_user_data = next(
        (u for u in user_data if u.get("id") == user_id),
        None
    )

    if not current_user_data:
        raise HTTPException(status_code=404, detail="User not found")

    return {
        "total_balance": total_balance,
        "name": current_user_data["name"],
        "initials": current_user_data["initials"],
        "account_type": current_user_data["account_type"]


    }