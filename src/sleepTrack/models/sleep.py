from pydantic import BaseModel, Field, validator
from fastapi import Query
from enum import Enum


class PredictionKind(BaseModel):
    value: int

    @property
    def status(self):
        if self.value == 1:
            return "unsatisfactory"
        elif self.value == 2:
            return "satisfactory"
        elif self.value == 3:
            return "great"
        return "indefinite"

class Prediction(BaseModel):
    prediction: str

class ActivityKind(str, Enum):
    LIGHT = 'light'
    MEDIUM = 'medium'
    HARD = 'hard'


class BaseSleep(BaseModel):
    activity: ActivityKind
    coffee: int = Field(None, ge=1, le=3)
    stress: int = Field(None, ge=1, le=3)
    emotion: int = Field(None, ge=0, le=1)
    start_time: str = Query(regex='^\d{4}\-(0[1-9]|1[012])\-(0[1-9]|[12][0-9]|3[01]) (\d{2}):(\d{2}):(\d{2})$')
    end_time: str = Query(regex='^\d{4}\-(0[1-9]|1[012])\-(0[1-9]|[12][0-9]|3[01]) (\d{2}):(\d{2}):(\d{2})$')
    comfort: int = Field(None, ge=0, le=1)
    lights: int = Field(None, ge=0, le=1)
    quality: int = Field(None, ge=1, le=3)


class SleepCreate(BaseSleep):
    pass


class SleepUpdate(BaseSleep):
    pass


class Sleep(BaseSleep):
    id: int

    class Config:
        orm_mode = True
