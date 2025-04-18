from fastapi import APIRouter

# Import endpoint modules here when they are created
from .endpoints import auth, users, stories

api_router = APIRouter()

# Include routers from endpoint modules
api_router.include_router(auth.router, prefix="/auth", tags=["auth"])
api_router.include_router(users.router, prefix="/users", tags=["users"])
api_router.include_router(stories.router, prefix="/stories", tags=["stories"])

# Add other routers (e.g., webhooks) here 