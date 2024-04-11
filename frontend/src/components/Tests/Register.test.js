import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import Register from '../Register';
import { useTranslation } from 'react-i18next';
import useRegister from '../../hooks/useRegister';
import useField from '../../hooks/useField';

jest.mock('react-i18next', () => ({
  useTranslation: () => ({ t: key => key }),
}));

jest.mock('../../hooks/useRegister', () => jest.fn());

jest.mock('../../hooks/useField', () => jest.fn(() => ({
  value: '',
  onChange: jest.fn(),
})));

describe('Register component', () => {
  beforeEach(() => {
    useRegister.mockClear();
    useField.mockClear();
  });

  it('renders without crashing', () => {
    render(<Register />);
  });

  it('submits form with valid data', () => {
    const mockRegister = jest.fn();
    useRegister.mockReturnValue(mockRegister);
  
    const { getByTestId } = render(<Register />);
    const form = getByTestId('register-form');
  
    // Fill in the form fields
    fireEvent.change(getByTestId('first-name-input'), { target: { value: 'John' } });
    fireEvent.change(getByTestId('last-name-input'), { target: { value: 'Doe' } });
    fireEvent.change(getByTestId('email-input'), { target: { value: 'john@example.com' } });
    fireEvent.change(getByTestId('password-input'), { target: { value: 'password' } });
    fireEvent.change(getByTestId('password-again-input'), { target: { value: 'password' } });
  
    // Simulate form submission
    fireEvent.submit(form);
  
    // Check if the register function is called with the correct arguments
    expect(mockRegister).toHaveBeenCalledWith('John', 'Doe', 'john@example.com', 'password');
  });

  it('sets error message when passwords do not match', () => {
    const { getByTestId, getByText } = render(<Register />);
    const passwordInput = getByTestId('password-input');
    const passwordAgainInput = getByTestId('password-again-input');
    const form = getByTestId('register-form');
  
    // Simulate password mismatch
    fireEvent.change(passwordInput, { target: { value: 'password' } });
    fireEvent.change(passwordAgainInput, { target: { value: 'differentpassword' } });
  
    fireEvent.submit(form);
  
    // Check if the password mismatch error message is displayed
    expect(getByText('Passwords do not match')).toBeInTheDocument(); // Update text matcher
  });
});