from sqlalchemy.orm import Session

from app.models.vendor import Vendor


def get_all_vendors(db: Session):
    return db.query(Vendor).all()


def get_vendor_by_id(db: Session, vendor_id: int):
    return (
        db.query(Vendor)
        .filter(Vendor.vendor_id == vendor_id)
        .first()
    )


def delete_vendor(db: Session, vendor_id: int):
    vendor = get_vendor_by_id(db, vendor_id)

    if vendor is None:
        return None

    db.delete(vendor)
    db.commit()

    return vendor

def update_vendor_status(db: Session, vendor_id: int, status: str):
    vendor = (
        db.query(Vendor)
        .filter(Vendor.vendor_id == vendor_id)
        .first()
    )

    if vendor is None:
        return None

    vendor.verification_status = status

    db.commit()
    db.refresh(vendor)

    return vendor