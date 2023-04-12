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


class ConditionsService:
    def __init__(self, connection=Depends(get_connection)):
        self.connection = connection

    def get_many(self, user_id: int) -> List[models.Condition]:
        cur = self.connection.cursor()
        cur.execute(f"SELECT * FROM Conditions where user_id = '{user_id}'")
        conditions = cur.fetchall()
        cur.close()
        conditions = list(self._user_from_db_to_dict(conditions))
        return conditions

    def get(
            self,
            user_id: int,
            condition_id: int
    ) -> models.Condition:
        operation = self._get(user_id, condition_id)
        return operation

    def update(
            self,
            user_id: int,
            condition_id: int,
            condition_data: models.ConditionUpdate,
    ) -> models.Condition:
        cur = self.connection.cursor()
        cur.execute(f"UPDATE Conditions SET activity = '{condition_data.activity.value}', "
                    f"stress = '{condition_data.stress}', coffee = '{condition_data.coffee}',"
                    f" emotion = '{condition_data.emotion}', lights = '{condition_data.lights}', "
                    f"comfort = '{condition_data.comfort}', sleep = '{condition_data.sleep}', user_id = '{user_id}', "
                    f"start_time = '{condition_data.start_time}', end_time = '{condition_data.end_time}'"
                    f"where user_id = '{user_id}' and id = '{condition_id}'")
        condition = self._get(user_id, condition_id)
        return condition

    def create(
            self,
            user_id: int,
            condition_data: models.ConditionCreate
    ) -> models.Condition:

        cur = self.connection.cursor()
        cur.execute(
            f"INSERT INTO Conditions (activity, stress, coffee, emotion, lights, comfort, sleep, user_id, start_time, end_time) "
            f"VALUES ('{condition_data.activity.value}', '{condition_data.stress}', '{condition_data.coffee}',"
            f" '{condition_data.emotion}', '{condition_data.lights}', '{condition_data.comfort}', "
            f"'{condition_data.sleep}', '{user_id}', '{condition_data.start_time}', '{condition_data.end_time}')")
        self.connection.commit()
        cur.execute(f"SELECT * FROM Conditions where user_id = '{user_id}'")
        conditions = cur.fetchall()
        cur.close()
        condition = list(self._user_from_db_to_dict(conditions))[-1]
        return condition

    def _get(self, user_id: int, condition_id: int) -> Optional[models.Condition]:
        cur = self.connection.cursor()
        cur.execute(f"SELECT * FROM Conditions where user_id = '{user_id}' and id = '{condition_id}'")
        users = cur.fetchall()
        cur.close()
        condition = list(self._user_from_db_to_dict(users))[0]

        if not condition:
            raise HTTPException(status.HTTP_404_NOT_FOUND)
        return condition

    @staticmethod
    def _user_from_db_to_dict(conditions: list, i: int = 0) -> models.Condition:
        while i < len(conditions):
            yield models.Condition.parse_obj({
                'id': conditions[i][0],
                'activity': conditions[i][1],
                'stress': conditions[i][2],
                'coffee': conditions[i][3],
                'emotion': conditions[i][4],
                'lights': conditions[i][5],
                'comfort': conditions[i][6],
                'sleep': conditions[i][7],
                'user_id': conditions[i][8],
                'start_time': conditions[i][9],
                'end_time': conditions[i][10]
            })
            i += 1
