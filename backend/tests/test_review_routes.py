import sys
import os
import json
# add the backend path to the sys.path
backend_path = os.path.abspath(os.path.join(os.path.dirname(__file__), '..'))
sys.path.append(backend_path)

import unittest
from main import app

class TestReviewRoutes(unittest.TestCase):

    def setUp(self):
        app.testing = True
        self.app = app.test_client()

    def test_create_review_route(self):
        response = self.app.post('/api/user/login', json={'email': 'mikko.mattila@testi.fi', 'password': 'abc123!'})
        decoded_token = response.data.decode('utf-8')
        decoded_token = json.loads(decoded_token)['token']

        response_get_courses = self.app.get('/api/course/courses', headers={'Authorization': f'Bearer {decoded_token}'})
        print(response_get_courses.json)
        course_id = response_get_courses.json[0]['uuid']
        course_id_str = str(course_id)
        
        review_response = self.app.post(f'/api/review/create', json={'courseUUID': course_id_str, 'rating': 5, 'comment': 'Great course!'})
        self.assertEqual(review_response.status_code, 201)

    def test_get_reviews_route(self):
        response = self.app.post('/api/user/login', json={'email': 'mikko.mattila@testi.fi', 'password': 'abc123!'})
        decoded_token = response.data.decode('utf-8')
        decoded_token = json.loads(decoded_token)['token']
        
        response_get_courses = self.app.get('/api/course/courses', headers={'Authorization': f'Bearer {decoded_token}'})
        course_id = response_get_courses.json[0]['uuid']
        course_id_str = str(course_id)

        response = self.app.get(f'/api/review/reviews/{course_id}', headers={'Authorization': f'Bearer {decoded_token}'})
        
        self.assertEqual(response.status_code, 200)

    

if __name__ == '__main__':
    unittest.main()

