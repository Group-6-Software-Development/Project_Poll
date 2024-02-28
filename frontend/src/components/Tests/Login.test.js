import React from "react";
import { render, fireEvent } from "@testing-library/react";
import Login from "../Login";

describe("Login component", () => {
  const setIsAuthenticated = jest.fn();

  it("renders email and password input fields, and a login button", () => {
    const { getByLabelText, getByText } = render(<Login setIsAuthenticated={setIsAuthenticated} />);

    // Tarkista, että sähköposti- ja salasanakentät ovat renderöity
    expect(getByLabelText("Email:")).toBeInTheDocument();
    expect(getByLabelText("Password:")).toBeInTheDocument();

    // Tarkista, että kirjautumisnappi on renderöity
    expect(getByText("Login")).toBeInTheDocument();
  });

  it("logs in with email and password when form is submitted", () => {
    const { getByLabelText, getByText } = render(<Login setIsAuthenticated={setIsAuthenticated} />);

    // Syötä sähköpostiosoite ja salasana kenttiin
    fireEvent.change(getByLabelText("Email:"), { target: { value: "test@example.com" } });
    fireEvent.change(getByLabelText("Password:"), { target: { value: "password123" } });

    // Lähetä lomake
    fireEvent.submit(getByText("Login"));

    // Tarkista, että setIsAuthenticated on kutsuttu oikein
    expect(setIsAuthenticated).toHaveBeenCalled();
  });
});

