import errorPhoto from "../images/errorPage.png";
import { useTranslation } from "react-i18next";

const ThankYouPage = () => {
  const { t } = useTranslation();
  return (
    <div className="error-page">
      <strong>
        {t("thankYouPage.reviewThankYouMessage")}
        <br />
        {t("thankYouPage.appreciateInputMessage")}
      </strong>
      <img src={errorPhoto} alt="thank-you" />
    </div>
  );
};

export default ThankYouPage;
