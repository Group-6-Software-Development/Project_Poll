from config.base import Base
from config.database import engine
from config.db_setup import create_db
from config.env_config import FLASK_PORT
from main import app

create_db()
Base.metadata.create_all(engine)

if __name__ == '__main__':
    from waitress import serve

    serve(app, host='0.0.0.0', port=FLASK_PORT)
