import { useState } from "react";

import "./App.css";
import Landing from "./pages/landing/Landing";
import Navbar from "./components/Navbar";
import Perfil from "./pages/perfil/Perfil";
import Register from "./pages/login/Register";
import Login from "./pages/login/Login";
import Dashboard from "./pages/admin/Dashboard";
import Missing from "./pages/extra/Missing";
import RequireAuth from "./components/RequireAuth";
import { Routes, Route } from "react-router-dom";

const ROLES = {
  User: 1,
  Admin: 2,
};

function App() {
  return (
    <div className="bg-darkWhite">
      <Navbar />
      <Routes>
        <Route path="/BighornSheep" element={<Landing />} />
        <Route path="/BighornSheep/register" element={<Register />} />
        <Route path="/BighornSheep/login" element={<Login />} />

        {/* Ruta solo para usuarios autenticados */}
        <Route element={<RequireAuth allowedRoles={[ROLES.User]} />}>
          <Route path="/BighornSheep/perfil" element={<Perfil />} />
        </Route>

        {/* Ruta solo para admin */}
        <Route element={<RequireAuth allowedRoles={[ROLES.Admin]} />}>
          <Route path="/BighornSheep/admin" element={<Dashboard />} />
        </Route>

        {/* Ruta si no hay match */}
        <Route path="*" element={<Missing />} />
      </Routes>
    </div>
  );
}

export default App;
