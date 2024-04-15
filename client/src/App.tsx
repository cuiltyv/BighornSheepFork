// import { useState } from "react";

import "./App.css";
import Landing from "./pages/landing/Landing";
import Navbar from "./components/Navbar";
import Perfil from "./pages/perfil/Perfil";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Register from "./pages/login/Register";
import Login from "./pages/login/Login";


import Dashboard from "./pages/admin/Dashboard";

function App() {
  return (
    <div className="bg-darkWhite">
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/BighornSheep/perfil" element={<Perfil />} />
          <Route path="/BighornSheep" element={<Landing />} />
          <Route path="/BighornSheep/register" element={<Register />} />
          <Route path="/BighornSheep/admin" element={<Dashboard />} />

          <Route path="/BighornSheep/login" element={<Login />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
