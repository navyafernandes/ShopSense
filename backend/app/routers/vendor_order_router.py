from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.database import get_db
from app.dependencies.auth import get_current_user

from app.enums.user_role import UserRole
from app.models.user import User

from app.schemas.vendor_order_schema import (
    VendorOrderResponse,
    VendorOrderStatusUpdate
)

from app.services.vendor_order_service import (
    get_vendor_orders,
    update_vendor_order_status
)



router = APIRouter(
    prefix="/vendor/orders",
    tags=["Vendor Orders"],
)


@router.get(
    "",
    response_model=list[VendorOrderResponse],
)
def vendor_orders(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):

    if current_user.role != UserRole.VENDOR:
        raise HTTPException(
            status_code=403,
            detail="Only vendors can access this."
        )

    result = get_vendor_orders(
        db,
        current_user,
    )

    if result is None:
        raise HTTPException(
            status_code=404,
            detail="Vendor not found."
        )

    return result

@router.put(
    "/{order_id}/status"
)
def update_status(
    order_id: int,
    status: VendorOrderStatusUpdate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):

    if current_user.role != UserRole.VENDOR:
        raise HTTPException(
            status_code=403,
            detail="Only vendors can update orders."
        )

    result = update_vendor_order_status(
        db,
        order_id,
        status,
        current_user,
    )

    if result is None:
        raise HTTPException(
            status_code=404,
            detail="Vendor not found."
        )

    if result == "FORBIDDEN":
        raise HTTPException(
            status_code=403,
            detail="This order doesn't belong to you."
        )

    if result == "ORDER_NOT_FOUND":
        raise HTTPException(
            status_code=404,
            detail="Order not found."
        )

    if result == "INVALID_STATUS":
        raise HTTPException(
            status_code=400,
            detail="Invalid status."
        )

    return result