from os import getenv

from dotenv import load_dotenv

load_dotenv()

DATABASE_URL = getenv('DATABASE_URL')
DATABASE_NAME = getenv('DATABASE_NAME')

JWT_SECRET = getenv('JWT_SECRET', '64-bytes-of-secret')
SALT_ROUNDS = getenv('SALT_ROUNDS', 12)

PORT = getenv('PORT', 5000)
JWT_TOKEN_TIME_TO_LIVE = getenv('JWT_TOKEN_TIME_TO_LIVE', 3600)
