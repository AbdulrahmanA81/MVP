from pydantic import BaseModel, EmailStr, UUID4
from typing import Optional
from datetime import datetime

# Shared properties
class UserBase(BaseModel):
    email: Optional[EmailStr] = None
    is_active: Optional[bool] = True
    is_superuser: bool = False
    # Add other shared fields like name

# Properties to receive via API on creation
class UserCreate(UserBase):
    email: EmailStr
    password: str
    # dob: date # Needed for parental gate verification logic

# Properties to receive via API on update
class UserUpdate(UserBase):
    password: Optional[str] = None

class UserInDBBase(UserBase):
    id: UUID4
    parent_verified_at: Optional[datetime] = None
    created_at: datetime
    updated_at: datetime

    model_config = {
        "from_attributes": True # Replaces orm_mode
    }

# Additional properties stored in DB but not returned by API
class UserInDB(UserInDBBase):
    hashed_password: Optional[str] = None
    firebase_uid: Optional[str] = None

# Additional properties to return via API
class User(UserInDBBase):
    pass

# Schema for parental gate verification
class UserParentalGate(BaseModel):
    # Define fields needed for DOB verification, e.g.
    # date_of_birth: date
    pass 