from pydantic import BaseModel
from typing import Optional

class Token(BaseModel):
    access_token: str
    token_type: str
    # refresh_token: Optional[str] = None # Add if using refresh tokens

class TokenPayload(BaseModel):
    sub: Optional[str] = None # Subject (user ID or email) 