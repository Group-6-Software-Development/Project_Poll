from flask import Blueprint

from controllers.review_controller import create_review, get_reviews

review_create = Blueprint('review_create', __name__)
reviews_get = Blueprint('reviews_get', __name__)


@review_create.route('/api/review/create', methods=['POST'])
def create_route():
    return create_review()


@reviews_get.route('/api/review/reviews/<course_id>', methods=['GET'])
def reviews_route(course_id):
    return get_reviews(course_id)
