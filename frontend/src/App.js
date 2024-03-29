import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import i18n from "./i18n";
import Register from "./components/Register";
import Login from "./components/Login";
import "./styles/app.css";
import Navbar from "./components/Navbar";
import UserPage from "./pages/UserPage";
import LandingPage from "./pages/LandingPage";
import Footer from "./components/Footer";
import ErrorPage from "./pages/ErrorPage";
import LecturePreview from "./pages/LecturePreview";
import LectureReview from "./pages/LectureReview";
import LinkPage from "./pages/LinkPage";
import ReviewPage from "./pages/ReviewPage";
import ThankYouPage from "./pages/ThankYouPage";
import { I18nextProvider } from "react-i18next";

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(
    Boolean(localStorage.getItem("token")) || false
  );

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsAuthenticated(Boolean(token));
  }, []);

  return (
    <I18nextProvider i18n={i18n}>
      <div className="App">
        <Router>
          <Navbar
            isAuthenticated={isAuthenticated}
            setIsAuthenticated={setIsAuthenticated}
          />
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route
              path="/profile"
              element={
                isAuthenticated ? <UserPage /> : <Navigate to="/error" />
              }
            />
            <Route
              path="/lecture/:id"
              element={
                isAuthenticated ? <LecturePreview /> : <Navigate to="/error" />
              }
            />
            <Route
              path="/reviews/:id"
              element={
                isAuthenticated ? <LectureReview /> : <Navigate to="/error" />
              }
            />
            <Route
              path="/link/:id"
              element={
                isAuthenticated ? <LinkPage /> : <Navigate to="/error" />
              }
            />
            <Route
              path="/signup"
              element={<Register setIsAuthenticated={setIsAuthenticated} />}
            />
            <Route
              path="/login"
              element={<Login setIsAuthenticated={setIsAuthenticated} />}
            />
            <Route path="/review/:id" element={<ReviewPage />} />
            <Route path="/thank-you" element={<ThankYouPage />} />
            <Route path="/error" element={<ErrorPage />} />
            <Route path="*" element={<ErrorPage />} />
          </Routes>
          <Footer />
        </Router>
      </div>
    </I18nextProvider>
  );
};

export default App;
