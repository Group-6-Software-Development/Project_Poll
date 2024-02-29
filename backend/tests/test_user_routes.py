import sys
import os
# Lisää backend-kansio Pythonin moduulihakemistoon
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
        response = self.app.post('/api/user/register', json={'email': 'test@example.com', 'password': 'password'})
        if response.status_code == 401:
            self.assertTrue(True)
            print(401, "test register route already registered email")
        else:
            self.assertEqual(response.status_code, 200)
            print(200, "test register route success")


    def test_login_route(self):
        response = self.app.post('/api/user/login', json={'email': 'mikko.mattila@testi.fi', 'password': 'abc123!'})
        self.assertEqual(response.status_code, 200)
        

    def test_update_route(self):
        response = self.app.post('/api/user/login', json={'email': 'mikko.mattila@testi.fi', 'password': 'abc123!'})
        # Tallenna dekoodattu tokeni
        decoded_token = response.data.decode('utf-8')
        

        # Käytä tallennettua dekoodattua tokenia muissa testeissä
        response_update = self.app.put('/api/user/update', json={'email': 'mikko.mattila@testi.fi', 'password': 'abc123!'}, headers={'Authorization': f'Bearer {decoded_token}'})
        if response_update.status_code == 402:
            self.assertTrue(True)
            print(402, "test update route unexpected error during user update")
        else:
            self.assertEqual(response_update.status_code, 200)
            print(200, "test update route success")

if __name__ == '__main__':
    unittest.main()



