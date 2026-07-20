from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.database import get_db

from app.dependencies.auth import get_current_user
from app.enums.user_role import UserRole
from app.models.user import User

from app.schemas.vendor_dashboard_schema import (
    VendorDashboardSummary,
)

from app.services.vendor_dashboard_service import (
    get_vendor_dashboard,
)

router = APIRouter(
    prefix="/vendor/dashboard",
    tags=["Vendor Dashboard"],
)


@router.get(
    "",
    response_model=VendorDashboardSummary,
)
def dashboard(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):

    if current_user.role != UserRole.VENDOR:
        raise HTTPException(
            status_code=403,
            detail="Only vendors can access this dashboard.",
        )

    dashboard = get_vendor_dashboard(
        db,
        current_user,
    )

    if dashboard is None:
        raise HTTPException(
            status_code=404,
            detail="Vendor profile not found.",
        )

    return dashboard