from faker import Faker
from random import choice

import settings

from models.auth import BaseUser, Gender, TableUser
from models.sleep import BaseSleep, ActivityKind
from random import randint
import random
from datetime import timedelta
from datetime import datetime
import iris

set = settings.settings

fake = Faker()

from typing import Union

def determine_sleep_quality(sleep: BaseSleep) -> int:
    # Calculate the quality score based on the given factors
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

    # Adjust the quality score based on the start and end times of sleep
    start_hour = int(sleep.start_time.split()[1].split(':')[0])
    end_hour = int(sleep.end_time.split()[1].split(':')[0])
    if end_hour - start_hour < 3:
        quality -= 2
    elif end_hour - start_hour < 5:
        quality -= 1
    else:  quality += 1

    # Return the final quality score or a message if it's out of range

    if quality < 2:
        return 1
    elif quality < 4:
        return 2
    elif quality < 9:
        return 3
    return 3

def generate_user():
    gender = choice(list(Gender))
    email = fake.email()
    username = fake.user_name()
    dob = fake.date_of_birth().strftime('%Y-%m-%d') + " 00:00:00"

    return BaseUser(email=email, username=username, gender=gender, DOB=dob)


def generate_data():
    data = {}
    data['activity'] = fake.random_element(elements=ActivityKind.__members__.keys())
    data['coffee'] = randint(1, 3)
    data['stress'] = randint(1, 3)
    data['emotion'] = randint(0, 1)
    data['start_time'] = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
    data['end_time'] = (datetime.now() + timedelta(hours=randint(1, 6))).strftime("%Y-%m-%d %H:%M:%S")
    data['comfort'] = randint(0, 1)
    data['lights'] = randint(0, 1)
    data['quality'] = randint(1, 3)

    return data


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


def gen():
    conn = iris.connect(set.database_url, set.database_port, set.iris_namespace, set.iris_username, set.iris_password)
    cur = conn.cursor()
    for i in range(50):
        user_data = generate_user()
        password = "test"
        print(user_data.email, user_data.username, password,
              user_data.gender.value, user_data.DOB)

        cur.execute(f"INSERT INTO SysUsers (email, username, password, gender, DOB)"
                    f"VALUES ('{user_data.email}', '{user_data.username}', '{password}', '{user_data.gender.value}', '{user_data.DOB}')")

        conn.commit()

        cur.execute(f"SELECT * FROM SysUsers where email = '{user_data.email}'")
        users = cur.fetchall()

        user = list(_user_from_db_to_dict(users))[0]

        for j in range(100):
            sleep_data = BaseSleep(
                activity=random.choice(list(ActivityKind)),
                coffee=random.randint(1, 3),
                stress=random.randint(1, 3),
                emotion=random.randint(0, 1),
                start_time=(datetime.now() - timedelta(days=random.randint(1, 30), hours=random.randint(0, 23),
                                                       minutes=random.randint(0, 59),
                                                       seconds=random.randint(0, 59))).strftime('%Y-%m-%d %H:%M:%S'),
                end_time=(datetime.now() + timedelta(hours=random.randint(1, 8), minutes=random.randint(0, 59),
                                                     seconds=random.randint(0, 59))).strftime('%Y-%m-%d %H:%M:%S'),
                lights=random.randint(0, 1),
                comfort=random.randint(0, 1),
                quality=random.randint(1, 3),
            )
            sleep_data.quality = determine_sleep_quality(sleep_data)
            print(
                f" activiti '{sleep_data.activity.value}', stress '{sleep_data.stress}', coffee '{sleep_data.coffee}',"
                f" emotion '{sleep_data.emotion}', lights '{sleep_data.lights}', comfort '{sleep_data.comfort}', "
                f" sleep '{sleep_data.quality}', id '{user.id}', '{sleep_data.start_time}', '{sleep_data.end_time}'")
            cur.execute(
                f"INSERT INTO Sleeps (activity, stress, coffee, emotion, lights, comfort, quality, user_id, start_time, end_time)"
                f"VALUES ('{sleep_data.activity.value}', '{sleep_data.stress}', '{sleep_data.coffee}',"
                f" '{sleep_data.emotion}', '{sleep_data.lights}', '{sleep_data.comfort}', "
                f"'{sleep_data.quality}', '{user.id}', '{sleep_data.start_time}', '{sleep_data.end_time}')")
            conn.commit()

    cur.close()
    conn.close()


if __name__ == '__main__':
    gen()
