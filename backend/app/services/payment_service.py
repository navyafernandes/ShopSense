from sqlalchemy.orm import Session

from app.models.order import Order
from app.models.payment import Payment


def create_payment(
    db: Session,
    payment_data
):
    order = (
        db.query(Order)
        .filter(
            Order.order_id == payment_data.order_id
        )
        .first()
    )

    if order is None:
        return "ORDER_NOT_FOUND"

    existing_payment = (
        db.query(Payment)
        .filter(
            Payment.order_id == payment_data.order_id
        )
        .first()
    )

    if existing_payment:
        return "PAYMENT_ALREADY_EXISTS"

    payment = Payment(
    order_id=payment_data.order_id,
    payment_method=payment_data.payment_method,
    payment_status="SUCCESS"
    )

    db.add(payment)

    order.order_status = "CONFIRMED"

    db.commit()
    db.refresh(payment)

    return payment