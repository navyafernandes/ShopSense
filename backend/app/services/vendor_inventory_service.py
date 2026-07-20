from sqlalchemy.orm import Session

from app.models.vendor import Vendor
from app.models.product import Product
from app.models.inventory import Inventory


def get_vendor_inventory(db: Session, user):

    vendor = (
        db.query(Vendor)
        .filter(Vendor.user_id == user.user_id)
        .first()
    )

    if vendor is None:
        return None

    results = (
        db.query(Inventory, Product)
        .join(
            Product,
            Inventory.product_id == Product.product_id
        )
        .filter(
            Product.vendor_id == vendor.vendor_id
        )
        .all()
    )

    return [
        {
            "product_id": product.product_id,
            "product_name": product.product_name,
            "stock_quantity": inventory.stock_quantity,
            "reorder_level": inventory.reorder_level,
            "warehouse_location": inventory.warehouse_location,
        }
        for inventory, product in results
    ]