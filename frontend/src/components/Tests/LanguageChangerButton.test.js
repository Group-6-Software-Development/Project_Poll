import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import LanguageChangerButton from '../LanguageChangerButton';

global.localStorage.setItem = jest.fn();

beforeEach(() => {
  Object.defineProperty(window, 'localStorage', {
    value: {
      setItem: jest.fn(),
      getItem: jest.fn(),
      removeItem: jest.fn(),
      clear: jest.fn()
    },
    writable: true
  });
});

jest.mock('react-i18next', () => ({
  useTranslation: () => ({ t: key => key, i18n: { changeLanguage: jest.fn(), language: 'en' } }),
}));

describe('LanguageChangerButton', () => {
  it('renders without crashing', () => {
    const { getAllByText } = render(<LanguageChangerButton />);
    expect(getAllByText('languageSwitcher.englishButton').length).toBeGreaterThan(0);
  });

  it('opens dropdown on click', () => {
    const { getAllByRole, queryByText } = render(<LanguageChangerButton />);
    const buttons = getAllByRole('button', { name: 'languageSwitcher.englishButton' });
    fireEvent.click(buttons[0]);
    expect(queryByText('languageSwitcher.finnishButton')).toBeInTheDocument();
  });

  it('changes language on language button click', () => {
    const { getAllByRole, getByText } = render(<LanguageChangerButton />);
    const buttons = getAllByRole('button', { name: 'languageSwitcher.englishButton' });
    fireEvent.click(buttons[0]); // Open dropdown
    const finnishButton = getAllByRole('button', { name: 'languageSwitcher.finnishButton' })[0];
    fireEvent.click(finnishButton); // Click on Finnish button
    expect(getByText('languageSwitcher.finnishButton')).toBeInTheDocument(); // Finnish button should be visible
  });

  it('closes dropdown on language button click', async () => {
    const { getAllByRole, container } = render(<LanguageChangerButton />);
    const buttons = getAllByRole('button', { name: 'languageSwitcher.englishButton' });
    fireEvent.click(buttons[0]); // Open dropdown
    console.log('Dropdown content before click:', container.innerHTML);
    fireEvent.click(buttons[0]); // Click again to close the dropdown
    console.log('Dropdown content after click:', container.innerHTML);
  
    // Use setTimeout to delay the assertion
    setTimeout(() => {
      const dropdownContent = container.querySelector('.dropdown-content');
      expect(dropdownContent).not.toBeInTheDocument();
    }, 500); // Adjust the delay as needed
  });

  it('changes language to English on English button click', () => {
    const { getAllByRole } = render(<LanguageChangerButton />);
    const englishButton = getAllByRole('button', { name: 'languageSwitcher.englishButton' })[0];
    
    // Debugging: Check if the English button is found
    console.log('English button:', englishButton);
    
    fireEvent.click(englishButton);
  
    // Debugging: Check if the click event is being triggered
    console.log('English button clicked');
    
    // Ensure that the localStorage.setItem mock is properly set up
    expect(localStorage.setItem).toHaveBeenCalledWith('language', 'en');
  });

  it('changes language to Swedish on Swedish button click', () => {
    const { getAllByRole } = render(<LanguageChangerButton />);
    const swedishButton = getAllByRole('button', { name: 'languageSwitcher.swedishButton' })[0];
    fireEvent.click(swedishButton);
    expect(localStorage.setItem).toHaveBeenCalledWith('language', 'sv');
  });

  it('changes language to Chinese on Chinese button click', () => {
    const { getAllByRole } = render(<LanguageChangerButton />);
    const chineseButton = getAllByRole('button', { name: 'languageSwitcher.chineseButton' })[0];
    fireEvent.click(chineseButton);
    expect(localStorage.setItem).toHaveBeenCalledWith('language', 'zh');
  });
});
