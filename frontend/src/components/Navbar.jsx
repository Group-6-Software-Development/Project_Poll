// Navbar.js

import React from "react";
import "./styles/Navbar.css";
import logo from "../images/logo.png";

const Navbar = ({ isAuthenticated, setIsAuthenticated }) => {
  return (
    <div className="navbar">
      <div className="logo-container">
        <a href="/">
          <img src={logo} alt="Logo" className="logo" />
        </a>
      </div>

      <div className="right-corner">
        {isAuthenticated ? (
          <button className="profile-button">Profile</button>
        ) : (
          <button className="login-button">Login</button>
        )}
      </div>

      <div className="content-buffer"></div>
    </div>
  );
};

export default Navbar;
