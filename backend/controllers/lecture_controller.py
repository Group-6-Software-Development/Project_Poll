import uuid

from flask import request
from sqlalchemy.exc import IntegrityError

from models.lecture_model import create, get_all_lectures, get_lecture_by_uuid


def create_lecture():
    try:
        data = request.get_json()
        user_uuid = uuid.UUID(request.decoded_token)

        if not user_uuid:
            return {'error': 'Unauthorized'}, 401
        if not data or 'lectureDate' not in data or 'courseUUID' not in data:
            return {'error': 'Bad Request'}, 400
        else:
            lecture_date = data['lectureDate']
            course_uuid = uuid.UUID(data['courseUUID'])

            lecture = create(lecture_date, course_uuid)
            return lecture, 201

    except IntegrityError as e:
        print(f"Unexpected error during lecture creation: {str(e)}")
        return {'error': 'Conflict - Lecture already exists'}, 409

    except Exception as e:
        print(f"Unexpected error during lecture creation: {str(e)}")
        return {'error': 'Internal Server Error'}, 500


def get_lecture(lecture_uuid):
    lecture_uuid = uuid.UUID(lecture_uuid)
    user_uuid = uuid.UUID(request.decoded_token)

    if not user_uuid:
        return {'error': 'Unauthorized'}, 401
    try:
        lecture = get_lecture_by_uuid(lecture_uuid)
        return lecture, 200
    except Exception as e:
        print(f"Unexpected error during lecture retrieval: {str(e)}")
        return {'error': 'Internal Server Error'}, 500


def get_lectures(course_uuid):
    user_uuid = uuid.UUID(request.decoded_token)

    if not user_uuid:
        return {'error': 'Unauthorized'}, 401

    course_uuid = uuid.UUID(course_uuid)
    try:
        lectures = get_all_lectures(course_uuid)
        return lectures, 200
    except Exception as e:
        print(f"Unexpected error during lecture retrieval: {str(e)}")
        return {'error': 'Internal Server Error'}, 500
