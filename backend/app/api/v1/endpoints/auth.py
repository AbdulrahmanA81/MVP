from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.security import OAuth2PasswordRequestForm
from sqlalchemy.orm import Session

from app import schemas, models # Add crud, security later
from app.api import deps # Add deps later

router = APIRouter()

@router.post("/signup", response_model=schemas.User, status_code=status.HTTP_201_CREATED)
def signup(
    *, 
    db: Session = Depends(deps.get_db), 
    user_in: schemas.UserCreate # Add parental gate dependency?
):
    """
    Create new user.
    Requires parental gate verification first (not implemented here).
    """
    # Placeholder: Check if user exists
    # Placeholder: Hash password
    # Placeholder: Create user in DB
    # Placeholder: Create initial subscription record (trialing)
    # return created_user
    raise HTTPException(status_code=501, detail="Signup not implemented")

@router.post("/login/access-token", response_model=schemas.Token)
def login_access_token(
    db: Session = Depends(deps.get_db),
    form_data: OAuth2PasswordRequestForm = Depends()
):
    """
    OAuth2 compatible token login, get an access token for future requests.
    (Handles email/password login)
    """
    # Placeholder: Authenticate user
    # Placeholder: Create access token
    # return token
    raise HTTPException(status_code=501, detail="Login not implemented")

# Add endpoints for Firebase/Google/Apple auth later
# These might involve receiving an ID token from the frontend and verifying it 