from fastapi import FastAPI

from app.routers.auth_router import router as auth_router

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