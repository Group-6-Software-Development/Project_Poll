import uuid

from sqlalchemy import Column, String, ForeignKey
from sqlalchemy.dialects.postgresql import UUID

from config.base import Base
from config.database import Session
from models.user_model import UserModel


class CourseModel(Base):
    __tablename__ = 'courses'

    uuid = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4, unique=True, nullable=False)

    course_id = Column(String(50), unique=True, nullable=False)
    course_name = Column(String(50), unique=True, nullable=False)
    start_date = Column(String(50), nullable=False)
    end_date = Column(String(50), nullable=False)

    teacher_uuid = Column(UUID(as_uuid=True), ForeignKey('users.uuid'), nullable=False)


def create(course_id, course_name, start_date, end_date, teacher_uuid):
    course = CourseModel(course_id=course_id, course_name=course_name, start_date=start_date, end_date=end_date,
                         teacher_uuid=teacher_uuid)
    session = Session()
    session.add(course)
    session.commit()
    course_data = {'uuid': str(course.uuid), 'course_id': course.course_id, 'course_name': course.course_name,
                   'start_date': course.start_date,
                   'end_date': course.end_date, 'teacher_uuid': course.teacher_uuid}
    session.close()
    return course_data


def update(course_uuid, course_id, course_name, start_date, end_date, teacher_id):
    session = Session()
    course = session.query(CourseModel).filter_by(uuid=uuid.UUID(course_uuid)).first()
    course.course_id = course_id
    course.course_name = course_name
    course.start_date = start_date
    course.end_date = end_date
    course.teacher_uuid = teacher_id
    session.commit()
    course_data = {'uuid': str(course.uuid), 'course_id': course.course_id, 'course_name': course.course_name,
                   'start_date': course.start_date,
                   'end_date': course.end_date, 'teacher_uuid': course.teacher_uuid}
    session.close()
    return course_data


def find_course_by_uuid(course_uuid):
    session = Session()
    course = session.query(CourseModel).filter_by(uuid=uuid.UUID(course_uuid)).first()

    if course:
        teacher_email = session.query(UserModel.email).filter_by(uuid=course.teacher_uuid).scalar()

        course_data = {'uuid': str(course.uuid), 'course_id': course.course_id, 'course_name': course.course_name,
                       'start_date': course.start_date,
                       'end_date': course.end_date, 'teacher_email': teacher_email, 'teacher_uuid': course.teacher_uuid}
    else:
        course_data = None

    session.close()
    return course_data


def find_courses_by_teacher_uuid(teacher_uuid):
    session = Session()
    courses = session.query(CourseModel).filter_by(teacher_uuid=teacher_uuid).all()

    courses_data = []
    for course in courses:
        teacher_email = session.query(UserModel.email).filter_by(uuid=course.teacher_uuid).scalar()
        course_data = {'uuid': str(course.uuid), 'course_id': course.course_id, 'course_name': course.course_name,
                       'start_date': course.start_date,
                       'end_date': course.end_date, 'teacher_email': teacher_email, 'teacher_uuid': course.teacher_uuid}
        courses_data.append(course_data)

    session.close()
    return courses_data


def delete(course_id):
    session = Session()
    course = session.query(CourseModel).filter_by(uuid=uuid.UUID(course_id)).first()
    session.delete(course)
    session.commit()
    session.close()
