from fastapi import APIRouter, Depends, HTTPException, status, BackgroundTasks
from sqlalchemy.orm import Session
from typing import List, Any
import uuid

from app import schemas, models, crud
from app.api import deps
# from app.services import story_generator # For background tasks

router = APIRouter()

@router.post("/", response_model=schemas.Story, status_code=status.HTTP_201_CREATED)
def create_story(
    *, 
    db: Session = Depends(deps.get_db),
    story_in: schemas.StoryCreate,
    current_user: models.User = Depends(deps.get_current_active_user),
    # Add parental gate dependency?
):
    """Create a new story draft based on wizard input."""
    # story = crud.story.create_with_owner(db=db, obj_in=story_in, user_id=current_user.id)
    # return story
    raise HTTPException(status_code=501, detail="Story creation not implemented")

@router.get("/", response_model=List[schemas.Story])
def read_stories(
    db: Session = Depends(deps.get_db),
    skip: int = 0,
    limit: int = 100,
    current_user: models.User = Depends(deps.get_current_active_user),
) -> Any:
    """Retrieve stories for the current user."""
    # stories = crud.story.get_multi_by_owner(
    #     db=db, user_id=current_user.id, skip=skip, limit=limit
    # )
    # return stories
    raise HTTPException(status_code=501, detail="Story retrieval not implemented")


@router.get("/{story_id}", response_model=schemas.StoryWithPages)
def read_story(
    *,
    db: Session = Depends(deps.get_db),
    story_id: uuid.UUID,
    current_user: models.User = Depends(deps.get_current_active_user),
) -> Any:
    """Get story by ID, including its pages."""
    # story = crud.story.get(db=db, id=story_id)
    # if not story:
    #     raise HTTPException(status_code=404, detail="Story not found")
    # if story.user_id != current_user.id:
    #     raise HTTPException(status_code=403, detail="Not authorized to access this story")
    # return story # Ensure pages are loaded via relationship
    raise HTTPException(status_code=501, detail="Story retrieval by ID not implemented")


@router.post("/{story_id}/generate-text", status_code=status.HTTP_202_ACCEPTED)
def generate_story_text(
    *,
    db: Session = Depends(deps.get_db),
    story_id: uuid.UUID,
    background_tasks: BackgroundTasks,
    current_user: models.User = Depends(deps.get_current_active_user),
) -> Any:
    """Trigger background task to generate story text."""
    # Get story, check ownership and status (e.g., must be DRAFT)
    # Update story status to GENERATING_TEXT
    # background_tasks.add_task(story_generator.generate_text_for_story, story_id=story_id)
    # return {"message": "Story text generation initiated"}
    raise HTTPException(status_code=501, detail="Text generation not implemented")


@router.post("/{story_id}/generate-images", status_code=status.HTTP_202_ACCEPTED)
def generate_story_images(
    *,
    db: Session = Depends(deps.get_db),
    story_id: uuid.UUID,
    background_tasks: BackgroundTasks,
    current_user: models.User = Depends(deps.get_current_active_user),
) -> Any:
    """Trigger background task to generate story images."""
    # Get story, check ownership and status (e.g., must be TEXT_READY)
    # Check image credits (remaining_images > 0 or user is subscribed)
    # Update story status to GENERATING_IMAGES
    # background_tasks.add_task(story_generator.generate_images_for_story, story_id=story_id)
    # return {"message": "Story image generation initiated"}
    raise HTTPException(status_code=501, detail="Image generation not implemented")


@router.get("/{story_id}/export/pdf", response_model=schemas.PresignedUrl)
def export_story_pdf(
    *,
    db: Session = Depends(deps.get_db),
    story_id: uuid.UUID,
    current_user: models.User = Depends(deps.get_current_active_user),
) -> Any:
    """Generate and return a presigned URL for the PDF export."""
    # Get story, check ownership and status (must be READY)
    # Check if PDF already exists and is recent? (Optional)
    # Trigger PDF generation (can be sync or async)
    # Upload to S3
    # Generate presigned URL
    # return {"url": presigned_url, "expires_at": expiry_time}
    raise HTTPException(status_code=501, detail="PDF export not implemented")

# Add endpoint for ePub export similarly
# Add endpoints for updating/deleting stories if needed 