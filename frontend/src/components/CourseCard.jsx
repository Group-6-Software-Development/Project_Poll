import classPhoto from "../images/classroomPhoto.png";
import "./styles/CourseCard.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen, faCheck } from "@fortawesome/free-solid-svg-icons";

import { useState } from "react";

const editButton = (
  <FontAwesomeIcon icon={faPen} style={{ color: "#ff5000" }} size="xl" />
);

const saveButton = (
  <FontAwesomeIcon icon={faCheck} style={{ color: "#5cb85c" }} size="xl" />
);

const CourseCard = () => {
  const handleEditClick = () => {
    setIsEditing(!isEditing);
  };
  const handleSaveClick = () => {
    // #TODO: validate changes and save to db
    setIsEditing(!isEditing);
  };

  const [isEditing, setIsEditing] = useState(false);
  const [courseId, setCourseId] = useState("CourseID");
  const [courseName, setCourseName] = useState("Course Name");
  const [courseDate, setCourseDate] = useState("Date");

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
            <input
              type="text"
              value={courseDate}
              onChange={(e) => setCourseDate(e.target.value)}
            />
          ) : (
            <p>{courseDate}</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default CourseCard;