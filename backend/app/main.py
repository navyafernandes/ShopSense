from fastapi import FastAPI

from app.routers.auth_router import router as auth_router

from app.routers.product_router import router as product_router

from app.routers.inventory_router import router as inventory_router

from app.routers.cart_router import router as cart_router

from app.routers.order_router import router as order_router

app = FastAPI(
    title="ShopSense API",
    description="Multi-Vendor E-Commerce Analytics Platform",
    version="1.0.0"
)


@app.get("/")
def home():
    return {
        "message": "Welcome to ShopSense!",
        "status": "Backend Running Successfully 🚀"
    }


app.include_router(auth_router)
app.include_router(product_router)
app.include_router(inventory_router)
app.include_router(cart_router)
app.include_router(order_router)