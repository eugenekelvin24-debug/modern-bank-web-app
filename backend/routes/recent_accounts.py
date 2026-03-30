from fastapi import APIRouter, Depends, Query
from datetime import datetime
from auth.auth_guard import get_current_user
import json
from typing import List

router = APIRouter()

# Load all transactions from JSON
def load_transactions():
    with open("Data/transactions.json", "r") as f:
        return json.load(f)

@router.get("/")
def get_recent_contacts(
    search: str = "",
    current_user: dict = Depends(get_current_user) 
):
    
    user_id = current_user["id"]
    transactions = load_transactions()

    #filter by user
    user_txns = [t for t in transactions if t["user_id"] == user_id]

    #search filter 
    if search:
        user_txns = [
            t for t in user_txns
            if search.lower() in t["entity"].lower()
        ]

    #sort latest first
    user_txns.sort(
        key=lambda x: datetime.strptime(x["date"], "%b %d, %Y"),
        reverse=True
    )

    #remove duplicates
    seen = set()
    result = []


    for txn in user_txns:
        acc = txn["account_number"]

        if not acc:
            continue

        if acc not in seen:
            seen.add(acc)

            result.append({
                "name": txn["entity"],
                "account_number": acc
            })

        if len(result) == 10:
            break

    return result