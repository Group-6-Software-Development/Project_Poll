from flask import Flask

from backend.config.base import Base
from backend.config.database import engine
from config.env_config import PORT
from routes.course_routes import course_create, courses_get, course_get, course_update, course_delete
from routes.review_routes import review_create, reviews_get
from routes.user_routes import user_register, user_login, user_update, user_delete, user_get

app = Flask(__name__)

user_routes = [user_register, user_login, user_get, user_update, user_delete]
course_routes = [course_create, courses_get, course_get, course_update, course_delete]
review_routes = [review_create, reviews_get]

# Register user routes
for route in user_routes:
    app.register_blueprint(route)

# Register course routes
for route in course_routes:
    app.register_blueprint(route)

# Register review routes
for route in review_routes:
    app.register_blueprint(route)

if __name__ == '__main__':
    Base.metadata.create_all(engine)
    app.run(debug=True, port=PORT)
