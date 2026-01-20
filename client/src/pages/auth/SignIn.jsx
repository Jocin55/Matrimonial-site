import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import signbg from "../../assets/signbg.jpg";
import api from "../../api/axios";

export default function SignIn() {
  const [identifier, setIdentifier] = useState(""); // email or phone
  const [password, setPassword] = useState("");
  const navigate = useNavigate(); 

  const handleLoginSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await api.post("/auth/signin", {
        identifier: identifier, 
        password,
      });

      localStorage.setItem("userToken", res.data.token);
      localStorage.setItem("role","user");

      navigate("/home");
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-cover bg-center relative"style={{ backgroundImage: `url(${signbg})` }}>
      <div className="absolute inset-0 bg-black/50"></div>
      <div className="relative z-10 w-full max-w-md bg-white/90 backdrop-blur-lg rounded-2xl shadow-xl p-8">
        <h1 className="text-3xl font-bold text-center mb-2">Find Your Soulmate</h1>
        <p className="text-center text-gray-600 mb-6">Login to continue</p>

        <form onSubmit={handleLoginSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-700">Email or Phone Number</label>
            <input type="text" className="w-full border border-gray-300 rounded-lg px-4 py-2 mt-1 focus:outline-none focus:ring-2 focus:ring-pink-400" value={identifier}
              onChange={(e) => setIdentifier(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block text-gray-700">Password</label>
            <input type="password" className="w-full border border-gray-300 rounded-lg px-4 py-2 mt-1 focus:outline-none focus:ring-2 focus:ring-pink-400" value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button type="submit" className="w-full bg-pink-500 text-white py-2 rounded-lg hover:bg-pink-600 transition">Sign In</button>
        </form>

        <p className="mt-4 text-center text-gray-600">Don't have an account?{" "}
          <Link to="/signup" className="text-pink-500 hover:underline">Sign Up</Link>
        </p>
      </div>
    </div>
  );
}
