import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import Register from '../Register';
import { useTranslation } from 'react-i18next';
import useRegister from '../../hooks/useRegister';
import useField from '../../hooks/useField';
import '@testing-library/jest-dom/extend-expect';

jest.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (str) => str,
  }),
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
  it('sets error message when passwords do not match', async () => {
  const mockRegister = jest.fn().mockRejectedValue(new Error('register.passwordMismatch'));
  useRegister.mockReturnValue(mockRegister);

  const { getByTestId, findByText } = render(<Register />);
  const form = getByTestId('register-form');

  // Simulate different passwords
  fireEvent.change(getByTestId('password-input'), { target: { value: 'password1' } });
  fireEvent.change(getByTestId('password-again-input'), { target: { value: 'password2' } });

  // Simulate form submission
  fireEvent.submit(form);

  // Wait for the error message to be displayed
  const errorAlert = await findByText("register.passwordMismatch");
  expect(errorAlert).toBeInTheDocument();
});
});