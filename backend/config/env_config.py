from os import getenv

from dotenv import load_dotenv

load_dotenv()

DATABASE_URL = getenv('DATABASE_URL')
JWT_SECRET = getenv('JWT_SECRET', '64-bytes-of-secret')
SALT_ROUNDS = getenv('SALT_ROUNDS', 12)
PORT = getenv('PORT', 5000)
TOKEN_TIME_TO_LIVE = getenv('TOKEN_TIME_TO_LIVE', 3600)
