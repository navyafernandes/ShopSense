from sqlalchemy import (
    Column,
    Integer,
    String,
    Text,
    Numeric,
    ForeignKey,
    DateTime
)
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func

from app.database import Base


class Product(Base):
    __tablename__ = "products"

    product_id = Column(Integer, primary_key=True, index=True)

    vendor_id = Column(
        Integer,
        ForeignKey("vendors.vendor_id"),
        nullable=False
    )

    category_id = Column(
        Integer,
        ForeignKey("categories.category_id"),
        nullable=False
    )

    product_name = Column(String(200), nullable=False)

    description = Column(Text)

    brand = Column(String(100))

    sku = Column(String(50), unique=True)

    thumbnail_url = Column(String(255))

    price = Column(Numeric(10, 2), nullable=False)

    discount_price = Column(Numeric(10, 2))

    rating = Column(Numeric(2, 1), default=0.0)

    product_status = Column(
    String(20),
    default="ACTIVE"
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

    vendor = relationship("Vendor")

    category = relationship("Category")