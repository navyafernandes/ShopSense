from pydantic import BaseModel
from typing import Optional

class CustomerProfileResponse(BaseModel):
    customer_id: int
    name: str
    email: str
    phone: Optional[str] = None
    address: Optional[str] = None

    class Config:
        from_attributes = True


class CustomerProfileUpdate(BaseModel):
    name: str
    phone: Optional[str] = None
    address: Optional[str] = None


class MessageResponse(BaseModel):
    message: str