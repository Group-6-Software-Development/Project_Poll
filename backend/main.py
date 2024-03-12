from flask import Flask
from flask_cors import CORS

from config.base import Base
from config.database import engine
from config.db_setup import create_db
from config.env_config import FLASK_PORT
from routes.course_routes import course_create, courses_get, course_get, course_update, course_delete
from routes.lecture_routes import lecture_create, lectures_get, lecture_get
from routes.review_routes import review_create, reviews_get
from routes.user_routes import user_register, user_login, user_update, user_delete, user_get

app = Flask(__name__)
CORS(app)

user_routes = [user_register, user_login, user_get, user_update, user_delete]
course_routes = [course_create, courses_get, course_get, course_update, course_delete]
lecture_routes = [lecture_create, lectures_get, lecture_get]
review_routes = [review_create, reviews_get]

# Register user routes
for route in user_routes:
    app.register_blueprint(route)

# Register course routes
for route in course_routes:
    app.register_blueprint(route)

# Register lecture routes
for route in lecture_routes:
    app.register_blueprint(route)

# Register review routes
for route in review_routes:
    app.register_blueprint(route)

if __name__ == '__main__':
    create_db()
    Base.metadata.create_all(engine)
    app.run(debug=False, host='0.0.0.0', port=FLASK_PORT)

#TESTING