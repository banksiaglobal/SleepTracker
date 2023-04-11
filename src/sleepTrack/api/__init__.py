from fastapi import APIRouter

from . import (
    auth,
    condition
)

router = APIRouter()
router.include_router(auth.router)
router.include_router(condition.router)
