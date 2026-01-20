import { Navigate, Outlet } from "react-router-dom";
import { getUserRole, isAuthenticated } from "../utils/auth";

export default function AdminRoute() {
  if (!isAuthenticated()) return <Navigate to="/" replace />;
  return getUserRole() === "admin" ? (
    <Outlet />
  ) : (
    <Navigate to="/dashboard" replace />
  );
}
