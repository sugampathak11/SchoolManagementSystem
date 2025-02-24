import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Login = () => {
  const [credentials, setCredentials] = useState({ username: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      console.log("🔹 Sending login request:", credentials);
      
      const response = await axios.post("http://127.0.0.1:8000/api/auth/login/", credentials, {
        headers: { "Content-Type": "application/json" },
      });

      console.log("✅ Login successful! Server Response:", response.data);

      if (response.data.access) {
        // ✅ Store Tokens & User Data
        localStorage.setItem("accessToken", response.data.access);
        localStorage.setItem("refreshToken", response.data.refresh);
        localStorage.setItem("role", response.data.role);
        localStorage.setItem("username", response.data.username);
        localStorage.setItem("email", response.data.email);

        console.log("🔄 Redirecting user to:", response.data.role);

        // ✅ Role-Based Redirect
        const roleRoutes = {
          admin: "/admin/dashboard",
          teacher: "/teacher/dashboard",
          student: "/student/dashboard",
          parent: "/parent/dashboard",
        };

        if (roleRoutes[response.data.role]) {
          navigate(roleRoutes[response.data.role], { replace: true });
        } else {
          setError("Invalid role received from server.");
          console.log("❌ Unknown role:", response.data.role);
        }

        // ✅ Reload Page
        setTimeout(() => {
          console.log("🔄 Reloading Page...");
          window.location.reload();
        }, 500);
      } else {
        setError("Invalid response from server.");
      }
    } catch (err) {
      console.error("❌ Login Error:", err.response?.data || err.message);
      setError(err.response?.data?.detail || "Login failed! Check username/password.");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-900 text-white">
      <div className="w-full max-w-md p-8 bg-gray-800 rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold text-center text-teal-400">Login</h1>
        {error && <p className="text-red-400 text-center">{error}</p>}

        <form onSubmit={handleLogin} className="mt-4">
          <input
            type="text"
            name="username"
            placeholder="Username"
            value={credentials.username}
            onChange={handleChange}
            required
            className="w-full p-3 mb-3 rounded-lg bg-gray-700 text-white"
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={credentials.password}
            onChange={handleChange}
            required
            className="w-full p-3 mb-3 rounded-lg bg-gray-700 text-white"
          />
          <button
            type="submit"
            className="w-full py-3 bg-teal-500 text-white rounded-lg hover:bg-teal-600"
          >
            Login
          </button>
        </form>

        <div className="text-center mt-4">
          <p className="text-gray-400">Don't have an account?</p>
          <button
            onClick={() => navigate("/register")}
            className="text-teal-400 hover:underline mt-2"
          >
            Register here
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
