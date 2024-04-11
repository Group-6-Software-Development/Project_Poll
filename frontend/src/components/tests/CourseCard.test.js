import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import CourseCard from '../CourseCard';

jest.mock('react-i18next', () => ({
  useTranslation: () => ({ t: key => key }),
}));

jest.mock('react-router-dom', () => ({
  useNavigate: () => jest.fn(),
}));

describe('CourseCard', () => {
  test('renders CourseCard component', () => {
    // Arrange
    const course = {
      course_uuid: '123',
      course_id: 'C101',
      course_name: 'Introduction to React',
      start_date: '2024-04-10',
      end_date: '2024-05-10',
    };

    // Act
    const { getByText } = render(<CourseCard {...course} />);

    // Assert
    expect(getByText('C101')).toBeInTheDocument();
    expect(getByText('Introduction to React')).toBeInTheDocument();
    expect(getByText('2024-04-10 - 2024-05-10')).toBeInTheDocument();
  });

  test('allows editing of course details', async () => {
    // Arrange
    const course = {
      course_uuid: '123',
      course_id: 'C101',
      course_name: 'Introduction to React',
      start_date: '2024-04-10',
      end_date: '2024-05-10',
    };
  
    // Act
    const { getByRole } = render(<CourseCard {...course} />);
    const editButton = getByRole('button', { name: 'Edit Course' }); // Get the edit button
    fireEvent.click(editButton); // Click the edit button
  
    // Simulate changes in input fields
    const courseIdInput = getByRole('textbox', { name: 'Course ID' });
    const courseNameInput = getByRole('textbox', { name: 'Course Name' });
    const startDateInput = getByRole('textbox', { name: 'Start Date' });
    const endDateInput = getByRole('textbox', { name: 'End Date' });
  
    fireEvent.change(courseIdInput, { target: { value: 'New Course ID' } });
    fireEvent.change(courseNameInput, { target: { value: 'New Course Name' } });
    fireEvent.change(startDateInput, { target: { value: '2025-01-01' } });
    fireEvent.change(endDateInput, { target: { value: '2025-02-01' } });
  
    // Assert
    expect(courseIdInput.value).toBe('New Course ID');
    expect(courseNameInput.value).toBe('New Course Name');
    expect(startDateInput.value).toBe('2025-01-01');
    expect(endDateInput.value).toBe('2025-02-01');
  });
});
