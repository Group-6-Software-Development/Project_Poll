import uuid

from sqlalchemy import Column, String, ForeignKey
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import relationship

from backend.config.base import Base
from backend.config.database import Session
from backend.models.user_model import UserModel


class CourseModel(Base):
    __tablename__ = 'courses'

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4, unique=True, nullable=False)
    name = Column(String(50), unique=True, nullable=False)
    teacher_id = Column(UUID(as_uuid=True), ForeignKey('users.id'), nullable=False)
    teacher = relationship('UserModel', back_populates='courses')
    reviews = relationship('ReviewModel', back_populates='course')


def create(name, teacher_id):
    course = CourseModel(name=name, teacher_id=teacher_id)
    session = Session()
    session.add(course)
    session.commit()
    course_data = {'id': str(course.id), 'name': course.name, 'teacher_id': course.teacher_id}
    session.close()
    return course_data


def update(course_id, name, teacher_id):
    session = Session()
    course = session.query(CourseModel).filter_by(id=uuid.UUID(course_id)).first()
    course.name = name
    course.teacher_id = teacher_id
    session.commit()
    course_data = {'id': str(course.id), 'name': course.name, 'teacher_id': course.teacher_id}
    session.close()
    return course_data


def find_course_by_id(course_id):
    session = Session()
    course = session.query(CourseModel).filter_by(id=uuid.UUID(course_id)).first()

    # Check if the course exists
    if course:
        teacher_email = session.query(UserModel.email).filter_by(id=course.teacher_id).scalar()
        course_data = {'name': course.name, 'teacher_id': course.teacher_id, 'teacher_email': teacher_email}
    else:
        course_data = None

    session.close()
    return course_data


def find_courses_by_teacher_id(teacher_id):
    session = Session()
    courses = session.query(CourseModel).filter_by(teacher_id=teacher_id).all()

    # Retrieve teacher's email for each course
    courses_data = []
    for course in courses:
        teacher_email = session.query(UserModel.email).filter_by(id=course.teacher_id).scalar()
        course_data = {'id': str(course.id), 'name': course.name, 'teacher_id': course.teacher_id,
                       'teacher_email': teacher_email}
        courses_data.append(course_data)

    session.close()
    return courses_data


def delete(course_id):
    session = Session()
    course = session.query(CourseModel).filter_by(id=uuid.UUID(course_id)).first()
    session.delete(course)
    session.commit()
    session.close()
