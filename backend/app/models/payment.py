from sqlalchemy import (
    Column,
    Integer,
    ForeignKey,
    DateTime,
    String
)
from sqlalchemy.sql import func
from sqlalchemy.orm import relationship

from app.database import Base


class Payment(Base):
    __tablename__ = "payments"

    payment_id = Column(
        Integer,
        primary_key=True,
        index=True
    )

    order_id = Column(
        Integer,
        ForeignKey("orders.order_id"),
        nullable=False,
        unique=True
    )

    payment_method = Column(
        String(50),
        nullable=False
    )

    payment_status = Column(
        String(50),
        nullable=False
    )

    payment_date = Column(
        DateTime(timezone=True),
        server_default=func.now()
    )

    order = relationship(
        "Order",
        back_populates="payment"
    )