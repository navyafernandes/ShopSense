from app.models.customer import Customer
from app.models.user import User
from sqlalchemy.orm import Session

def get_customer_profile(db: Session, user):
    customer = (
        db.query(Customer)
        .filter(Customer.user_id == user.user_id)
        .first()
    )

    if customer is None:
        return "CUSTOMER_NOT_FOUND"

    user_data = customer.user

    return {
        "customer_id": customer.customer_id,
        "name": user_data.full_name,
        "email": user_data.email,
        "phone": user_data.phone,
        "address": customer.address,
        "city": customer.city,
        "state": customer.state,
        "country": customer.country,
        "postal_code": customer.postal_code,
    }

def update_customer_profile(db: Session, user, profile):
    customer = (
        db.query(Customer)
        .filter(Customer.user_id == user.user_id)
        .first()
    )

    if customer is None:
        return "CUSTOMER_NOT_FOUND"

    user_data = customer.user

    user_data.full_name = profile.name
    user_data.phone = profile.phone

    customer.address = profile.address
   
    db.commit()

    return {"message": "Profile updated successfully"}