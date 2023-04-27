from .settings import settings
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker

engine = create_engine(
    f"iris://{settings.iris_username}:{settings.iris_password}@{settings.database_url}:"
    f"{settings.database_port}/{settings.iris_namespace}"
)

Session = sessionmaker(
    engine,
    autocommit=False,
    autoflush=False,
)

def get_session():
    session = Session()
    try:
        yield session
    finally:
        session.close()






