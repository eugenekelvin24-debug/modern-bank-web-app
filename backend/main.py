from fastapi import FastAPI, Depends
from fastapi.middleware.cors import CORSMiddleware
import routes.auth
import routes.monthly_total
import routes.wallet
import routes.recent_accounts
import routes.user_summary
import routes.analytics
import routes.overview
import routes.user
from auth.auth_guard import get_current_user

app = FastAPI()

origins = [
    "http://localhost:5173",  
    "http://127.0.0.1:5173",
    "http://localhost:3000",  
] 

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,            
    allow_credentials=True,
    allow_methods=["*"],              
    allow_headers=["*"],
)

app.include_router(routes.auth.router, prefix="/auth")
app.include_router(routes.user.router, prefix="/user")
app.include_router(routes.overview.router, prefix="/account-overview")
app.include_router(routes.monthly_total.router, prefix="/transactions")
app.include_router(routes.recent_accounts.router, prefix="/recent-contacts")
app.include_router(routes.wallet.router, prefix="/accounts")
app.include_router(routes.user_summary.router, prefix="/user-summary")
app.include_router(routes.analytics.router, prefix="/analytics")


@app.get("/")
def home(user = Depends(get_current_user)):
    return{"Fast api is running...."}

