import React from 'react';
import i18n from 'i18next';
import "@testing-library/jest-dom";
import { render, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import { I18nextProvider } from 'react-i18next';
import { useTranslation } from 'react-i18next';
import * as reactRouterDom from 'react-router-dom';
import useLogin from '../useLogin';

// Mock the fetch function
global.fetch = jest.fn(() =>
  Promise.resolve({
    ok: true,
    json: () => Promise.resolve({ token: 'fakeToken' }),
  })
);

jest.mock('react-i18next', () => ({
    useTranslation: () => ({ t: key => key }),
}));

describe('useLogin', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('login success', async () => {
    const setIsAuthenticated = jest.fn();
    const login = useLogin({ setIsAuthenticated });

    await login('test@example.com', 'password');

    expect(localStorage.setItem).toHaveBeenCalledWith('token', 'fakeToken');
    expect(setIsAuthenticated).toHaveBeenCalledWith(true);
  });

  test('login failure - unauthorized', async () => {
    global.fetch.mockImplementationOnce(() =>
      Promise.resolve({
        status: 401,
        json: () => Promise.resolve({ error: 'Unauthorized' }),
      })
    );

    const setIsAuthenticated = jest.fn();
    const login = useLogin({ setIsAuthenticated });

    const { getByText } = render(
      <Router>
        <I18nextProvider i18n={i18n}>
          <button onClick={() => login('test@example.com', 'password')}>Login</button>
        </I18nextProvider>
      </Router>
    );

    fireEvent.click(getByText('Login'));

    await waitFor(() => {
      expect(setIsAuthenticated).not.toHaveBeenCalled();
      expect(localStorage.setItem).not.toHaveBeenCalled();
      expect(global.fetch).toHaveBeenCalledTimes(1);
      expect(global.fetch).toHaveBeenCalledWith(`${process.env.REACT_APP_API_URL}/user/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: 'test@example.com', password: 'password' }),
      });
      expect(getByText('useLogin.loginFailed')).toBeInTheDocument();
    });
  });

  test('redirect to profile page after successful login', async () => {
    const setIsAuthenticated = jest.fn();
    const navigate = jest.fn();
    jest.spyOn(reactRouterDom, 'useNavigate').mockReturnValue(navigate); // Mock useNavigate
    const login = useLogin({ setIsAuthenticated });

    await login('test@example.com', 'password');

    expect(navigate).toHaveBeenCalledWith('/profile');
  });
});
