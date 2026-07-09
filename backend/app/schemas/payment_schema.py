from datetime import datetime

from pydantic import BaseModel


class PaymentCreate(BaseModel):
    order_id: int
    payment_method: str


class PaymentResponse(BaseModel):
    payment_id: int
    order_id: int
    payment_method: str
    payment_status: str
    payment_date: datetime

    class Config:
        from_attributes = True