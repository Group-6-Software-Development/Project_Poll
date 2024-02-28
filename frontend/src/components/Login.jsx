import React from "react";
import useField from "../hooks/useField";
import "./styles/Login.css";

const Login = ({ setIsAuthenticated }) => {
  const email = useField("email");
  const password = useField("password");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Logging in with:", {
      email: email.value,
      password: password.value,
    });
  };

  return (
    <div className="login-page">
      <form className="login-form" onSubmit={handleSubmit}>
        <label className="email-message" htmlFor="email">
          Email:
        </label>
        <input {...email} className="email-input" data-testid="email-input" required />

        <label className="password-message" htmlFor="password">
          Password:
        </label>
        <input {...password} className="password-input" data-testid="password-input" required />

        <button className="login-button" type="submit" data-testiid="login-form">
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
