from pydantic import BaseModel
from decimal import Decimal
from typing import Optional


class ProductCreate(BaseModel):
    category_id: int
    product_name: str
    description: Optional[str] = None
    brand: Optional[str] = None
    sku: Optional[str] = None
    thumbnail_url: Optional[str] = None
    price: Decimal
    discount_price: Optional[Decimal] = None


class ProductUpdate(BaseModel):
    product_name: str
    description: Optional[str] = None
    brand: Optional[str] = None
    thumbnail_url: Optional[str] = None
    price: Decimal
    discount_price: Optional[Decimal] = None
    product_status: str


class ProductResponse(BaseModel):
    product_id: int
    vendor_id: int
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


class ProductCatalogueResponse(BaseModel):
    product_id: int
    product_name: str
    brand: str | None = None
    vendor_name: str
    category_name: str
    thumbnail_url: str | None = None
    price: Decimal
    discount_price: Decimal | None = None
    product_status: str

    class Config:
        from_attributes = True