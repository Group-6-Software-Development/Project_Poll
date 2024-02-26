import classPhoto from "../images/classroomPhoto.png";
import "./styles/CourseCard.css";

const CourseCard = () => {
  return (
    <div className="course-card">
      <img src={classPhoto} alt="classroom"></img>
      <div className="course-info">
        <div className="course-id">
          <p>TX00EY27-T3ST</p>
        </div>
        <div className="course-name">
          <h4>Course Name</h4>
        </div>
        <div className="course-date">
          <p>Course date</p>
        </div>
      </div>
    </div>
  );
};
// TODO: there still need changes to make loading of unique data
export default CourseCard;
