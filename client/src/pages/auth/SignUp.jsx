import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import signbg from "../../assets/signbg.jpg";
import api from "../../api/axios"

export default function SignUp() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    age: "",
    address: "",
    work: "",
    salary: "",
    horoscope: "",
    religion: "",
    gender: "",
    married: "no",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSignUpSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post("/auth/signup", formData);
      alert("Signup successful! Await admin approval.");
      navigate("/");
    } catch (err) {
      alert(err.response?.data?.message || "Signup failed");
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-cover relative"
      style={{ backgroundImage: `url(${signbg})` }}
    >
      <div className="absolute inset-0 bg-black/50"></div>
      <div className="relative z-10 w-full max-w-md bg-white/90 backdrop-blur-lg rounded-2xl shadow-xl p-8">
        <h1 className="text-3xl font-bold text-center mb-2">Create Account</h1>
        <p className="text-center text-gray-600 mb-6">Start your matrimony journey</p>
        <form onSubmit={handleSignUpSubmit} className="space-y-4">
          {[
            "name",
            "email",
            "phone",
            "password",
            "age",
            "address",
            "work",
            "salary",
            "horoscope",
            "religion",
          ].map((field) => (
            <input key={field} name={field} type={
                field === "email"
                  ? "email"
                  : field === "password"
                  ? "password"
                  : "text"
              }
              placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
              value={formData[field]}
              onChange={handleChange}
              required
              className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-400"
            />
          ))}
          <select
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            required
            className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-400"
          >
            <option value="">Select Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
          <select
            name="married"
            value={formData.married}
            onChange={handleChange}
            required
            className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-400"
          >
            <option value="no">Single</option>
            <option value="yes">Divorcee</option>
          </select>
          <button className="w-full bg-pink-500 text-white py-2 rounded-lg hover:bg-pink-600 transition">Sign Up</button>
        </form>
        <p className="text-center text-gray-600 mt-4">Already have an account?{" "}
          <Link to="/" className="text-pink-500 hover:underline">
            Sign In
          </Link>
        </p>
      </div>
    </div>
  );
}
