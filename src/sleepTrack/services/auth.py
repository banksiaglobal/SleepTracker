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
    tables
)

from ..database import get_session
from ..settings import settings

oauth2_scheme = OAuth2PasswordBearer(tokenUrl='/auth/sign-in/')


def get_current_user(token: str = Depends(oauth2_scheme)) -> models.User:
    return AuthService.verify_token(token)


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
    def create_token(cls, user: tables.SysUser) -> models.Token:
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

    def __init__(self, session=Depends(get_session)):
        self.session = session

    def register_new_user(
            self,
            user_data: models.UserCreate
    ) -> models.Token:
        user = tables.SysUser(
            email=user_data.email,
            username=user_data.username,
            password=self.hash_password(user_data.password),
            gender=user_data.gender.value,
            DOB=datetime.strptime(user_data.DOB, '%Y-%m-%d %H:%M:%S')

        )
        self.session.add(user)
        self.session.commit()
        user.DOB = user.DOB.strftime("%Y-%m-%d %H:%M:%S")
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
        user = (
            self.session
            .query(tables.SysUser)
            .filter(tables.SysUser.username == username)
            .first()
        )

        if not user:
            raise exception

        if not self.verify_password(password, user.password):
            raise exception
        user.DOB = user.DOB.strftime("%Y-%m-%d %H:%M:%S")
        return self.create_token(user)

