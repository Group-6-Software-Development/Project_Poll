import React from "react";
import { useTranslation } from "react-i18next";
import useField from "../hooks/useField";
import useLogin from "../hooks/useLogin";
import "./styles/Login.css";

const Login = ({ setIsAuthenticated }) => {
  const { t } = useTranslation();

  const login = useLogin({ setIsAuthenticated });

  const email = useField("email");
  const password = useField("password");

  const handleSubmit = (e) => {
    e.preventDefault();

    login(email.value, password.value);
  };

  return (
    <div className="login-page">
      <form className="login-form" onSubmit={handleSubmit}>
        <label className="email-message" htmlFor="email">
          {t("login.email")}:
        </label>
        <input
          {...email}
          className="email-input"
          data-testid="email-input"
          required
        />

        <label className="password-message" htmlFor="password">
          {t("login.password")}:
        </label>
        <input
          {...password}
          className="password-input"
          data-testid="password-input"
          required
        />

        <button className="login-button" type="submit" data-testid="login-form">
          {t("login.loginButton")}
        </button>
      </form>
    </div>
  );
};

export default Login;
