import LectureCard from "../components/LectureCard";

const LecturePreview = () => {
  const lectureCode = "getLecCode"; // TODO Get lecture codes from server

  return (
    <div className="lecture-preview">
      <h2>
        Lecture Preview / <span className="lecture-code">{lectureCode}</span>{" "}
      </h2>
      <div className="lecture-card-container">
        <LectureCard />
      </div>
      <div className="new-lecture">
        <button>New Lecture</button>
      </div>
    </div>
  );
};

export default LecturePreview;
