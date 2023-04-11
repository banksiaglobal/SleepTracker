from pydantic import BaseModel, Field
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
    # start_time: datetime
    # end_time: datetime
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
