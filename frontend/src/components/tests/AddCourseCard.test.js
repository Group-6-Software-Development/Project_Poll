// AddCourseCard.test.js

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
    render(<AddCourseCard />);
    const addButton = screen.getByRole("button");
    expect(addButton).toBeInTheDocument();
    expect(addButton).toContainHTML('svg'); // Ensure the button contains an SVG element
  });
});