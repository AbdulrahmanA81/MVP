from typing import List, Optional
from uuid import UUID

from sqlalchemy.orm import Session

from app.crud.base import CRUDBase
from app.models.story import Story
from app.schemas.story import StoryCreate, StoryUpdate

class CRUDStory(CRUDBase[Story, StoryCreate, StoryUpdate]):
    def create_with_owner(self, db: Session, *, obj_in: StoryCreate, user_id: UUID) -> Story:
        obj_in_data = obj_in.model_dump()
        db_obj = self.model(**obj_in_data, user_id=user_id)
        db.add(db_obj)
        db.commit()
        db.refresh(db_obj)
        return db_obj

    def get_multi_by_owner(
        self, db: Session, *, user_id: UUID, skip: int = 0, limit: int = 100
    ) -> List[Story]:
        return (
            db.query(self.model)
            .filter(Story.user_id == user_id)
            .offset(skip)
            .limit(limit)
            .all()
        )

story = CRUDStory(Story) 