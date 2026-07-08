from sqlalchemy.orm import Session

from app.models.product import Product
from app.models.vendor import Vendor


def create_product(db: Session, product_data, user):

    # Find vendor linked to logged-in user
    vendor = (
        db.query(Vendor)
        .filter(Vendor.user_id == user.user_id)
        .first()
    )

    if vendor is None:
        return None

    product = Product(
        vendor_id=vendor.vendor_id,
        category_id=product_data.category_id,
        product_name=product_data.product_name,
        description=product_data.description,
        brand=product_data.brand,
        sku=product_data.sku,
        thumbnail_url=product_data.thumbnail_url,
        price=product_data.price,
        discount_price=product_data.discount_price
    )

    db.add(product)
    db.commit()
    db.refresh(product)

    return product

def get_all_products(db: Session):
    return db.query(Product).all()

def get_product_by_id(db: Session, product_id: int):
    return (
        db.query(Product)
        .filter(Product.product_id == product_id)
        .first()
    )

def update_product(
    db: Session,
    product_id: int,
    product_data,
    user
):
    vendor = (
        db.query(Vendor)
        .filter(Vendor.user_id == user.user_id)
        .first()
    )

    if vendor is None:
        return None

    product = (
        db.query(Product)
        .filter(Product.product_id == product_id)
        .first()
    )

    if product is None:
        return "NOT_FOUND"

    if product.vendor_id != vendor.vendor_id:
        return "FORBIDDEN"

    product.product_name = product_data.product_name
    product.description = product_data.description
    product.brand = product_data.brand
    product.thumbnail_url = product_data.thumbnail_url
    product.price = product_data.price
    product.discount_price = product_data.discount_price
    product.product_status = product_data.product_status

    db.commit()
    db.refresh(product)

    return product

def delete_product(
    db: Session,
    product_id: int,
    user
):
    vendor = (
        db.query(Vendor)
        .filter(Vendor.user_id == user.user_id)
        .first()
    )

    if vendor is None:
        return None

    product = (
        db.query(Product)
        .filter(Product.product_id == product_id)
        .first()
    )

    if product is None:
        return "NOT_FOUND"

    if product.vendor_id != vendor.vendor_id:
        return "FORBIDDEN"

    db.delete(product)
    db.commit()

    return "DELETED"