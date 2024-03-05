import { useState } from "react";
import useField from "../hooks/useField";
import useRegister from "../hooks/useRegister";
import "./styles/Register.css";

const Register = ({ setIsAuthenticated }) => {
  const register = useRegister({ setIsAuthenticated });

  const firstName = useField("firstName");
  const lastName = useField("lastName");
  const email = useField("email");
  const password = useField("password");
  const passwordAgain = useField("password");

  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (password.value !== passwordAgain.value) {
      setError("Passwords do not match");
      return;
    } else {
      setError("");

      register(firstName.value, lastName.value, email.value, password.value);
    }
  };

  return (
    <div className="register-page">
      <form className="register-form" onSubmit={handleSubmit}>
        <label className="first-name-message" htmlFor="firstName">
          First Name:
        </label>
        <input {...firstName} className="first-name-input" required />

        <label className="last-name-message" htmlFor="lastName">
          Last Name:
        </label>
        <input {...lastName} className="last-name-input" required />

        <label className="email-message" htmlFor="email">
          Email:
        </label>
        <input {...email} className="email-input" required />

        <label className="password-message" htmlFor="password">
          Password:
        </label>
        <input {...password} className="password-input" required />

        <label className="password-again-message" htmlFor="passwordAgain">
          Password again:
        </label>
        <input {...passwordAgain} className="password-again-input" required />

        {error && (
          <p
            style={{ color: "red", textAlign: "center", margin: "0 0 10px 0" }}
          >
            {error}
          </p>
        )}

        <button className="register-button" type="submit">
          Register
        </button>
      </form>
    </div>
  );
};

export default Register;
