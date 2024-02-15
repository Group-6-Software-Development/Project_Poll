// Navbar.js

import React from "react";
import "./styles/Navbar.css";

const Navbar = ({ isLoggedIn }) => {
  return (
    <div className="navbar">

      <div className="logo-container">
        <img src="https://placehold.co/" alt="Logo" className="logo" />
      </div>

      <div className="right-corner">
        {isLoggedIn ? (
          <button className="profile-button">Profile</button>
        ) : (
          <button className="login-button">Login</button>
        )}
      </div>
      
    </div>
  );
};

export default Navbar;
