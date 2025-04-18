from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List

from app import schemas, models, crud
from app.api import deps

router = APIRouter()

@router.get("/me", response_model=schemas.User)
def read_users_me(
    db: Session = Depends(deps.get_db),
    current_user: models.User = Depends(deps.get_current_active_user),
):
    """Get current user."""
    # Parental gate check should ideally be enforced by a dependency
    # if not current_user.parent_verified_at:
    #     raise HTTPException(status_code=403, detail="Parental verification required")
    return current_user

# Add other user-related endpoints if needed, e.g., update profile
# Remember to protect endpoints appropriately (e.g., superuser checks) 