from datetime import (
    datetime,
    timedelta,
)

from fastapi import (
    Depends,
    HTTPException,
    status,
)
from fastapi.security import OAuth2PasswordBearer
from jose import (
    JWTError,
    jwt,
)
from passlib.hash import bcrypt
from pydantic import ValidationError


from .. import (
    models,
)
from ..database import get_connection
from ..settings import settings

oauth2_scheme = OAuth2PasswordBearer(tokenUrl='/auth/sign-in/')


def get_current_user(token: str = Depends(oauth2_scheme)) -> models.User:
    return AuthService.verify_token(token)


def user_from_db_to_dict(users: list, i: int = 0) -> models.TableUser:
    # return list_user
    while i < len(users):
        yield models.TableUser.parse_obj({
            'id': users[i][0],
            'email': users[i][1],
            'username': users[i][2],
            'password': users[i][3]})
        i += 1


class AuthService:
    @classmethod
    def verify_password(cls, plain_password: str, hashed_password: str) -> bool:
        return bcrypt.verify(plain_password, hashed_password)

    @classmethod
    def hash_password(cls, password: str) -> str:
        return bcrypt.hash(password)

    @classmethod
    def verify_token(cls, token: str) -> models.User:
        exception = HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail='Could not validate credentials',
            headers={'WWW-Authenticate': 'Bearer'},
        )
        try:
            payload = jwt.decode(
                token,
                settings.jwt_secret,
                algorithms=[settings.jwt_algorithm],
            )
        except JWTError:
            raise exception from None

        user_data = payload.get('user')

        try:
            user = models.User.parse_obj(user_data)
        except ValidationError:
            raise exception from None

        return user

    @classmethod
    def create_token(cls, user: models.TableUser) -> models.Token:
        user_data = models.User.from_orm(user)
        now = datetime.utcnow()
        payload = {
            'iat': now,
            'nbf': now,
            'exp': now + timedelta(seconds=settings.jwt_expires_s),
            'sub': str(user_data.id),
            'user': user_data.dict(),
        }
        token = jwt.encode(
            payload,
            settings.jwt_secret,
            algorithm=settings.jwt_algorithm,
        )
        return models.Token(access_token=token)

    def __init__(self, connection=Depends(get_connection)):
        self.connection = connection

    def register_new_user(
            self,
            user_data: models.UserCreate,
    ) -> models.Token:
        cur = self.connection.cursor()
        cur.execute('INSERT INTO SysUsers (email, username, password)'
                    'VALUES (?, ?, ?)',
                    (user_data.email, user_data.username, self.hash_password(user_data.password)))
        self.connection.commit()
        cur.execute(f"SELECT * FROM SysUsers where email = '{user_data.email}'")
        users = cur.fetchall()
        cur.close()

        user = list(user_from_db_to_dict(users))[0]
        return self.create_token(user)

    def authenticate_user(
            self,
            username: str,
            password: str,
    ) -> models.Token:
        exception = HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail='Incorrect username or password',
            headers={'WWW-Authenticate': 'Bearer'},
        )
        try:
            cur = self.connection.cursor()
            cur.execute(f"SELECT * FROM SysUsers where username = '{username}'")
            users = cur.fetchall()
            cur.close()
            user = list(user_from_db_to_dict(users))[0]
            if not user:
                raise Exception()

            if not self.verify_password(password, user.password):
                raise Exception()
        except:
            raise exception

        return self.create_token(user)
