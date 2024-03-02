import uuid

from flask import request
from sqlalchemy.exc import IntegrityError

from models.course_model import create, update, find_course_by_id, find_courses_by_teacher_id, delete


def create_course():
    try:
        data = request.get_json()
        user_id = uuid.UUID(request.decoded_token)

        if not user_id:
            return {'error': 'Unauthorized'}, 401
        if not data or 'name' not in data:
            return {'error': 'Bad Request'}, 400
        else:
            name = data['name']
            course = create(name, user_id)
            return course, 201

    except IntegrityError as e:
        print(f"Unexpected error during course creation: {str(e)}")
        return {'error': 'Conflict - Course already exists'}, 409

    except Exception as e:
        print(f"Unexpected error during course creation: {str(e)}")
        return {'error': 'Internal Server Error'}, 500


def update_course(course_id):
    try:
        data = request.get_json()
        user_id = uuid.UUID(request.decoded_token)

        if not user_id:
            return {'error': 'Unauthorized'}, 401
        if 'name' not in data:
            return {'error': 'Bad Request'}, 400
        else:
            name = data['name']
            course = update(course_id, name, user_id)
            return course, 200

    except Exception as e:
        print(f"Unexpected error during course update: {str(e)}")
        return {'error': 'Internal Server Error'}, 500


def get_course(course_id):
    try:
        user_id = uuid.UUID(request.decoded_token)
        if not user_id:
            return {'error': 'Unauthorized'}, 401
        if not course_id:
            return {'error': 'Bad Request'}, 400
        else:
            course = find_course_by_id(course_id)
            if course:
                return course, 200
            else:
                return {'error': 'Not Found - Course not found'}, 404

    except Exception as e:
        print(f"Unexpected error during course lookup: {str(e)}")
        return {'error': 'Internal Server Error'}, 500


def get_courses():
    try:
        user_id = uuid.UUID(request.decoded_token)
        if not user_id:
            return {'error': 'Unauthorized'}, 401
        else:
            courses = find_courses_by_teacher_id(user_id)
            return courses, 200

    except Exception as e:
        print(f"Unexpected error during course lookup: {str(e)}")
        return {'error': 'Internal Server Error'}, 500


def delete_course(course_id):
    try:
        user_id = uuid.UUID(request.decoded_token)
        if not user_id:
            return {'error': 'Unauthorized'}, 401
        else:
            delete(course_id)
            return {"message": "No Content"}, 204

    except Exception as e:
        print(f"Unexpected error during course deletion: {str(e)}")
        return {'error': 'Internal Server Error'}, 500
