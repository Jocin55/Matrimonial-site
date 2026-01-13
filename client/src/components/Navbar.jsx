import { useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  };

  return (
    <header className="bg-white shadow-sm px-6 py-4 flex justify-between items-center">
      <h2 className="text-xl font-semibold text-gray-800">
        💖 Matrimony Dashboard
      </h2>

      <div className="flex items-center gap-4">
        {/* Notifications (future use) */}
        <button className="relative">
          🔔
          <span className="absolute -top-1 -right-1 bg-pink-500 text-white text-xs px-1 rounded-full">
            3
          </span>
        </button>

        {/* Logout */}
        <button
          onClick={handleLogout}
          className="bg-pink-500 text-white px-4 py-1 rounded-lg hover:bg-pink-600 transition"
        >
          Logout
        </button>
      </div>
    </header>
  );
}
