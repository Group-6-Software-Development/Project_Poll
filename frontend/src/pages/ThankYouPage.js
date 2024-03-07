import errorPhoto from "../images/errorPage.png";

const ThankYouPage = () => {
  return (
    <div className="error-page">
      <strong>
        Thank you for taking the time to review. Your feedback is valuable to
        us!
        <br /> We appreciate your input and strive to improve.
      </strong>
      <img src={errorPhoto} alt="thank-you" />
    </div>
  );
};

export default ThankYouPage;
