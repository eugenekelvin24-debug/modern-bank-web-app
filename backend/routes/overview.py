from fastapi import APIRouter, Depends, HTTPException
from pathlib import Path
from datetime import datetime
from auth.auth_guard import get_current_user
import json

router = APIRouter()

    
@router.get("/")
async def get_account_overview(current_user: dict = Depends(get_current_user)):
    user_id = current_user.get("id")

    with open("Data/user.json") as f:
        user_data = json.load(f)

    current_user_data = next(
        (u for u in user_data if u.get("id") == user_id),
        None
    )

    if not current_user_data:
        raise HTTPException(status_code=404, detail="User not found")

    with open("Data/accounts.json") as f:
        accounts = json.load(f)

    user_accounts = [
        acc for acc in accounts if acc.get("user_id") == user_id
    ]

    total_balance = sum(acc.get("balance", 0) for acc in user_accounts)

    with open("Data/cardinfo.json") as f:
        card_info = json.load(f)

    card = [
        c for c in card_info if c.get("user_id") == user_id
    ]

    with open("Data/transactions.json") as f:
        transactions = json.load(f)

    user_txns = [
        t for t in transactions if t.get("user_id") == user_id
    ]

    user_txns.sort(
        key=lambda x: datetime.strptime(x["date"], "%b %d, %Y"),
        reverse=True
    )

    seen = set()
    results = []

    for txn in user_txns:
        acc = txn.get("account_number")

        if not acc:
            continue

        if acc not in seen:
            seen.add(acc)

            results.append({
                "name": txn.get("entity"),
                "account_number": acc
            })

        if len(results) == 4:
            break
    

    return {
        "name": current_user_data.get("name"),
        "initials": current_user_data.get("initials"),
        "account_type": current_user_data.get("account_type"),
        "balance": total_balance,
        "transactions": user_txns[:7],
        "recent_contacts": results,
        "card_info": card
    }