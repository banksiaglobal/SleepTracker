from fastapi import Depends
from ..database import get_connection
from .. import models


class PredictionsService:
    def __init__(self, connection=Depends(get_connection)):
        self.connection = connection

    @staticmethod
    def _prediction_from_db_to_dict(prediction):
        prediction = prediction[0]
        return {
            'prediction': prediction[0],
            'quality': prediction[1],
            'probability_quality': round(prediction[2] * 100)
        }

    def get(self, user_id: int, sleep_id: int):
        cur = self.connection.cursor()
        cur.execute(
            f"SELECT PREDICT(sleeps use sleeps) as prediction, quality, "
            f"PROBABILITY(sleeps use sleeps for '3') as probability_quality, * FROM SQLUser.Sleeps "
            f"where user_id = '{user_id}' and id = '{sleep_id}'")
        prediction = cur.fetchall()
        cur.close()
        prediction = self._prediction_from_db_to_dict(prediction)
        st = models.PredictionKind(value=prediction['prediction'])
        text = f"Based on the entered data, your sleep quality is {st.status}! " \
               f"Your sleep score is {prediction['probability_quality']}%."
        return models.Prediction(prediction=text)
