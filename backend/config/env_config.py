from os import getenv

from dotenv import load_dotenv

load_dotenv()

MYSQL_USER = getenv('MYSQL_USER', 'root')
MYSQL_PASSWORD = getenv('MYSQL_PASSWORD', 'root')
MYSQL_HOST = getenv('MYSQL_HOST', 'localhost')
MYSQL_PORT = getenv('MYSQL_PORT', 3306)
MYSQL_DB_NAME = getenv('MYSQL_DB_NAME', 'project_poll')

JWT_SECRET = getenv('JWT_SECRET', '64-bytes-of-secret')
SALT_ROUNDS = getenv('SALT_ROUNDS', 12)

FLASK_PORT = getenv('FLASK_PORT', 5000)
JWT_TOKEN_TIME_TO_LIVE = getenv('JWT_TOKEN_TIME_TO_LIVE', 3600)
