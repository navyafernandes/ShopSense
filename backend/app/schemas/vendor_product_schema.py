from decimal import Decimal
from typing import Optional

from pydantic import BaseModel


class VendorProductResponse(BaseModel):
    product_id: int
    category_id: int
    product_name: str
    description: Optional[str]
    brand: Optional[str]
    sku: Optional[str]
    thumbnail_url: Optional[str]
    price: Decimal
    discount_price: Optional[Decimal]
    rating: Decimal
    product_status: str

    class Config:
        from_attributes = True