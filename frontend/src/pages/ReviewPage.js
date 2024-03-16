import { useState, useRef, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFaceSmile,
  faFaceMeh,
  faFaceFrown,
} from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";

const ReviewPage = () => {
  const navigate = useNavigate();

  const lectureUUID = window.location.pathname.split("/")[2];
  useEffect(() => {
    const course = localStorage.getItem("coursesReviewed");
    if (course === lectureUUID) {
      navigate("/thank-you");
    }
  }, []);

  const textareaRef = useRef(null);

  function handleSubmit(e) {
    e.preventDefault();
    console.log(convertRating(selectedContentIcon));
    console.log(convertRating(selectedMaterialIcon));
    console.log(textareaRef.current.value);
    console.log(lectureUUID);

    const reviewed = localStorage.getItem("coursesReviewed");

    if (reviewed === lectureUUID) {
      navigate("/thank-you");
      return;
    } else {
      submitReview(
        lectureUUID,
        convertRating(selectedContentIcon),
        convertRating(selectedMaterialIcon),
        textareaRef.current.value
      );
    }
  }

  const submitReview = async (
    lectureUUID,
    contentRating,
    materialRating,
    review
  ) => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/review/create`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            lectureUUID: lectureUUID,
            understandingRating: contentRating,
            materialRating: materialRating,
            comment: review,
          }),
        }
      );

      if (response.status === 201) {
        // localStorage.setItem("coursesReviewed", lectureUUID);
        navigate("/thank-you");
      } else {
        alert("Failed to submit review");
      }
    } catch (error) {
      console.log(error);
    }
  };

  function handleForm(e) {
    e.preventDefault();
  }

  const convertRating = (rating) => {
    switch (rating) {
      case "good":
        return 3;
      case "neutral":
        return 2;
      case "weak":
        return 1;
      default:
        return null;
    }
  };

  const [selectedContentIcon, setSelectedContentIcon] = useState(null);
  const [selectedMaterialIcon, setSelectedMaterialIcon] = useState(null);

  const goodIcon = (selectedIcon, setSelectedIcon) => (
    <FontAwesomeIcon
      icon={faFaceSmile}
      style={{ color: selectedIcon === "good" ? "#4caf50" : "grey" }}
      size="3x"
      onClick={() => setSelectedIcon("good")}
    />
  );

  const neutralIcon = (selectedIcon, setSelectedIcon) => (
    <FontAwesomeIcon
      icon={faFaceMeh}
      style={{ color: selectedIcon === "neutral" ? "#ffd528" : "grey" }}
      size="3x"
      onClick={() => setSelectedIcon("neutral")}
    />
  );

  const weakIcon = (selectedIcon, setSelectedIcon) => (
    <FontAwesomeIcon
      icon={faFaceFrown}
      style={{ color: selectedIcon === "weak" ? "#d0342c" : "grey" }}
      size="3x"
      onClick={() => setSelectedIcon("weak")}
    />
  );

  return (
    <div className="review-page-container">
      <form onSubmit={handleForm}>
        <div className="content-card">
          <p>How well did you understand the lectures content?</p>
          <button>
            {goodIcon(selectedContentIcon, setSelectedContentIcon)}
          </button>
          <button>
            {neutralIcon(selectedContentIcon, setSelectedContentIcon)}
          </button>
          <button>
            {weakIcon(selectedContentIcon, setSelectedContentIcon)}
          </button>
        </div>
        <div className="material-card">
          <p>What did you think of the lecture material?</p>
          <button>
            {goodIcon(selectedMaterialIcon, setSelectedMaterialIcon)}
          </button>
          <button>
            {neutralIcon(selectedMaterialIcon, setSelectedMaterialIcon)}
          </button>
          <button>
            {weakIcon(selectedMaterialIcon, setSelectedMaterialIcon)}
          </button>
        </div>
        <label>
          Free word:
          <br />
          <textarea
            ref={textareaRef}
            name="lecture-review"
            id=""
            cols="40"
            rows="10"
            defaultValue=""
          />
        </label>{" "}
        <br />
        <button className="submit-button" type="submit" onClick={handleSubmit}>
          Submit
        </button>
      </form>
    </div>
  );
};

export default ReviewPage;
