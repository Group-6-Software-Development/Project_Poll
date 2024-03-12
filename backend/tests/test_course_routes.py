import json
import os
import sys
import unittest

from main import app

backend_path = os.path.abspath(os.path.join(os.path.dirname(__file__), '..'))
sys.path.append(backend_path)


class TestCourseRoutes(unittest.TestCase):

    def setUp(self):
        app.testing = True
        self.app = app.test_client()

    def test_create_course_route(self):
        response = self.app.post('/api/user/register',
                                 json={'firstName': 'Test', 'lastName': 'Course_Create',
                                       'email': 'test@course_create.com',
                                       'password': 'asd123!'})

        decoded_token = response.data.decode('utf-8')
        decoded_token = json.loads(decoded_token)['token']

        response_create_course = self.app.post('/api/course/create',
                                               json={
                                                   'courseID': 'TX00EY27-3004',
                                                   'courseName': 'Ohjelmistotuotantoprojekti 1',
                                                   'startDate': '18.1.2024',
                                                   'endDate': '15.3.2024'
                                               },
                                               headers={'Authorization': f'Bearer {decoded_token}'})

        self.assertEqual(response_create_course.status_code, 201)
        response_create_course = response_create_course.json
        uuid = response_create_course.get('uuid')

        self.app.delete('/api/course/delete/' + uuid, headers={'Authorization': f'Bearer {decoded_token}'})
        self.app.delete('/api/user/delete', headers={'Authorization': f'Bearer {decoded_token}'})

    def test_get_courses_route(self):
        response = self.app.post('/api/user/register',
                                 json={'firstName': 'Test', 'lastName': 'Courses_Get',
                                       'email': 'test@courses_get.com',
                                       'password': 'asd123!'})
        decoded_token = response.data.decode('utf-8')

        decoded_token = json.loads(decoded_token)['token']

        response_get_courses = self.app.get('/api/course/courses', headers={'Authorization': f'Bearer {decoded_token}'})

        self.assertEqual(response_get_courses.status_code, 200)

        self.app.delete('/api/user/delete', headers={'Authorization': f'Bearer {decoded_token}'})

    def test_get_course_route(self):
        response = self.app.post('/api/user/register',
                                 json={'firstName': 'Test', 'lastName': 'Course_Get',
                                       'email': 'test@course_get.com',
                                       'password': 'asd123!'})
        decoded_token = response.data.decode('utf-8')

        decoded_token = json.loads(decoded_token)['token']

        response_create_course = self.app.post('/api/course/create',
                                               json={
                                                   'courseID': 'TX00EY27-3004',
                                                   'courseName': 'Ohjelmistotuotantoprojekti 1',
                                                   'startDate': '18.1.2024',
                                                   'endDate': '15.3.2024'
                                               },
                                               headers={'Authorization': f'Bearer {decoded_token}'})

        response_get_courses = self.app.get('/api/course/courses', headers={'Authorization': f'Bearer {decoded_token}'})
        course_id = response_get_courses.json[0]['uuid']
        response_get_course = self.app.get(f'/api/course/{course_id}',
                                           headers={'Authorization': f'Bearer {decoded_token}'})

        self.assertEqual(response_get_course.status_code, 200)
        response_create_course = response_create_course.json
        uuid = response_create_course.get('uuid')

        self.app.delete('/api/course/delete/' + uuid, headers={'Authorization': f'Bearer {decoded_token}'})
        self.app.delete('/api/user/delete', headers={'Authorization': f'Bearer {decoded_token}'})

    def test_update_course_route(self):
        response = self.app.post('/api/user/register',
                                 json={'firstName': 'Test', 'lastName': 'Course_Update',
                                       'email': 'test@course_update.com',
                                       'password': 'asd123!'})

        decoded_token = response.data.decode('utf-8')
        decoded_token = json.loads(decoded_token)['token']

        self.app.post('/api/course/create',
                      json={
                          'courseID': 'TX00EY27-3004',
                          'courseName': 'Ohjelmistotuotantoprojekti 1',
                          'startDate': '18.1.2024',
                          'endDate': '15.3.2024'
                      },
                      headers={'Authorization': f'Bearer {decoded_token}'})

        response_get_courses = self.app.get('/api/course/courses', headers={'Authorization': f'Bearer {decoded_token}'})
        course_uuid = response_get_courses.json[0]['uuid']

        new_course_data = {
            'courseID': 'TX00EY27-3004',
            'courseName': 'Ohjelmistotuotantoprojekti 1',
            'startDate': '18.1.2024',
            'endDate': '15.3.2024'
        }
        response = self.app.put(f'/api/course/update/{course_uuid}', json=new_course_data,
                                headers={'Authorization': f'Bearer {decoded_token}'})

        self.assertEqual(response.status_code, 200)

        self.app.delete('/api/course/delete/' + course_uuid, headers={'Authorization': f'Bearer {decoded_token}'})
        self.app.delete('/api/user/delete', headers={'Authorization': f'Bearer {decoded_token}'})

    def test_delete_course_route(self):
        response = self.app.post('/api/user/register',
                                 json={'firstName': 'Test', 'lastName': 'Course_Delete',
                                       'email': 'test@course_delete.com',
                                       'password': 'asd123!'})
        decoded_token = response.data.decode('utf-8')

        decoded_token = json.loads(decoded_token)['token']

        course_response = self.app.post('/api/course/create',
                                        json={
                                            'courseID': 'TX00EY27-3004',
                                            'courseName': 'Ohjelmistotuotantoprojekti 1',
                                            'startDate': '18.1.2024',
                                            'endDate': '15.3.2024'
                                        },
                                        headers={'Authorization': f'Bearer {decoded_token}'})
        course_response = course_response.json
        uuid = course_response.get('uuid')

        response = self.app.delete('/api/course/delete/' + uuid, headers={'Authorization': f'Bearer {decoded_token}'})
        self.assertEqual(response.status_code, 204)
        self.app.delete('/api/user/delete', headers={'Authorization': f'Bearer {decoded_token}'})


if __name__ == '__main__':
    unittest.main()
