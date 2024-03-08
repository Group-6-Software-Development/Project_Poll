import uuid

from sqlalchemy import Column, String, ForeignKey
from sqlalchemy.dialects.postgresql import UUID

from config.base import Base
from config.database import Session
from models.course_model import CourseModel


class LectureModel(Base):
    __tablename__ = 'lectures'

    uuid = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4, unique=True, nullable=False)
    lecture_date = Column(String(50), nullable=False)

    course_uuid = Column(UUID(as_uuid=True), ForeignKey('courses.uuid'), nullable=False)


def create(lecture_date, course_uuid):
    lecture = LectureModel(lecture_date=lecture_date, course_uuid=course_uuid)
    session = Session()
    session.add(lecture)
    session.commit()
    course_id = session.query(CourseModel).filter_by(uuid=course_uuid).first().course_id
    lecture_data = {'uuid': str(lecture.uuid), 'lecture_date': lecture.lecture_date, 'course_id': course_id}
    session.close()
    return lecture_data


def get_lecture_by_uuid(lecture_uuid):
    session = Session()
    lecture = session.query(LectureModel).filter_by(uuid=lecture_uuid).first()

    course_id = session.query(CourseModel).filter_by(uuid=lecture.course_uuid).first().course_id
    lecture_data = {'uuid': str(lecture.uuid), 'lecture_date': lecture.lecture_date, 'course_id': course_id}

    session.close()
    return lecture_data


def get_all_lectures(course_uuid):
    session = Session()
    lectures = session.query(LectureModel).filter_by(course_uuid=course_uuid).all()
    lectures_data = []
    for lecture in lectures:
        course_id = session.query(CourseModel).filter_by(uuid=course_uuid).first().course_id
        course_name = session.query(CourseModel).filter_by(uuid=course_uuid).first().course_name

        lecture_data = {'uuid': str(lecture.uuid), 'lecture_date': lecture.lecture_date, 'course_id': course_id,
                        'course_name': course_name}
        lectures_data.append(lecture_data)
    session.close()
    return lectures_data
