from fastapi import Depends, HTTPException
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from auth.auth_token import verify_access_token

security = HTTPBearer()

def get_current_user(credentials: HTTPAuthorizationCredentials = Depends(security)):
    token = credentials.credentials
    try:
        payload = verify_access_token(token)
        return payload
    except ValueError as e:
        raise HTTPException(status_code=401, detail=str(e))