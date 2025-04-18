from pydantic import BaseModel, UUID4
from typing import Optional
from datetime import datetime

# Shared properties
class PageBase(BaseModel):
    page_number: Optional[int] = None
    text: Optional[str] = None
    image_url: Optional[str] = None

# Properties to receive via API on creation (usually implicitly created with story text generation)
class PageCreate(PageBase):
    page_number: int
    text: Optional[str] = None # Text might come from AI generation result

# Properties to receive via API on update (e.g., from Page Editor)
class PageUpdate(PageBase):
    text: Optional[str] = None
    # Potentially add fields to trigger image regen?

class PageInDBBase(PageBase):
    id: UUID4
    story_id: UUID4
    created_at: datetime
    updated_at: datetime

    model_config = {
        "from_attributes": True
    }

# Additional properties stored in DB
class PageInDB(PageInDBBase):
    pass

# Additional properties to return to client
class Page(PageInDBBase):
    pass 