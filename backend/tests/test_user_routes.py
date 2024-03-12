import json
import os
import sys
import unittest

from main import app

backend_path = os.path.abspath(os.path.join(os.path.dirname(__file__), '..'))
sys.path.append(backend_path)


class TestUserRoutes(unittest.TestCase):

    def setUp(self):
        app.testing = True
        self.app = app.test_client()

    def test_register_route(self):
        response = self.app.post('/api/user/register',
                                 json={'firstName': 'Test', 'lastName': 'Register', 'email': 'test@register.com',
                                       'password': 'asd123!'})
        if response.status_code == 409:
            self.assertEqual(response.status_code, 409)
        else:
            self.assertEqual(response.status_code, 201)
            decoded_token = response.data.decode('utf-8')
            decoded_token = json.loads(decoded_token)['token']

            self.app.delete('/api/user/delete', headers={'Authorization': f'Bearer {decoded_token}'})

    def test_login_route(self):
        self.app.post('/api/user/register',
                      json={'firstName': 'Test', 'lastName': 'Login', 'email': 'test@login.fi',
                            'password': 'asd123!'})
        response = self.app.post('/api/user/login', json={'email': 'test@login.fi',
                                                          'password': 'asd123!'})
        decoded_token = response.data.decode('utf-8')
        decoded_token = json.loads(decoded_token)['token']
        self.assertEqual(response.status_code, 200)

        self.app.delete('/api/user/delete', headers={'Authorization': f'Bearer {decoded_token}'})

    def test_update_route(self):
        self.app.post('/api/user/register',
                      json={'firstName': 'Test', 'lastName': 'Update', 'email': 'test@update.fi',
                            'password': 'asd123!'})

        response = self.app.post('/api/user/login', json={'email': 'test@update.fi',
                                                          'password': 'asd123!'})

        decoded_token = response.data.decode('utf-8')
        decoded_token = json.loads(decoded_token)['token']

        response_update = self.app.put('/api/user/update',
                                       json={'firstName': 'Test', 'lastName': 'Update', 'email': 'test@update.fi',
                                             'password': 'asd123'},
                                       headers={'Authorization': f'Bearer {decoded_token}'})

        if response_update.status_code == 400:
            self.assertEqual(response_update.status_code, 400)
        else:
            self.assertEqual(response_update.status_code, 200)
        self.app.delete('/api/user/delete', headers={'Authorization': f'Bearer {decoded_token}'})

    def test_profile_route(self):
        self.app.post('/api/user/register',
                      json={'firstName': 'Test', 'lastName': 'Profile', 'email': 'test@profile.fi',
                            'password': 'asd123!'})

        response = self.app.post('/api/user/login', json={'email': 'test@profile.fi', 'password': 'asd123!'})
        decoded_token = response.data.decode('utf-8')
        decoded_token = json.loads(decoded_token)['token']

        response = self.app.get('/api/user/profile', headers={'Authorization': f'Bearer {decoded_token}'})
        self.assertEqual(response.status_code, 200)
        self.app.delete('/api/user/delete', headers={'Authorization': f'Bearer {decoded_token}'})

    def test_delete_route(self):
        self.app.post('/api/user/register',
                      json={'firstName': 'Test', 'lastName': 'Delete', 'email': 'test@delete.fi',
                            'password': 'asd123!'})

        response = self.app.post('/api/user/login', json={'email': 'test@delete.fi', 'password': 'asd123!'})
        decoded_token = response.data.decode('utf-8')
        decoded_token = json.loads(decoded_token)['token']

        response_delete = self.app.delete('/api/user/delete', headers={'Authorization': f'Bearer {decoded_token}'})
        self.assertEqual(response_delete.status_code, 204)


if __name__ == '__main__':
    unittest.main()
