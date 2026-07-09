from sqlalchemy import (
    Column,
    Integer,
    String,
    ForeignKey,
    DateTime
)
from sqlalchemy.sql import func
from sqlalchemy.orm import relationship

from app.database import Base


class Inventory(Base):
    __tablename__ = "inventory"

    inventory_id = Column(
        Integer,
        primary_key=True,
        index=True
    )

    product_id = Column(
        Integer,
        ForeignKey("products.product_id"),
        unique=True,
        nullable=False
    )

    stock_quantity = Column(
        Integer,
        default=0,
        nullable=False
    )

    reorder_level = Column(
        Integer,
        default=10
    )

    warehouse_location = Column(
        String(100)
    )

    created_at = Column(
    DateTime(timezone=True),
    server_default=func.now()
    )

    updated_at = Column(
    DateTime(timezone=True),
    server_default=func.now(),
    onupdate=func.now()
    )

    product = relationship(
    "Product",
    back_populates="inventory"
)