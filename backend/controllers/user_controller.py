from datetime import datetime, timedelta, timezone

from flask import request
from jwt import encode, ExpiredSignatureError
from sqlalchemy.exc import IntegrityError

from config.env_config import JWT_SECRET, TOKEN_TIME_TO_LIVE
from models.user_model import signup, login, update, init_table, find_user_by_id, delete


def create_token(_id):
    expiration_time = datetime.now(timezone.utc) + timedelta(seconds=int(TOKEN_TIME_TO_LIVE))
    return encode({'id': _id, 'exp': expiration_time}, JWT_SECRET, algorithm='HS256')


def register_user():
    data = request.get_json()

    if not data or 'email' not in data or 'password' not in data:
        return {'error': 'Invalid request'}, 400
    else:
        email = data['email']
        password = data['password']
        try:
            user = signup(email, password)
            token = create_token(user.get('id'))
            return token, 200
        except IntegrityError:
            return {'error': 'Email address already in use'}, 400
        except Exception as e:
            print(f"Unexpected error during registration: {str(e)}")
            return {'error': 'An error occurred during registration'}, 400


def login_user():
    data = request.get_json()

    if not data or 'email' not in data or 'password' not in data:
        return {'error': 'Invalid request'}, 400
    else:
        email = data['email']
        password = data['password']
        try:
            user = login(email, password)
            if user:
                token = create_token(user.get('id'))
                return token, 200
            else:
                return {'error': 'Invalid credentials'}, 401
        except ExpiredSignatureError:
            return {'error': 'Token has expired'}, 401
        except Exception as e:
            print(f"Unexpected error during login: {str(e)}")
            return {'error': 'An error occurred during login'}, 400


def update_user():
    data = request.get_json()
    user_id = request.decoded_token
    if not user_id:
        return {'error': 'Invalid token'}, 401
    elif not data or 'email' not in data or 'password' not in data:
        return {'error': 'Invalid request'}, 400
    else:
        email = data['email']
        password = data['password']
        try:
            user = update(user_id, email, password)
            return user, 200
        except Exception as e:
            print(f"Unexpected error during user update: {str(e)}")
            return {'error': 'An error occurred during user update'}, 400


def get_user():
    user_id = request.decoded_token
    if not user_id:
        return {'error': 'Invalid token'}, 401
    else:
        try:
            user = find_user_by_id(user_id)
            return user, 200
        except Exception as e:
            print(f"Unexpected error during user lookup: {str(e)}")
            return {'error': 'An error occurred during user lookup'}, 400


def delete_user():
    user_id = request.decoded_token
    if not user_id:
        return {'error': 'Invalid token'}, 401
    else:
        try:
            delete(user_id)
            return "User deleted", 200
        except Exception as e:
            print(f"Unexpected error during user deletion: {str(e)}")
            return {'error': 'An error occurred during user deletion'}, 400


def create_table():
    init_table()
