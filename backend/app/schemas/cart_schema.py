from pydantic import BaseModel, Field
from decimal import Decimal
from typing import List


class CartItemCreate(BaseModel):
    product_id: int
    quantity: int = Field(..., gt=0)


class CartItemUpdate(BaseModel):
    quantity: int = Field(..., gt=0)


class CartItemResponse(BaseModel):
    cart_item_id: int
    product_id: int
    quantity: int

    class Config:
        from_attributes = True


class CartItemDetail(BaseModel):
    cart_item_id: int
    product_id: int
    product_name: str
    thumbnail_url: str | None = None
    quantity: int
    price: Decimal
    subtotal: Decimal


class CartResponse(BaseModel):
    items: List[CartItemDetail]
    total_amount: Decimal