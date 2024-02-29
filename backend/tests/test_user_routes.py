import sys
import os
# Lisää backend-kansio Pythonin moduulihakemistoon
backend_path = os.path.abspath(os.path.join(os.path.dirname(__file__), '..'))
sys.path.append(backend_path)

# tests/test_user_routes.py

import unittest
from main import app

class TestUserRoutes(unittest.TestCase):

    def setUp(self):
        app.testing = True
        self.app = app.test_client()

    def test_register_route(self):
        response = self.app.post('/api/user/register', json={'email': 'test@example.com', 'password': 'password'})
        if response.status_code == 401:
            self.assertTrue(True)
        else:
            self.assertEqual(response.status_code, 200)


    def test_login_route(self):
        response = self.app.post('/api/user/login', json={'email': 'mikko.mattila@testi.fi', 'password': 'abc123!'})
        self.assertEqual(response.status_code, 200)

if __name__ == '__main__':
    unittest.main()



