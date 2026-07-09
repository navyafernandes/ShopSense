from sqlalchemy import (
    Column,
    Integer,
    ForeignKey,
    DateTime
)
from sqlalchemy.sql import func
from sqlalchemy.orm import relationship

from app.database import Base


class Cart(Base):
    __tablename__ = "cart"

    cart_id = Column(
        Integer,
        primary_key=True,
        index=True
    )

    customer_id = Column(
        Integer,
        ForeignKey("customers.customer_id"),
        unique=True,
        nullable=False
    )

    created_at = Column(
        DateTime(timezone=True),
        server_default=func.now()
    )

    customer = relationship("Customer")

    items = relationship(
        "CartItem",
        back_populates="cart",
        cascade="all, delete-orphan"
    )