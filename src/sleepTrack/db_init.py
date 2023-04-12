import iris
import settings

set = settings.settings

conn = iris.connect(set.database_url, set.database_port, set.iris_namespace, set.iris_username, set.iris_password)
# conn = iris.connect(set.database_url, set.database_port, set.iris_namespace, set.iris_username, set.iris_password)


# Open a cursor to perform database operations
cur = conn.cursor()

# Execute a command: this creates a new table
cur.execute('DROP TABLE IF EXISTS Conditions')
cur.execute('DROP TABLE IF EXISTS SysUsers')
cur.execute('CREATE TABLE SysUsers (id serial PRIMARY KEY,'
            'email varchar (150) NOT NULL UNIQUE,'
            'username varchar (50) NOT NULL UNIQUE,'
            'password varchar (150) NOT NULL,'
            'gender varchar (10) NOT NULL, '
            'DOB datetime NOT NULL)')

cur.execute('CREATE TABLE Conditions (id serial PRIMARY KEY,'
            'activity varchar (10) NOT NULL,'
            'stress int NOT NULL,'
            'coffee int NOT NULL,'
            'emotion int NOT NULL,'
            'lights int NOT NULL,'
            'comfort int NOT NULL,'
            'sleep int NOT NULL,'
            'user_id int NOT NULL,'
            'start_time datetime NOT NULL,'
            'end_time datetime NOT NULL,'
            'FOREIGN KEY (user_id) REFERENCES SysUsers(id) ON DELETE CASCADE)')

conn.commit()

cur.close()
conn.close()
