import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

export default function useLogin({ setIsAuthenticated }) {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const API_URL = `${process.env.REACT_APP_API_URL}/user/login`;

  const login = async (email, password) => {
    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        const data = await response.json();

        localStorage.setItem("token", data.token);
        setIsAuthenticated(true);
        navigate("/profile");
      } else if (response.status === 401) {
        const error = await response.json();
        console.log(error.error);
        alert(t("useLogin.loginFailed"));
      } else {
        const error = await response.json();
        console.log(error.error);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };
  return login;
}
