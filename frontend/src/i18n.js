import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import translationEN from "./locales/en/translation.json";
import translationFI from "./locales/fi/translation.json";
import translationSV from './locales/sv/translation.json'; // Swedish translations
import translationZH from './locales/zh/translation.json'; // Chinese translations

i18n.use(initReactI18next).init({
  resources: {
    en: {
      translation: translationEN, // English translations
    },
    fi: {
      translation: translationFI, // Finnish translations
    },
    sv: {
      translation: translationSV, // Swedish translations
    },
    zh: {
      translation: translationZH, // Chinese translations
    },
  },
  lng:
    localStorage.getItem("LOCALE_SWITCHER_LANGUAGE") ||
    localStorage.getItem("language") ||
    navigator.language ||
    navigator.userLanguage,
  fallbackLng: "en",
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
