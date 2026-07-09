from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.database import get_db
from app.dependencies.auth import get_current_user
from app.enums.user_role import UserRole
from app.models.user import User
from app.schemas.cart_schema import (
    CartItemCreate,
    CartItemResponse,
    CartItemUpdate,
    CartResponse
)

from app.services.cart_service import (
    add_to_cart,
    get_cart,
    update_cart_item,
    delete_cart_item
)

router = APIRouter(
    prefix="/cart",
    tags=["Cart"]
)


@router.post(
    "/items",
    response_model=CartItemResponse
)
def add_item(
    cart_item: CartItemCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):

    if current_user.role != UserRole.CUSTOMER:
        raise HTTPException(
            status_code=403,
            detail="Only customers can use the cart."
        )

    result = add_to_cart(
        db,
        cart_item,
        current_user
    )

    if result == "CUSTOMER_NOT_FOUND":
        raise HTTPException(
            status_code=404,
            detail="Customer profile not found."
        )

    if result == "PRODUCT_NOT_FOUND":
        raise HTTPException(
            status_code=404,
            detail="Product not found."
        )

    return result

@router.get(
    "",
    response_model=CartResponse
)
def view_cart(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):

    if current_user.role != UserRole.CUSTOMER:
        raise HTTPException(
            status_code=403,
            detail="Only customers can view cart."
        )

    result = get_cart(
        db,
        current_user
    )

    if result == "CUSTOMER_NOT_FOUND":
        raise HTTPException(
            status_code=404,
            detail="Customer profile not found."
        )

    return result

@router.put(
    "/items/{cart_item_id}",
    response_model=CartItemResponse
)
def edit_cart_item(
    cart_item_id: int,
    cart_item: CartItemUpdate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):

    if current_user.role != UserRole.CUSTOMER:
        raise HTTPException(
            status_code=403,
            detail="Only customers can update cart."
        )

    result = update_cart_item(
        db,
        cart_item_id,
        cart_item,
        current_user
    )

    if result == "CUSTOMER_NOT_FOUND":
        raise HTTPException(404, "Customer not found.")

    if result == "CART_NOT_FOUND":
        raise HTTPException(404, "Cart not found.")

    if result == "ITEM_NOT_FOUND":
        raise HTTPException(404, "Cart item not found.")

    return result

@router.delete("/items/{cart_item_id}")
def remove_cart_item(
    cart_item_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):

    if current_user.role != UserRole.CUSTOMER:
        raise HTTPException(
            status_code=403,
            detail="Only customers can remove cart items."
        )

    result = delete_cart_item(
        db,
        cart_item_id,
        current_user
    )

    if result == "CUSTOMER_NOT_FOUND":
        raise HTTPException(
            status_code=404,
            detail="Customer not found."
        )

    if result == "CART_NOT_FOUND":
        raise HTTPException(
            status_code=404,
            detail="Cart not found."
        )

    if result == "ITEM_NOT_FOUND":
        raise HTTPException(
            status_code=404,
            detail="Cart item not found."
        )

    return {
        "message": "Item removed from cart successfully."
    }