from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
# from slowapi import Limiter, _rate_limit_exceeded_handler # Uncomment when rate limiting is added
# from slowapi.util import get_remote_address                 # Uncomment when rate limiting is added
# from slowapi.errors import RateLimitExceeded                # Uncomment when rate limiting is added

from app.api.v1.api import api_router # Uncommented
from app.core.config import settings # Uncommented

# limiter = Limiter(key_func=get_remote_address) # Uncomment when rate limiting is added

app = FastAPI(
    title="Book Creator MVP API",
    openapi_url=f"/openapi.json" # Adjust prefix if needed
)

# app.state.limiter = limiter # Uncomment when rate limiting is added
# app.add_exception_handler(RateLimitExceeded, _rate_limit_exceeded_handler) # Uncomment when rate limiting is added

# Set all CORS enabled origins
# In production, restrict origins to your frontend domain
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"] # Replace "*" with frontend URL in production
    allow_credentials=True,
    allow_methods=["*"]
    allow_headers=["*"]
)

@app.get("/health")
def health_check():
    return {"status": "ok"}

app.include_router(api_router, prefix=settings.API_V1_STR) # Uncommented and using prefix from settings

# Optional: Add startup/shutdown events if needed
# @app.on_event("startup")
# async def startup_event():
#     pass

# @app.on_event("shutdown")
# async def shutdown_event():
#     pass 