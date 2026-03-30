from fastapi import APIRouter, Depends
from collections import defaultdict
from datetime import datetime
from auth.auth_guard import get_current_user
from typing import Optional
from fastapi import Query
import json

router = APIRouter()

def load_transactions():
    with open ("Data/transactions.json", "r") as f:
        return json.load(f)
    
def calculate_monthly_totals(transactions):
    monthly_totals = defaultdict(float)

    for t in transactions:
        try:
            date = datetime.strptime(t["date"].strip(), "%b %d, %Y")
            month = date.strftime("%Y-%m")
            monthly_totals[month] += t["amount"]
        except Exception:
            continue

    return dict(monthly_totals)
        
@router.get("/")
def get_monthly_totals(
    search: str | None = None,
    user = Depends(get_current_user)
):

    user_id = user["id"]
    transactions = load_transactions()

    user_transactions = [
        t for t in transactions if t["user_id"] == user_id
    ]

    if search:
        search_lower = search.lower()

        user_transactions = [
            t for t in user_transactions
            if search_lower in t["entity"].lower()
            or search_lower in t["category"].lower()
        ]

    totals = calculate_monthly_totals(user_transactions)

    return{
        "transactions": user_transactions,
        "monthly_totals": totals
    }