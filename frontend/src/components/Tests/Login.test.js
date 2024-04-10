import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect'; // Jest-dom extension
import Login from '../Login';
import useLogin from '../../hooks/useLogin'; // Import the useLogin hook

// Mocking useTranslation hook
jest.mock('react-i18next', () => ({
  useTranslation: () => ({ t: key => key }),
}));

// Mocking useField hook
jest.mock('../../hooks/useField', () => jest.fn(() => ({
  value: '',
  onChange: jest.fn(),
})));

// Mocking useLogin hook globally
jest.mock('../../hooks/useLogin');

describe('Login component', () => {
  beforeEach(() => {
    jest.clearAllMocks(); // Clear all mocks before each test
  });

  it('renders without crashing', () => {
    render(<Login />);
  });

  it('submits the form with valid credentials', async () => {
    const mockLogin = jest.fn(); // Create a mock function for useLogin hook
    useLogin.mockReturnValue(mockLogin); // Mock the useLogin hook

    const { getByTestId } = render(<Login />);

    // Fill in the email and password fields
    fireEvent.change(getByTestId('email-input'), { target: { value: 'test@example.com' } });
    fireEvent.change(getByTestId('password-input'), { target: { value: 'password123' } });

    // Click the login button
    fireEvent.click(getByTestId('login-form'));

    // Asynchronous operation, wait for navigation to occur
    await waitFor(() => {
      expect(mockLogin).toHaveBeenCalledWith('test@example.com', 'password123');
    });
  });

  // Add more test cases as needed...
});
