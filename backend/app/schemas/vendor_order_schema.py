from datetime import datetime
from decimal import Decimal

from pydantic import BaseModel


class VendorOrderResponse(BaseModel):
    order_id: int
    customer_name: str
    product_name: str
    quantity: int
    amount: Decimal
    order_status: str
    order_date: datetime

    class Config:
        from_attributes = True

class VendorOrderStatusUpdate(BaseModel):
    order_status: str