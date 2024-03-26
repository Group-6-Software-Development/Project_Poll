import React from 'react';
import { useTranslation } from 'react-i18next';

const LanguageChangerButton = () => {
  const { i18n } = useTranslation();

  const changeLanguage = (language) => {
    console.log('Changing language to:', language); // Add log here
    i18n.changeLanguage(language);
  };

  return (
    <div className="language-changer">
      <button onClick={() => changeLanguage('en')}>English</button>
      <button onClick={() => changeLanguage('sv')}>Swedish</button>
    </div>
  );
};

export default LanguageChangerButton;
