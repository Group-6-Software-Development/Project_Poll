import { render, fireEvent } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import Navbar from '../Navbar';
import  jwtDecode  from 'jwt-decode';
import '@testing-library/jest-dom/extend-expect';


jest.mock('jwt-decode', () => jest.fn());

describe('Navbar', () => {
  let setIsAuthenticated;

  beforeEach(() => {
    setIsAuthenticated = jest.fn();
    localStorage.clear();
  });

  it('should render login button when not authenticated', () => {
    const { getByText } = render(
      <Router>
        <Navbar isAuthenticated={false} setIsAuthenticated={setIsAuthenticated} />
      </Router>
    );

    expect(getByText('navbar.loginButton')).toBeInTheDocument();
  });

  it('should render profile and logout buttons when authenticated', () => {
    const { getByText } = render(
      <Router>
        <Navbar isAuthenticated={true} setIsAuthenticated={setIsAuthenticated} />
      </Router>
    );

    expect(getByText('navbar.profileButton')).toBeInTheDocument();
    expect(getByText('navbar.logoutButton')).toBeInTheDocument();
  });

  it('should remove token and set isAuthenticated to false when token is expired', () => {

    require('jwt-decode').mockImplementation(() => ({ exp: 0 }));
    
    const mockJwtDecode = require('jwt-decode');
    mockJwtDecode.mockImplementation(() => ({ exp: 0 })); // Token expires immediately

    // Set the token in localStorage
    localStorage.setItem('token', 'expiredToken');
  
    // Import Navbar component after jwtDecode has been mocked
    const { default: Navbar } = require('../Navbar'); // Adjust this path as needed
  
    // Mock localStorage.removeItem to capture calls and inspect arguments
    const removeItemSpy = jest.spyOn(Storage.prototype, 'removeItem').mockImplementation(() => {});
  
    // Render the Navbar component within a Router
    render(
      <Router>
        <Navbar isAuthenticated={true} setIsAuthenticated={setIsAuthenticated} />
      </Router>
    );
  
    // Assert that localStorage.removeItem was called with the expected arguments
    console.log('removeItemSpy calls:', removeItemSpy.mock.calls); // Inspect calls to removeItemSpy
    expect(removeItemSpy).toHaveBeenCalledWith('token');
  
    // Assert that setIsAuthenticated was called with false
    expect(setIsAuthenticated).toHaveBeenCalledWith(false);
  });
});