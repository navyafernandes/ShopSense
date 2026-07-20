from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.database import get_db

from app.dependencies.auth import get_current_user
from app.enums.user_role import UserRole
from app.models.user import User

from app.schemas.vendor_product_schema import (
    VendorProductResponse,
)

from app.services.vendor_product_service import (
    get_vendor_products,
)

router = APIRouter(
    prefix="/vendor/products",
    tags=["Vendor Products"],
)


@router.get(
    "",
    response_model=list[VendorProductResponse],
)
def vendor_products(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):

    if current_user.role != UserRole.VENDOR:
        raise HTTPException(
            status_code=403,
            detail="Only vendors can access this resource.",
        )

    products = get_vendor_products(
        db,
        current_user,
    )

    if products is None:
        raise HTTPException(
            status_code=404,
            detail="Vendor profile not found.",
        )

    return products