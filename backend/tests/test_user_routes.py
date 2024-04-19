import json
import os
import sys
import unittest

backend_path = os.path.abspath(os.path.join(os.path.dirname(__file__), '..'))
sys.path.append(backend_path)

from main import app


class TestUserRoutes(unittest.TestCase):

    def setUp(self):
        app.testing = True
        self.app = app.test_client()

    def register_func(self, first_name, last_name, email, password):
        return self.app.post('/api/user/register',
                             json={'firstName': first_name, 'lastName': last_name, 'email': email,
                                   'password': password})

    def login_func(self, email, password):
        return self.app.post('/api/user/login', json={'email': email, 'password': password})

    def update_func(self, first_name, last_name, email, password, token):
        return self.app.put('/api/user/update',
                            json={'firstName': first_name, 'lastName': last_name, 'email': email, 'password': password},
                            headers={'Authorization': f'Bearer {token}'})

    def test_register_route(self):
        response = self.register_func('Test', 'Register', 'test.register@test.fi', 'asd123!')
        self.assertEqual(response.status_code, 201)

    def test_register_route_bad_request(self):
        response = self.app.post('/api/user/register', json={'firstName': 'Test', 'lastName': 'Register'})
        self.assertEqual(response.status_code, 400)

    def test_register_route_conflict(self):
        response = self.register_func('Test', 'Register', 'test.register@test.fi', 'asd123!')
        self.assertEqual(response.status_code, 409)

    def test_login_route(self):
        self.register_func('Test', 'Login', 'test.login@test.fi', 'asd123!')
        response = self.login_func('test.login@test.fi', 'asd123!')
        self.assertEqual(response.status_code, 200)

    def test_login_route_bad_request(self):
        self.register_func('Test', 'Login', 'test.login@bad_request.fi', 'asd123!')
        response = self.app.post('/api/user/login', json={'password': 'asd123!'})
        self.assertEqual(response.status_code, 400)

    def test_login_route_unautorized(self):
        self.register_func('Test', 'Login', 'test.login@unauthorized.fi', 'asd123!')
        response = self.login_func('test.login@unauthorized-fail.fi', 'asd123')
        self.assertEqual(response.status_code, 401)

    def test_update_route(self):
        self.register_func('Test', 'Update', 'test.update@test.fi', 'asd123!')

        response = self.login_func('test.update@test.fi', 'asd123!')

        decoded_token = response.data.decode('utf-8')
        decoded_token = json.loads(decoded_token)['token']

        response_update = self.update_func('Test', 'Update', 'test.update@test.fi', 'asd123', decoded_token)
        self.assertEqual(response_update.status_code, 200)

    def test_update_route_unauthorized(self):
        self.register_func('Test', 'Update', 'test.update@unauthorized.fi', 'asd123!')

        response = self.login_func('test.update@unauthorized.fi', 'asd123!')

        decoded_token = response.data.decode('utf-8')
        decoded_token = json.loads(decoded_token)['token']
        decoded_token = decoded_token + "invalid"

        response_update = self.update_func('Test', 'Update', 'test.update@unauthorized-fail.fi', 'asd123!',
                                           decoded_token)
        print(response_update.json)
        self.assertEqual(response_update.status_code, 401)

    def test_update_route_bad_request(self):
        self.register_func('Test', 'Update', 'test.update@bad_request.fi', 'asd123!')
        response = self.login_func('test.update@bad_request.fi', 'asd123!')

        decoded_token = response.data.decode('utf-8')
        decoded_token = json.loads(decoded_token)['token']

        response_update = self.app.put('/api/user/update', json={'firstName': 'Test', 'lastName': 'Update',
                                                                 'email': 'test.update@bad_request.fi'},
                                       headers={'Authorization': f'Bearer {decoded_token}'})
        self.assertEqual(response_update.status_code, 400)

    def test_profile_route(self):
        response = self.register_func('Test', 'Profile', 'test.get_profile@test.fi', 'asd123!')
        decoded_token = response.data.decode('utf-8')
        decoded_token = json.loads(decoded_token)['token']

        response = self.app.get('/api/user/profile', headers={'Authorization': f'Bearer {decoded_token}'})
        self.assertEqual(response.status_code, 200)

    def test_profile_route_unauthorized(self):
        response = self.register_func('Test', 'Profile', 'test.get_profile@unauthorized.fi', 'asd123!')
        decoded_token = response.data.decode('utf-8')
        decoded_token = json.loads(decoded_token)['token']
        decoded_token = decoded_token + "invalid"
        print(decoded_token)

        response = self.app.get('/api/user/profile', headers={'Authorization': f'Bearer {decoded_token}'})
        print(response.json)
        self.assertEqual(response.status_code, 401)

    def test_delete_route(self):
        self.register_func('Test', 'Delete', 'test.delete@test.fi', 'asd123!')

        response = self.login_func('test.delete@test.fi', 'asd123!')
        decoded_token = response.data.decode('utf-8')
        decoded_token = json.loads(decoded_token)['token']

        response_delete = self.app.delete('/api/user/delete', headers={'Authorization': f'Bearer {decoded_token}'})
        self.assertEqual(response_delete.status_code, 204)

    def test_delete_route_unauthorized(self):
        self.register_func('Test', 'Delete', 'test.delete@unauthorized.fi', 'asd123!')

        response = self.login_func('test.delete@unauthorized.fi', 'asd123!')
        decoded_token = response.data.decode('utf-8')
        decoded_token = json.loads(decoded_token)['token']
        decoded_token = decoded_token + "invalid"
        print(decoded_token)

        response_delete = self.app.delete('/api/user/delete', headers={
            'Authorization': f'Bearer {decoded_token}'})
        print(response_delete.json)
        self.assertEqual(response_delete.status_code, 401)
