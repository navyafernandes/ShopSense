from pydantic import BaseModel


class VendorResponse(BaseModel):
    vendor_id: int
    business_name: str
    business_type: str | None
    gst_number: str | None
    verification_status: str

    class Config:
        from_attributes = True