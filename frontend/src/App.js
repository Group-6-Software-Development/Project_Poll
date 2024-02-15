import "./styles/app.css";
import Navbar from "./components/Navbar";

function App() {
  return (
    <div className="App">
      <Navbar isLoggedIn={false} />
      <header className="App-header">
        <p>hei sinä, tämä sivu on vielä kesken :/</p>
      </header>
    </div>
  );
}

export default App;
