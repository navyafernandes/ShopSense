from sqlalchemy import func
from sqlalchemy.orm import Session

from app.models.vendor import Vendor
from app.models.product import Product
from app.models.order_item import OrderItem


def get_vendor_dashboard(db: Session, user):

    vendor = (
        db.query(Vendor)
        .filter(Vendor.user_id == user.user_id)
        .first()
    )

    if vendor is None:
        return None

    total_products = (
        db.query(Product)
        .filter(Product.vendor_id == vendor.vendor_id)
        .count()
    )

    total_orders = (
        db.query(
            func.count(
                func.distinct(OrderItem.order_id)
            )
        )
        .filter(OrderItem.vendor_id == vendor.vendor_id)
        .scalar()
    )

    products_sold = (
        db.query(
            func.coalesce(
                func.sum(OrderItem.quantity),
                0
            )
        )
        .filter(OrderItem.vendor_id == vendor.vendor_id)
        .scalar()
    )

    total_revenue = (
        db.query(
            func.coalesce(
                func.sum(
                    OrderItem.quantity * OrderItem.price
                ),
                0
            )
        )
        .filter(OrderItem.vendor_id == vendor.vendor_id)
        .scalar()
    )

    return {
        "total_revenue": total_revenue,
        "total_orders": total_orders,
        "total_products": total_products,
        "products_sold": products_sold,
    }