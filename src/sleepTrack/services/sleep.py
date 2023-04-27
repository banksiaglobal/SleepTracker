from datetime import datetime
from typing import (
    List,
    Optional,
)

from fastapi import (
    Depends,
    HTTPException,
    status,
)

from .. import (
    models,
    tables
)
from ..database import get_session


class SleepsService:
    def __init__(self, session=Depends(get_session)):
        self.session = session

    def get_many(self, user_id: int) -> List[models.Sleep]:
        sleeps = (
            self.session
            .query(tables.Sleep)
            .filter(tables.Sleep.user_id == user_id)
            .all()
        )
        return sleeps

    def get(
            self,
            user_id: int,
            sleep_id: int
    ) -> models.Sleep:
        sleep = self._get(user_id, sleep_id)
        return self._validaton_time(sleep)

    def update(
            self,
            user_id: int,
            sleep_id: int,
            sleep_data: models.SleepUpdate,
    ) -> models.Sleep:
        sleep = self._get(user_id, sleep_id)
        for field, value in sleep_data:
            if field == "start_time" or field == "end_time":
                value = datetime.strptime(value, '%Y-%m-%d %H:%M:%S')
            if field == "activity":
                value = value.value
            setattr(sleep, field, value)
        self.session.commit()
        return self._validaton_time(sleep)

    def create(
            self,
            user_id: int,
            sleep_data: models.SleepCreate
    ) -> models.Sleep:
        sleep = tables.Sleep(
            activity=sleep_data.activity.value,
            stress=sleep_data.stress,
            coffee=sleep_data.coffee,
            emotion=sleep_data.emotion,
            lights=sleep_data.lights,
            comfort=sleep_data.comfort,
            quality=sleep_data.quality,
            start_time=datetime.strptime(sleep_data.start_time, '%Y-%m-%d %H:%M:%S'),
            end_time=datetime.strptime(sleep_data.end_time, '%Y-%m-%d %H:%M:%S'),
            user_id=user_id,
        )
        self.session.add(sleep)
        self.session.commit()
        return self._validaton_time(sleep)

    def _get(self, user_id: int, sleep_id: int) -> Optional[tables.Sleep]:
        sleep = (
            self.session
            .query(tables.Sleep)
            .filter(
                tables.Sleep.user_id == user_id,
                tables.Sleep.id == sleep_id,
            )
            .first()
        )

        if not sleep:
            raise HTTPException(status.HTTP_404_NOT_FOUND)
        return sleep

    @staticmethod
    def _validaton_time(sleep: tables.Sleep) -> models.Sleep:
        sleep.start_time = sleep.start_time.strftime("%Y-%m-%d %H:%M:%S")
        sleep.end_time = sleep.end_time.strftime("%Y-%m-%d %H:%M:%S")
        sleep_data = models.Sleep.from_orm(sleep)
        return sleep_data
