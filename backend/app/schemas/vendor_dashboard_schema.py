from decimal import Decimal
from pydantic import BaseModel


class VendorDashboardSummary(BaseModel):
    total_revenue: Decimal
    total_orders: int
    total_products: int
    products_sold: int