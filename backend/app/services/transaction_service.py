from sqlalchemy.orm import Session

from app.models.order import Order
from app.models.order_item import OrderItem
from app.models.customer import Customer
from app.models.user import User
from app.models.vendor import Vendor
from app.models.payment import Payment


def get_all_transactions(db: Session):

    transactions = (
        db.query(
            Order,
            User.full_name.label("customer_name"),
            Vendor.business_name.label("vendor_name"),
            Payment.payment_method,
            Payment.payment_status,
            Payment.payment_date,
        )
        .join(
            Customer,
            Order.customer_id == Customer.customer_id
        )
        .join(
            User,
            Customer.user_id == User.user_id
        )
        .join(
            OrderItem,
            Order.order_id == OrderItem.order_id
        )
        .join(
            Vendor,
            OrderItem.vendor_id == Vendor.vendor_id
        )
        .outerjoin(
            Payment,
            Order.order_id == Payment.order_id
        )
        .all()
    )

    result = []

    for (
        order,
        customer_name,
        vendor_name,
        payment_method,
        payment_status,
        payment_date,
    ) in transactions:

        result.append({
            "order_id": order.order_id,
            "customer_name": customer_name,
            "vendor_name": vendor_name,
            "total_amount": order.total_amount,
            "payment_method": payment_method,
            "payment_status": payment_status,
            "order_status": order.order_status,
            "payment_date": payment_date,
        })

    return result