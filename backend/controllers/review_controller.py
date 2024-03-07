import uuid

from flask import request
from sqlalchemy.exc import IntegrityError

from models.review_model import create, find_all_reviews_by_lecture_uuid


def create_review():
    data = request.get_json()
    if not data or 'lectureUUID' not in data or 'materialRating' not in data or 'understandingRating' not in data:
        return {'error': 'Bad Request'}, 400
    else:
        lecture_uuid = uuid.UUID(data['lectureUUID'])
        material_rating = data['materialRating']
        understanding_rating = data['understandingRating']
        comment = data.get('comment', None)
        try:
            review = create(lecture_uuid, understanding_rating, material_rating, comment)
            return review, 201
        except IntegrityError as e:
            print(f"Unexpected error during review creation: {str(e)}")
            return {'error': 'Conflict - Review already exists'}, 409
        except Exception as e:
            print(f"Unexpected error during review creation: {str(e)}")
            return {'error': 'Internal Server Error'}, 500


def get_reviews(lecture_uuid):
    lecture_uuid = uuid.UUID(lecture_uuid)
    if not lecture_uuid:
        return {'error': 'Bad Request'}, 400
    else:
        try:
            reviews = find_all_reviews_by_lecture_uuid(lecture_uuid)
            if not reviews:
                return {'error': 'No reviews found'}, 404
            else:
                return reviews, 200
        except Exception as e:
            print(f"Unexpected error during review lookup: {str(e)}")
            return {'error': 'Internal Server Error'}, 500
