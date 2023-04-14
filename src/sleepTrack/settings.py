from pydantic import BaseSettings


class Settings(BaseSettings):
    # server_port: int = 9000
    database_url: str = "k8s-40b17863-af56bd00-60d9960a90-25f20b8a1a8e2ff3.elb.us-east-1.amazonaws.com"
    database_port: int = 1972
    iris_username: str = "SQLAdmin"
    iris_password: str = "Asddfdjkfklsd453!"
    iris_namespace: str = "USER"
    jwt_secret: str = "k8UPGvLZLtAIx200kGo2T0oDYNVduIujO1ogxJCyofk"
    jwt_algorithm: str = 'HS256'
    jwt_expires_s: int = 3600


settings = Settings(
    _env_file='..\.env',
    _env_file_encoding='utf-8'
)
