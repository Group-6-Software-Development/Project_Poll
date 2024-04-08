import "@testing-library/jest-dom/extend-expect";
import { fireEvent, render, screen } from "@testing-library/react";
import CourseCard from "../CourseCard";

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
  const courseNameInput = screen.getByLabelText("Course Name");
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

//TODO: Line 22 still need to be tested (for reference):
//const CourseCard = () => {
	//const handleEditClick = () => {
	//  setIsEditing(!isEditing);
	//};
	//const handleSaveClick = () => {
	  // #TODO: validate changes and save to db
	//  setIsEditing(!isEditing);
	//};
	//
