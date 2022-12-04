import './App.css';

// components
import Navbar from "./components/Navbar"

// pages
import Home from './pages/home/Home';

// import bootstrap
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <div className="App">
      <Navbar />
      <Home />
    </div>
  );
}

export default App;
