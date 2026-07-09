from sqlalchemy import (
    Column,
    Integer,
    ForeignKey,
    String,
    DateTime
)
from sqlalchemy.sql import func
from sqlalchemy.orm import relationship

from app.database import Base


class ProductImage(Base):
    __tablename__ = "product_images"

    image_id = Column(
        Integer,
        primary_key=True,
        index=True
    )

    product_id = Column(
        Integer,
        ForeignKey("products.product_id"),
        nullable=False
    )

    image_url = Column(
        String(255),
        nullable=False
    )

    display_order = Column(
        Integer,
        default=1
    )

    created_at = Column(
        DateTime(timezone=True),
        server_default=func.now()
    )

    product = relationship("Product")