import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFaceSmile,
  faFaceMeh,
  faFaceFrown,
} from "@fortawesome/free-solid-svg-icons";
import "./styles/LectureCard.css";

const goodIcon = (
  <FontAwesomeIcon icon={faFaceSmile} style={{ color: "#5cb85c" }} size="3x" />
);

const neutralIcon = (
  <FontAwesomeIcon icon={faFaceMeh} style={{ color: "#ffd528" }} size="3x" />
);

const weakIcon = (
  <FontAwesomeIcon icon={faFaceFrown} style={{ color: "#d0342c" }} size="3x" />
);

const lectureCode = "TX00EY39-3004";
const courseName = "OTP 1";
const lectureDate = "31.2.2024";

const goodRatings = 15; // TODO GET TOTAL good ratings
const neutralRatings = 2; // --||--
const weakRatings = 1;

const LectureCard = ({
  lectureCode,
  courseName,
  lectureDate,
  lecture_uuid,
}) => {
  return (
    // TODO get lecture infos

    <div className="lecture-card">
      <a href={`http://localhost:3000/reviews/${lecture_uuid}`}>
        <div className="lecture-code">
          <p>{lectureCode}</p>
          <h5> {courseName} </h5>
        </div>
        <div className="lecture-rating">
          <div className="good-rating">
            <strong>{goodRatings}</strong>
            {goodIcon}
          </div>
          <div className="neutral-rating">
            <strong>{neutralRatings}</strong>
            {neutralIcon}
          </div>
          <div className="weak-rating">
            <strong>{weakRatings}</strong>
            {weakIcon}
          </div>
        </div>
        <div className="lecture-date">
          <p>{lectureDate}</p>
        </div>
      </a>
    </div>
  );
};

export default LectureCard;
