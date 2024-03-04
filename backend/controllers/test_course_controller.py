import sys
import os

backend_path = os.path.abspath(os.path.join(os.path.dirname(__file__), '..'))
sys.path.append(backend_path)

project_path = os.path.abspath(os.path.join(backend_path, '..'))
sys.path.append(project_path)

from course_controller import create_course, update_course, get_course, get_courses, delete_course
import unittest
from unittest.mock import patch

class TestCourseController(unittest.TestCase):
    def setUp(self):
        # Create a mock request object with a decoded token
        self.mock_request = unittest.mock.MagicMock()
        self.mock_request.decoded_token = '123e4567-e89b-12d3-a456-426614174000'

    def test_create_course_success(self):
        # Test creating a course successfully
        data = {'name': 'Mathematics'}
        self.mock_request.get_json.return_value = data

        with patch('course_controller.request', self.mock_request):
            with patch('course_controller.create') as mock_create:
                mock_create.return_value = {'id': 1, 'name': 'Mathematics', 'teacher_id': '123e4567-e89b-12d3-a456-426614174000'}  # Mock the return value of the create function
                course, status_code = create_course()
                self.assertEqual(status_code, 200)  # Check if the status code is 200
                self.assertEqual(course['name'], 'Mathematics')  # Check if the correct course name is returned

    def test_create_course_invalid_request(self):
        # Test creating a course with invalid request data
        self.mock_request.get_json.return_value = {}  # Missing required fields

        with patch('course_controller.request', self.mock_request):
            course, status_code = create_course()
            self.assertEqual(status_code, 400)  # Check if the status code is 400

    def test_update_course_success(self):
        # Test updating a course successfully
        data = {'name': 'Physics'}
        course_id = '123e4567-e89b-12d3-a456-426614174000'
        self.mock_request.get_json.return_value = data

        with patch('course_controller.request', self.mock_request):
            with patch('course_controller.update') as mock_update:
                mock_update.return_value = {'id': 1, 'name': 'Physics', 'teacher_id': '123e4567-e89b-12d3-a456-426614174000'}  # Mock the return value of the update function
                course, status_code = update_course(course_id)
                self.assertEqual(status_code, 200)  # Check if the status code is 200
                self.assertEqual(course['name'], 'Physics')  # Check if the correct course name is returned

    def test_get_course_success(self):
        # Test getting a course successfully
        course_id = '123e4567-e89b-12d3-a456-426614174000'

        with patch('course_controller.request', self.mock_request):
            with patch('course_controller.find_course_by_id') as mock_find_course:
                mock_find_course.return_value = {'id': 1, 'name': 'Mathematics', 'teacher_id': '123e4567-e89b-12d3-a456-426614174000'}  # Mock the return value of the find_course_by_id function
                course, status_code = get_course(course_id)
                self.assertEqual(status_code, 200)  # Check if the status code is 200
                self.assertEqual(course['name'], 'Mathematics')  # Check if the correct course name is returned

    def test_get_course_invalid_request(self):
        # Test getting a course with invalid course ID
        course_id = None

        with patch('course_controller.request', self.mock_request):
            course, status_code = get_course(course_id)
            self.assertEqual(status_code, 400)  # Check if the status code is 400

    def test_get_courses_success(self):
        # Test getting all courses for a teacher successfully
        with patch('course_controller.request', self.mock_request):
            with patch('course_controller.find_courses_by_teacher_id') as mock_find_courses:
                mock_find_courses.return_value = [{'id': 1, 'name': 'Mathematics', 'teacher_id': '123e4567-e89b-12d3-a456-426614174000'}]  # Mock the return value of the find_courses_by_teacher_id function
                courses, status_code = get_courses()
                self.assertEqual(status_code, 200)  # Check if the status code is 200
                self.assertEqual(len(courses), 1)  # Check if the correct number of courses is returned

    def test_delete_course_success(self):
        # Test deleting a course successfully
        course_id = '123e4567-e89b-12d3-a456-426614174000'

        with patch('course_controller.request', self.mock_request):
            with patch('course_controller.delete') as mock_delete:
                mock_delete.return_value = None  # Mock the return value of the delete function
                response, status_code = delete_course(course_id)
                self.assertEqual(status_code, 200)  # Check if the status code is 200
                self.assertEqual(response['message'], 'Course deleted')  # Check if the correct message is returned

if __name__ == '__main__':
    unittest.main()
