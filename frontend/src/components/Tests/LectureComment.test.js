import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect'; // Import extend-expect for custom matchers
import LectureComment from '../LectureComment';

describe('LectureComment', () => {
  it('renders comment text correctly', () => {
    const commentText = 'This is a test comment';
    const { getByText } = render(<LectureComment commentText={commentText} />);
    const commentElement = getByText(commentText);
    expect(commentElement).toBeInTheDocument(); // Use toBeInTheDocument matcher
  });

  it('renders comment number correctly', () => {
    const commentNumber = 1;
    const { getByText } = render(<LectureComment commentNumber={commentNumber} />);
    const commentNumberElement = getByText(commentNumber.toString());
    expect(commentNumberElement).toBeInTheDocument(); // Use toBeInTheDocument matcher
  });
});
