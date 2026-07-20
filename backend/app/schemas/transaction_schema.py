from datetime import datetime
from decimal import Decimal

from pydantic import BaseModel


class TransactionResponse(BaseModel):
    order_id: int

    customer_name: str

    vendor_name: str

    total_amount: Decimal

    payment_method: str | None

    payment_status: str | None

    order_status: str

    payment_date: datetime | None

    class Config:
        from_attributes = True