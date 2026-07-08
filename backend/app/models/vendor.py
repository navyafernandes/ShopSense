from sqlalchemy import Column, Integer, String, ForeignKey, Date, Numeric, DateTime
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func

from app.database import Base


class Vendor(Base):
    __tablename__ = "vendors"

    vendor_id = Column(Integer, primary_key=True, index=True)

    user_id = Column(Integer, ForeignKey("users.user_id"), unique=True, nullable=False)

    business_name = Column(String(150), nullable=False)

    business_type = Column(String(100))

    gst_number = Column(String(20), unique=True)

    commission_rate = Column(Numeric(5, 2), default=10.00)

    verification_status = Column(String(20), default="PENDING")

    joined_date = Column(Date)

    updated_at = Column(
        DateTime(timezone=True),
        server_default=func.now(),
        onupdate=func.now()
    )

    user = relationship("User", back_populates="vendor")