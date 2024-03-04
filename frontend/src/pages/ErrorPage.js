import errorPhoto from "../images/errorPage.png";

const ErrorPage = () => {
  return (
    <div className="error-page">
      <strong>
        Woops! looks like this classroom is empty, or something has gone wrong
        on our end. <br /> Please try another classroom code or make your way to
        the homepage.
      </strong>
      <img src={errorPhoto} />
    </div>
  );
};

export default ErrorPage;
