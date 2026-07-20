from pydantic import BaseModel
from decimal import Decimal
from datetime import datetime
from typing import List, Optional


from pydantic import BaseModel


class OrderCreate(BaseModel):
    shipping_address: str


class OrderItemResponse(BaseModel):
    product_id: int
    vendor_id: int
    quantity: int
    price: Decimal

    class Config:
        from_attributes = True


class OrderResponse(BaseModel):
    order_id: int
    customer_id: int
    order_date: datetime
    total_amount: Decimal
    order_status: str
    shipping_address: str
    tracking_number: str | None

    class Config:
        from_attributes = True


class OrderSummaryResponse(BaseModel):
    order: OrderResponse
    items: List[OrderItemResponse]

class OrderListResponse(BaseModel):
    order_id: int
    order_date: datetime
    total_amount: Decimal
    order_status: str
    shipping_address: str
    tracking_number: Optional[str] = None

    class Config:
        from_attributes = True

