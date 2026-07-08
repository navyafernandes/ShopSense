from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.database import get_db
from app.dependencies.auth import get_current_user
from app.enums.user_role import UserRole
from app.models.user import User

from app.schemas.product_schema import (
    ProductCreate,
    ProductUpdate,
    ProductResponse,
)

from app.services.product_service import (
    create_product,
    get_all_products,
    get_product_by_id,
    update_product,
    delete_product
)

router = APIRouter(
    prefix="/products",
    tags=["Products"]
)


@router.post("", response_model=ProductResponse)
def add_product(
    product: ProductCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):

    if current_user.role != UserRole.VENDOR:
        raise HTTPException(
            status_code=403,
            detail="Only vendors can add products."
        )

    new_product = create_product(
        db,
        product,
        current_user
    )

    if new_product is None:
        raise HTTPException(
            status_code=404,
            detail="Vendor profile not found."
        )

    return new_product

@router.get("", response_model=list[ProductResponse])
def list_products(
    db: Session = Depends(get_db)
):
    return get_all_products(db)


@router.get("/{product_id}", response_model=ProductResponse)
def get_product(
    product_id: int,
    db: Session = Depends(get_db)
):

    product = get_product_by_id(db, product_id)

    if product is None:
        raise HTTPException(
            status_code=404,
            detail="Product not found."
        )

    return product

@router.put("/{product_id}", response_model=ProductResponse)
def edit_product(
    product_id: int,
    product: ProductUpdate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):

    if current_user.role != UserRole.VENDOR:
        raise HTTPException(
            status_code=403,
            detail="Only vendors can update products."
        )

    updated_product = update_product(
        db,
        product_id,
        product,
        current_user
    )

    if updated_product is None:
        raise HTTPException(
            status_code=404,
            detail="Vendor profile not found."
        )

    if updated_product == "NOT_FOUND":
        raise HTTPException(
            status_code=404,
            detail="Product not found."
        )

    if updated_product == "FORBIDDEN":
        raise HTTPException(
            status_code=403,
            detail="You can update only your own products."
        )

    return updated_product

@router.delete("/{product_id}")
def remove_product(
    product_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):

    if current_user.role != UserRole.VENDOR:
        raise HTTPException(
            status_code=403,
            detail="Only vendors can delete products."
        )

    result = delete_product(
        db,
        product_id,
        current_user
    )

    if result is None:
        raise HTTPException(
            status_code=404,
            detail="Vendor profile not found."
        )

    if result == "NOT_FOUND":
        raise HTTPException(
            status_code=404,
            detail="Product not found."
        )

    if result == "FORBIDDEN":
        raise HTTPException(
            status_code=403,
            detail="You can delete only your own products."
        )

    return {
        "message": "Product deleted successfully."
    }