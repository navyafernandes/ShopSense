from sqlalchemy.orm import Session

from app.models.vendor import Vendor
from app.models.product import Product


def get_vendor_products(db: Session, user):

    vendor = (
        db.query(Vendor)
        .filter(Vendor.user_id == user.user_id)
        .first()
    )

    if vendor is None:
        return None

    return (
        db.query(Product)
        .filter(Product.vendor_id == vendor.vendor_id)
        .all()
    )