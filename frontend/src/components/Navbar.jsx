// Navbar.js

import React from "react";
import "./styles/Navbar.css";
import logo from "../images/logo.png";
import { useNavigate } from "react-router-dom";

const Navbar = ({ isAuthenticated, setIsAuthenticated }) => {
  const navigate = useNavigate();

  return (
    <div className="navbar">
      <div className="logo-container">
        <a href="/">
          <img src={logo} alt="Logo" className="logo" />
        </a>
      </div>

      <div className="right-corner">
        {isAuthenticated ? (
          <>
            <button
              className="profile-button"
              onClick={() => {
                navigate("/profile");
              }}
            >
              Profile
            </button>
            <button
              className="profile-button"
              onClick={() => {
                localStorage.removeItem("token");
                setIsAuthenticated(false);
                navigate("/");
              }}
            >
              Logout
            </button>
          </>
        ) : (
          <button
            className="login-button"
            onClick={() => {
              navigate("/login");
            }}
          >
            Login
          </button>
        )}
      </div>
    </div>
  );
};

export default Navbar;
