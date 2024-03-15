// Navbar.test.js

import React from "react";
import { render, screen } from "@testing-library/react";
import Navbar from "../Navbar";
import { MemoryRouter } from "react-router-dom"; // Import MemoryRouter
import "@testing-library/jest-dom/extend-expect";

// Mock useNavigate hook
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: jest.fn(),
}));

const renderWithRouter = (component) => {
  return render(
    <MemoryRouter>
      {component}
    </MemoryRouter>
  );
};

describe("Navbar component", () => {
  test("renders logo", () => {
    renderWithRouter(<Navbar isAuthenticated={false} />);
    const logoElement = screen.getByAltText("Logo");
    expect(logoElement).toBeInTheDocument();
  });

  test("renders login button when not authenticated", () => {
    renderWithRouter(<Navbar isAuthenticated={false} />);
    const loginButton = screen.getByText("Login");
    expect(loginButton).toBeInTheDocument();
  });

  test("renders profile button when authenticated", () => {
    renderWithRouter(<Navbar isAuthenticated={true} />);
    const profileButton = screen.getByText("Profile");
    expect(profileButton).toBeInTheDocument();
  });
});
