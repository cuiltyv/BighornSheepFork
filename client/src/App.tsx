import "./App.css";
import Landing from "./pages/landing/Landing";
import Home from "./pages/landing/Home";
import Perfil from "./pages/perfil/Perfil";
import Login from "./pages/login/Login";
import Form from "./pages/reservationForm/Form";
import Dashboard from "./pages/admin/Dashboard";
import Missing from "./pages/extra/Missing";
import Unauthorized from "./pages/extra/Unauthorized";
import RequireAuth from "./components/RequireAuth";
import PersistLogin from "./components/PersistLogin";
import { Routes, Route } from "react-router-dom";

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
          <Route path="/BighornSheep/login" element={<Login />} />
          <Route path="*" element={<Login />} />
        </Route>
        <Route path="/" element={<WithLayoutLogout />}>
          {/* Ruta solo para usuarios autenticados */}
          <Route element={<PersistLogin />}>
            <Route
              element={<RequireAuth allowedRoles={[ROLES.User, ROLES.Admin]} />}
            >
              <Route path="/BighornSheep/form/:id" element={<Form />} />
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
    </div>
  );
}

export default App;
