from flask import Flask

from backend.config.base import Base
from backend.config.database import engine
from config.env_config import PORT
from routes.course_routes import course_create, courses_get, course_get, course_update, course_delete
from routes.user_routes import user_register, user_login, user_update, user_delete, user_get

app = Flask(__name__)

app.register_blueprint(user_register)
app.register_blueprint(user_login)
app.register_blueprint(user_get)
app.register_blueprint(user_update)
app.register_blueprint(user_delete)

app.register_blueprint(course_create)
app.register_blueprint(courses_get)
app.register_blueprint(course_get)
app.register_blueprint(course_update)
app.register_blueprint(course_delete)

if __name__ == '__main__':
    Base.metadata.create_all(engine)
    app.run(debug=True, port=PORT)
