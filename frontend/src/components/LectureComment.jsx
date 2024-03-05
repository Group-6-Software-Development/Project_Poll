import "./styles/LectureComment.css"

const LectureComment = () => {
  //TODO get comment and number from be
  const commentNumber = 1;
  const commentText =
    "sadsaLorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt";
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