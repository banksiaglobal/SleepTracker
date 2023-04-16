from pydantic import BaseSettings


class Settings(BaseSettings):
    # server_port: int = 9000
    database_url: str
    database_port: int
    iris_username: str 
    iris_password: str
    iris_namespace: str 
    jwt_secret: str
    jwt_algorithm: str = 'HS256'
    jwt_expires_s: int = 3600


settings = Settings(
    _env_file='.env',
    _env_file_encoding='utf-8'
)
