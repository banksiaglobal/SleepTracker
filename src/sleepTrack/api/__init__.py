from fastapi import APIRouter

from . import (
    auth,
    sleep
)

router = APIRouter()
router.include_router(auth.router)
router.include_router(sleep.router)
