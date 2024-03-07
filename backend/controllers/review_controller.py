import uuid

from flask import request
from sqlalchemy.exc import IntegrityError

from models.review_model import create, find_all_reviews_by_course_uuid


def create_review():
    data = request.get_json()
    if not data or 'courseUUID' not in data or 'materialRating' not in data:
        return {'error': 'Bad Request'}, 400
    else:
        course_uuid = uuid.UUID(data['courseUUID'])
        material_rating = data['materialRating']
        comment = data.get('comment', None)
        try:
            review = create(course_uuid, material_rating, comment)
            return review, 201
        except IntegrityError as e:
            print(f"Unexpected error during review creation: {str(e)}")
            return {'error': 'Conflict - Review already exists'}, 409
        except Exception as e:
            print(f"Unexpected error during review creation: {str(e)}")
            return {'error': 'Internal Server Error'}, 500


def get_reviews(course_uuid):
    course_uuid = uuid.UUID(course_uuid)
    if not course_uuid:
        return {'error': 'Bad Request'}, 400
    else:
        try:
            reviews = find_all_reviews_by_course_uuid(course_uuid)
            if not reviews:
                return {'error': 'No reviews found'}, 404
            else:
                return reviews, 200
        except Exception as e:
            print(f"Unexpected error during review lookup: {str(e)}")
            return {'error': 'Internal Server Error'}, 500
