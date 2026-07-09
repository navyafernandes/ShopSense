from sqlalchemy import (
    Column,
    Integer,
    ForeignKey,
    DateTime
)
from sqlalchemy.sql import func
from sqlalchemy.orm import relationship

from app.database import Base


class CartItem(Base):
    __tablename__ = "cart_items"

    cart_item_id = Column(
        Integer,
        primary_key=True,
        index=True
    )

    cart_id = Column(
        Integer,
        ForeignKey("cart.cart_id"),
        nullable=False
    )

    product_id = Column(
        Integer,
        ForeignKey("products.product_id"),
        nullable=False
    )

    quantity = Column(
        Integer,
        nullable=False,
        default=1
    )

    added_at = Column(
        DateTime(timezone=True),
        server_default=func.now()
    )

    cart = relationship(
        "Cart",
        back_populates="items"
    )

    product = relationship("Product")