// UserPage.js
import React, { useState, useEffect, useCallback } from "react";
import AddCourseCard from "../components/AddCourseCard";
import CourseCard from "../components/CourseCard";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

function UserPage() {
  const navigate = useNavigate();
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(false);
  const { t } = useTranslation();

  const fetchCourses = async () => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/course/courses`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (response.ok) {
        const data = await response.json();
        setCourses(data);
      } else {
        const error = await response.json();

        if (response.status === 401) {
          localStorage.removeItem("token");
          alert(t("userPage.sessionExpired"));
          // eslint-disable-next-line no-undef
          globalThis.setIsAuthenticated(false);
          navigate("/login");
        } else {
          console.log(error.error);
        }
      }
      console.log("Courses fetched");
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const createCourse = useCallback(
    async (courseID, courseName, startDate, endDate) => {
      try {
        const response = await fetch(
          `${process.env.REACT_APP_API_URL}/course/create`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
            body: JSON.stringify({ courseID, courseName, startDate, endDate }),
          }
        );

        if (response.ok) {
          const data = await response.json();
          console.log(data);

          fetchCourses();
        } else {
          const error = await response.json();
          console.log(error);

          if (response.status === 401) {
            localStorage.removeItem("token");
            alert(t("userPage.sessionExpired"));
            // eslint-disable-next-line no-undef
            globalThis.setIsAuthenticated(false);
            navigate("/login");
          }
        }
      } catch (error) {
        console.error("Error:", error);
      }
    },
    [navigate]
  );

  useEffect(() => {
    console.log("Page reloaded; Fetching courses");
    fetchCourses();
  }, []);

  const addCourse = async () => {
    console.log("Adding new course");

    const newCourse = {
      courseID: t("userPage.courseIDPlaceholder"),
      courseName: t("userPage.courseNamePlaceholder"),
      startDate: t("userPage.startDatePlaceholder"),
      endDate: t("userPage.endDatePlaceholder"),
    };

    setLoading(true);

    await createCourse(
      newCourse.courseID,
      newCourse.courseName,
      newCourse.startDate,
      newCourse.endDate
    );

    setLoading(false);
  };

  return (
    <div className="user-page-container">
      <h1>{t("userPage.coursesHeading")}</h1>
      <div className="card-container">
        <AddCourseCard onAddCourse={addCourse} />

        {loading ? (
          <p>{t("userPage.loadingMessage")}</p>
        ) : (
          courses.map((course) => (
            <CourseCard
              key={course.uuid}
              course_uuid={course.uuid}
              course_id={course.course_id}
              course_name={course.course_name}
              start_date={course.start_date}
              end_date={course.end_date}
            />
          ))
        )}
      </div>
    </div>
  );
}

export default UserPage;
