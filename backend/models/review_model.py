import uuid

from sqlalchemy import Column, String, ForeignKey, Integer
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import relationship

from config.base import Base
from config.database import Session


class ReviewModel(Base):
    __tablename__ = 'reviews'

    uuid = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4, unique=True, nullable=False)
    unterstanding_rating = Column(Integer, nullable=False)
    material_rating = Column(Integer, nullable=False)
    comment = Column(String(255), nullable=False)
    course_uuid = Column(UUID(as_uuid=True), ForeignKey('courses.uuid'), nullable=False)

    course = relationship('CourseModel', back_populates='reviews')


def create(course_uuid, unterstanding_rating, material_rating, comment):
    review = ReviewModel(course_uuid=course_uuid, unterstanding_rating=unterstanding_rating, material_rating=material_rating, comment=comment)
    session = Session()
    session.add(review)
    session.commit()
    review_data = {'uuid': str(review.uuid), 'course_uuid': review.course_uuid, 'unterstanding_rating': review.unterstanding_rating, 'material_rating': review.material_rating,
                   'comment': review.comment}
    session.close()
    return review_data


def find_all_reviews_by_course_uuid(course_uuid):
    session = Session()
    reviews = session.query(ReviewModel).filter_by(course_uuid=course_uuid).all()
    reviews_data = []
    for review in reviews:
        review_data = {'uuid': str(review.uuid), 'course_uuid': review.course_uuid, 'unterstanding_rating': review.unterstanding_rating, 'material_rating': review.material_rating,
                   'comment': review.comment}
        
        reviews_data.append(review_data)
    session.close()
    return reviews_data
