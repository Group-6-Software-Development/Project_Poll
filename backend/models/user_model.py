import uuid

import bcrypt
from sqlalchemy import Column, String
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.ext.declarative import declarative_base

from backend.config.database import Session, engine
from backend.config.env_config import SALT_ROUNDS

Base = declarative_base()


class UserModel(Base):
    __tablename__ = 'users'

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4, unique=True, nullable=False)
    email = Column(String(50), unique=True, nullable=False)
    password = Column(String(255), nullable=False)


def signup(email, password):
    user = UserModel(email=email,
                     password=bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt(rounds=int(SALT_ROUNDS))).decode(
                         'utf-8'))
    session = Session()
    session.add(user)
    session.commit()
    user_data = {'id': str(user.id), 'email': user.email}
    session.close()
    return user_data


def login(email, password):
    session = Session()
    user = session.query(UserModel).filter_by(email=email).first()
    user_data = {'id': str(user.id),
                 'email': user.email} if user else None
    session.close()
    if user and bcrypt.checkpw(password.encode('utf-8'), user.password.encode('utf-8')):
        return user_data
    else:
        return None


def update(user_id, email, password):
    session = Session()
    user = session.query(UserModel).filter_by(id=uuid.UUID(user_id)).first()
    user.email = email
    user.password = bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt(rounds=int(SALT_ROUNDS))).decode('utf-8')
    session.commit()
    user_data = {'id': str(user.id), 'email': user.email}
    session.close()
    return user_data


def find_user_by_id(user_id):
    session = Session()
    user = session.query(UserModel).filter_by(id=uuid.UUID(user_id)).first()
    user_data = {'email': user.email}
    session.close()
    return user_data


def delete(user_id):
    session = Session()
    user = session.query(UserModel).filter_by(id=uuid.UUID(user_id)).first()
    session.delete(user)
    session.commit()
    session.close()


def init_table():
    Base.metadata.create_all(engine)
