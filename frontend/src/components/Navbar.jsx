import { useEffect } from "react";
import "./styles/Navbar.css";
import logo from "../images/logo.png";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import LanguageChangerButton from "./LanguageChangerButton";
import { jwtDecode } from "jwt-decode";

const Navbar = ({ isAuthenticated, setIsAuthenticated }) => {
  const { t } = useTranslation();

  const navigate = useNavigate();

  useEffect(() => {
    console.log("Checking token");
    const token = localStorage.getItem("token");

    if (token) {
      const decodedToken = jwtDecode(token);

      const expirationTime = decodedToken.exp * 1000;

      if (expirationTime < Date.now()) {
        localStorage.removeItem("token");
        setIsAuthenticated(false);
      }
    }
  }, [setIsAuthenticated]);

  return (
    <div className="navbar">
      <div className="logo-container">
        <a href="/">
          <img src={logo} alt="Logo" className="logo" />
        </a>
      </div>

      <div className="right-corner">
        {/* Language switcher */}
        <LanguageChangerButton />

        {isAuthenticated ? (
          <>
            <button
              className="profile-button"
              onClick={() => {
                navigate("/profile");
              }}
            >
              {t("navbar.profileButton")}
            </button>
            <button
              className="profile-button"
              onClick={() => {
                localStorage.removeItem("token");
                setIsAuthenticated(false);
                navigate("/");
              }}
            >
              {t("navbar.logoutButton")}
            </button>
          </>
        ) : (
          <button
            className="login-button"
            onClick={() => {
              navigate("/login");
            }}
          >
            {t("navbar.loginButton")}
          </button>
        )}
      </div>
    </div>
  );
};

export default Navbar;
