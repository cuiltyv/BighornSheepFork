import { useState, useContext } from "react";
// import { useState } from "react";

import "./App.css";
import Landing from "./pages/landing/Landing";
import Home from "./pages/landing/Home";

import Perfil from "./pages/perfil/Perfil";
import Register from "./pages/login/Register";
import Login from "./pages/login/Login";
import Login from "./pages/login/Login";

import Dashboard from "./pages/admin/Dashboard";
import Missing from "./pages/extra/Missing";
import Unauthorized from "./pages/extra/Unauthorized";
import RequireAuth from "./components/RequireAuth";
import PersistLogin from "./components/PersistLogin";
import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import WithLayout from "./components/WithLayout";
import WithLayoutLogout from "./components/WithLayoutLogout";

const ROLES = {
  User: 1,
  Admin: 2,
};

function App() {
  return (
    <div className="bg-darkWhite">
      <Routes>
        <Route path="/" element={<WithLayout />}>
          <Route path="/BighornSheep/landing" element={<Landing />} />
          <Route path="/BighornSheep/register" element={<Register />} />
          <Route path="/BighornSheep/login" element={<Login />} />
          <Route path="*" element={<Missing />} />
        </Route>
        <Route path="/" element={<WithLayoutLogout />}>
          {/* Ruta solo para usuarios autenticados */}
          <Route element={<PersistLogin />}>
            <Route
              element={<RequireAuth allowedRoles={[ROLES.User, ROLES.Admin]} />}
            >
              <Route path="/BighornSheep" element={<Home />} />
              <Route path="/BighornSheep/perfil" element={<Perfil />} />
            </Route>

            {/* Ruta solo para admin */}
            <Route element={<RequireAuth allowedRoles={[ROLES.Admin]} />}>
              <Route path="/BighornSheep/admin" element={<Dashboard />} />
            </Route>

            <Route
              path="/BighornSheep/unauthorized"
              element={<Unauthorized />}
            />
          </Route>

          {/* Ruta si no hay match */}
          <Route path="*" element={<Missing />} />
        </Route>
      </Routes>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/BighornSheep" element={<Landing />} />
          <Route path="/BighornSheep/perfil" element={<Perfil />} />
          <Route path="/BighornSheep/register" element={<Register />} />
          <Route path="/BighornSheep/admin" element={<Dashboard />} />

          <Route path="/BighornSheep/login" element={<Login />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
