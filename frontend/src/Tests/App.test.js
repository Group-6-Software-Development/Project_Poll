import React from 'react';
import { render } from '@testing-library/react';
import App from '../App';

describe('App component', () => {
  it('sets isAuthenticated to true when token is present', () => {
    // Mock localStorage getItem method
    const mockGetItem = jest.fn();
    mockGetItem.mockReturnValue('fakeToken');
    Object.defineProperty(window, 'localStorage', {
      value: { getItem: mockGetItem },
      writable: true,
    });

    // Render the component
    render(<App />);

    // Assert that setIsAuthenticated is called with true
    expect(globalThis.setIsAuthenticated).toHaveBeenCalledWith(true);
  });

  it('sets isAuthenticated to false when token is not present', () => {
    // Mock localStorage getItem method
    const mockGetItem = jest.fn();
    mockGetItem.mockReturnValue(null);
    Object.defineProperty(window, 'localStorage', {
      value: { getItem: mockGetItem },
      writable: true,
    });

    // Render the component
    render(<App />);

    // Assert that setIsAuthenticated is called with false
    expect(globalThis.setIsAuthenticated).toHaveBeenCalledWith(false);
  });
});
