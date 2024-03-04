import sys
import os
import unittest
from unittest.mock import patch, MagicMock

# Add the backend directory to the Python module search path
backend_path = os.path.abspath(os.path.join(os.path.dirname(__file__), '..'))
sys.path.append(backend_path)

# Import the ReviewModel class and related functions from review_model.py
from review_model import ReviewModel, create, find_all_reviews_by_course_id

# Mock CourseModel class and related functions
from models.course_model import CourseModel

class TestReviewModel(unittest.TestCase):
    @patch('review_model.Session')
    @patch('models.course_model.Session')
    def test_create_review(self, mock_review_session, mock_course_session):
        # Mock session and its methods for ReviewModel and CourseModel
        mock_review_add = MagicMock()
        mock_review_session.return_value.add = mock_review_add
        mock_review_commit = MagicMock()
        mock_review_session.return_value.commit = mock_review_commit
        
        mock_course_add = MagicMock()
        mock_course_session.return_value.add = mock_course_add
        mock_course_commit = MagicMock()
        mock_course_session.return_value.commit = mock_course_commit

        # Mock data
        course_id = '123e4567-e89b-12d3-a456-426614174000'  # Mock course_id as string for testing purposes
        rating = 5
        comment = 'Great course!'

        # Call the create function
        review_data = create(course_id, rating, comment)

        # Assertions
        self.assertIsNotNone(review_data)
        self.assertEqual(review_data['course_id'], course_id)
        self.assertEqual(review_data['rating'], rating)
        self.assertEqual(review_data['comment'], comment)

    @patch('review_model.Session')
    def test_find_all_reviews_by_course_id(self, mock_session):
        # Mock session and its methods for ReviewModel
        mock_query = MagicMock()
        mock_session.return_value.query.return_value.filter_by.return_value.all.return_value = [
            ReviewModel(course_id='123e4567-e89b-12d3-a456-426614174000', rating=5, comment='Great course!')
        ]

        # Mock data
        course_id = '123e4567-e89b-12d3-a456-426614174000'  # Mock course_id as string for testing purposes

        # Call the find_all_reviews_by_course_id function
        reviews_data = find_all_reviews_by_course_id(course_id)

        # Assertions
        self.assertIsNotNone(reviews_data)
        self.assertEqual(len(reviews_data), 1)
        self.assertEqual(reviews_data[0]['course_id'], course_id)
        self.assertEqual(reviews_data[0]['rating'], 5)
        self.assertEqual(reviews_data[0]['comment'], 'Great course!')


if __name__ == '__main__':
    unittest.main()
