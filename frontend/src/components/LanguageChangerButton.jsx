import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import "./styles/LanguageChangerButton.css";
import "/node_modules/flag-icons/css/flag-icons.min.css"; // Import flag-icons CSS

const LanguageChangerButton = () => {
  const { i18n } = useTranslation();
  const { t } = useTranslation();
  const [isActive, setIsActive] = useState(false);

  const changeLanguage = (language) => {
    console.log("Changing language to:", language);
    i18n.changeLanguage(language);
    setIsActive(false); // Close the dropdown after language change
  };

  const toggleDropdown = () => {
    setIsActive(!isActive);
  };

  return (
    <div className="language-changer">
      <div className={`dropdown ${isActive ? "active" : ""}`}>
        <button className="dropbtn" onClick={toggleDropdown}>
          {i18n.language === "en" ? (
            <span className="fi fi-us" /> // Flag icon for English
          ) : (
            <span className="fi fi-fi" /> // Flag icon for Finnish
          )}
          {i18n.language === "en"
            ? t("languageSwitcher.englishButton")
            : t("languageSwitcher.finnishButton")}
        </button>
        <div className="dropdown-content">
          <button onClick={() => changeLanguage("en")}>
            <span className="fi fi-us" /> {/* Flag icon for English */}
            {t("languageSwitcher.englishButton")}
          </button>
          <button onClick={() => changeLanguage("fi")}>
            <span className="fi fi-fi" /> {/* Flag icon for Finnish */}
            {t("languageSwitcher.finnishButton")}
          </button>
        </div>
      </div>
    </div>
  );
};

export default LanguageChangerButton;
