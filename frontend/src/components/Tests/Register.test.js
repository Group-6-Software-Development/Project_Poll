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

    // Simulate form submission
    fireEvent.submit(form);

    // Check if the register function is called with the correct arguments
    expect(mockRegister).toHaveBeenCalledWith('', '', '', '');
  });

  it('displays error message for password mismatch', () => {
    const { getByTestId, getByText } = render(<Register />);
    const passwordInput = getByTestId('password-input');
    const passwordAgainInput = getByTestId('password-again-input');
    const form = getByTestId('register-form');

    // Simulate password mismatch
    fireEvent.change(passwordInput, { target: { value: 'password' } });
    fireEvent.change(passwordAgainInput, { target: { value: 'differentpassword' } });

    fireEvent.submit(form);

    // Check if the password mismatch error message is displayed
    expect(getByText('register.passwordMismatch')).toBeInTheDocument();
  });
});