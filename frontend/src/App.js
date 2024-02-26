import React from 'react';
import Register from "./components/Register";
import Login from "./components/Login";
import "./styles/app.css";
import Navbar from "./components/Navbar";
import UserPage from "./pages/UserPage"

const App = () => {
  return (
    <div className="App">
      <Register />
      <Login />
      <Navbar isLoggedIn={false} />
      <header className="App-header">
        <UserPage/>
      </header>
    </div>
  );
};

export default App;