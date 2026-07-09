from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.database import get_db

from app.schemas.payment_schema import (
    PaymentCreate,
    PaymentResponse
)

from app.services.payment_service import create_payment

router = APIRouter(
    prefix="/payments",
    tags=["Payments"]
)


@router.post(
    "",
    response_model=PaymentResponse
)
def make_payment(
    payment: PaymentCreate,
    db: Session = Depends(get_db)
):

    result = create_payment(
        db,
        payment
    )

    if result == "ORDER_NOT_FOUND":
        raise HTTPException(
            status_code=404,
            detail="Order not found."
        )

    if result == "PAYMENT_ALREADY_EXISTS":
        raise HTTPException(
            status_code=400,
            detail="Payment already exists for this order."
        )

    return result