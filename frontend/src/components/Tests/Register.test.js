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
    const setIsAuthenticated = jest.fn(); // Mocking setIsAuthenticated function

    const { getByTestId } = render(<Register setIsAuthenticated={setIsAuthenticated} />);

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
    const setIsAuthenticated = jest.fn(); // Mocking setIsAuthenticated function

    const { getByTestId } = render(<Register setIsAuthenticated={setIsAuthenticated} />);

    // Set different passwords
    fireEvent.change(getByTestId('password-input'), { target: { value: 'password123' } });
    fireEvent.change(getByTestId('password-again-input'), { target: { value: 'password456' } });

    // Submit the form
    fireEvent.submit(getByTestId('register-form'));

    // Check if error message is displayed
    expect(getByText("Passwords do not match")).toBeInTheDocument();
  });

  it('clears error and logs registration data when passwords match', () => {
    const setIsAuthenticated = jest.fn(); // Mocking setIsAuthenticated function

    const { getByTestId } = render(<Register setIsAuthenticated={setIsAuthenticated} />);

    // Set matching passwords
    fireEvent.change(getByTestId('password-input'), { target: { value: 'password123' } });
    fireEvent.change(getByTestId('password-again-input'), { target: { value: 'password123' } });

    // Submit the form
    fireEvent.submit(getByTestId('register-form'));

    // Check if error message is cleared
    expect(getByText("Passwords do not match")).not.toBeInTheDocument();

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
