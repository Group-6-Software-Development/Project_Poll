import "./styles/Footer.css";
import { useTranslation } from "react-i18next";

const year = new Date().getFullYear();

const Footer = () => {
  const { t } = useTranslation();
  return (
    <footer>
      <p> {`${t("footer.copyRight")} - ${year}`} </p>
    </footer>
  );
};

export default Footer;
