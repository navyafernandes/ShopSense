from sqlalchemy import Column, Integer, String, DateTime
from sqlalchemy.sql import func
from sqlalchemy.orm import relationship
from app.database import Base


class User(Base):
    __tablename__ = "users"

    user_id = Column(Integer, primary_key=True, index=True)

    full_name = Column(String(100), nullable=False)

    email = Column(String(100), unique=True, nullable=False, index=True)

    password_hash = Column(String(255), nullable=False)

    phone = Column(String(15))

    role = Column(String(20), nullable=False)

    status = Column(String(20), default="ACTIVE")

    created_at = Column(DateTime(timezone=True), server_default=func.now())

    updated_at = Column(
        DateTime(timezone=True),
        server_default=func.now(),
        onupdate=func.now()
    )

    customer = relationship("Customer", back_populates="user", uselist=False)
    vendor = relationship("Vendor", back_populates="user", uselist=False)