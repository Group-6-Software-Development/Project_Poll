import React from "react";
import Register from "./components/Register";
import Login from "./components/Login";
import "./styles/app.css";
import Navbar from "./components/Navbar";
import UserPage from "./pages/UserPage";
import LandingPage from "./pages/LandingPage";
import Footer from './components/Footer'
import { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(
    Boolean(localStorage.getItem("token")) || false
  );

  return (
    <div className="App">
      <BrowserRouter>
        <Navbar
          isAuthenticated={false}
          setIsAuthenticated={setIsAuthenticated}
        />
        <LandingPage />
        <Routes>
          <Route path="/profile" element={<UserPage />} />
          <Route
            path="/register"
            element={<Register setIsAuthenticated={setIsAuthenticated} />}
          />
          <Route
            path="/login"
            element={<Login setIsAuthenticated={setIsAuthenticated} />}
          />
        </Routes>
        <Footer/>
      </BrowserRouter>
    </div>
  );
};

export default App;
