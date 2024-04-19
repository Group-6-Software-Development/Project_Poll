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
    const { getByRole, getByLabelText, debug } = render(<CourseCard {...course} />);
    try {
      const editButton = getByRole('button'); // Get the edit button without specifying the name attribute
      fireEvent.click(editButton); // Click the edit button
  
      // Assert that input fields are rendered
      expect(getByLabelText('courseCard.courseIDLabel')).toBeInTheDocument();
      expect(getByLabelText('courseCard.courseNameLabel')).toBeInTheDocument();
      expect(getByLabelText('courseCard.startDateLabel')).toBeInTheDocument();
      expect(getByLabelText('courseCard.endDateLabel')).toBeInTheDocument();
    } catch (error) {
      // If the edit button is not found, log the rendered component for debugging
      debug();
      throw error;
    }
  });

  test('allows saving edited course details', async () => {
    // Arrange
    const course = {
      course_uuid: '123',
      course_id: 'C101',
      course_name: 'Introduction to React',
      start_date: '2024-04-10',
      end_date: '2024-05-10',
    };

    // Act
    const { getByLabelText, getByTestId, getByRole } = render(<CourseCard {...course} />);
    const editButtonIcon = getByTestId('edit-button-icon'); // Get the edit button
    fireEvent.click(editButtonIcon); // Click the edit button

    // Simulate changes in input fields
    fireEvent.change(getByLabelText('courseCard.courseIDLabel'), { target: { value: 'New Course ID' } });
    fireEvent.change(getByLabelText('courseCard.courseNameLabel'), { target: { value: 'New Course Name' } });
    fireEvent.change(getByLabelText('courseCard.startDateLabel'), { target: { value: '2025-01-01' } });
    fireEvent.change(getByLabelText('courseCard.endDateLabel'), { target: { value: '2025-02-01' } });

    // Click the save button
    const saveButton = getByRole('button', { name: '' }); // Find by role since name is not set
    fireEvent.click(saveButton);

    // Assert
    await waitFor(() => {
      expect(getByLabelText('courseCard.courseIDLabel')).toHaveValue('New Course ID');
      expect(getByLabelText('courseCard.courseNameLabel')).toHaveValue('New Course Name');
      expect(getByLabelText('courseCard.startDateLabel')).toHaveValue('2025-01-01');
      expect(getByLabelText('courseCard.endDateLabel')).toHaveValue('2025-02-01');
    });
  });
});

