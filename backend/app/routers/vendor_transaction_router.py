from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.database import get_db
from app.dependencies.auth import get_current_user

from app.enums.user_role import UserRole
from app.models.user import User

from app.schemas.vendor_transaction_schema import (
    VendorTransactionResponse,
)

from app.services.vendor_transaction_service import (
    get_vendor_transactions,
)

router = APIRouter(
    prefix="/vendor/transactions",
    tags=["Vendor Transactions"],
)


@router.get(
    "",
    response_model=list[VendorTransactionResponse],
)
def vendor_transactions(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):

    if current_user.role != UserRole.VENDOR:
        raise HTTPException(
            status_code=403,
            detail="Only vendors can access this."
        )

    result = get_vendor_transactions(
        db,
        current_user,
    )

    if result is None:
        raise HTTPException(
            status_code=404,
            detail="Vendor not found."
        )

    return result