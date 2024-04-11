import { useState } from "react";

import "./App.css";
import Landing from "./pages/landing/Landing";
import Navbar from "./components/Navbar";
import Perfil from "./pages/perfil/Perfil";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Register from "./pages/login/Register";


import Dashboard from "./pages/admin/Dashboard";


function App() {
  return (
    <div className="bg-darkWhite">
      <Navbar />
      <Landing />
      <p className="text-7xl">Hola Lorem Ipsum</p>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
      <Perfil />
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/BighornSheep" element={<Landing />} />
          <Route path="/BighornSheep/login" element={<Register />} />
          <Route path="/BighornSheep/admin" element={<Dashboard />} />

        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
