from sqlalchemy import (
    Column,
    Integer,
    ForeignKey,
    Numeric
)
from sqlalchemy.orm import relationship

from app.database import Base


class OrderItem(Base):
    __tablename__ = "order_items"

    order_item_id = Column(
        Integer,
        primary_key=True,
        index=True
    )

    order_id = Column(
        Integer,
        ForeignKey("orders.order_id"),
        nullable=False
    )

    product_id = Column(
        Integer,
        ForeignKey("products.product_id"),
        nullable=False
    )

    vendor_id = Column(
        Integer,
        ForeignKey("vendors.vendor_id"),
        nullable=False
    )

    quantity = Column(
        Integer,
        nullable=False
    )

    price = Column(
        Numeric(10, 2),
        nullable=False
    )

    order = relationship(
        "Order",
        back_populates="order_items"
    )

    product = relationship("Product")

    vendor = relationship("Vendor")