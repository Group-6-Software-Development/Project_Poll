import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFaceSmile,
  faFaceMeh,
  faFaceFrown,
} from "@fortawesome/free-solid-svg-icons";
import LectureComment from "../components/LectureComment";

const goodIcon = (
  <FontAwesomeIcon icon={faFaceSmile} style={{ color: "#5cb85c" }} size="3x" />
);

const neutralIcon = (
  <FontAwesomeIcon icon={faFaceMeh} style={{ color: "#ffd528" }} size="3x" />
);

const weakIcon = (
  <FontAwesomeIcon icon={faFaceFrown} style={{ color: "#d0342c" }} size="3x" />
);

// TODO get stats from server
const contentGood = 15;
const contentMid = 2;
const contentWeak = 1;

const materialGood = 12;
const materialMid = 4;
const materialWeak = 1;

const LectureReview = () => {
  const lectureCode = "getLecCode";
  const lectureDate = "getLecDate";
  return (
    <div className="lecture-review">
      <h2>
        Lecture Preview / <span className="lecture-code">{lectureCode}</span> /{" "}
        {lectureDate} Lecture Review
      </h2>
      <div className="feedback-container">
        <div className="rating-container">
          <div className="lecture-content">
            <p>{`Lecture content understanding: ${contentGood} ${contentMid} ${contentWeak}  `}</p>
            <div className="rating-icons">
              {goodIcon} {neutralIcon} {weakIcon}
            </div>
            <p>{`Lecture content understanding: ${materialGood} ${materialMid} ${materialWeak}  `}</p>
          </div>
        </div>
        <div className="comment-container">
          <LectureComment />
          <LectureComment />
          <LectureComment />
          <LectureComment />
          <LectureComment />
          <LectureComment />
          <LectureComment />
        </div>
      </div>
    </div>
  );
};

export default LectureReview;
