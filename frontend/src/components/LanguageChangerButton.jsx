import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import "./styles/LanguageChangerButton.css";
import "flag-icons/css/flag-icons.min.css";

const LanguageChangerButton = () => {
  const { i18n } = useTranslation();
  const { t } = useTranslation();
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    const savedLanguage = localStorage.getItem("language");
    console.log("Retrieved language from local storage:", savedLanguage);
    if (savedLanguage) {
      i18n.changeLanguage(savedLanguage);
    }
  }, [i18n]);

  const changeLanguage = (language) => {
    console.log("Changing language to:", language);
    i18n.changeLanguage(language);
    setIsActive(false);
    localStorage.setItem("language", language);
  };

  const toggleDropdown = () => {
    setIsActive(!isActive);
  };

  console.log("Current language:", i18n.language);

  return (
    <div className="language-changer">
      <div className={`dropdown ${isActive ? "active" : ""}`}>
        <button className="dropbtn" onClick={toggleDropdown}>
          {i18n.language === "en" ? (
            <span className="fi fi-us" />
          ) : i18n.language === "fi" ? (
            <span className="fi fi-fi" />
          ) : i18n.language === "sv" ? (
            <span className="fi fi-se" />
          ) : i18n.language === "zh" ? (
            <span className="fi fi-cn" />
          ) : (
            <span className="fi fi-us" />
          )}

          {i18n.language === "en"
            ? t("languageSwitcher.englishButton")
            : i18n.language === "fi"
            ? t("languageSwitcher.finnishButton")
            : i18n.language === "sv"
            ? t("languageSwitcher.swedishButton")
            : t("languageSwitcher.englishButton")}
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
          <button onClick={() => changeLanguage("sv")}>
            <span className="fi fi-se" /> {/* Flag icon for Swedish */}
            {t("languageSwitcher.swedishButton")}
          </button>
          <button onClick={() => changeLanguage("zh")}>
            <span className="fi fi-cn" /> {/* Flag icon for Chinese */}
            {t("languageSwitcher.chineseButton")}
          </button>
        </div>
      </div>
    </div>
  );
};

export default LanguageChangerButton;
