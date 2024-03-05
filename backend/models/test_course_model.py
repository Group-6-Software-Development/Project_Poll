import uuid
import sys
import os
import unittest
from unittest.mock import patch, MagicMock

# Add the backend directory to the Python module search path
backend_path = os.path.abspath(os.path.join(os.path.dirname(__file__), '..'))
sys.path.append(backend_path)

# Import necessary modules from course_model.py
from course_model import CourseModel, update, find_course_by_id, find_courses_by_teacher_id, delete

class TestCourseModel(unittest.TestCase):
    @patch('course_model.UserModel')
    @patch('course_model.Session')
    def test_update_course(self, mock_session, mock_user_model):
        # Mock session and its methods
        mock_query = MagicMock()
        mock_session.return_value.query.return_value.filter_by.return_value.first.return_value = MagicMock()
        mock_session.return_value.commit = MagicMock()

        # Mock data
        course_id = str(uuid.uuid4())  # Generate a random UUID string
        name = 'Physics'
        teacher_id = '2'  # Assuming teacher_id is a string for testing purposes

        # Call the update function
        course_data = update(course_id, name, teacher_id)

        # Assertions
        self.assertIsNotNone(course_data)
        self.assertEqual(course_data['name'], name)
        self.assertEqual(course_data['teacher_id'], teacher_id)

    @patch('course_model.UserModel')
    @patch('course_model.Session')
    def test_find_course_by_id(self, mock_session, mock_user_model):
        # Mock session and its methods
        mock_query = MagicMock()
        mock_session.return_value.query.return_value.filter_by.return_value.first.return_value = MagicMock()
        mock_session.return_value.query.return_value.scalar.return_value = 'teacher@example.com'

        # Mock data
        course_id = str(uuid.uuid4())  # Generate a random UUID string

        # Call the find_course_by_id function
        course_data = find_course_by_id(course_id)

        # Assertions
        self.assertIsNotNone(course_data)
        self.assertIn('name', course_data)
        self.assertIn('teacher_id', course_data)
        self.assertIn('teacher_email', course_data)

    @patch('course_model.UserModel')
    @patch('course_model.Session')
    def test_find_courses_by_teacher_id(self, mock_session, mock_user_model):
        # Mock session and its methods
        mock_query = MagicMock()
        mock_session.return_value.query.return_value.filter_by.return_value.all.return_value = [MagicMock()]
        mock_session.return_value.query.return_value.scalar.return_value = 'teacher@example.com'

        # Mock data
        teacher_id = '1'  # Assuming teacher_id is a string for testing purposes

        # Call the find_courses_by_teacher_id function
        courses_data = find_courses_by_teacher_id(teacher_id)

        # Assertions
        self.assertIsNotNone(courses_data)
        for course_data in courses_data:
            self.assertIn('id', course_data)
            self.assertIn('name', course_data)
            self.assertIn('teacher_id', course_data)
            self.assertIn('teacher_email', course_data)

    @patch('course_model.UserModel')
    @patch('course_model.Session')
    def test_delete_course(self, mock_session, mock_user_model):
        # Mock session and its methods
        mock_query = MagicMock()
        mock_session.return_value.query.return_value.filter_by.return_value.first.return_value = MagicMock()
        mock_session.return_value.delete = MagicMock()
        mock_session.return_value.commit = MagicMock()

        # Mock data
        course_id = str(uuid.uuid4())  # Generate a random UUID string

        # Call the delete function
        delete(course_id)

        # Assertions
        mock_session.return_value.delete.assert_called_once()


if __name__ == '__main__':
    unittest.main()
