import "./App.css";
import Landing from "./pages/landing/Landing";
import Navbar from "./components/Navbar";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/login/Login";

function App() {
  return (
    <div className="bg-darkWhite">
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/BighornSheep" element={<Landing />} />
          <Route path="/BighornSheep/login" element={<Login />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
