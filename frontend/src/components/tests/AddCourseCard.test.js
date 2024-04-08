import "@testing-library/jest-dom/extend-expect";
import { render, screen } from "@testing-library/react";
import React from "react";
import AddCourseCard from "../AddCourseCard";

describe("AddCourseCard component", () => {
  test("renders Add Course text", () => {
    render(<AddCourseCard />);
    const addCourseText = screen.getByText("Add Course");
    expect(addCourseText).toBeInTheDocument();
  });

  test("renders add button with plus icon", () => {
    const mockOnAddCourse = jest.fn();
    render(<AddCourseCard onAddCourse={mockOnAddCourse} />);
    const addButton = screen.getByRole("button");
    expect(addButton).toBeInTheDocument();
    expect(addButton).toContainHTML("svg");
  });

  test("handles click event when onAddCourse prop is not provided", () => {
    // Renders the component without providing onAddCourse prop
    render(<AddCourseCard />);
    // Clicks the button to trigger handleAddCourse function
    const addButton = screen.getByRole("button");
    expect(addButton).toBeInTheDocument();
    expect(() => {
      addButton.click();
    }).not.toThrow(); // Expects no error to be thrown
  });
});
