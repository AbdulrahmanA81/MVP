from typing import Optional
from uuid import UUID

from sqlalchemy.orm import Session

from app.crud.base import CRUDBase
from app.models.subscription import Subscription
from app.schemas.subscription import SubscriptionCreate, SubscriptionUpdate

class CRUDSubscription(CRUDBase[Subscription, SubscriptionCreate, SubscriptionUpdate]):
    def get_by_user_id(self, db: Session, *, user_id: UUID) -> Optional[Subscription]:
        return db.query(Subscription).filter(Subscription.user_id == user_id).first()

    def get_by_stripe_subscription_id(self, db: Session, *, stripe_subscription_id: str) -> Optional[Subscription]:
        return db.query(Subscription).filter(Subscription.stripe_subscription_id == stripe_subscription_id).first()

    # Add other specific methods as needed, e.g., update status by user_id

subscription = CRUDSubscription(Subscription) 