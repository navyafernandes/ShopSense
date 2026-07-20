from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.database import get_db
from app.dependencies.auth import get_current_user   # or wherever your get_current_user is

from app.schemas.customer_schema import (
    CustomerProfileResponse,
    CustomerProfileUpdate,
    MessageResponse,
)

from app.services import customer_service

router = APIRouter(
    prefix="/customers",
    tags=["Customers"]
)


@router.get(
    "/profile",
    response_model=CustomerProfileResponse
)
def get_profile(
    db: Session = Depends(get_db),
    user = Depends(get_current_user)
):
    return customer_service.get_customer_profile(db, user)


@router.put(
    "/profile",
    response_model=MessageResponse
)
def update_profile(
    profile: CustomerProfileUpdate,
    db: Session = Depends(get_db),
    user = Depends(get_current_user)
):
    return customer_service.update_customer_profile(db, user, profile)