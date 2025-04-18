from pydantic import BaseModel, UUID4
from typing import Optional, List, Any
from datetime import datetime
from app.models import StoryStatus # Import the enum
from .page import Page # Import Page schema for nesting

# Shared properties
class StoryBase(BaseModel):
    title: Optional[str] = None
    age_min: Optional[int] = None
    age_max: Optional[int] = None
    theme: Optional[str] = None
    vocab_level: Optional[str] = None
    lessons: Optional[List[str]] = [] # List of strings for tags

# Properties to receive via API on creation (Story Wizard)
class StoryCreate(StoryBase):
    age_min: int
    age_max: int
    # Make other fields required as needed based on wizard steps
    title: str = "Untitled Story"

# Properties to receive via API on update
class StoryUpdate(StoryBase):
    pass # Add fields that can be updated later, e.g., title

class StoryInDBBase(StoryBase):
    id: UUID4
    user_id: UUID4
    status: StoryStatus
    page_count: int
    remaining_images: int
    created_at: datetime
    updated_at: datetime

    model_config = {
        "from_attributes": True,
        "use_enum_values": True # Serialize enums to their values
    }

# Additional properties stored in DB
class StoryInDB(StoryInDBBase):
    pass

# Additional properties to return to client
class Story(StoryInDBBase):
    pass

# Schema for full story details including pages
class StoryWithPages(Story):
    pages: List[Page] = []

# Schema for presigned URL response
class PresignedUrl(BaseModel):
    url: str
    expires_at: datetime 