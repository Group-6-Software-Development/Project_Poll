import React from "react";
import Register from "./components/Register";
import Login from "./components/Login";
import "./styles/app.css";
import Navbar from "./components/Navbar";
import UserPage from "./pages/UserPage";
import LandingPage from "./pages/LandingPage";
import Footer from "./components/Footer";
import { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ErrorPage from "./pages/ErrorPage";
import LecturePreview from "./pages/LecturePreview";
import LectureReview from "./pages/LectureReview";
import LinkPage from "./pages/LinkPage";
import ReviewPage from "./pages/ReviewPage";

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(
    Boolean(localStorage.getItem("token")) || false
  );

  return (
    <div className="App">
      <BrowserRouter>
        <Navbar
          isAuthenticated={isAuthenticated}
          setIsAuthenticated={setIsAuthenticated}
        />
        <Routes>
          <Route path="/" element={<LandingPage />} />

          {isAuthenticated ? (
            <Route path="/profile" element={<UserPage />} />
          ) : (
            <>
              <Route
                path="/signup"
                element={<Register setIsAuthenticated={setIsAuthenticated} />}
              />

              <Route
                path="/login"
                element={<Login setIsAuthenticated={setIsAuthenticated} />}
              />
            </>
          )}

          {/* Sivu jossa näkyy kurssin kaikki tunnit */}
          <Route path="/lecture/:id" element={<LecturePreview />} />

          {/* Sivu jossa näkyy yhden tunnin kaikki arvostelut */}
          <Route path="/reviews/:id" element={<LectureReview />} />

          {/* Tunnin arvostelu sivu */}
          <Route path="/review" element={<ReviewPage />} />

          {/* Sivu jossa näkyy QR-koodi */}
          <Route path="/link" element={<LinkPage />} />

          {/* Sivu jossa näkyy virheviesti */}
          <Route path="*" element={<ErrorPage />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
};

export default App;
