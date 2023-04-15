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
)
from ..database import get_connection


class SleepsService:
    def __init__(self, connection=Depends(get_connection)):
        self.connection = connection

    def get_many(self, user_id: int) -> List[models.Sleep]:
        cur = self.connection.cursor()
        cur.execute(f"SELECT * FROM Sleeps where user_id = '{user_id}'")
        sleeps = cur.fetchall()
        cur.close()
        sleeps = list(self._user_from_db_to_dict(sleeps))
        return sleeps

    def get(
            self,
            user_id: int,
            sleep_id: int
    ) -> models.Sleep:
        sleep = self._get(user_id, sleep_id)
        return sleep

    def update(
            self,
            user_id: int,
            sleep_id: int,
            sleep_data: models.SleepUpdate,
    ) -> models.Sleep:
        cur = self.connection.cursor()
        cur.execute(f"UPDATE Sleeps SET activity = '{sleep_data.activity.value}', "
                    f"stress = '{sleep_data.stress}', coffee = '{sleep_data.coffee}',"
                    f" emotion = '{sleep_data.emotion}', lights = '{sleep_data.lights}', "
                    f"comfort = '{sleep_data.comfort}', quality = '{sleep_data.sleep}', "
                    f"start_time = '{sleep_data.start_time}', end_time = '{sleep_data.end_time}'"
                    f"where user_id = '{user_id}' and id = '{sleep_id}'")
        condition = self._get(user_id, sleep_id)
        return condition

    def create(
            self,
            user_id: int,
            sleep_data: models.SleepCreate
    ) -> models.Sleep:

        cur = self.connection.cursor()
        # cur.execute(
        #     f"INSERT INTO Sleeps (activity, stress, coffee, emotion, lights, comfort, quality, user_id, start_time, end_time) "
        #     f"VALUES ('{sleep_data.activity.value}', '{sleep_data.stress}', '{sleep_data.coffee}',"
        #     f" '{sleep_data.emotion}', '{sleep_data.lights}', '{sleep_data.comfort}', "
        #     f"'{sleep_data.quality}', '{user_id}', '{sleep_data.start_time}', '{sleep_data.end_time}')")
        cur.execute(
            f"INSERT INTO Sleeps (activity, stress, coffee, emotion, lights, comfort, quality, user_id, start_time, end_time)"
            f"VALUES ('{sleep_data.activity.value}', '{sleep_data.stress}', '{sleep_data.coffee}',"
            f" '{sleep_data.emotion}', '{sleep_data.lights}', '{sleep_data.comfort}', "
            f"'{sleep_data.quality}', '{user_id}', '{sleep_data.start_time}', '{sleep_data.end_time}')")
        self.connection.commit()
        cur.execute(f"SELECT * FROM Sleeps where user_id = '{user_id}'")
        sleeps = cur.fetchall()
        cur.close()
        sleep = list(self._user_from_db_to_dict(sleeps))[-1]
        return sleep

    def _get(self, user_id: int, sleep_id: int) -> Optional[models.Sleep]:
        cur = self.connection.cursor()
        cur.execute(f"SELECT * FROM Sleeps where user_id = '{user_id}' and id = '{sleep_id}'")
        sleeps = cur.fetchall()
        cur.close()
        sleep = list(self._user_from_db_to_dict(sleeps))[0]

        if not sleep:
            raise HTTPException(status.HTTP_404_NOT_FOUND)
        return sleep

    @staticmethod
    def _user_from_db_to_dict(sleeps: list, i: int = 0) -> models.Sleep:
        while i < len(sleeps):
            yield models.Sleep.parse_obj({
                'id': sleeps[i][0],
                'activity': sleeps[i][1],
                'stress': sleeps[i][2],
                'coffee': sleeps[i][3],
                'emotion': sleeps[i][4],
                'lights': sleeps[i][5],
                'comfort': sleeps[i][6],
                'sleep': sleeps[i][7],
                'user_id': sleeps[i][8],
                'start_time': sleeps[i][9],
                'end_time': sleeps[i][10]
            })
            i += 1
