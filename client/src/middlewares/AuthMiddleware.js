import useAuth from "../hooks/useAuth";
import { Navigate, Outlet, useLocation } from "react-router-dom";

export default function AuthMiddleware() {
  const { accessToken } = useAuth();
  const location = useLocation();
  console.log(accessToken, "accessTokenaccessToken");

  return accessToken ? (
    <Outlet />
  ) : (
    <Navigate to="/" state={{ from: location }} replace />
  );
}
