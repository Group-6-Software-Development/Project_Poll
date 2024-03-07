import "./styles/LectureComment.css";

const LectureComment = ({ commentText, commentNumber }) => {
  return (
    <div className="comment-box">
      <div className="comment-number"> {commentNumber} </div>
      <div className="comment-text">
        <p> {commentText} </p>
      </div>
    </div>
  );
};

export default LectureComment;
