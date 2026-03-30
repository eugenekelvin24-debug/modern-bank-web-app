from datetime import datetime, timedelta, timezone # Added timezone
import os
from jose import JWTError, jwt
from dotenv import load_dotenv
from typing import Optional

load_dotenv()

raw_key = os.getenv("SECRET_KEY")

if raw_key is None:
    raise ValueError("CRITICAL: SECRET_KEY is missing from your .env file!")

SECRET_KEY: str = raw_key

ALGORITHM = "HS256"

ACCESS_TOKEN_EXPIRE_HOURS = int(os.getenv("ACCESS_TOKEN_EXPIRE_HOURS", 2))

def create_access_token(data: dict, expires_delta: Optional[timedelta] = None) -> str:
    """
    Creates a JWT access token with a timezone-aware expiration timestamp.
    """
    to_encode = data.copy()
    
    # Modern 3.12+ way to get UTC time
    now = datetime.now(timezone.utc)
    
    expire = now + (expires_delta or timedelta(hours=ACCESS_TOKEN_EXPIRE_HOURS))
    
    to_encode.update({"exp": expire})
    return jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)

def verify_access_token(token: str) -> dict:
    """
    Verifies a JWT token and returns the payload if valid.
    """
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        
        # Check for required identity fields
        if not payload.get("email") or not payload.get("id"):
            raise ValueError("Token is missing required user data")
            
        return payload

    except JWTError:
        # Handles expired or tampered tokens
        raise ValueError("Invalid or expired session. Please log in again.")