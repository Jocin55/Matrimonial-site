import { Navigate, Outlet } from "react-router-dom";
import { getUserRole } from "../utils/auth";

export default function UserRoute() {
  return getUserRole() === "user" ? (
    <Outlet />
  ) : (
    <Navigate to="/admin" replace />
  );
}
