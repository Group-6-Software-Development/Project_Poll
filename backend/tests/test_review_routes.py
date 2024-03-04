import sys
import os
# add the backend path to the sys.path
backend_path = os.path.abspath(os.path.join(os.path.dirname(__file__), '..'))
sys.path.append(backend_path)

import unittest
from main import app

class TestReviewRoutes(unittest.TestCase):

    def setUp(self):
        app.testing = True
        self.app = app.test_client()

    def test_create_route(self):
        response = self.app.post('/api/review/create', json={'course_id': 'COURSE_ID', 'review_text': 'This is a review.'})
        self.assertEqual(response.status_code, 200)

    def test_reviews_route(self):
        response = self.app.get('/api/review/reviews/COURSE_ID')
        self.assertEqual(response.status_code, 200)

if __name__ == '__main__':
    unittest.main()
