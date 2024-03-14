import uuid
import bcrypt
from sqlalchemy import Column, String
from sqlalchemy.ext.declarative import declarative_base
from config.database import Session
from config.env_config import SALT_ROUNDS

Base = declarative_base()

class UserModel(Base):
    __tablename__ = 'users'

    uuid = Column(String(36), primary_key=True, default=str(uuid.uuid4()), unique=True, nullable=False)
    email = Column(String(50), unique=True, nullable=False)
    first_name = Column(String(50), nullable=False)
    last_name = Column(String(50), nullable=False)
    password = Column(String(255), nullable=False)


def signup(first_name, last_name, email, password):
    user = UserModel(uuid=str(uuid.uuid4()), first_name=first_name, last_name=last_name, email=email,
                     password=bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt(rounds=int(SALT_ROUNDS))).decode('utf-8'))
    session = Session()
    session.add(user)
    session.commit()
    user_data = {'uuid': user.uuid, 'first_name': user.first_name, 'last_name': user.last_name,
                 'email': user.email}
    session.close()
    return user_data


def login(email, password):
    session = Session()
    user = session.query(UserModel).filter_by(email=email).first()
    user_data = {'uuid': user.uuid, 'first_name': user.first_name, 'last_name': user.last_name,
                 'email': user.email} if user else None
    session.close()
    if user and bcrypt.checkpw(password.encode('utf-8'), user.password.encode('utf-8')):
        return user_data
    else:
        return None


def update(user_uuid, first_name, last_name, email, password):
    session = Session()
    user = session.query(UserModel).filter_by(uuid=user_uuid).first()
    user.email = email
    user.first_name = first_name
    user.last_name = last_name
    user.password = bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt(rounds=int(SALT_ROUNDS))).decode('utf-8')
    session.commit()
    user_data = {'uuid': user.uuid, 'first_name': user.first_name, 'last_name': user.last_name,
                 'email': user.email}
    session.close()
    return user_data


def find_user_by_uuid(user_uuid):
    session = Session()
    user = session.query(UserModel).filter_by(uuid=user_uuid).first()
    user_data = {'uuid': user.uuid, 'first_name': user.first_name, 'last_name': user.last_name,
                 'email': user.email}
    session.close()
    return user_data


def delete(user_uuid):
    session = Session()
    user = session.query(UserModel).filter_by(uuid=user_uuid).first()
    session.delete(user)
    session.commit()
    session.close()
