from fastapi import APIRouter, Depends
from auth.auth_guard import get_current_user
import json

router = APIRouter()

@router.get("/")
async def analytics(user=Depends(get_current_user)):
    user_id = user.get("id")

    with open("Data/transactions.json") as f:
        transactions = json.load(f)

    user_transactions = [
        t for t in transactions if t.get("user_id") == user_id
    ]

    income = sum(t["amount"] for t in user_transactions if t["type"] == "credit")

    expenses = sum(abs(t["amount"]) for t in user_transactions if t["type"] == "debit")

    categories = {}

    for t in user_transactions:
        if t["type"] == "debit":
            cat = t.get("category", "Other")
            categories[cat] = categories.get(cat, 0) + abs(t["amount"])

    return {
        "income": income,
        "expenses": expenses,
        "net_flow": income - expenses,
        "categories": categories,
        "transactions": user_transactions
    }