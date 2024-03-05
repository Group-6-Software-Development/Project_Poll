import sys
import os

backend_path = os.path.abspath(os.path.join(os.path.dirname(__file__), '..'))
sys.path.append(backend_path)

project_path = os.path.abspath(os.path.join(backend_path, '..'))
sys.path.append(project_path)

from review_controller import create_review, get_reviews
import unittest
from unittest.mock import patch

class TestReviewController(unittest.TestCase):
    def setUp(self):
        # Create a mock request object
        self.mock_request = unittest.mock.MagicMock()

    def test_create_review_success(self):
        # Test creating a review successfully
        data = {'course_id': '123e4567-e89b-12d3-a456-426614174000', 'rating': 4, 'comment': 'Great course!'}
        self.mock_request.get_json.return_value = data

        with patch('review_controller.request', self.mock_request):
            with patch('review_controller.create') as mock_create:
                mock_create.return_value = {'id': 1, 'course_id': '123e4567-e89b-12d3-a456-426614174000', 'rating': 4, 'comment': 'Great course!'}  # Mock the return value of the create function
                review, status_code = create_review()
                self.assertEqual(status_code, 200)  # Check if the status code is 200
                self.assertEqual(review['rating'], 4)  # Check if the correct rating is returned

    def test_create_review_invalid_request(self):
        # Test creating a review with invalid request data
        self.mock_request.get_json.return_value = {}  # Missing required fields

        with patch('review_controller.request', self.mock_request):
            review, status_code = create_review()
            self.assertEqual(status_code, 400)  # Check if the status code is 400

    def test_get_reviews_success(self):
        # Test getting reviews for a course successfully
        course_id = '123e4567-e89b-12d3-a456-426614174000'

        with patch('review_controller.uuid.UUID', side_effect=lambda x: x):  # Mock UUID conversion
            reviews = [{'id': 1, 'course_id': course_id, 'rating': 4, 'comment': 'Great course!'}]

            with patch('review_controller.find_all_reviews_by_course_id') as mock_find_reviews:
                mock_find_reviews.return_value = reviews  # Mock the return value of the find_all_reviews_by_course_id function
                reviews, status_code = get_reviews(course_id)
                self.assertEqual(status_code, 200)  # Check if the status code is 200
                self.assertEqual(len(reviews), 1)  # Check if the correct number of reviews is returned

    def test_get_reviews_invalid_request(self):
        # Test getting reviews with invalid course ID
        course_id = None

        with patch('review_controller.uuid.UUID', side_effect=lambda x: x):  # Mock UUID conversion
            reviews, status_code = get_reviews(course_id)
            self.assertEqual(status_code, 400)  # Check if the status code is 400

if __name__ == '__main__':
    unittest.main()
