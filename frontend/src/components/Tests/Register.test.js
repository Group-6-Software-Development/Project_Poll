import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import Register from '../Register';

describe('Register component', () => {
  let originalConsoleLog;

  beforeEach(() => {
    // Save the original console.log
    originalConsoleLog = console.log;
    // Mock data console.log
    console.log = jest.fn();
  });

  afterEach(() => {
    // Send back the original console.log
    console.log = originalConsoleLog;
  });

  it('renders all input fields and a submit button', () => {

    const { getByTestId, getByText } = render(<Register />);

    // Check if all input fields are rendered
    expect(getByTestId('first-name-input')).toBeDefined();
    expect(getByTestId('last-name-input')).toBeDefined();
    expect(getByTestId('email-input')).toBeDefined();
    expect(getByTestId('password-input')).toBeDefined();
    expect(getByTestId('password-again-input')).toBeDefined();

    // Check if submit button is rendered
    expect(getByTestId('register-form')).toBeDefined();
  });

  it('displays error message when passwords do not match', () => {
    // Mock setError function
    const setError = jest.fn();

    const { getByTestId } = render(<Register setError={setError} />);

    // Set different passwords
    fireEvent.change(getByTestId('password-input'), { target: { value: 'password123' } });
    fireEvent.change(getByTestId('password-again-input'), { target: { value: 'password456' } });

    // Submit the form
    fireEvent.submit(getByTestId('register-form'));

    // Check if setError is called with the correct error message
    expect(setError).toHaveBeenCalledWith("Passwords do not match");
  });

  it('clears error and logs registration data when passwords match', () => {
    // Mock setError function
    const setError = jest.fn();

    const { getByTestId } = render(<Register setError={setError} />);

    // Set matching passwords
    fireEvent.change(getByTestId('password-input'), { target: { value: 'password123' } });
    fireEvent.change(getByTestId('password-again-input'), { target: { value: 'password123' } });

    // Submit the form
    fireEvent.submit(getByTestId('register-form'));

    // Check if setError is called with an empty string
    expect(setError).toHaveBeenCalledWith("");

    // Check if registration data is logged
    expect(console.log).toHaveBeenCalledWith("Registering with:", {
      firstName: '', // Here we expect an empty string, because the input field is empty
      lastName: '', // Here we expect an empty string, because the input field is empty
      email: '', // Here we expect an empty string, because the input field is empty
      password: 'password123',
      passwordAgain: 'password123',
    });
  });
});



