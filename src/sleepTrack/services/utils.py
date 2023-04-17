from faker import Faker
from random import choice
from passlib.hash import bcrypt
from random import randint
import random
from datetime import timedelta
from datetime import datetime
import intersystems_iris.dbapi._DBAPI as iris
from fastapi import (
    Depends,
    HTTPException,
    status,
)

from ..models.auth import BaseUser, Gender, TableUser
from ..models.sleep import BaseSleep, ActivityKind

from ..database import get_connection
from ..settings import settings


class Generator:
    def __init__(self):
        self.fake = Faker()

    def generate_user(self):
        gender = choice(list(Gender))
        email = self.fake.email()
        username = self.fake.user_name()
        dob = self.fake.date_of_birth().strftime('%Y-%m-%d') + " 00:00:00"

        return BaseUser(email=email, username=username, gender=gender, DOB=dob)

    def generate_sleep_data(self):
        data = {}
        data['activity'] = self.fake.random_element(elements=ActivityKind.__members__.keys())
        data['coffee'] = randint(1, 3)
        data['stress'] = randint(1, 3)
        data['emotion'] = randint(0, 1)
        data['start_time'] = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
        data['end_time'] = (datetime.now() + timedelta(hours=randint(1, 6))).strftime("%Y-%m-%d %H:%M:%S")
        data['comfort'] = randint(0, 1)
        data['lights'] = randint(0, 1)
        data['quality'] = randint(1, 3)

        return data

    @classmethod
    def determine_sleep_quality(cls, sleep: BaseSleep) -> int:
        quality = 0
        if sleep.activity == ActivityKind.LIGHT:
            quality += 2
        elif sleep.activity == ActivityKind.MEDIUM:
            quality += 3
        elif sleep.activity == ActivityKind.HARD:
            quality += 4

        if sleep.coffee == 2:
            quality -= 1
        elif sleep.coffee == 3:
            quality -= 2
        elif sleep.coffee == 1:
            quality += 1

        if sleep.stress == 1:
            quality += 2
        elif sleep.stress == 3:
            quality -= 1
        elif sleep.stress == 2:
            quality += 1

        quality += sleep.emotion

        if sleep.comfort == 0:
            quality -= 1
        elif sleep.comfort == 1:
            quality += 1

        if sleep.lights == 1:
            quality -= 1
        if sleep.lights == 0:
            quality += 1

        start_hour = int(sleep.start_time.split()[1].split(':')[0])
        end_hour = int(sleep.end_time.split()[1].split(':')[0])
        if end_hour - start_hour < 3:
            quality -= 2
        elif end_hour - start_hour < 5:
            quality -= 1
        else:
            quality += 1

        if quality < 2:
            return 1
        elif quality < 4:
            return 2
        elif quality < 9:
            return 3
        return 3

    @staticmethod
    def _user_from_db_to_dict(users: list, i: int = 0) -> TableUser:
        while i < len(users):
            yield TableUser.parse_obj({
                'id': users[i][0],
                'email': users[i][1],
                'username': users[i][2],
                'password': users[i][3],
                'gender': users[i][4],
                'DOB': users[i][5]})
            i += 1


class UtilsService:
    def __init__(self, connection=Depends(get_connection)):
        self.connection = iris.connect(
            settings.database_url, settings.database_port, settings.iris_namespace, settings.iris_username,
            settings.iris_password)
        self.generator = Generator()

    @staticmethod
    def __check_db_data(host, password) -> bool:
        if settings.database_url == host and password == settings.iris_password:
            return True
        return False

    def create(self, data):
        if not self.__check_db_data(data.url, data.password):
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail='Incorrect database url or password'
            )
        cur = self.connection.cursor()
        cur.execute('DROP TABLE IF EXISTS Sleeps')
        cur.execute('DROP TABLE IF EXISTS Sleeps')
        cur.execute('DROP TABLE IF EXISTS SysUsers')
        cur.execute('CREATE TABLE SysUsers (id serial PRIMARY KEY,'
                    'email varchar (150) NOT NULL UNIQUE,'
                    'username varchar (50) NOT NULL UNIQUE,'
                    'password varchar (150) NOT NULL,'
                    'gender varchar (10) NOT NULL, '
                    'DOB datetime NOT NULL)')

        cur.execute('CREATE TABLE Sleeps (id serial PRIMARY KEY,'
                    'activity varchar (10) ,'
                    'stress int NOT NULL,'
                    'coffee int NOT NULL,'
                    'emotion int NOT NULL,'
                    'lights int NOT NULL,'
                    'comfort int NOT NULL,'
                    'quality int NOT NULL,'
                    'user_id int NOT NULL,'
                    'start_time datetime NOT NULL,'
                    'end_time datetime NOT NULL,'
                    'FOREIGN KEY (user_id) REFERENCES SysUsers(id) ON DELETE CASCADE)')

        self.connection.commit()
        cur.close()
        return {"message": "Tables was created successfully!"}

    def generate(self, data):
        if not self.__check_db_data(data.url, data.password):
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail='Incorrect database url or password'
            )

        cur = self.connection.cursor()
        result = []
        for i in range(1):
            user_data = self.generator.generate_user()
            password = "test"
            password_hash = bcrypt.hash(password)

            cur.execute(f"INSERT INTO SysUsers (email, username, password, gender, DOB)"
                        f"VALUES ('{user_data.email}', '{user_data.username}', '{password_hash}', '{user_data.gender.value}', '{user_data.DOB}')")

            self.connection.commit()

            cur.execute(f"SELECT * FROM SysUsers where email = '{user_data.email}'")
            users = cur.fetchall()

            user = list(self.generator._user_from_db_to_dict(users))[0]

            sleeps = []
            for j in range(3):
                sleep_data = BaseSleep(
                    activity=random.choice(list(ActivityKind)),
                    coffee=random.randint(1, 3),
                    stress=random.randint(1, 3),
                    emotion=random.randint(0, 1),
                    start_time=(datetime.now() - timedelta(days=random.randint(1, 30), hours=random.randint(0, 23),
                                                           minutes=random.randint(0, 59),
                                                           seconds=random.randint(0, 59))).strftime(
                        '%Y-%m-%d %H:%M:%S'),
                    end_time=(datetime.now() + timedelta(hours=random.randint(1, 8), minutes=random.randint(0, 59),
                                                         seconds=random.randint(0, 59))).strftime('%Y-%m-%d %H:%M:%S'),
                    lights=random.randint(0, 1),
                    comfort=random.randint(0, 1),
                    quality=random.randint(1, 3),
                )
                sleep_data.quality = self.generator.determine_sleep_quality(sleep_data)
                cur.execute(
                    f"INSERT INTO Sleeps (activity, stress, coffee, emotion, "
                    f"lights, comfort, quality, user_id, start_time, end_time)"
                    f"VALUES ('{sleep_data.activity.value}', '{sleep_data.stress}', '{sleep_data.coffee}',"
                    f" '{sleep_data.emotion}', '{sleep_data.lights}', '{sleep_data.comfort}', "
                    f"'{sleep_data.quality}', '{user.id}', '{sleep_data.start_time}', '{sleep_data.end_time}')")
                self.connection.commit()
                sleeps.append(sleep_data)

            user_dict = {
                'email': user_data.email,
                'username': user_data.username,
                'password': password,
                'gender': user_data.gender.value,
                'DOB': user_data.DOB,
                'sleeps': sleeps
            }

            result.append(user_dict)

        cur.close()
        self.connection.close()
        return result
