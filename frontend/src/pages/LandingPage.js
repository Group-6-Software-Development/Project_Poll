import classPhoto from "../images/classroom.png";

function LandingPage() {
  return (
    <div className="landing-page">
      <div className="signup-prompt">
        <img src={classPhoto} alt="classroom" />
        <div className="prompt-text">
          <p>
            Enhance your lectures by gathering <br /> insightful student
            feedback.
          </p>
        </div>
        <div className="prompt-button">
          <a href="/signup">
            <button>Signup</button>
          </a>
        </div>
      </div>

      <div className="grading-prompt">
        <div className="grading-text">
          <form>
            <label>Looking to grade a lecture?</label>
            <br />
            <input type="text" placeholder="Type lecture code here..." />
            <button>Evaluate</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default LandingPage;
