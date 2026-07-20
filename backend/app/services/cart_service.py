from sqlalchemy.orm import Session

from app.models.cart import Cart
from app.models.cart_item import CartItem
from app.models.customer import Customer
from app.models.product import Product


def add_to_cart(
    db: Session,
    cart_item_data,
    user
):
    # Find customer profile
    customer = (
        db.query(Customer)
        .filter(Customer.user_id == user.user_id)
        .first()
    )

    if customer is None:
        return "CUSTOMER_NOT_FOUND"

    # Find or create cart
    cart = (
        db.query(Cart)
        .filter(Cart.customer_id == customer.customer_id)
        .first()
    )

    if cart is None:
        cart = Cart(customer_id=customer.customer_id)
        db.add(cart)
        db.commit()
        db.refresh(cart)

    # Check product exists
    product = (
        db.query(Product)
        .filter(Product.product_id == cart_item_data.product_id)
        .first()
    )

    if product is None:
        return "PRODUCT_NOT_FOUND"

    # Check if already in cart
    existing_item = (
        db.query(CartItem)
        .filter(
            CartItem.cart_id == cart.cart_id,
            CartItem.product_id == cart_item_data.product_id
        )
        .first()
    )

    if existing_item:
        existing_item.quantity += cart_item_data.quantity
        db.commit()
        db.refresh(existing_item)
        return existing_item

    # Create new cart item
    cart_item = CartItem(
        cart_id=cart.cart_id,
        product_id=cart_item_data.product_id,
        quantity=cart_item_data.quantity
    )

    db.add(cart_item)
    db.commit()
    db.refresh(cart_item)

    return cart_item

from decimal import Decimal

def get_cart(
    db: Session,
    user
):
    customer = (
        db.query(Customer)
        .filter(Customer.user_id == user.user_id)
        .first()
    )

    if customer is None:
        return "CUSTOMER_NOT_FOUND"

    cart = (
        db.query(Cart)
        .filter(Cart.customer_id == customer.customer_id)
        .first()
    )

    if cart is None:
        return {
            "items": [],
            "total_amount": Decimal("0")
        }

    items = (
        db.query(CartItem, Product)
        .join(
            Product,
            CartItem.product_id == Product.product_id
        )
        .filter(
            CartItem.cart_id == cart.cart_id
        )
        .all()
    )

    response = []
    total = Decimal("0")

    for cart_item, product in items:

        subtotal = product.price * cart_item.quantity
        total += subtotal

        response.append({
            "cart_item_id": cart_item.cart_item_id,
            "product_id": product.product_id,
            "product_name": product.product_name,
            "thumbnail_url": product.thumbnail_url,
            "quantity": cart_item.quantity,
            "price": product.price,
            "subtotal": subtotal
        })

    return {
        "items": response,
        "total_amount": total
    }

def update_cart_item(
    db: Session,
    cart_item_id: int,
    cart_item_data,
    user
):
    customer = (
        db.query(Customer)
        .filter(Customer.user_id == user.user_id)
        .first()
    )

    if customer is None:
        return "CUSTOMER_NOT_FOUND"

    cart = (
        db.query(Cart)
        .filter(Cart.customer_id == customer.customer_id)
        .first()
    )

    if cart is None:
        return "CART_NOT_FOUND"

    item = (
        db.query(CartItem)
        .filter(
            CartItem.cart_item_id == cart_item_id,
            CartItem.cart_id == cart.cart_id
        )
        .first()
    )

    if item is None:
        return "ITEM_NOT_FOUND"

    item.quantity = cart_item_data.quantity

    db.commit()
    db.refresh(item)

    return item

def delete_cart_item(
    db: Session,
    cart_item_id: int,
    user
):
    customer = (
        db.query(Customer)
        .filter(Customer.user_id == user.user_id)
        .first()
    )

    if customer is None:
        return "CUSTOMER_NOT_FOUND"

    cart = (
        db.query(Cart)
        .filter(Cart.customer_id == customer.customer_id)
        .first()
    )

    if cart is None:
        return "CART_NOT_FOUND"

    item = (
        db.query(CartItem)
        .filter(
            CartItem.cart_item_id == cart_item_id,
            CartItem.cart_id == cart.cart_id
        )
        .first()
    )

    if item is None:
        return "ITEM_NOT_FOUND"

    db.delete(item)
    db.commit()

    return "DELETED"