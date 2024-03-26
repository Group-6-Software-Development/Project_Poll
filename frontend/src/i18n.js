import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import enTranslations from './locales/en/translation.json'; // English translations
import svTranslations from './locales/sv/translation.json'; // Swedish translations

// Initialize i18next
i18n
  .use(initReactI18next) // Initialize react-i18next
  .init({
    resources: {
      en: {
        translation: enTranslations, // English translations
      },
      sv: {
        translation: svTranslations,
      },
    },
    lng: navigator.language || navigator.userLanguage, // Set initial language based on browser's language preference
    fallbackLng: "en", // Fallback language if preferred language is not available
    interpolation: {
      escapeValue: false, // React already does escaping
    },
  });

export default i18n;