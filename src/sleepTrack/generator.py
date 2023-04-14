from faker import Faker
from random import choice

import settings

from models.auth import BaseUser, Gender, TableUser
from models.condition import BaseCondition, ActivityKind
from random import randint
import random
from datetime import timedelta
from datetime import datetime
import iris

set = settings.settings

fake = Faker()


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
    data['sleep'] = randint(1, 3)

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

        for j in range(50):
            condition_data = BaseCondition(
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
                sleep=random.randint(1, 3),
            )
            print(
                f" activiti '{condition_data.activity.value}', stress '{condition_data.stress}', coffee '{condition_data.coffee}',"
                f" emotion '{condition_data.emotion}', lights '{condition_data.lights}', comfort '{condition_data.comfort}', "
                f" sleep '{condition_data.sleep}', id '{user.id}', '{condition_data.start_time}', '{condition_data.end_time}'")
            cur.execute(
                f"INSERT INTO Conditions (activity, stress, coffee, emotion, lights, comfort, sleep, user_id, start_time, end_time)"
                f"VALUES ('{condition_data.activity.value}', '{condition_data.stress}', '{condition_data.coffee}',"
                f" '{condition_data.emotion}', '{condition_data.lights}', '{condition_data.comfort}', "
                f"'{condition_data.sleep}', '{user.id}', '{condition_data.start_time}', '{condition_data.end_time}')")
            conn.commit()

    cur.close()
    conn.close()


if __name__ == '__main__':
    gen()
