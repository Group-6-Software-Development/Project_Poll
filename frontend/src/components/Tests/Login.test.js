// Import the fireEvent and render functions from @testing-library/react
import { render, fireEvent } from "@testing-library/react";
import React from "react";
import Login from "../Login";

// Mock the console.log function
console.log = jest.fn();

describe("Login component", () => {
  it("calls console.log when form is submitted", () => {
    const { getByTestId } = render(<Login />);

    // Get the email and password input fields and change their values
    const emailInput = getByTestId("email-input");
    const passwordInput = getByTestId("password-input");
    fireEvent.change(emailInput, { target: { value: "test@example.com" } });
    fireEvent.change(passwordInput, { target: { value: "password" } });

    // Submit the form
    fireEvent.submit(getByTestId("login-form"));

    // Check if console.log is called with correct data
    expect(console.log).toHaveBeenCalledWith("Logging in with:", {
      email: "test@example.com",
      password: "password",
    });
  });
});