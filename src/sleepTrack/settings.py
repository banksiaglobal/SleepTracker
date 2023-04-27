from pydantic import BaseSettings
import os

class Settings(BaseSettings):
    database_url: str = "k8s-635d78a0-aa2474d7-cd3c73d454-4c8767604a892567.elb.us-east-1.amazonaws.com"
    database_port: int = 1972
    iris_username: str = "SQLAdmin"
    iris_password: str = "cjLT6G8Y!"
    iris_namespace: str = "USER"
    jwt_secret: str = "k8UPGvLZLtAIx200kGo2T0oDYNVduIujO1ogxJCyofk"
    jwt_algorithm: str = 'HS256'
    jwt_expires_s: int = 3600


settings = Settings()
