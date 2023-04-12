from typing import List

from fastapi import (
    APIRouter,
    Depends,
    status,
)

from .. import models
from ..services.auth import get_current_user
from ..services.condition import ConditionsService


router = APIRouter(
    prefix='/conditions',
    tags=['conditions'],
)


@router.get(
    '/',
    response_model=List[models.Condition],
)
def get_operations(
    user: models.User = Depends(get_current_user),
    conditions_service: ConditionsService = Depends(),
):
    return conditions_service.get_many(user.id)


@router.post(
    '/',
    response_model=models.Condition,
    status_code=status.HTTP_201_CREATED,
)
def create_operation(
    condition_data: models.ConditionCreate,
    user: models.User = Depends(get_current_user),
    conditions_service: ConditionsService = Depends(),
):
    return conditions_service.create(
        user.id,
        condition_data,
    )


@router.get(
    '/{condition_id}',
    response_model=models.Condition,
)
def get_condition(
    condition_id: int,
    user: models.User = Depends(get_current_user),
    conditions_service: ConditionsService = Depends(),
):
    return conditions_service.get(
        user.id,
        condition_id,
    )

