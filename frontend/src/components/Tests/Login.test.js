// Import the fireEvent and render functions from @testing-library/react
import { render, fireEvent } from "@testing-library/react";
import React from "react";
import Login from "../Login";
import useLogin from "../../hooks/useLogin";

// Mock the useLogin hook
jest.mock("../../hooks/useLogin", () => ({
  __esModule: true,
  default: jest.fn(() => ({
    login: jest.fn(), // Mock the login function
  })),
}));

describe("Login component", () => {
  test("calls useLogin hook when form is submitted", () => {
    // Mock setIsAuthenticated function
    const setIsAuthenticated = jest.fn();

    // Render the Login component
    const { getByTestId } = render(<Login setIsAuthenticated={setIsAuthenticated} />);

    // Get the email and password input fields and change their values
    const emailInput = getByTestId("email-input");
    const passwordInput = getByTestId("password-input");
    fireEvent.change(emailInput, { target: { value: "test@example.com" } });
    fireEvent.change(passwordInput, { target: { value: "password" } });

    // Submit the form
    fireEvent.submit(getByTestId("login-form"));

    // Check how many times useLogin hook is called
    console.log("useLogin calls:", useLogin.mock.calls.length);

    // Check if useLogin hook is called with correct arguments
    expect(useLogin).toHaveBeenCalled();
    expect(useLogin.mock.calls.length).toBe(1);
    expect(useLogin.mock.calls[0][0]).toEqual(
      expect.objectContaining({ setIsAuthenticated })
    );
    expect(useLogin.mock.calls[0][1]).toBe("test@example.com");
    expect(useLogin.mock.calls[0][2]).toBe("password");
  });
});
