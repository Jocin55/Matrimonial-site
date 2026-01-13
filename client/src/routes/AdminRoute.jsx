import { Navigate, Outlet } from "react-router-dom";
import { getUserRole } from "../utils/auth";

export default function AdminRoute() {
  return getUserRole() === "admin" ? (
    <Outlet />
  ) : (
    <Navigate to="/dashboard" replace />
  );
}
