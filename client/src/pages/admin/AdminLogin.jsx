import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../api/axios";

export default function AdminLogin() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: "", password: "" });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post("/admin/login", formData);
      localStorage.setItem("adminToken", res.data.token);
      localStorage.setItem("role","admin");
      alert("Admin login successful");
      navigate("/admin"); 
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow">
        <h1 className="text-2xl font-bold mb-4 text-center">Admin Login</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input type="email" name="email"placeholder="Email"value={formData.email}
            onChange={handleChange}
            required
            className="w-full border rounded px-3 py-2"
          />
          <input type="password" name="password" placeholder="Password" value={formData.password}
            onChange={handleChange}
            required
            className="w-full border rounded px-3 py-2"
          />
          <button className="w-full bg-pink-500 text-white py-2 rounded hover:bg-pink-600">Login</button>
        </form>
      </div>
    </div>
  );
}
