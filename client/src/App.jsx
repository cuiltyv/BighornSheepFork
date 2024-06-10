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
import Faq from "./pages/faq/Faq";
import Faqq from "./pages/faq/Faqq";
import { Routes, Route } from "react-router-dom";
import useAuth from "@UserAuth";
import "@mantine/core/styles.css";
import WithLayout from "./components/WithLayout";
import WithLayoutLogout from "./components/WithLayoutLogout";
import Reservaciones from "./pages/reservaciones/Reservaciones";
import EventManager from "./pages/admin/EventManager";
import VideoManager from "./pages/admin/VideoManager";
import UserManagement from "./pages/admin/UserManagement";
import AdminStats from "./pages/admin/AdminStats";
import { MantineProvider } from "@mantine/core";

const ROLES = {
  User: 1,
  Admin: 2,
};

function App() {
  const { auth } = useAuth();
  const userID = auth?.userID;

  return (
    <div className="bg-darkWhite">
      <Routes>
        <Route path="/BighornSheep/videowall" element={<VideoWall />} />
        <Route path="/" element={<WithLayout />}>
          <Route path="/BighornSheep/landing" element={<Landing />} />
          <Route path="/BighornSheep/login" element={<Login />} />
          <Route
            path="/BighornSheep/faqs"
            element={
              <MantineProvider>
                <Faqq />
              </MantineProvider>
            }
          />

          <Route path="/" element={<Landing />} />
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
              <Route
                path="/BighornSheep/eventmanager"
                element={<EventManager />}
              />
              <Route
                path="/BighornSheep/videomanager"
                element={<VideoManager />}
              />
              <Route
                path="/BighornSheep/usermanagement"
                element={<UserManagement />}
              />
              <Route path="/BighornSheep/adminstats" element={<AdminStats />} />
            </Route>

            <Route
              path="/BighornSheep/unauthorized"
              element={<Unauthorized />}
            />
            <Route path="*" element={userID ? <Missing /> : <Login />} />
            <Route
              path="/BighornSheep/faq"
              element={
                <MantineProvider>
                  <Faq />
                </MantineProvider>
              }
            />
          </Route>
        </Route>
      </Routes>
    </div>
  );
}

export default App;
