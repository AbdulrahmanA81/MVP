import uuid
from sqlalchemy import Column, String, Integer, Text, ForeignKey, TIMESTAMP
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
from sqlalchemy.dialects.postgresql import UUID as PG_UUID

from app.db.base_class import Base

class Page(Base):
    id = Column(PG_UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    story_id = Column(PG_UUID(as_uuid=True), ForeignKey("story.id"), nullable=False)
    page_number = Column(Integer, nullable=False)
    text = Column(Text, nullable=True) # Rich text content, potentially HTML or Markdown
    image_url = Column(String, nullable=True)
    created_at = Column(TIMESTAMP, server_default=func.now())
    updated_at = Column(TIMESTAMP, server_default=func.now(), onupdate=func.now())
    # Add other fields: image_prompt, audio_url etc.

    story = relationship("Story", back_populates="pages") 