import React from "react";
import { render, fireEvent } from "@testing-library/react";
import Login from "../Login";

describe("Login component", () => {
  it("renders all input fields and a submit button", () => {
    const { getByTestId } = render(<Login />);
    expect(getByTestId("email-input")).toBeInTheDocument();
    expect(getByTestId("password-input")).toBeInTheDocument();
    expect(getByTestId("login-button")).toBeInTheDocument();
  });

  it("calls console.log with correct parameters when form is submitted", () => {
    const logMock = jest.spyOn(console, "log");
    const { getByTestId } = render(<Login />);
    const emailInput = getByTestId("email-input");
    const passwordInput = getByTestId("password-input");

    fireEvent.change(emailInput, { target: { value: "test@example.com" } });
    fireEvent.change(passwordInput, { target: { value: "password123" } });
    fireEvent.submit(getByTestId("login-form"));

    expect(logMock).toHaveBeenCalledWith("Logging in with:", {
      email: "test@example.com",
      password: "password123",
    });
  });
});
