import classPhoto from "../images/classroomPhoto.png";
import "./styles/CourseCard.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen, faCheck } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";

import { useEffect, useState } from "react";

const editButton = (
  <FontAwesomeIcon icon={faPen} style={{ color: "#ff5000" }} size="xl" />
);

const saveButton = (
  <FontAwesomeIcon icon={faCheck} style={{ color: "#5cb85c" }} size="xl" />
);

const CourseCard = ({
  course_uuid,
  course_id,
  course_name,
  start_date,
  end_date,
}) => {
  const navigate = useNavigate();

  const handleEditClick = () => {
    setIsEditing(!isEditing);
  };

  const handleSaveClick = () => {
    setIsEditing(!isEditing);
    console.log("Saving changes");

    const dateRegex1 = /^\d{2}.\d{2}.\d{4}$/; // DD.MM.YYYY
    const dateRegex2 = /^\d{1,2}.\d{1,2}.\d{4}$/; // D.M.YYYY

    if (
      !(dateRegex1.test(startDate) || dateRegex2.test(startDate)) ||
      !(dateRegex1.test(endDate) || dateRegex2.test(endDate))
    ) {
      alert("Invalid date format. Please use either DD.MM.YYYY or D.M.YYYY");
      console.log("Invalid date format");
    } else if (courseId === "Course ID" || courseName === "Course Name") {
      alert("Please fill in all fields");
      console.log("Please fill in all fields");
    } else {
      saveChanges();
    }
  };

  const saveChanges = async () => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/course/update/${course_uuid}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify({
            courseID: courseId,
            courseName: courseName,
            startDate: startDate,
            endDate: endDate,
          }),
        }
      );
      const data = await response.json();
      if (response.ok) {
        console.log("Changes saved");
      } else {
        alert(data.error);

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

  const [isEditing, setIsEditing] = useState(false);
  const [courseId, setCourseId] = useState(course_id || "Course ID");
  const [courseName, setCourseName] = useState(course_name || "Course Name");
  const [startDate, setStartDate] = useState(start_date || "Start Date");
  const [endDate, setEndDate] = useState(end_date || "End Date");

  return (
    <div className="course-card">
      <img src={classPhoto} alt="classroom"></img>
      {isEditing ? (
        <button onClick={handleSaveClick}>{saveButton}</button>
      ) : (
        <button onClick={handleEditClick}>{editButton}</button>
      )}

      <div className="course-info">
        <div className="course-id">
          {isEditing ? (
            <input
              type="text"
              value={courseId}
              onChange={(e) => setCourseId(e.target.value)}
            />
          ) : (
            <p>{courseId}</p>
          )}
        </div>
        <div className="course-name">
          {isEditing ? (
            <input
              type="text"
              value={courseName}
              onChange={(e) => setCourseName(e.target.value)}
            />
          ) : (
            <h4>{courseName}</h4>
          )}
        </div>
        <div className="course-date">
          {isEditing ? (
            <div>
              <input
                type="text"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
              />
              <input
                type="text"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
              ></input>
            </div>
          ) : (
            <p>
              {startDate} - {endDate}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default CourseCard;
