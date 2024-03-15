import { fireEvent, render, screen } from "@testing-library/react";
import CourseCard from "../CourseCard";

// Mocking setIsEditing function
jest.mock("../CourseCard", () => ({
  __esModule: true,
  default: ({ course_id, course_name, start_date, end_date }) => {
    return (
      <div>
        <p data-testid="course-id">{course_id}</p>
        <p data-testid="course-name">{course_name}</p>
        <p data-testid="start-date">{start_date}</p>
        <p data-testid="end-date">{end_date}</p>
      </div>
    );
  },
}));

test("allows editing of course ID", () => {
  render(<CourseCard />);
  fireEvent.click(screen.getByRole("button")); // Switch to edit mode
  const courseIdInput = screen.getByLabelText("Course ID");
  fireEvent.change(courseIdInput, { target: { value: "New Course ID" } });
  expect(courseIdInput).toHaveValue("New Course ID");
});

test("allows editing of course name", () => {
  render(<CourseCard />);
  fireEvent.click(screen.getByRole("button")); // Switch to edit mode
  const courseNameInput = screen.getByTestId("course-name"); // Use getByTestId
  fireEvent.change(courseNameInput, { target: { value: "New Course Name" } });
  expect(courseNameInput).toHaveValue("New Course Name");
});

test("allows editing of course date", () => {
  render(<CourseCard />);
  fireEvent.click(screen.getByRole("button")); // Switch to edit mode
  const courseDateInput = screen.getByLabelText("Date");
  fireEvent.change(courseDateInput, { target: { value: "New Date" } });
  expect(courseDateInput).toHaveValue("New Date");
});

test("updates course details when save button is clicked", () => {
  render(<CourseCard />);
  fireEvent.click(screen.getByRole("button")); // Switch to edit mode
  const saveButton = screen.getByRole("button", { name: /save/i });
  fireEvent.click(saveButton); // Click save button
  // Ensure that the saveChanges function is called
});
