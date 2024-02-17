import uuid

from flask import request
from sqlalchemy.exc import IntegrityError

from backend.models.course_model import create, update, find_course_by_id, find_courses_by_teacher_id, delete


def create_course():
    data = request.get_json()
    user_id = uuid.UUID(request.decoded_token)
    if not user_id:
        return {'error': 'Unauthorized'}, 401
    if not data or 'name' not in data:
        return {'error': 'Invalid request'}, 400
    else:
        name = data['name']
        try:
            course = create(name, user_id)
            return course, 200
        except IntegrityError as e:
            print(f"Unexpected error during course creation: {str(e)}")
            return {'error': 'Course already exists'}, 400
        except Exception as e:
            print(f"Unexpected error during course creation: {str(e)}")
            return {'error': 'An error occurred during course creation'}, 400


def update_course(course_id):
    data = request.get_json()
    user_id = uuid.UUID(request.decoded_token)
    if not user_id:
        return {'error': 'Unauthorized'}, 401
    if 'name' not in data:
        return {'error': 'Invalid request'}, 400
    else:
        name = data['name']
        try:
            course = update(course_id, name, user_id)
            return course, 200
        except Exception as e:
            print(f"Unexpected error during course update: {str(e)}")
            return {'error': 'An error occurred during course update'}, 400


def get_course(course_id):
    user_id = uuid.UUID(request.decoded_token)
    if not user_id:
        return {'error': 'Unauthorized'}, 401
    if not course_id:
        return {'error': 'Invalid request'}, 400
    else:
        try:
            course = find_course_by_id(course_id)
            return course, 200
        except Exception as e:
            print(f"Unexpected error during course lookup: {str(e)}")
            return {'error': 'An error occurred during course lookup'}, 400


def get_courses():
    user_id = uuid.UUID(request.decoded_token)
    if not user_id:
        return {'error': 'Unauthorized'}, 401
    else:
        try:
            courses = find_courses_by_teacher_id(user_id)
            return courses, 200
        except Exception as e:
            print(f"Unexpected error during course lookup: {str(e)}")
            return {'error': 'An error occurred during course lookup'}, 400


def delete_course(course_id):
    user_id = uuid.UUID(request.decoded_token)
    if not user_id:
        return {'error': 'Unauthorized'}, 401
    else:
        try:
            delete(course_id)
            return {"message": "Course deleted"}, 200
        except Exception as e:
            print(f"Unexpected error during course deletion: {str(e)}")
            return {'error': 'An error occurred during course deletion'}, 400
