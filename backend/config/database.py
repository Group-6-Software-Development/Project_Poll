from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker

from config.env_config import DATABASE_URL, DATABASE_NAME

engine = create_engine(DATABASE_URL + DATABASE_NAME, pool_pre_ping=True)
Session = sessionmaker(bind=engine)
