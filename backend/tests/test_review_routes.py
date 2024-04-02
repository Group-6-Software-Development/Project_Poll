import json
import os
import sys
import unittest

backend_path = os.path.abspath(os.path.join(os.path.dirname(__file__), '..'))
sys.path.append(backend_path)

from main import app


class TestReviewRoutes(unittest.TestCase):

    def setUp(self):
        app.testing = True
        self.app = app.test_client()

    def test_create_review_route(self):
        register_response = self.app.post('/api/user/register', json={
            'firstName': 'Test',
            'lastName': 'Review_Create',
            'email': 'test@review_create.fi',
            'password': 'asd123!'
        })
        decoded_token = register_response.data.decode('utf-8')
        decoded_token = json.loads(decoded_token)['token']

        response_create_course = self.app.post('/api/course/create',
                                               json={
                                                   'courseID': 'TX00EY27-3010',
                                                   'courseName': 'Ohjelmistotuotantoprojekti 8',
                                                   'startDate': '18.1.2024',
                                                   'endDate': '15.3.2024'
                                               },
                                               headers={'Authorization': f'Bearer {decoded_token}'})

        response_create_lecture = self.app.post('/api/lecture/create',
                                                json={
                                                    'lectureDate': '18.1.2024',
                                                    'courseUUID': response_create_course.json['uuid']
                                                },
                                                headers={'Authorization': f'Bearer {decoded_token}'})

        response = self.app.post('/api/review/create',
                                 json={
                                     'lectureUUID': response_create_lecture.json['uuid'],
                                     'materialRating': 3,
                                     'understandingRating': 3,
                                     'comment': 'Great course!'
                                 },
                                 headers={'Authorization': f'Bearer {decoded_token}'})
        self.assertEqual(response.status_code, 201)

    def test_get_reviews(self):
        register_response = self.app.post('/api/user/register', json={
            'firstName': 'Test',
            'lastName': 'Reviews_Get',
            'email': 'test@reviews_get.fi',
            'password': 'asd123!'
        })

        decoded_token = register_response.data.decode('utf-8')
        decoded_token = json.loads(decoded_token)['token']

        response_create_course = self.app.post('/api/course/create',
                                               json={
                                                   'courseID': 'TX00EY27-3096',
                                                   'courseName': 'Ohjelmistotuotantoprojekti 78',
                                                   'startDate': '18.1.2024',
                                                   'endDate': '15.3.2024'
                                               },
                                               headers={'Authorization': f'Bearer {decoded_token}'})

        response_create_lecture = self.app.post('/api/lecture/create',
                                                json={
                                                    'lectureDate': '18.1.2024',
                                                    'courseUUID': response_create_course.json['uuid']
                                                },
                                                headers={'Authorization': f'Bearer {decoded_token}'})

        self.app.post('/api/review/create',
                      json={
                          'lectureUUID': response_create_lecture.json['uuid'],
                          'materialRating': 3,
                          'understandingRating': 3,
                          'comment': 'Great course!'
                      },
                      headers={'Authorization': f'Bearer {decoded_token}'})

        response = self.app.get(f'/api/review/reviews/{response_create_lecture.json["uuid"]}',
                                headers={'Authorization': f'Bearer {decoded_token}'})

        self.assertEqual(response.status_code, 200)


if __name__ == '__main__':
    unittest.main()
