import errorPhoto from "../images/errorPage.png";
import { useTranslation } from "react-i18next";

const ErrorPage = () => {
  const { t } = useTranslation();

  return (
    <div className="error-page">
      <strong>
        {t("errorPage.emptyClassroomError")}
        <br />
        {t("errorPage.tryAnotherCodeMessage")}
      </strong>
      <img src={errorPhoto} alt="error" />
    </div>
  );
};

export default ErrorPage;
