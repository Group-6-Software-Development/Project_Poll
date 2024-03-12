import json
import os
import sys
import unittest

from main import app

backend_path = os.path.abspath(os.path.join(os.path.dirname(__file__), '..'))
sys.path.append(backend_path)


class TestLectureRoutes(unittest.TestCase):

    def setUp(self):
        app.testing = True
        self.app = app.test_client()

    def test_create_lecture(self):
        register_response = self.app.post('/api/user/register', json={
            'firstName': 'Test',
            'lastName': 'Lecture_Create',
            'email': 'test@lecture_create.fi',
            'password': 'asd123!'
        })
        decoded_token = register_response.data.decode('utf-8')
        decoded_token = json.loads(decoded_token)['token']

        response_create_course = self.app.post('/api/course/create',
                                               json={
                                                   'courseID': 'TX00EY27-3004',
                                                   'courseName': 'Ohjelmistotuotantoprojekti 1',
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

        self.assertEqual(response_create_lecture.status_code, 201)

    def test_get_lecture(self):
        register_response = self.app.post('/api/user/register', json={
            'firstName': 'Test',
            'lastName': 'Lecture_Get',
            'email': 'test@lecture_get.fi',
            'password': 'asd123!'
        })

        decoded_token = register_response.data.decode('utf-8')
        decoded_token = json.loads(decoded_token)['token']

        response_create_course = self.app.post('/api/course/create',
                                               json={
                                                   'courseID': 'TX00EY27-3005',
                                                   'courseName': 'Ohjelmistotuotantoprojekti 2',
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

        response_get_lecture = self.app.get(f'/api/lecture/{response_create_lecture.json["uuid"]}',
                                            headers={'Authorization': f'Bearer {decoded_token}'})

        self.assertEqual(response_get_lecture.status_code, 200)
        self.assertEqual(response_get_lecture.json['uuid'], response_create_lecture.json['uuid'])

    def test_get_lectures(self):
        register_response = self.app.post('/api/user/register', json={
            'firstName': 'Test',
            'lastName': 'Lecture_GetAll',
            'email': 'test@lecture_getall.fi',
            'password': 'asd123!'
        })
        decoded_token = register_response.data.decode('utf-8')
        decoded_token = json.loads(decoded_token)['token']

        response_create_course = self.app.post('/api/course/create',
                                               json={
                                                   'courseID': 'TX00EY27-3006',
                                                   'courseName': 'Ohjelmistotuotantoprojekti 3',
                                                   'startDate': '18.1.2024',
                                                   'endDate': '15.3.2024'
                                               },
                                               headers={'Authorization': f'Bearer {decoded_token}'})

        self.app.post('/api/lecture/create',
                      json={
                          'lectureDate': '18.1.2024',
                          'courseUUID': response_create_course.json['uuid']
                      },
                      headers={'Authorization': f'Bearer {decoded_token}'})

        response_get_lectures = self.app.get(f'/api/lectures/{response_create_course.json['uuid']}',
                                             headers={'Authorization': f'Bearer {decoded_token}'})

        self.assertEqual(response_get_lectures.status_code, 200)


if __name__ == '__main__':
    unittest.main()
