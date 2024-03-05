// Navbar.test.js

import React from "react";
import { render, screen } from "@testing-library/react";
import Navbar from "../Navbar";
import "@testing-library/jest-dom/extend-expect";

describe("Navbar component", () => {
  test("renders logo", () => {
    render(<Navbar isAuthenticated={false} />);
    const logoElement = screen.getByAltText("Logo");
    expect(logoElement).toBeInTheDocument();
  });

  test("renders login button when not authenticated", () => {
    render(<Navbar isAuthenticated={false} />);
    const loginButton = screen.getByText("Login");
    expect(loginButton).toBeInTheDocument();
  });

  test("renders profile button when authenticated", () => {
    render(<Navbar isAuthenticated={true} />);
    const profileButton = screen.getByText("Profile");
    expect(profileButton).toBeInTheDocument();
  });
});
