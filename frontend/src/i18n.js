import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import translationEN from "./locales/en/translation.json";
import translationFI from "./locales/fi/translation.json";

// Initialize i18next
i18n
  .use(initReactI18next) // Initialize react-i18next
  .init({
    resources: {
      en: {
        translation: translationEN, // English translations
      },
      fi: {
        translation: translationFI, // Finnish translations
      },
    },
    lng: navigator.language || navigator.userLanguage, // Set initial language based on browser's language preference
    fallbackLng: "en", // Fallback language if preferred language is not available
    interpolation: {
      escapeValue: false, // React already does escaping
    },
  });

export default i18n;
