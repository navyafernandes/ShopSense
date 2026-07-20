from sqlalchemy.orm import Session

from app.models.vendor import Vendor
from app.models.product import Product
from app.models.order import Order
from app.models.order_item import OrderItem
from app.models.customer import Customer
from app.models.user import User


def get_vendor_orders(db: Session, user):

    vendor = (
        db.query(Vendor)
        .filter(
            Vendor.user_id == user.user_id
        )
        .first()
    )

    if vendor is None:
        return None

    results = (
        db.query(
            Order,
            OrderItem,
            Product,
            Customer,
            User
        )
        .join(
            OrderItem,
            Order.order_id == OrderItem.order_id
        )
        .join(
            Product,
            OrderItem.product_id == Product.product_id
        )
        .join(
            Customer,
            Order.customer_id == Customer.customer_id
        )
        .join(
            User,
            Customer.user_id == User.user_id
        )
        .filter(
            Product.vendor_id == vendor.vendor_id
        )
        .order_by(
            Order.order_date.desc()
        )
        .all()
    )

    return [
        {
            "order_id": order.order_id,
            "customer_name": user.full_name,
            "product_name": product.product_name,
            "quantity": order_item.quantity,
            "amount": order_item.price * order_item.quantity,
            "order_status": order.order_status,
            "order_date": order.order_date,
        }
        for order, order_item, product, customer, user in results
    ]


def update_vendor_order_status(
    db: Session,
    order_id: int,
    status_data,
    user,
):
    vendor = (
        db.query(Vendor)
        .filter(Vendor.user_id == user.user_id)
        .first()
    )

    if vendor is None:
        return None

    order_item = (
        db.query(OrderItem)
        .join(
            Product,
            Product.product_id == OrderItem.product_id
        )
        .filter(
            OrderItem.order_id == order_id,
            Product.vendor_id == vendor.vendor_id
        )
        .first()
    )

    if order_item is None:
        return "FORBIDDEN"

    order = (
        db.query(Order)
        .filter(Order.order_id == order_id)
        .first()
    )

    if order is None:
        return "ORDER_NOT_FOUND"

    allowed = [
        "CONFIRMED",
        "SHIPPED",
        "DELIVERED",
    ]

    if status_data.order_status not in allowed:
        return "INVALID_STATUS"

    order.order_status = status_data.order_status

    db.commit()
    db.refresh(order)

    return order