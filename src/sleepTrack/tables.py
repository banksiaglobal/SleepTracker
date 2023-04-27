from sqlalchemy import (
    Column,
    DateTime,
    ForeignKey,
    Integer,
    String,
)
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import relationship

Base = declarative_base()


class SysUser(Base):
    __tablename__ = 'SysUsers'

    id = Column(Integer, primary_key=True)
    email = Column(String(50), unique=True)
    username = Column(String(50), unique=True)
    password = Column(String(250))
    gender = Column(String(10))
    DOB = Column((DateTime(timezone=False)))


class Sleep(Base):
    __tablename__ = 'Sleeps'

    id = Column(Integer, primary_key=True)
    activity = Column(String(10))
    stress = Column(Integer)
    coffee = Column(Integer)
    emotion = Column(Integer)
    lights = Column(Integer)
    comfort = Column(Integer)
    quality = Column(Integer)
    user_id = Column(Integer, ForeignKey('SysUsers.id'), index=True)
    start_time = Column((DateTime(timezone=False)))
    end_time = Column((DateTime(timezone=False)))

    user = relationship('SysUser', backref='Sleeps')

