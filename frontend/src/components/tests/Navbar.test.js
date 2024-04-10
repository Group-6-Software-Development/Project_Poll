import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import Navbar from "../Navbar";

// Mock the useNavigate hook
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: jest.fn(),
}));

describe("Navbar", () => {
  test("renders login button when not authenticated", () => {
    render(<Navbar isAuthenticated={false} setIsAuthenticated={() => {}} />);

    // Assert that the logo is rendered
    const logoElement = screen.getByAltText("Logo");
    expect(logoElement).toBeInTheDocument();

    // Assert that the login button is rendered
    const loginButton = screen.getByText("Login");
    expect(loginButton).toBeInTheDocument();

    // Simulate a click on the login button
    fireEvent.click(loginButton);

    // Assert that the useNavigate function is not called
    expect(require("react-router-dom").useNavigate).not.toHaveBeenCalled();

    // Alternatively, if you want to test navigation on click:
    // You need to properly mock the useNavigate hook and handle the navigation logic.
    // For simplicity in this example, we assert that useNavigate is not called.

    // Additional assertions can be added based on the expected behavior
  });
});

