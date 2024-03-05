import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFaceSmile,
  faFaceMeh,
  faFaceFrown,
} from "@fortawesome/free-solid-svg-icons";

const ReviewPage = () => {
    function handleSubmit(e) {
        e.preventDefault();
        //TODO Submit to BE
        alert("Submit button Clicked");
  }
  function handleForm(e) {
    e.preventDefault();
  }

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
