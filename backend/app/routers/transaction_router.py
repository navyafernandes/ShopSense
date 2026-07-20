from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.database import get_db

from app.schemas.transaction_schema import (
    TransactionResponse
)

from app.services.transaction_service import (
    get_all_transactions
)

router = APIRouter(
    prefix="/transactions",
    tags=["Transactions"]
)


@router.get(
    "",
    response_model=list[TransactionResponse]
)
def list_transactions(
    db: Session = Depends(get_db)
):
    return get_all_transactions(db)