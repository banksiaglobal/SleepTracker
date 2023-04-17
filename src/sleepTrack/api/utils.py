from fastapi import (
    APIRouter,
    Depends,
    status,
)

from .. import models
from ..services.utils import UtilsService

router = APIRouter(
    prefix='/utils',
    tags=['utils'],
)


@router.post(
    '/create',
    status_code=status.HTTP_201_CREATED,
)
def get_prediction(
        data: models.utils.UtilsData,
        utils_service: UtilsService = Depends(),
):
    return utils_service.create(data)


@router.post(
    '/generate',
    status_code=status.HTTP_201_CREATED,
)
def get_prediction(
        data: models.utils.UtilsData,
        utils_service: UtilsService = Depends(),
):
    return utils_service.generate(data)
