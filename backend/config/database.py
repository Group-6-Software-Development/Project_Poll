from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker

from config.env_config import MYSQL_USER, MYSQL_PASSWORD, MYSQL_HOST, MYSQL_PORT, MYSQL_DB_NAME

engine = create_engine(f"mysql://{MYSQL_USER}:{MYSQL_PASSWORD}@{MYSQL_HOST}:{MYSQL_PORT}/{MYSQL_DB_NAME}",
                       pool_pre_ping=True)
Session = sessionmaker(bind=engine)
