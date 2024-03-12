import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFaceSmile,
  faFaceMeh,
  faFaceFrown,
} from "@fortawesome/free-solid-svg-icons";
import LectureComment from "../components/LectureComment";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const goodIcon = (
  <FontAwesomeIcon icon={faFaceSmile} style={{ color: "#5cb85c" }} size="3x" />
);

const neutralIcon = (
  <FontAwesomeIcon icon={faFaceMeh} style={{ color: "#ffd528" }} size="3x" />
);

const weakIcon = (
  <FontAwesomeIcon icon={faFaceFrown} style={{ color: "#d0342c" }} size="3x" />
);

const LectureReview = () => {
  const navigate = useNavigate();
  const lecture_uuid = window.location.pathname.split("/")[2];

  const [contentGood, setContentGood] = useState(0);
  const [contentMid, setContentMid] = useState(0);
  const [contentWeak, setContentWeak] = useState(0);

  const [materialGood, setMaterialGood] = useState(0);
  const [materialMid, setMaterialMid] = useState(0);
  const [materialWeak, setMaterialWeak] = useState(0);
  const [comments, setComments] = useState([]);
  const [lectureCode, setLectureCode] = useState("");
  const [lectureDate, setLectureDate] = useState("");

  useEffect(() => {
    fetchLectureInfo();
    fetchReviews();
  }, []);

  const fetchLectureInfo = async () => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/lecture/${lecture_uuid}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (response.ok) {
        const lecture = await response.json();

        setLectureCode(lecture.course_id);
        setLectureDate(lecture.lecture_date);
      } else {
        const error = await response.json();

        if (response.status === 401) {
          localStorage.removeItem("token");
          alert("Login expired. Please login again.");
          navigate("/login");
        } else {
          alert(error.error);
        }
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const fetchReviews = async () => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/review/reviews/${lecture_uuid}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (response.ok) {
        const reviews = await response.json();

        let contentGoodCount = 0;
        let contentMidCount = 0;
        let contentWeakCount = 0;

        let materialGoodCount = 0;
        let materialMidCount = 0;
        let materialWeakCount = 0;

        reviews.forEach((review) => {
          if (review.understanding_rating === 3) {
            contentGoodCount++;
          } else if (review.understanding_rating === 2) {
            contentMidCount++;
          } else if (review.understanding_rating === 1) {
            contentWeakCount++;
          }

          if (review.material_rating === 3) {
            materialGoodCount++;
          } else if (review.material_rating === 2) {
            materialMidCount++;
          } else if (review.material_rating === 1) {
            materialWeakCount++;
          }
        });

        setContentGood(contentGoodCount);
        setContentMid(contentMidCount);
        setContentWeak(contentWeakCount);

        setMaterialGood(materialGoodCount);
        setMaterialMid(materialMidCount);
        setMaterialWeak(materialWeakCount);

        setComments(reviews.map((review) => review.comment));
      } else {
        const error = await response.json();

        if (response.status === 401) {
          localStorage.removeItem("token");
          alert("Login expired. Please login again.");
          navigate("/login");
        } else if (response.status === 404) {
          console.log("No reviews found for this lecture.");
        } else {
          alert(error.error);
        }
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

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
            <p>{`Lecture material understanding: ${materialGood} ${materialMid} ${materialWeak}  `}</p>
          </div>
        </div>
        <div className="comment-container">
          {comments
            .filter((comment) => comment.trim() !== "")
            .map((comment, index) => (
              <LectureComment
                key={index}
                commentNumber={index + 1}
                commentText={comment}
              />
            ))}
        </div>
      </div>
    </div>
  );
};

export default LectureReview;
