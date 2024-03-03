import unittest
from unittest.mock import patch, MagicMock
from models.course_model import create, update, find_course_by_id, find_courses_by_teacher_id, delete
from models.course_model import CourseModel
from models.user_model import UserModel


class TestCourseModel(unittest.TestCase):
    @patch('models.course_model.Session')
    def test_create_course(self, mock_session):
        # Mock session and its methods
        mock_add = MagicMock()
        mock_session.return_value.add = mock_add
        mock_commit = MagicMock()
        mock_session.return_value.commit = mock_commit

        # Mock data
        name = 'Math'
        teacher_id = '1'  # Assuming teacher_id is a string for testing purposes

        # Call the create function
        course_data = create(name, teacher_id)

        # Assertions
        self.assertIsNotNone(course_data)
        self.assertEqual(course_data['name'], name)
        self.assertEqual(course_data['teacher_id'], teacher_id)

    @patch('models.course_model.Session')
    def test_update_course(self, mock_session):
        # Mock session and its methods
        mock_query = MagicMock()
        mock_session.return_value.query.return_value.filter_by.return_value.first.return_value = CourseModel()
        mock_session.return_value.commit = MagicMock()

        # Mock data
        course_id = '1'  # Assuming course_id is a string for testing purposes
        name = 'Physics'
        teacher_id = '2'  # Assuming teacher_id is a string for testing purposes

        # Call the update function
        course_data = update(course_id, name, teacher_id)

        # Assertions
        self.assertIsNotNone(course_data)
        self.assertEqual(course_data['name'], name)
        self.assertEqual(course_data['teacher_id'], teacher_id)

    @patch('models.course_model.Session')
    def test_find_course_by_id(self, mock_session):
        # Mock session and its methods
        mock_query = MagicMock()
        mock_session.return_value.query.return_value.filter_by.return_value.first.return_value = CourseModel()
        mock_session.return_value.query.return_value.scalar.return_value = 'teacher@example.com'

        # Mock data
        course_id = '1'  # Assuming course_id is a string for testing purposes

        # Call the find_course_by_id function
        course_data = find_course_by_id(course_id)

        # Assertions
        self.assertIsNotNone(course_data)
        self.assertIn('name', course_data)
        self.assertIn('teacher_id', course_data)
        self.assertIn('teacher_email', course_data)

    @patch('models.course_model.Session')
    def test_find_courses_by_teacher_id(self, mock_session):
        # Mock session and its methods
        mock_query = MagicMock()
        mock_session.return_value.query.return_value.filter_by.return_value.all.return_value = [CourseModel()]
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

    @patch('models.course_model.Session')
    def test_delete_course(self, mock_session):
        # Mock session and its methods
        mock_query = MagicMock()
        mock_session.return_value.query.return_value.filter_by.return_value.first.return_value = CourseModel()
        mock_session.return_value.delete = MagicMock()
        mock_session.return_value.commit = MagicMock()

        # Mock data
        course_id = '1'  # Assuming course_id is a string for testing purposes

        # Call the delete function
        delete(course_id)

        # Assertions
        mock_session.return_value.delete.assert_called_once()


if __name__ == '__main__':
    unittest.main()
