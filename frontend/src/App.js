import "./styles/app.css";
import Navbar from "./components/Navbar";
import UserPage from "./pages/UserPage"

function App() {
  return (
    <div className="App">
      <Navbar isLoggedIn={false} />
      <header className="App-header">
        <UserPage/>
      </header>
    </div>
  );
}

export default App;
