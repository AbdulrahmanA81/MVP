import os
from pydantic_settings import BaseSettings
from pydantic import AnyHttpUrl
from typing import List, Union

class Settings(BaseSettings):
    API_V1_STR: str = "/api/v1"
    PROJECT_NAME: str = "Book Creator MVP"

    # Database
    POSTGRES_SERVER: str = os.getenv("POSTGRES_SERVER", "db") # Docker service name or host
    POSTGRES_PORT: str = os.getenv("POSTGRES_PORT", "5432")
    POSTGRES_USER: str = os.getenv("POSTGRES_USER", "postgres")
    POSTGRES_PASSWORD: str = os.getenv("POSTGRES_PASSWORD", "password")
    POSTGRES_DB: str = os.getenv("POSTGRES_DB", "app")
    DATABASE_URI: str | None = None

    def model_post_init(self, __context) -> None:
        if not self.DATABASE_URI:
            self.DATABASE_URI = f"postgresql://{self.POSTGRES_USER}:{self.POSTGRES_PASSWORD}@{self.POSTGRES_SERVER}:{self.POSTGRES_PORT}/{self.POSTGRES_DB}"

    # Security
    SECRET_KEY: str = os.getenv("SECRET_KEY", "a_very_secret_key_change_this_in_production") # openssl rand -hex 32
    # 60 minutes * 24 hours * 8 days = 8 days
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 60 * 24 * 8
    ALGORITHM: str = "HS256"

    # CORS - Adjust in production
    BACKEND_CORS_ORIGINS: List[AnyHttpUrl] = []

    # Firebase - Add credentials path when implemented
    # FIREBASE_SERVICE_ACCOUNT_KEY_PATH: str | None = os.getenv("FIREBASE_SERVICE_ACCOUNT_KEY_PATH", None)

    # Stripe - Add keys when implemented
    # STRIPE_SECRET_KEY: str | None = os.getenv("STRIPE_SECRET_KEY", None)
    # STRIPE_WEBHOOK_SECRET: str | None = os.getenv("STRIPE_WEBHOOK_SECRET", None)

    # AWS S3 - Add credentials/config when implemented
    # AWS_ACCESS_KEY_ID: str | None = os.getenv("AWS_ACCESS_KEY_ID", None)
    # AWS_SECRET_ACCESS_KEY: str | None = os.getenv("AWS_SECRET_ACCESS_KEY", None)
    # AWS_REGION: str = os.getenv("AWS_REGION", "us-east-1")
    # S3_BUCKET_NAME: str | None = os.getenv("S3_BUCKET_NAME", None)

    # Redis (for Dramatiq) - Add when implemented
    # REDIS_HOST: str = os.getenv("REDIS_HOST", "redis")
    # REDIS_PORT: int = os.getenv("REDIS_PORT", 6379)

    class Config:
        case_sensitive = True
        env_file = ".env"

settings = Settings() 