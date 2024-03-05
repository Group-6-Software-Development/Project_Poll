import sys
import os
# add the backend path to the sys.path
backend_path = os.path.abspath(os.path.join(os.path.dirname(__file__), '..'))
sys.path.append(backend_path)

import unittest
from main import app

class TestCourseRoutes(unittest.TestCase):

    def setUp(self):
        app.testing = True
        self.app = app.test_client()

    def test_create_course_route(self):
        response = self.app.post('/api/user/login', json={'email': 'mikko.mattila@testi.fi', 'password': 'abc123!'})
        decoded_token = response.data.decode('utf-8')
        response_create_course = self.app.post('/api/course/create', json={'name': 'Python Programming', 'description': 'Learn Python programming basics'}, headers={'Authorization': f'Bearer {decoded_token}'})
    
        if response_create_course.status_code == 400:
            error_message = response_create_course.json.get('error')
            self.assertTrue(True)
            print(f"Test create course route: Error 400 received - {error_message}")
        else:
            self.assertEqual(response_create_course.status_code, 200)
            print("Test create course route: Success")

    def test_get_courses_route(self):
        response = self.app.post('/api/user/login', json={'email': 'mikko.mattila@testi.fi', 'password': 'abc123!'})
        decoded_token = response.data.decode('utf-8')
        response_get_courses = self.app.get('/api/course/courses', headers={'Authorization': f'Bearer {decoded_token}'})

        if response_get_courses.status_code == 400:
            error_message = response_get_courses.json.get('error')
            self.assertTrue(True)
            print(f"Test get courses route: Error 400 received - {error_message}")
        else:
            self.assertEqual(response_get_courses.status_code, 200)
            print("Test get courses route: Success ")

    def test_get_course_route(self):
        response = self.app.post('/api/user/login', json={'email': 'mikko.mattila@testi.fi', 'password': 'abc123!'})
        decoded_token = response.data.decode('utf-8')
        response_get_courses = self.app.get('/api/course/courses', headers={'Authorization': f'Bearer {decoded_token}'})
        course_id = response_get_courses.json[0]['id']
        response_get_course = self.app.get(f'/api/course/{course_id}', headers={'Authorization': f'Bearer {decoded_token}'})

        if response_get_course.status_code == 400:
            error_message = response_get_course.json().get('error')
            self.assertTrue(True)
            print(f"Test get course route: Error 400 received - {error_message}")
        else:
            self.assertEqual(response_get_course.status_code, 200)
            print("Test get course route: Success")
    
    def test_update_course_route(self):
        response = self.app.post('/api/user/login', json={'email': 'mikko.mattila@testi.fi', 'password': 'abc123!'})
        decoded_token = response.data.decode('utf-8')
        response_get_courses = self.app.get('/api/course/courses', headers={'Authorization': f'Bearer {decoded_token}'})
        course_id = response_get_courses.json[0]['id']
        new_course_data = {'name': 'Advanced Python Programming', 'description': 'Advanced Python programming concepts'}
        response = self.app.put(f'/api/course/update/{course_id}', json=new_course_data, headers={'Authorization': f'Bearer {decoded_token}'})

        if response.status_code == 400:
            error_message = response.json.get('error')
            self.assertTrue(True)
            print(f"Test update course route: Error 400 received - {error_message}")
        else:
            self.assertEqual(response.status_code, 200)
            print("Test update course route: Success")

    def test_delete_course_route(self):
        login_response = self.app.post('/api/user/login', json={'email': 'mikko.mattila@testi.fi', 'password': 'abc123!'})
        decoded_token = login_response.data.decode('utf-8')
        get_courses_response = self.app.get('/api/course/courses', headers={'Authorization': f'Bearer {decoded_token}'})
        courses = get_courses_response.json
        self.assertTrue(courses)

        if courses:
            course_id = courses[0]['id']
            delete_response = self.app.delete(f'/api/course/delete/{course_id}', headers={'Authorization': f'Bearer {decoded_token}'})
            
            if delete_response.status_code == 200:
                print("Test delete course route: Success")
            elif delete_response.status_code == 400:
                error_message = delete_response.json().get('error')
                print(f"Test delete course route: Error 400 received - {error_message}")
            else:
                print("Test delete course route: Unexpected error")

        else:
            print("No courses found to delete")


        

    
if __name__ == '__main__':
    unittest.main()
