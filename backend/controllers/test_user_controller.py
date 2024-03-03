import sys
import os
import unittest
from unittest.mock import patch, MagicMock

backend_path = os.path.abspath(os.path.join(os.path.dirname(__file__), '..'))
sys.path.append(backend_path)

project_path = os.path.abspath(os.path.join(backend_path, '..'))
sys.path.append(project_path)

from user_controller import (
    register_user,
    login_user,
    update_user,
    get_user,
    delete_user
)

class TestUserController(unittest.TestCase):
    def test_register_user_success(self):
        # Test registering a user successfully
        data = {'email': 'test@example.com', 'password': 'password123'}
        with patch('user_controller.signup') as mock_signup:
            mock_signup.return_value = {'id': 1}  # Mock the return value of the signup function
            token, status_code = register_user(data)
            self.assertEqual(status_code, 200)  # Check if the status code is 200
            self.assertIsInstance(token, str)   # Check if the token is a string

    def test_register_user_invalid_request(self):
        # Test registering a user with invalid request data
        data = {}  # Missing required fields
        token, status_code = register_user(data)
        self.assertEqual(status_code, 400)  # Check if the status code is 400

    def test_login_user_success(self):
        # Test logging in a user successfully
        data = {'email': 'test@example.com', 'password': 'password123'}
        with patch('user_controller.login') as mock_login:
            mock_login.return_value = {'id': 1}  # Mock the return value of the login function
            token, status_code = login_user(data)
            self.assertEqual(status_code, 200)  # Check if the status code is 200
            self.assertIsInstance(token, str)   # Check if the token is a string

    def test_update_user_success(self):
        # Test updating user information successfully
        data = {'email': 'new_email@example.com', 'password': 'new_password'}
        user_id = 1
        with patch('user_controller.update') as mock_update:
            mock_update.return_value = {'id': 1, 'email': 'new_email@example.com'}  # Mock the return value of the update function
            user_info, status_code = update_user(user_id, data)
            self.assertEqual(status_code, 200)  # Check if the status code is 200
            self.assertEqual(user_info['email'], 'new_email@example.com')  # Check if the email is updated

    def test_get_user_success(self):
        # Test getting user information successfully
        user_id = 1
        with patch('user_controller.find_user_by_id') as mock_find_user_by_id:
            mock_find_user_by_id.return_value = {'id': 1, 'email': 'test@example.com'}  # Mock the return value of the find_user_by_id function
            user_info, status_code = get_user(user_id)
            self.assertEqual(status_code, 200)  # Check if the status code is 200
            self.assertEqual(user_info['email'], 'test@example.com')  # Check if the correct user information is returned

    def test_delete_user_success(self):
        # Test deleting a user successfully
        user_id = 1
        with patch('user_controller.delete') as mock_delete:
            mock_delete.return_value = None  # Mock the return value of the delete function
            response, status_code = delete_user(user_id)
            self.assertEqual(status_code, 200)  # Check if the status code is 200
            self.assertEqual(response['message'], 'User deleted')  # Check if the correct message is returned

if __name__ == '__main__':
    unittest.main()
