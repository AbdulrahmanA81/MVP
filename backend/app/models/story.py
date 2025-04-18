import uuid
from sqlalchemy import Column, String, Integer, JSON, ForeignKey, TIMESTAMP, Enum as SQLEnum
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
from sqlalchemy.dialects.postgresql import UUID as PG_UUID
import enum

from app.db.base_class import Base

class StoryStatus(str, enum.Enum):
    DRAFT = "draft"
    GENERATING_TEXT = "generating_text"
    TEXT_READY = "text_ready"
    GENERATING_IMAGES = "generating_images"
    READY = "ready"
    EXPORTING = "exporting"
    ERROR = "error"

class Story(Base):
    id = Column(PG_UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    user_id = Column(PG_UUID(as_uuid=True), ForeignKey("user.id"), nullable=False)
    title = Column(String, index=True)
    age_min = Column(Integer, nullable=False)
    age_max = Column(Integer, nullable=False)
    theme = Column(String) # Consider JSON if multiple themes allowed
    vocab_level = Column(String) # Consider Enum
    lessons = Column(JSON) # Stores list of lesson tags
    status = Column(SQLEnum(StoryStatus), default=StoryStatus.DRAFT, nullable=False)
    page_count = Column(Integer, default=0)
    remaining_images = Column(Integer, default=5) # Default for free tier
    created_at = Column(TIMESTAMP, server_default=func.now())
    updated_at = Column(TIMESTAMP, server_default=func.now(), onupdate=func.now())

    owner = relationship("User")
    pages = relationship("Page", back_populates="story", cascade="all, delete-orphan")
    # Add other fields: template_id, cover_image_url etc. 