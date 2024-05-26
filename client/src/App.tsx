import "./App.css";
import Landing from "./pages/landing/Landing";
import Home from "./pages/landing/Home";
import Perfil from "./pages/perfil/Perfil";
import Login from "./pages/login/Login";
import Dashboard from "./pages/admin/Dashboard";
import Missing from "./pages/extra/Missing";
import VideoWall from "./pages/videowall/VideoWall";
import Unauthorized from "./pages/extra/Unauthorized";
import RequireAuth from "./components/RequireAuth";
import PersistLogin from "./components/PersistLogin";
import { Routes, Route } from "react-router-dom";

import WithLayout from "./components/WithLayout";
import WithLayoutLogout from "./components/WithLayoutLogout";
import Reservaciones from "./pages/reservaciones/Reservaciones";
import EventManager from "./pages/admin/EventManager";
import VideoManager from "./pages/admin/VideoManager";
import UserManagement from "./pages/admin/UserManagement";
import AdminStats from "./pages/admin/AdminStats";
const ROLES = {
  User: 1,
  Admin: 2,
};

function App() {
  return (
    <div className="bg-darkWhite">
      <Routes>
        <Route path="/BighornSheep/videowall" element={<VideoWall />} />
        <Route path="/" element={<WithLayout />}>
          <Route path="/BighornSheep/landing" element={<Landing />} />
          <Route path="/BighornSheep/login" element={<Login />} />
          <Route path="/" element={<Landing />} />
          <Route path="*" element={<Login />} />
        </Route>
        <Route path="/" element={<WithLayoutLogout />}>
          {/* Ruta solo para usuarios autenticados */}
          <Route element={<PersistLogin />}>
            <Route
              element={<RequireAuth allowedRoles={[ROLES.User, ROLES.Admin]} />}
            >
              <Route
                path="/BighornSheep/reservaciones"
                element={<Reservaciones />}
              />
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

          <Route path="/BighornSheep/eventmanager" element={<EventManager />} />
          <Route path="/BighornSheep/videomanager" element={<VideoManager />} />
          <Route
            path="/BighornSheep/usermanagement"
            element={<UserManagement />}
          />
          <Route path="/BighornSheep/adminstats" element={<AdminStats />} />
          {/* Ruta si no hay match */}
          <Route path="*" element={<Missing />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
