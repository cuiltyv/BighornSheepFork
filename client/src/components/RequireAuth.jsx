import { useLocation, Navigate, Outlet } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const RequireAuth = ({ allowedRoles }) => {
  const { auth } = useAuth();
  const location = useLocation();

  // Check if the user's role is included in the allowedRoles array
  const isRoleAllowed = allowedRoles.includes(auth?.roles);
  
  return isRoleAllowed ? (
    <Outlet />
  ) : auth?.user ? (
    <Navigate
      to="/BighornSheep/unauthorized"
      state={{ from: location }}
      replace
    />
  ) : (
    <Navigate to="BighornSheep/login" state={{ from: location }} replace />
  );
};

export default RequireAuth;
