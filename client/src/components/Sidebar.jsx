import { NavLink } from "react-router-dom";
import logo from "../assets/logo.png"

export default function Sidebar() {
  const role = localStorage.getItem("role"); 

  const linkClass = ({ isActive }) =>
    `block px-4 py-2 rounded-lg transition ${
      isActive
        ? "bg-pink-500 text-white"
        : "text-gray-700 hover:bg-pink-100"
    }`;

  return (
    <aside className="w-64 bg-white shadow-md min-h-screen">
      
      <div
            className="min-h-screen flex items-center justify-center bg-cover bg-center relative"
            style={{ backgroundImage: `url(${logo})`, backgroundSize: "60px 60px", backgroundPosition: "left top" }}
      />

    
      <nav className="px-4 space-y-2">
        
        {role === "user" && (
          <>
            <NavLink to="/dashboard" className={linkClass}>
              Dashboard
            </NavLink>

            <NavLink to="/dashboard/profile" className={linkClass}>
              My Profile
            </NavLink>

            <NavLink to="/dashboard/browse" className={linkClass}>
              Browse Profiles
            </NavLink>

            <NavLink to="/dashboard/requests" className={linkClass}>
              Requests
            </NavLink>
          </>
        )}

        {role === "admin" && (
          <>
            <NavLink to="/admin" className={linkClass}>
              Admin Dashboard
            </NavLink>

            <NavLink to="/admin/approvals" className={linkClass}>
              User Approvals
            </NavLink>

            <NavLink to="/admin/access" className={linkClass}>
              Access Requests
            </NavLink>
          </>
        )}
      </nav>
    </aside>
  );
}
