import React from "react";
import "./styles/AddCourseCard.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlusCircle } from "@fortawesome/free-solid-svg-icons";
import { useTranslation } from "react-i18next";

const AddCourseCard = ({ onAddCourse }) => {
  const { t } = useTranslation();

  const addButton = (
    <FontAwesomeIcon
      icon={faPlusCircle}
      size="4x"
      style={{ color: "#ff5000" }}
    />
  );

  const handleAddCourse = () => {
    onAddCourse();
  };

  return (
    <div className="add-course-card">
      <h4>{t("addCourseCard.addCourse")}</h4>
      <div className="add-button">
        <button onClick={handleAddCourse}>{addButton}</button>
      </div>
    </div>
  );
};

export default AddCourseCard;
