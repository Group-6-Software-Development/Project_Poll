import { useNavigate } from "react-router-dom";

export default function useRegister({ setIsAuthenticated }) {
  const navigate = useNavigate();

  const API_URL = "http://localhost:5000/api/user/register";

  const register = async (firstName, lastName, email, password) => {
    console.log("Registering with:", firstName, lastName, email, password);
    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ firstName, lastName, email, password }),
      });

      if (response.ok) {
        const data = await response.json();

        localStorage.setItem("token", data.token);
        setIsAuthenticated(true);
        navigate("/profile");
      } else {
        const error = await response.json();
        alert(error.message);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };
  return register;
}
