// i18n.js

import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// Translations
import enTranslations from './locales/en/translation.json'; // English translations
import svTranslations from './locales/sv/translation.json'; // Swedish translations

// Configure i18next
i18n
  .use(initReactI18next) // bind react-i18next to i18next
  .init({
    resources: {
      en: {
        translation: enTranslations,
      },
      sv: {
        translation: svTranslations,
      },
    },
    lng: 'en', // default language
    interpolation: {
      escapeValue: false, // react already safes from xss
    },
  });

export default i18n;
