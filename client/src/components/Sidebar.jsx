import { NavLink } from "react-router-dom";
import logo from "../assets/logo.png";

export default function Sidebar() {
  const role = localStorage.getItem("role");

  const linkClass = ({ isActive }) =>
    `block px-4 py-2 rounded-lg transition ${
      isActive
        ? "bg-pink-500 text-white"
        : "text-gray-700 hover:bg-pink-100"
    }`;

  return (
    <aside className="w-64 bg-white shadow-md min-h-screen flex flex-col">
      <div className="p-4">
        <img src={logo} alt="Logo" className="w-20 h-20 mx-auto" />
      </div>

      <nav className="px-4 space-y-2 flex-1">
        {role === "user" && (
          <>
            <NavLink to="/home" className={linkClass}>Dashboard</NavLink>

            <NavLink to="/myprofile" className={linkClass}>My Profile</NavLink>

            <NavLink to="/browse" className={linkClass}>Browse Profiles</NavLink>

            <NavLink to="/requests" className={linkClass}>Requests</NavLink>
          </>
        )}

        {role === "admin" && (
          <>
            <NavLink to="/admin" className={linkClass}>Admin Dashboard</NavLink>

            <NavLink to="/admin/approvals" className={linkClass}>User Approvals</NavLink>

            <NavLink to="/admin/access" className={linkClass}>Access Requests</NavLink>
          </>
        )}
      </nav>
    </aside>
  );
}
