from pydantic import BaseModel


class UtilsData(BaseModel):
    url: str
    password: str
