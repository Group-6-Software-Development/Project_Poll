import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFaceSmile,
  faFaceMeh,
  faFaceFrown,
} from "@fortawesome/free-solid-svg-icons";
import { useState, useEffect } from "react";
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

const LectureCard = ({
  lectureCode,
  courseName,
  lectureDate,
  lecture_uuid,
}) => {
  const [ratings, setRatings] = useState({
    good: 0,
    neutral: 0,
    weak: 0,
  });

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await fetch(
          `http://localhost:5000/api/review/reviews/${lecture_uuid}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        if (response.ok) {
          const reviews = await response.json();
          const updatedRatings = { good: 0, neutral: 0, weak: 0 };

          reviews.forEach((review) => {
            updatedRatings.good += review.material_rating === 3 ? 1 : 0;
            updatedRatings.neutral += review.material_rating === 2 ? 1 : 0;
            updatedRatings.weak += review.material_rating === 1 ? 1 : 0;

            updatedRatings.good += review.understanding_rating === 3 ? 1 : 0;
            updatedRatings.neutral += review.understanding_rating === 2 ? 1 : 0;
            updatedRatings.weak += review.understanding_rating === 1 ? 1 : 0;
          });

          setRatings(updatedRatings);
        } else if (response.status === 404) {
          console.log("No reviews found");
        } else {
          console.error("Failed to fetch reviews");
        }
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchReviews();
  }, [lecture_uuid]);

  return (
    <div className="lecture-card">
      <a href={`http://localhost:3000/reviews/${lecture_uuid}`}>
        <div className="lecture-code">
          <p>{lectureCode}</p>
          <h5>{courseName}</h5>
        </div>
        <div className="lecture-rating">
          <div className="good-rating">
            <strong>{ratings.good}</strong>
            {goodIcon}
          </div>
          <div className="neutral-rating">
            <strong>{ratings.neutral}</strong>
            {neutralIcon}
          </div>
          <div className="weak-rating">
            <strong>{ratings.weak}</strong>
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
