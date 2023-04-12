from pydantic import BaseModel, Field
from fastapi import Query
from enum import Enum
from datetime import datetime

class ActivityKind(str, Enum):
    LIGHT = 'light'
    MEDIUM = 'medium'
    HARD = 'hard'

class BaseCondition(BaseModel):
    activity: ActivityKind
    coffee: int = Field(None, ge=1, le=3)
    stress: int = Field(None, ge=1, le=3)
    emotion: int = Field(None, ge=0, le=1)
    start_time: str = Query(regex='^\d{4}\-(0[1-9]|1[012])\-(0[1-9]|[12][0-9]|3[01]) (\d{2}):(\d{2}):(\d{2})$')
    end_time: str = Query(regex='^\d{4}\-(0[1-9]|1[012])\-(0[1-9]|[12][0-9]|3[01]) (\d{2}):(\d{2}):(\d{2})$')
    comfort: int = Field(None, ge=0, le=1)
    lights: int = Field(None, ge=0, le=1)
    sleep: int = Field(None, ge=1, le=3)


class ConditionCreate(BaseCondition):
    pass


class ConditionUpdate(BaseCondition):
    pass


class Condition(BaseCondition):
    id: int

    class Config:
        orm_mode = True
