import React from "react";
import "./styles/Navbar.css";
import logo from "../images/logo.png";
import { useNavigate } from "react-router-dom";
import LanguageChangerButton from "./LanguageChangerButton"; // Import the LanguageChangerButton component

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
        {/* Add LanguageChangerButton component here */}
        <LanguageChangerButton />

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
