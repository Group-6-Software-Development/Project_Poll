import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect'; // Jest-dom extension
import { I18nextProvider } from 'react-i18next';
import i18n from 'i18next'; // i18next or translation dependency
import Footer from '../Footer';

describe('Footer component', () => {
  // Initialize i18next before tests
  beforeAll(() => {
    i18n.init({
      interpolation: { escapeValue: false }, // Not needed because react-testing-library handles interpolation automatically
      lng: 'en', // Language for translation (can be any supported language)
      resources: {
        en: {
          translation: {
            'footer.copyRight': 'Copyright',
          },
        },
      },
    });
  });

  it('renders the footer with current year and translated text', () => {
    render(
      <I18nextProvider i18n={i18n}>
        <Footer />
      </I18nextProvider>
    );

    const currentYear = new Date().getFullYear();
    const expectedText = `Copyright - ${currentYear}`;

    // Find text within the rendered Footer component
    const footerTextElement = screen.getByText(expectedText);

    // Check that the expected text is found and part of the rendered component
    expect(footerTextElement).toBeInTheDocument();
  });
});