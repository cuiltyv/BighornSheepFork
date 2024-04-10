import { useState } from "react";

import "./App.css";
import Landing from "./pages/landing/Landing";
import Navbar from "./components/Navbar";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Register from "./pages/login/Register";

function App() {
  return (
    <div className="bg-darkWhite">
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/BighornSheep" element={<Landing />} />
          <Route path="/BighornSheep/login" element={<Register />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
