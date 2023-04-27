from faker import Faker
from random import choice
from passlib.hash import bcrypt
from random import randint
import random
from datetime import timedelta
from datetime import datetime
from fastapi import (
    Depends,
    HTTPException,
    status,
)

from ..models.auth import BaseUser, Gender, TableUser
from ..models.sleep import BaseSleep, ActivityKind
from ..tables import Sleep, SysUser

from ..database import get_session, engine
from ..settings import settings
from ..tables import Base


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
    def __init__(self, session=Depends(get_session)):
        self.session = session
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
        Base.metadata.create_all(engine)
        return {"message": "Tables was created successfully!"}

    def generate(self, data):
        if not self.__check_db_data(data.url, data.password):
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail='Incorrect database url or password'
            )

        result = []
        for i in range(1):
            user_data = self.generator.generate_user()
            password = "test"

            user = SysUser(
                email=user_data.email,
                username=user_data.username,
                password=bcrypt.hash(password),
                gender=user_data.gender.value,
                DOB=datetime.strptime(user_data.DOB, '%Y-%m-%d %H:%M:%S')

            )
            self.session.add(user)
            self.session.commit()
            # user.DOB = user.DOB.strftime("%Y-%m-%d %H:%M:%S")

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
                sleep = Sleep(
                    activity=sleep_data.activity.value,
                    stress=sleep_data.stress,
                    coffee=sleep_data.coffee,
                    emotion=sleep_data.emotion,
                    lights=sleep_data.lights,
                    comfort=sleep_data.comfort,
                    quality=sleep_data.quality,
                    start_time=datetime.strptime(sleep_data.start_time, '%Y-%m-%d %H:%M:%S'),
                    end_time=datetime.strptime(sleep_data.end_time, '%Y-%m-%d %H:%M:%S'),
                    user_id=user.id,
                )
                self.session.add(sleep)
                self.session.commit()
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
        return result
