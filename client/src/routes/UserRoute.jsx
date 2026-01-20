import { Navigate, Outlet } from "react-router-dom";
import { getUserRole, isAuthenticated } from "../utils/auth";

export default function UserRoute() {
  if (!isAuthenticated()) return <Navigate to="/" replace />;
  return getUserRole() === "user" ? (
    <Outlet />
  ) : (
    <Navigate to="/admin" replace />
  );
}
