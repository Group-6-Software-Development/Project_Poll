import classPhoto from "../images/classroomPhoto.png";
import "./styles/CourseCard.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen, faCheck } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useState } from "react";

const editButton = (
  <FontAwesomeIcon
    data-testid="edit-button-icon"
    icon={faPen}
    style={{ color: "#ff5000" }}
    size="xl"
  />
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
  const { t } = useTranslation();

  const handleEditClick = () => {
    setIsEditing(!isEditing);
  };

  const handleSaveClick = () => {
    setIsEditing(!isEditing);
    console.log("Saving changes");

    // Regular expressions to validate date formats
    const dateRegex1 = /^\d{2}.\d{2}.\d{4}$/; // DD.MM.YYYY
    const dateRegex2 = /^\d{1,2}.\d{1,2}.\d{4}$/; // D.M.YYYY

    // Checking if start date or end date doesn't match expected formats
    if (
      !(dateRegex1.test(startDate) || dateRegex2.test(startDate)) ||
      !(dateRegex1.test(endDate) || dateRegex2.test(endDate))
    ) {
      alert(t("courseCard.invalidDateFormat"));
      console.log("Invalid date format");
      setIsEditing(true);
      return;
    } else if (
      courseId === t("courseCard.courseIDPlaceholder") ||
      courseName === t("courseCard.courseNamePlaceholder") ||
      startDate === "" ||
      endDate === ""
    ) {
      alert(t("courseCard.fillAllFields"));
      console.log("Please fill in all fields");
      setIsEditing(true);
      return;
    } else {
      saveChanges();
    }
  };

  const saveChanges = async () => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/course/update/${course_uuid}`,
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
        console.log(data.error);

        if (response.status === 401) {
          localStorage.removeItem("token");
          // eslint-disable-next-line no-undef
          globalThis.setIsAuthenticated(false);
          alert(t("courseCard.sessionExpired"));
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
      <img src={classPhoto} alt="classroom" />
      {isEditing ? (
        <button onClick={handleSaveClick}>{saveButton}</button>
      ) : (
        <button name="Edit Course" onClick={handleEditClick}>
          {editButton}
        </button>
      )}

      <div className="course-info">
        {isEditing ? (
          <>
            <div className="course-id">
              <input
                id="courseId"
                type="text"
                value={courseId}
                onChange={(e) => setCourseId(e.target.value)}
              />
            </div>
            <div className="course-name">
              <input
                id="courseName"
                type="text"
                value={courseName}
                onChange={(e) => setCourseName(e.target.value)}
              />
            </div>
            <div className="course-date">
              <div>
                <input
                  id="startDate"
                  type="text"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                />
                <input
                  id="endDate"
                  type="text"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                />
              </div>
            </div>
          </>
        ) : (
          <a href={`${process.env.REACT_APP_FE_URL}/lecture/${course_uuid}`}>
            <div className="course-id">
              <p>{courseId}</p>
            </div>
            <div className="course-name">
              <h4>{courseName}</h4>
            </div>
            <div className="course-date">
              <p>
                {startDate} - {endDate}
              </p>
            </div>
          </a>
        )}
      </div>
    </div>
  );
};

export default CourseCard;
