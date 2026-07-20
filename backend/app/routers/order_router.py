from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.database import get_db
from app.dependencies.auth import get_current_user
from app.enums.user_role import UserRole
from app.models.user import User

from app.services import order_service

from typing import List
from app.schemas.order_schema import OrderListResponse

from app.schemas.order_schema import (
    OrderCreate,
    OrderSummaryResponse
)

from app.services.order_service import create_order

router = APIRouter(
    prefix="/orders",
    tags=["Orders"]
)

@router.get(
    "",
    response_model=List[OrderListResponse]
)
def list_orders(
    db: Session = Depends(get_db),
    user = Depends(get_current_user)
):
    return order_service.get_customer_orders(
        db,
        user
    )

@router.post(
    "",
    response_model=OrderSummaryResponse
)
def place_order(
    order: OrderCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):

    if current_user.role != UserRole.CUSTOMER:
        raise HTTPException(
            status_code=403,
            detail="Only customers can place orders."
        )

    result = create_order(db, order, current_user)

    print(result)

    return result

    