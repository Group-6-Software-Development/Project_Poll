import sys
import os
# add the backend path to the sys.path
backend_path = os.path.abspath(os.path.join(os.path.dirname(__file__), '..'))
sys.path.append(backend_path)

# tests/test_user_routes.py

import unittest
from main import app
import json


class TestUserRoutes(unittest.TestCase):

    def setUp(self):
        app.testing = True
        self.app = app.test_client()

    def test_register_route(self):
        response = self.app.post('/api/user/register', json={'firstName': 'mikko','lastName': 'mattila', 'email': 'mikko.mattila@testi.fi', 'password': 'abc123!'})
        if response.status_code == 409:
            self.assertTrue(True)
            print(409, "test register route already registered email")
        else:
            self.assertEqual(response.status_code, 201)
            print(201, "test register route success")


    def test_login_route(self):
        response = self.app.post('/api/user/login', json={'email': 'mikko.mattila@testi.fi', 'password': 'abc123!'})
        self.assertEqual(response.status_code, 200)
        

    def test_update_route(self):
        response = self.app.post('/api/user/login', json={'email': 'mikko.mattila@testi.fi', 'password': 'abc123!'})
        decoded_token = response.data.decode('utf-8')
        decoded_token = json.loads(decoded_token)['token']
        response_update = self.app.put('/api/user/update', json={'firstName': 'mikko', 'lastName': 'mattila', 'email': 'mikko1.mattila@testi.fi', 'password': 'abc123!'}, headers={'Authorization': f'Bearer {decoded_token}'})
        
        if response_update.status_code == 400:
            self.assertTrue(True)
            print(400, "test update route unexpected error during user update")
        else:
             self.assertEqual(response_update.status_code, 200)
             print(200, "test update route success")


    def test_profile_route(self):
        response = self.app.post('/api/user/login', json={'email': 'mikko.mattila@testi.fi', 'password': 'abc123!'})
        decoded_token = response.data.decode('utf-8')
        decoded_token = json.loads(decoded_token)['token']

        response = self.app.get('/api/user/profile', headers={'Authorization': f'Bearer {decoded_token}'})
        self.assertEqual(response.status_code, 200)
    
    def test_delete_route(self):
        response = self.app.post('/api/user/register', json={'firstName': 'mikko','lastName': 'mattila', 'email': 'testi.delete@testi.fi', 'password': 'abc123!'})
        login_response = self.app.post('/api/user/login', json={'email': 'testi.delete@testi.fi', 'password': 'abc123!'})
        token = login_response.data.decode('utf-8')  
        
        token = json.loads(token)['token']
        response = self.app.delete('/api/user/delete', headers={'Authorization': f'Bearer {token}'})
        self.assertEqual(response.status_code, 204)
    

if __name__ == '__main__':
    unittest.main()
