from sqlalchemy import (
    Column,
    Integer,
    String,
    ForeignKey,
    Date
)
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import relationship

Base = declarative_base()

class User(Base):
    __tablename__ = 'SysUsers'
    id = Column(Integer, primary_key=True)
    email = Column(String, unique=True)
    username = Column(String, unique=True)
    birthday = Column(Date)
    gender = Column(String)
    password_hash = Column(String)

class Condition(Base):
    __tablename__ = 'Conditions'
    id = Column(Integer, primary_key=True)
    activity = Column(Integer)
    stress = Column(Integer)
    coffee = Column(Integer)
    emotion = Column(Integer)
    made = Column(Integer)
    comfort = Column(Integer)
    lights = Column(Integer)

class Sleep(Base):
    __tablename__ = 'Sleep'
    id = Column(Integer, primary_key=True)
    user_id = Column(Integer, ForeignKey('SysUsers.id'), index=True)
    condition_id = Column(Integer, ForeignKey('Conditions.id'), index=True)
    user = relationship('SysUsers', backref='Sleep')
    condition = relationship('Conditions', backref='Sleep')
