from typing import List

from fastapi import (
    APIRouter,
    Depends,
    status,
)

from .. import models
from ..services.auth import get_current_user
from ..services.sleep import SleepsService


router = APIRouter(
    prefix='/sleeps',
    tags=['sleeps'],
)


@router.get(
    '/',
    response_model=List[models.Sleep],
)
def get_sleeps(
    user: models.User = Depends(get_current_user),
    sleeps_service: SleepsService = Depends(),
):
    return sleeps_service.get_many(user.id)


@router.post(
    '/',
    response_model=models.Sleep,
    status_code=status.HTTP_201_CREATED,
)
def create_sleep(
    sleep_data: models.SleepCreate,
    user: models.User = Depends(get_current_user),
    sleeps_service: SleepsService = Depends(),
):
    return sleeps_service.create(
        user.id,
        sleep_data,
    )


@router.get(
    '/{sleep_id}',
    response_model=models.Sleep,
)
def get_sleep(
    sleep_id: int,
    user: models.User = Depends(get_current_user),
    sleeps_service: SleepsService = Depends(),
):
    return sleeps_service.get(
        user.id,
        sleep_id,
    )

@router.put(
    '/{sleep_id}',
    response_model=models.Sleep,
)
def update_sleep(
    sleep_id: int,
    sleep_data: models.SleepUpdate,
    user: models.User = Depends(get_current_user),
    sleeps_service: SleepsService = Depends(),
):
    return sleeps_service.update(
        user.id,
        sleep_id,
        sleep_data,
    )
