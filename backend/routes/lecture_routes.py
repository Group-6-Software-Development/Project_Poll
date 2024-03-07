from flask import Blueprint

from controllers.lecture_controller import create_lecture, get_lectures
from middleware.auth_middleware import protected

lecture_create = Blueprint('lecture_create', __name__)
lectures_get = Blueprint('lectures_get', __name__)


@lecture_create.route('/api/lecture/create', methods=['POST'])
@protected
def create_route():
    return create_lecture()


@lectures_get.route('/api/lecture/<course_uuid>', methods=['GET'])
@protected
def lectures_route(course_uuid):
    return get_lectures(course_uuid)
