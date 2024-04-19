import { render, screen, waitFor } from "@testing-library/react";
import LectureCard from "../LectureCard";
import React from "react";
import "@testing-library/jest-dom";

describe("LectureCard", () => {
  const mockLecture = {
    lectureCode: "L001",
    courseName: "Introduction to React",
    lectureDate: "2022-01-01",
    lecture_uuid: "123456789",
  };

  const mockReviews = [
    {
      material_rating: 3,
      understanding_rating: 2,
    },
    {
      material_rating: 2,
      understanding_rating: 1,
    },
    {
      material_rating: 1,
      understanding_rating: 3,
    },
  ];

  beforeEach(() => {
    jest.spyOn(global, "fetch").mockResolvedValue({
      ok: true,
      json: () => Promise.resolve(mockReviews),
    });
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it("should render lecture card with correct data", () => {
    render(
      <LectureCard
        lectureCode={mockLecture.lectureCode}
        courseName={mockLecture.courseName}
        lectureDate={mockLecture.lectureDate}
        lecture_uuid={mockLecture.lecture_uuid}
      />
    );

    expect(screen.getByText(mockLecture.lectureCode)).toBeInTheDocument();
    expect(screen.getByText(mockLecture.courseName)).toBeInTheDocument();
    expect(screen.getByText(mockLecture.lectureDate)).toBeInTheDocument();
  });

  it("should fetch reviews and display ratings", async () => {
    render(
      <LectureCard
        lectureCode={mockLecture.lectureCode}
        courseName={mockLecture.courseName}
        lectureDate={mockLecture.lectureDate}
        lecture_uuid={mockLecture.lecture_uuid}
      />
    );
  
    await waitFor(() => {
      const ratings = screen.getAllByText("2");
      expect(ratings).toHaveLength(3); // Adjust this to the expected number of elements
    });
  });

  it("should handle error when fetching reviews", async () => {
    jest.spyOn(console, "error").mockImplementation(() => {});

    jest.spyOn(global, "fetch").mockResolvedValue({
      ok: false,
      status: 500,
    });

    render(
      <LectureCard
        lectureCode={mockLecture.lectureCode}
        courseName={mockLecture.courseName}
        lectureDate={mockLecture.lectureDate}
        lecture_uuid={mockLecture.lecture_uuid}
      />
    );

    await waitFor(() => {
      expect(console.error).toHaveBeenCalledWith("Failed to fetch reviews");
    });
  });

  it("should handle not found reviews", async () => {
    jest.spyOn(console, "log").mockImplementation(() => {});

    jest.spyOn(global, "fetch").mockResolvedValue({
      ok: false,
      status: 404,
    });

    render(
      <LectureCard
        lectureCode={mockLecture.lectureCode}
        courseName={mockLecture.courseName}
        lectureDate={mockLecture.lectureDate}
        lecture_uuid={mockLecture.lecture_uuid}
      />
    );

    await waitFor(() => {
      expect(console.log).toHaveBeenCalledWith("No reviews found");
    });
  });
  it("should handle errors when fetching reviews", async () => {
    // Mock the function that fetches reviews to throw an error
    jest.spyOn(global, 'fetch').mockImplementation(() =>
      Promise.reject(new Error('Test error'))
    );
  
    // Suppress console.error for this test
    jest.spyOn(console, 'error').mockImplementation(() => {});
  
    render(
      <LectureCard
        lectureCode={mockLecture.lectureCode}
        courseName={mockLecture.courseName}
        lectureDate={mockLecture.lectureDate}
        lecture_uuid={mockLecture.lecture_uuid}
      />
    );
  
    // Wait for any asynchronous actions to complete
    await waitFor(() => {
      // Check that console.error was called with the expected error message
      expect(console.error).toHaveBeenCalledWith('Error:', new Error('Test error'));
    });
  
    // Restore console.error after the test
    console.error.mockRestore();
  
    // Restore fetch after the test
    global.fetch.mockRestore();
  });
});

