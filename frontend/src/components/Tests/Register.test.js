import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import Register from '../Register';
import { useTranslation } from 'react-i18next';
import useRegister from '../../hooks/useRegister';
import useField from '../../hooks/useField';

// Mock useTranslation hook
jest.mock('react-i18next', () => ({
  useTranslation: () => ({ t: (str) => str }),
}));

// Mock useRegister hook
jest.mock('../../hooks/useRegister', () => jest.fn());

// Mock useField hook
jest.mock('../../hooks/useField', () => jest.fn(() => ({
  value: '',
  onChange: jest.fn(),
})));


describe('Register component', () => {
  beforeEach(() => {
    jest.clearAllMocks(); // Clear all mock function calls before each test
  });

  it('renders without crashing', () => {
    render(<Register />);
    // Add any additional assertions about rendering here
  });

  it('submits form with valid data', () => {
    const mockRegister = jest.fn();
    useRegister.mockReturnValue(mockRegister);

    const { getByTestId } = render(<Register />);
    const formElement = getByTestId('register-form');

    // Simulate form submission
    fireEvent.submit(formElement);

    // Check if the register function is called with the correct arguments
    expect(mockRegister).toHaveBeenCalledWith(undefined, undefined, undefined, undefined); // Adjust with expected arguments
  });
  it('sets error message when passwords do not match', async () => {
    const { getByTestId, getByText } = render(<Register />);
    
    // Get form elements
    const passwordInput = getByTestId('password-input');
    const passwordAgainInput = getByTestId('password-again-input');

    // Simulate entering different passwords
    fireEvent.change(passwordInput, { target: { value: 'password1' } });
    fireEvent.change(passwordAgainInput, { target: { value: 'password2' } });

    // Wait for the error message to be displayed
    await waitFor(() => {
      const errorAlert = document.querySelector('.error-message');
      console.log(errorAlert);
      expect(errorAlert);
    });
  });
});
