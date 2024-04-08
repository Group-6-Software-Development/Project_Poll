import React, { useState, useRef, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFaceSmile,
  faFaceMeh,
  faFaceFrown,
} from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

const ReviewPage = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const lectureUUID = window.location.pathname.split("/")[2];
  useEffect(() => {
    const course = localStorage.getItem("coursesReviewed");
    if (course === lectureUUID) {
      navigate("/thank-you");
    }
  }, []);

  const textareaRef = useRef(null);
  const [remainingChars, setRemainingChars] = useState(255);

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
        localStorage.setItem("coursesReviewed", lectureUUID);
        navigate("/thank-you");
      } else {
        alert(t("reviewPage.submitReviewFailedAlert"));
      }
    } catch (error) {
      console.log(error);
    }
  };

  function handleForm(e) {
    e.preventDefault();
  }

  const handleTextareaChange = (e) => {
    const inputText = e.target.value;
    const remaining = 255 - inputText.length;
    setRemainingChars(remaining);
  };

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
          <p>{t("reviewPage.lectureUnderstandingQuestion")}</p>
          <button>
            {weakIcon(selectedContentIcon, setSelectedContentIcon)}
          </button>
          <button>
            {neutralIcon(selectedContentIcon, setSelectedContentIcon)}
          </button>
          <button>
            {goodIcon(selectedContentIcon, setSelectedContentIcon)}
          </button>
        </div>
        <div className="material-card">
          <p>{t("reviewPage.lectureMaterialOpinionQuestion")}</p>
          <button>
            {weakIcon(selectedMaterialIcon, setSelectedMaterialIcon)}
          </button>
          <button>
            {neutralIcon(selectedMaterialIcon, setSelectedMaterialIcon)}
          </button>
          <button>
            {goodIcon(selectedMaterialIcon, setSelectedMaterialIcon)}
          </button>
        </div>
        <label>
          {t("reviewPage.additionalComments")}
          <br />
          <textarea
            ref={textareaRef}
            name="lecture-review"
            id=""
            cols="40"
            rows="10"
            maxLength="255"
            defaultValue=""
            onChange={handleTextareaChange}
          />
          <div>
            {remainingChars} {t("reviewPage.charactersRemaining")}
          </div>
        </label>{" "}
        <br />
        <button className="submit-button" type="submit" onClick={handleSubmit}>
          {t("reviewPage.submitReview")}
        </button>
      </form>
    </div>
  );
};

export default ReviewPage;
