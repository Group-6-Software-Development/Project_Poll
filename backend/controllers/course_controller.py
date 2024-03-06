import uuid

from flask import request
from sqlalchemy.exc import IntegrityError

from models.course_model import create, update, find_course_by_uuid, find_courses_by_teacher_uuid, delete


def create_course():
    try:
        data = request.get_json()
        user_id = uuid.UUID(request.decoded_token)

        if not user_id:
            return {'error': 'Unauthorized'}, 401
        if not data or 'courseID' not in data or 'courseName' not in data or 'startDate' not in data or 'endDate' not in data:
            return {'error': 'Bad Request'}, 400
        else:
            course_id = data['courseID']
            course_name = data['courseName']
            start_date = data['startDate']
            end_date = data['endDate']

            course = create(course_id, course_name, start_date, end_date, user_id)
            return course, 201

    except IntegrityError as e:
        print(f"Unexpected error during course creation: {str(e)}")
        return {'error': 'Conflict - Course already exists'}, 409

    except Exception as e:
        print(f"Unexpected error during course creation: {str(e)}")
        return {'error': 'Internal Server Error'}, 500


def update_course(course_uuid):
    try:
        data = request.get_json()
        user_id = uuid.UUID(request.decoded_token)

        if not user_id:
            return {'error': 'Unauthorized'}, 401
        if not data or 'courseID' not in data or 'courseName' not in data or 'startDate' not in data or 'endDate' not in data:
            return {'error': 'Bad Request'}, 400
        else:
            course_id = data['courseID']
            course_name = data['courseName']
            start_date = data['startDate']
            end_date = data['endDate']

            course = update(course_uuid, course_id, course_name, start_date, end_date, user_id)
            return course, 200
    except IntegrityError as e:
        print(f"Unexpected error during course update: {str(e)}")
        return {'error': 'Conflict - Course already exists'}, 409
    
    except Exception as e:
        print(f"Unexpected error during course update: {str(e)}")
        return {'error': 'Internal Server Error'}, 500


def get_course(course_uuid):
    try:
        user_id = uuid.UUID(request.decoded_token)
        if not user_id:
            return {'error': 'Unauthorized'}, 401
        if not course_uuid:
            return {'error': 'Bad Request'}, 400
        else:
            course = find_course_by_uuid(course_uuid)
            if course:
                return course, 200
            else:
                return {'error': 'Not Found - Course not found'}, 404

    except Exception as e:
        print(f"Unexpected error during course lookup: {str(e)}")
        return {'error': 'Internal Server Error'}, 500


def get_courses():
    try:
        user_uuid = uuid.UUID(request.decoded_token)
        if not user_uuid:
            return {'error': 'Unauthorized'}, 401
        else:
            courses = find_courses_by_teacher_uuid(user_uuid)
            return courses, 200

    except Exception as e:
        print(f"Unexpected error during course lookup: {str(e)}")
        return {'error': 'Internal Server Error'}, 500


def delete_course(course_uuid):
    try:
        user_id = uuid.UUID(request.decoded_token)
        if not user_id:
            return {'error': 'Unauthorized'}, 401
        else:
            delete(course_uuid)
            return {"message": "No Content"}, 204

    except Exception as e:
        print(f"Unexpected error during course deletion: {str(e)}")
        return {'error': 'Internal Server Error'}, 500
