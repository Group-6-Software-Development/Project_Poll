import "./styles/AddCourseCard.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlusCircle } from "@fortawesome/free-solid-svg-icons";

const addButton = (
  <FontAwesomeIcon icon={faPlusCircle} size="4x" style={{ color: "#ff5000" }} />
);

const AddCourseCard = ({ onAddCourse }) => {
  const handleAddCourse = () => {
    onAddCourse();
  };

  return (
    <div className="add-course-card">
      <h4>Add Course</h4>
      <div className="add-button">
        <button onClick={handleAddCourse}>{addButton}</button>
      </div>
    </div>
  );
};

export default AddCourseCard;
