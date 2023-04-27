from pydantic import BaseSettings
import os

class Settings(BaseSettings):
    database_url: str = os.getenv('DATABASE_URL')
    database_port: int = os.getenv('DATABASE_PORT')
    iris_username: str = os.getenv('IRIS_USERNAME')
    iris_password: str = os.getenv('IRIS_PASSWORD')
    iris_namespace: str = os.getenv('IRIS_NAMESPACE')
    jwt_secret: str = os.getenv('JWT_SECRET')
    jwt_algorithm: str = 'HS256'
    jwt_expires_s: int = 3600


settings = Settings()