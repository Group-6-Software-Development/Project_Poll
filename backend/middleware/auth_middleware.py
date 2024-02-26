from functools import wraps

from flask import request
from jwt import decode

from config.env_config import JWT_SECRET


def protected(route_function):
    @wraps(route_function)
    def wrapper(*args, **kwargs):
        token = request.headers.get('Authorization')
        if token and token.startswith('Bearer '):
            token = token.split(' ')[1]
            try:
                decoded = decode(token, JWT_SECRET, algorithms=['HS256']).get('id')
                request.decoded_token = decoded
            except Exception as e:
                print(f"Error decoding token: {e}")
                return {'error': 'Error'}, 401
        else:
            return {'error': 'Invalid token'}, 401

        return route_function(*args, **kwargs)

    return wrapper
