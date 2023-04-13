from pydantic import BaseModel
from enum import Enum
from fastapi import Query


class Gender(str, Enum):
    MALE = "male"
    FEMALE = "female"


class BaseUser(BaseModel):
    email: str
    username: str
    gender: Gender
    DOB: str = Query(regex='^\d{4}\-(0[1-9]|1[012])\-(0[1-9]|[12][0-9]|3[01]) 00:00:00$')


class UserCreate(BaseUser):
    password: str


class User(BaseUser):
    id: int

    class Config:
        orm_mode = True


class TableUser(User, UserCreate):
    pass


class Token(BaseModel):
    access_token: str
    token_type: str = 'bearer'
