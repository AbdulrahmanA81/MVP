import uuid
import enum
from sqlalchemy import Column, String, ForeignKey, TIMESTAMP, Enum as SQLEnum
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
from sqlalchemy.dialects.postgresql import UUID as PG_UUID

from app.db.base_class import Base

class SubscriptionStatus(str, enum.Enum):
    TRIALING = "trialing"
    ACTIVE = "active"
    PAST_DUE = "past_due"
    CANCELED = "canceled"
    INCOMPLETE = "incomplete"

class Subscription(Base):
    id = Column(PG_UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    user_id = Column(PG_UUID(as_uuid=True), ForeignKey("user.id"), unique=True, nullable=False) # One subscription per user
    stripe_subscription_id = Column(String, unique=True, index=True, nullable=True)
    stripe_customer_id = Column(String, unique=True, index=True, nullable=True)
    status = Column(SQLEnum(SubscriptionStatus), nullable=False)
    plan_id = Column(String) # e.g., 'premium_monthly'
    trial_end = Column(TIMESTAMP, nullable=True)
    current_period_end = Column(TIMESTAMP, nullable=True)
    created_at = Column(TIMESTAMP, server_default=func.now())
    updated_at = Column(TIMESTAMP, server_default=func.now(), onupdate=func.now())

    user = relationship("User") 