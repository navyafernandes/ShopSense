from sqlalchemy import (
    Column,
    Integer,
    ForeignKey,
    DateTime,
    Numeric,
    String
)
from sqlalchemy.sql import func
from sqlalchemy.orm import relationship

from app.database import Base


class Order(Base):
    __tablename__ = "orders"

    order_id = Column(
        Integer,
        primary_key=True,
        index=True
    )

    customer_id = Column(
        Integer,
        ForeignKey("customers.customer_id"),
        nullable=False
    )

    order_date = Column(
        DateTime(timezone=True),
        server_default=func.now()
    )

    total_amount = Column(
        Numeric(10, 2),
        nullable=False
    )

    order_status = Column(
        String(50),
        nullable=False
    )

    shipping_address = Column(
        String(255),
        nullable=False
    )

    tracking_number = Column(
        String(100)
    )

    created_at = Column(
        DateTime(timezone=True),
        server_default=func.now()
    )

    customer = relationship("Customer")

    order_items = relationship(
        "OrderItem",
        back_populates="order",
        cascade="all, delete-orphan"
    )

    payment = relationship(
        "Payment",
        back_populates="order",
        uselist=False
    )