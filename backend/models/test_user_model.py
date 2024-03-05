import sys
import os
import bcrypt

# Add the backend directory to the Python module search path
backend_path = os.path.abspath(os.path.join(os.path.dirname(__file__), '..'))
sys.path.append(backend_path)

# Import necessary modules from user_model.py
from user_model import signup, login
import unittest
from unittest.mock import patch, MagicMock


class TestUserModel(unittest.TestCase):
    @patch('user_model.Session')
    def test_signup(self, mock_session):
        mock_add = MagicMock()
        mock_session.return_value.add = mock_add
        mock_commit = MagicMock()
        mock_session.return_value.commit = mock_commit

        email = 'test@example.com'
        password = 'password123'
        with patch('user_model.UserModel') as mock_user_model:
            user_instance = mock_user_model.return_value
            user_instance.email = email
            user_instance.password = 'hashed_password'

            user_data = signup(email, password)

            self.assertIsNotNone(user_data)
            self.assertEqual(user_data['email'], email)

    @patch('user_model.Session')
    def test_login(self, mock_session):
        email = 'test@example.com'
        password = 'password123'
        hashed_password = bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt())

        # Create a mock user object with the expected email and password
        mock_user = MagicMock()
        mock_user.email = email
        mock_user.password = hashed_password.decode('utf-8')  # Decode hashed password to string

        # Mock the query method of the session to return the mock user object
        mock_session.return_value.query.return_value.filter_by.return_value.first.return_value = mock_user

        # Call the login function with the plain text password
        user_data = login(email, password)

        # Assert that the returned user data has the expected email
        self.assertEqual(user_data['email'], email)


if __name__ == '__main__':
    unittest.main()
