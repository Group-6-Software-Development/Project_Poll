import React, { useState } from "react";
import classPhoto from "../images/classroom.png";
import { useTranslation } from "react-i18next";

function LandingPage() {
  const { t } = useTranslation();
  const [lectureCode, setLectureCode] = useState("");

  const handleEvaluateClick = (e) => {
    e.preventDefault();
    console.log(lectureCode);
  };

  return (
    <div className="landing-page">
      <div className="signup-prompt">
        <img src={classPhoto} alt="classroom" />
        <div className="prompt-text">
          <p>
            {t("landingPage.enchanceLectures")}
            <br />
            {t("landingPage.insighfulFeedback")}
          </p>
        </div>
        <div className="prompt-button">
          <a href="/signup">
            <button>{t("landingPage.signupButton")}</button>
          </a>
        </div>
      </div>

      <div className="grading-prompt">
        <div className="grading-text">
          <form>
            <label>{t("landingPage.gradingLecture")}</label>
            <br />
            <input
              type="text"
              placeholder={t("landingPage.typeCode")}
              value={lectureCode}
              onChange={(e) => setLectureCode(e.target.value)}
            />
            <button onClick={handleEvaluateClick}>
              {t("landingPage.evaluateButton")}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default LandingPage;
