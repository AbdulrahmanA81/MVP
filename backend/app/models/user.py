import uuid
from sqlalchemy import Column, String, TIMESTAMP, UUID as PG_UUID, Boolean
from sqlalchemy.sql import func
from app.db.base_class import Base

class User(Base):
    id = Column(PG_UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    email = Column(String, unique=True, index=True, nullable=False)
    firebase_uid = Column(String, unique=True, index=True, nullable=True) # Initially nullable until linked
    parent_verified_at = Column(TIMESTAMP, nullable=True)
    hashed_password = Column(String, nullable=True) # For email/password auth
    is_active = Column(Boolean(), default=True)
    is_superuser = Column(Boolean(), default=False)
    created_at = Column(TIMESTAMP, server_default=func.now())
    updated_at = Column(TIMESTAMP, server_default=func.now(), onupdate=func.now())
    # Add other fields as needed, e.g., name, free_trial_used 