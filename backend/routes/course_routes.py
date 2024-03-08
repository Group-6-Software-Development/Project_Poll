from flask import Blueprint

from controllers.course_controller import create_course, get_courses, get_course, update_course, delete_course
from middleware.auth_middleware import protected

course_create = Blueprint('course_create', __name__)
courses_get = Blueprint('courses_get', __name__)
course_get = Blueprint('course_get', __name__)
course_update = Blueprint('course_update', __name__)
course_delete = Blueprint('course_delete', __name__)


@course_create.route('/api/course/create', methods=['POST'])
@protected
def create_route():
    return create_course()


@courses_get.route('/api/course/courses', methods=['GET'])
@protected
def courses_route():
    return get_courses()


@course_get.route('/api/course/<course_uuid>', methods=['GET'])
@protected
def course_route(course_uuid):
    return get_course(course_uuid)


@course_update.route('/api/course/update/<course_uuid>', methods=['PUT'])
@protected
def update_route(course_uuid):
    return update_course(course_uuid)


@course_delete.route('/api/course/delete/<course_uuid>', methods=['DELETE'])
@protected
def delete_route(course_uuid):
    return delete_course(course_uuid)
