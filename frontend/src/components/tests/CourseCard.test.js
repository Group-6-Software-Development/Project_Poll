import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import CourseCard from '../CourseCard';
import { useTranslation } from 'react-i18next';
import { useNavigate } from "react-router-dom";
import "../styles/CourseCard.css";

jest.mock('react-i18next', () => ({
  useTranslation: () => ({ t: key => key }),
}));

describe('CourseCard component', () => {
  it('renders without crashing', () => {
    const props = {
      course_uuid: '1234',
      course_id: 'C001',
      course_name: 'Mathematics',
      start_date: '2022-01-01',
      end_date: '2022-06-30',
    };
    render(<CourseCard {...props} />);
  });

  it('toggles edit mode correctly', () => {
    const props = {
      course_uuid: '1234',
      course_id: 'C001',
      course_name: 'Mathematics',
      start_date: '2022-01-01',
      end_date: '2022-06-30',
    };
    const { getByText, getByTestId } = render(<CourseCard {...props} />);

    // Check if the component initially renders in non-edit mode
    expect(getByText('Mathematics')).toBeInTheDocument();
    expect(getByTestId('course-id')).toHaveTextContent('C001');
    expect(getByTestId('course-date')).toHaveTextContent('2022-01-01 - 2022-06-30');
    expect(getByTestId('edit-button')).toBeInTheDocument();

    // Click on the edit button
    fireEvent.click(getByTestId('edit-button'));

    // Check if the component switches to edit mode
    expect(getByTestId('course-id-input')).toBeInTheDocument();
    expect(getByTestId('course-name-input')).toBeInTheDocument();
    expect(getByTestId('start-date-input')).toBeInTheDocument();
    expect(getByTestId('end-date-input')).toBeInTheDocument();
    expect(getByTestId('save-button')).toBeInTheDocument();
  });

  // Add more tests as needed...
});
