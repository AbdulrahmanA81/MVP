from typing import List
from uuid import UUID

from sqlalchemy.orm import Session

from app.crud.base import CRUDBase
from app.models.page import Page
from app.schemas.page import PageCreate, PageUpdate

class CRUDPage(CRUDBase[Page, PageCreate, PageUpdate]):
    def get_multi_by_story(
        self, db: Session, *, story_id: UUID, skip: int = 0, limit: int = 1000 # High limit for pages
    ) -> List[Page]:
        return (
            db.query(self.model)
            .filter(Page.story_id == story_id)
            .order_by(Page.page_number)
            .offset(skip)
            .limit(limit)
            .all()
        )
    
    # Add methods if needed, e.g., create multiple pages at once

page = CRUDPage(Page) 