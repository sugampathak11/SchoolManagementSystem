import axios from "axios";

const API = axios.create({
  baseURL: "http://127.0.0.1:8000/api/", // ✅ Ensure this matches your Django API
  headers: { "Content-Type": "application/json" },
});

// ✅ Automatically add token to requests
API.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default API;
