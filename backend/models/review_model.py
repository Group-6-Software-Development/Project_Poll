import uuid

from sqlalchemy import Column, String, ForeignKey, Integer
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import relationship

from config.base import Base
from config.database import Session


class ReviewModel(Base):
    __tablename__ = 'reviews'

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4, unique=True, nullable=False)
    course_id = Column(UUID(as_uuid=True), ForeignKey('courses.id'), nullable=False)
    course = relationship('CourseModel', back_populates='reviews')
    rating = Column(Integer, nullable=False)
    comment = Column(String(255), nullable=False)


def create(course_id, rating, comment):
    review = ReviewModel(course_id=course_id, rating=rating, comment=comment)
    session = Session()
    session.add(review)
    session.commit()
    review_data = {'id': str(review.id), 'course_id': review.course_id, 'rating': review.rating,
                   'comment': review.comment}
    session.close()
    return review_data


def find_all_reviews_by_course_id(course_id):
    session = Session()
    reviews = session.query(ReviewModel).filter_by(course_id=course_id).all()
    reviews_data = []
    for review in reviews:
        review_data = {'id': str(review.id), 'course_id': review.course_id, 'rating': review.rating,
                       'comment': review.comment}
        reviews_data.append(review_data)
    session.close()
    return reviews_data
