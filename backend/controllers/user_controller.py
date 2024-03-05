from datetime import datetime, timedelta, timezone

from flask import request, jsonify
from jwt import encode, ExpiredSignatureError
from sqlalchemy.exc import IntegrityError

from config.env_config import JWT_SECRET, JWT_TOKEN_TIME_TO_LIVE
from models.user_model import signup, login, update, find_user_by_uuid, delete


def generate_token(user_uuid):
    expiration_time = datetime.now(timezone.utc) + timedelta(seconds=int(JWT_TOKEN_TIME_TO_LIVE))
    token = encode({'id': user_uuid, 'exp': expiration_time}, JWT_SECRET, algorithm='HS256')
    return token


def register_user():
    data = request.get_json()

    if not data or 'email' not in data or 'password' not in data or 'firstName' not in data or 'lastName' not in data:
        return {'error': 'Bad Request'}, 400
    else:
        first_name = data['firstName']
        last_name = data['lastName']
        email = data['email']
        password = data['password']
        try:
            user = signup(first_name, last_name, email, password)
            token = generate_token(user.get('uuid'))
            data = {'token': token}
            return jsonify(data), 201
        except IntegrityError:
            return {'message': 'Conflict - Email address already in use'}, 409
        except Exception as e:
            print(f"Unexpected error during registration: {str(e)}")
            return {'error': 'Internal Server Error'}, 500


def login_user():
    data = request.get_json()

    if not data or 'email' not in data or 'password' not in data:
        return {'error': 'Bad Request'}, 400
    else:
        email = data['email']
        password = data['password']
        try:
            user = login(email, password)
            if user:
                token = generate_token(user.get('uuid'))
                data = {'token': token}
                return jsonify(data), 200
            else:
                return {'error': 'Unauthorized - Invalid credentials'}, 401
        except ExpiredSignatureError:
            return {'error': 'Unauthorized - Token has expired'}, 401
        except Exception as e:
            print(f"Unexpected error during login: {str(e)}")
            return {'error': 'Internal Server Error'}, 500


def update_user():
    data = request.get_json()
    user_uuid = request.decoded_token
    if not user_uuid:
        return {'error': 'Unauthorized - Invalid token'}, 401
    if not data or 'email' not in data or 'password' not in data or 'firstName' not in data or 'lastName' not in data:
        return {'error': 'Bad Request'}, 400
    else:
        first_name = data['firstName']
        last_name = data['lastName']
        email = data['email']
        password = data['password']
        try:
            user = update(user_uuid, first_name, last_name, email, password)
            return user, 200
        except Exception as e:
            print(f"Unexpected error during user update: {str(e)}")
            return {'error': 'Internal Server Error'}, 500


def get_user():
    user_uuid = request.decoded_token
    if not user_uuid:
        return {'error': 'Unauthorized - Invalid token'}, 401
    else:
        try:
            user = find_user_by_uuid(user_uuid)
            return user, 200
        except Exception as e:
            print(f"Unexpected error during user lookup: {str(e)}")
            return {'error': 'Internal Server Error'}, 500


def delete_user():
    user_uuid = request.decoded_token
    if not user_uuid:
        return {'error': 'Unauthorized - Invalid token'}, 401
    else:
        try:
            delete(user_uuid)
            return {"message": "No Content"}, 204
        except Exception as e:
            print(f"Unexpected error during user deletion: {str(e)}")
            return {'error': 'Internal Server Error'}, 500
