from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker

from backend.config.env_config import DATABASE_URL

engine = create_engine(DATABASE_URL, pool_pre_ping=True)
Session = sessionmaker(bind=engine)
