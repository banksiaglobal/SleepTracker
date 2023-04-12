from pydantic import BaseModel
from enum import Enum


class BaseUser(BaseModel):
    email: str
    username: str


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
