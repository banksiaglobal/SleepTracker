from .settings import settings
import intersystems_iris.dbapi._DBAPI as iris

def get_connection():
    connection = iris.connect(settings.database_url, settings.database_port, settings.iris_namespace, settings.iris_username, settings.iris_password)
    try:
        yield connection
    finally:
        connection.close()


