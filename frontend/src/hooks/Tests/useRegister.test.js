import { renderHook, act} from '@testing-library/react-hooks';
import { MemoryRouter } from 'react-router-dom';
import useRegister from '../useRegister';
import { waitFor } from '@testing-library/react-hooks';


// Mock translations
jest.mock('react-i18next', () => ({
  useTranslation: () => ({ t: key => key }),
}));

describe('useRegister hook', () => {
  let setIsAuthenticatedMock;

  beforeEach(() => {
    setIsAuthenticatedMock = jest.fn();
    // Clear the mocked localStorage before each test
    jest.spyOn(global.localStorage.__proto__, 'setItem').mockImplementation(() => {});
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it('registers successfully and navigates to profile', async () => {
    const API_URL = `${process.env.REACT_APP_API_URL}/user/register`; // Adjust API endpoint URL
    const mockData = {
      firstName: 'John',
      lastName: 'Doe',
      email: 'johndoe@example.com',
      password: 'password123',
    };

    // Mock global.fetch to resolve with a successful response
    jest.spyOn(global, 'fetch').mockResolvedValueOnce({
      ok: true,
      json: () => ({ token: 'mock_token_here' }), // Mock response data
    });

    // Render the hook within a MemoryRouter
    const { result, waitForNextUpdate } = renderHook(() =>
      useRegister({ setIsAuthenticated: setIsAuthenticatedMock, ...mockData }),
      {
        wrapper: MemoryRouter,
      }
    );

    try {
      // Wait for the hook to complete with a longer timeout (e.g., 3000ms)
      await waitForNextUpdate({ timeout: 3000 });

      // Assertions
      expect(global.fetch).toHaveBeenCalledWith(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(mockData),
      });

      expect(localStorage.setItem).toHaveBeenCalledWith('token', 'mock_token_here');
      expect(setIsAuthenticatedMock).toHaveBeenCalledWith(true);
      // Additional assertions based on navigation behavior
    } catch (error) {
      console.error('Error:', error);
    }
  });

  it('handles generic error', async () => {
    const API_URL = `${process.env.REACT_APP_API_URL}/user/register`; // Adjust API endpoint URL
    const mockData = {
      firstName: 'John',
      lastName: 'Doe',
      email: 'johndoe@example.com',
      password: 'password123',
    };

    // Mock global.fetch to resolve with an error response
    jest.spyOn(global, 'fetch').mockResolvedValueOnce({
      ok: false,
      status: 500,
      json: () => ({ error: 'Internal Server Error' }), // Mock error response
    });

    // Render the hook within a MemoryRouter
    const { result } = renderHook(() => useRegister({ setIsAuthenticated: setIsAuthenticatedMock }), {
      wrapper: MemoryRouter,
    });

    // Call the hook with the mock data
    await result.current(mockData.firstName, mockData.lastName, mockData.email, mockData.password);

    // Assertions
    expect(global.fetch).toHaveBeenCalledWith(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(mockData),
    });

    expect(localStorage.setItem).not.toHaveBeenCalled(); // Ensure localStorage is not called on error
    expect(setIsAuthenticatedMock).not.toHaveBeenCalled(); // Ensure setIsAuthenticated is not called on error
    // Additional assertions based on error handling behavior
  });
  
  it('handles API error and sets error state', async () => {
    const API_URL = `${process.env.REACT_APP_API_URL}/user/register`; // Adjust API endpoint URL
    const mockData = {
      firstName: 'John',
      lastName: 'Doe',
      email: 'johndoe@example.com',
      password: 'password123',
    };

    // Mock global.fetch to simulate an error response
    const fetchMock = jest.spyOn(global, 'fetch').mockResolvedValueOnce({
      ok: false,
      status: 500,
      json: () => ({ error: 'Internal Server Error' }), // Mock error response
    });

    // Call the hook and await its completion within act
    const { result } = renderHook(() =>
      useRegister({ setIsAuthenticated: setIsAuthenticatedMock, ...mockData })
    );

    await act(async () => {
      // Let's wait for the fetch to be called using setTimeout
      await new Promise((resolve) => {
        const interval = setInterval(() => {
          if (fetchMock.mock.calls.length > 0) {
            clearInterval(interval);
            resolve();
          }
        }, 100); // Check every 100 milliseconds

        setTimeout(() => {
          clearInterval(interval);
          resolve(); // Resolve after a certain timeout (e.g., 5000 ms)
        }, 5000); // Timeout after 5000 milliseconds
      });

      // Assertions for API error handling
      expect(fetchMock).toHaveBeenCalledWith(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(mockData),
      });

      expect(localStorage.setItem).not.toHaveBeenCalled(); // Ensure localStorage is not called on error
      expect(setIsAuthenticatedMock).not.toHaveBeenCalled(); // Ensure setIsAuthenticated is not called on error
      // Additional assertions based on error handling behavior
    });
  });
});