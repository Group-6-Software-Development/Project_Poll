// UserPage.js
import React, { useState, useEffect } from "react";
import AddCourseCard from "../components/AddCourseCard";
import CourseCard from "../components/CourseCard";
import { useNavigate } from "react-router-dom";

function UserPage() {
  const navigate = useNavigate();
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    console.log("Fetching courses");

    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/course/courses", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      const data = await response.json();

      if (response.ok) {
        setCourses(data);
      } else {
        const error = await response.json();
        alert(error.error);

        if (response.status === 401) {
          localStorage.removeItem("token");
          alert("Login expired. Please login again.");
          navigate("/login");
        }
      }
      console.log("Courses fetched");
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const createCourse = async (courseID, courseName, startDate, endDate) => {
    try {
      const response = await fetch("http://localhost:5000/api/course/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({ courseID, courseName, startDate, endDate }),
      });

      if (response.ok) {
        const data = await response.json();
        console.log(data);
      } else {
        const error = await response.json();
        alert(error.error);

        if (response.status === 401) {
          localStorage.removeItem("token");
          alert("Login expired. Please login again.");
          navigate("/login");
        }
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const addCourse = () => {
    const newCourse = {
      courseID: "Course ID",
      courseName: "Course Name",
      startDate: "Start Date",
      endDate: "End Date",
    };

    createCourse(
      newCourse.courseID,
      newCourse.courseName,
      newCourse.startDate,
      newCourse.endDate
    );

    fetchCourses();
    setCourses(courses);
  };

  return (
    <div className="user-page-container">
      <h1>Courses</h1>
      <div className="card-container">
        <AddCourseCard onAddCourse={addCourse} />

        {courses.map((course) => (
          <CourseCard
            key={course.uuid}
            course_uuid={course.uuid}
            course_id={course.course_id}
            course_name={course.course_name}
            start_date={course.start_date}
            end_date={course.end_date}
          />
        ))}
      </div>
    </div>
  );
}

export default UserPage;
