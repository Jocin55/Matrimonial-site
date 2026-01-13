import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import signbg from "../../assets/signbg.jpg";
import api from "../../api/axios";

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

      alert("Signup successful! Please login after admin approval.");
      navigate("/"); 

    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "Signup failed");
    }
  };

  return (
    <div
      className="relative min-h-screen w-full flex items-center justify-center bg-cover bg-no-repeat"
      style={{ backgroundImage: `url(${signbg})` }}
    >
      <div className="absolute inset-0 bg-black/50"></div>

      <div className="relative z-10 w-full max-w-md bg-white/90 backdrop-blur-lg rounded-2xl shadow-xl p-8 mx-4">
        <h1 className="text-3xl font-bold text-center mb-2">
          Create Account
        </h1>
        <p className="text-center text-gray-600 mb-6">
          Start your matrimony journey
        </p>

        <form onSubmit={handleSignUpSubmit} className="space-y-4">
          <input
            name="name"
            placeholder="Full Name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full input"
          />

          <input
            name="email"
            type="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full input"
          />

          <input
            name="phone"
            placeholder="Phone Number"
            value={formData.phone}
            onChange={handleChange}
            required
            className="w-full input"
          />

          <input
            name="password"
            type="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
            className="w-full input"
          />

          <input
            name="age"
            placeholder="Age"
            value={formData.age}
            onChange={handleChange}
            required
            className="w-full input"
          />

          <input
            name="address"
            placeholder="Address"
            value={formData.address}
            onChange={handleChange}
            required
            className="w-full input"
          />
          <input
            name="work"
            placeholder="Occupation"            
            value={formData.work}
            onChange={handleChange}
            required
            className="w-full input"
          />
          <input
            name="salary"
            placeholder="Salary"
            value={formData.salary}
            onChange={handleChange}
            required
            className="w-full input"
          />

          <select
            name="married"
            value={formData.married}
            onChange={handleChange}
            required
            className="w-full input"
          >
            <option value="no">Single</option>
            <option value="yes">Divorcee</option>
          </select>

          <button className="w-full bg-pink-500 text-white py-2 rounded-lg hover:bg-pink-600 transition">
            Sign Up
          </button>
        </form>

        <p className="text-center text-gray-600 mt-4">
          Already have an account?{" "}
          <Link to="/" className="text-pink-500 hover:underline">
            Sign In
          </Link>
        </p>
      </div>
    </div>
  );
}
