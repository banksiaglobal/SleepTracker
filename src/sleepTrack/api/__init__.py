from fastapi import APIRouter

from . import (
    auth,
    sleep,
    utils
)

router = APIRouter()
router.include_router(auth.router)
router.include_router(sleep.router)
router.include_router(utils.router)
