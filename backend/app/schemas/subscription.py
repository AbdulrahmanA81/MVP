from pydantic import BaseModel, UUID4
from typing import Optional
from datetime import datetime
from app.models import SubscriptionStatus # Import the enum

# Shared properties
class SubscriptionBase(BaseModel):
    plan_id: Optional[str] = None
    status: Optional[SubscriptionStatus] = None

# Properties to receive on creation (usually via webhook or initial setup)
class SubscriptionCreate(SubscriptionBase):
    user_id: UUID4
    status: SubscriptionStatus
    stripe_customer_id: Optional[str] = None
    stripe_subscription_id: Optional[str] = None
    plan_id: str
    trial_end: Optional[datetime] = None
    current_period_end: Optional[datetime] = None

# Properties to receive via API update (likely from webhook)
class SubscriptionUpdate(SubscriptionBase):
    stripe_subscription_id: Optional[str] = None # May update if changes
    status: Optional[SubscriptionStatus] = None
    plan_id: Optional[str] = None
    trial_end: Optional[datetime] = None
    current_period_end: Optional[datetime] = None

class SubscriptionInDBBase(SubscriptionBase):
    id: UUID4
    user_id: UUID4
    stripe_subscription_id: Optional[str] = None
    stripe_customer_id: Optional[str] = None
    created_at: datetime
    updated_at: datetime
    trial_end: Optional[datetime] = None
    current_period_end: Optional[datetime] = None

    model_config = {
        "from_attributes": True,
        "use_enum_values": True
    }

# Additional properties stored in DB
class SubscriptionInDB(SubscriptionInDBBase):
    pass

# Additional properties to return to client
class Subscription(SubscriptionInDBBase):
    pass 