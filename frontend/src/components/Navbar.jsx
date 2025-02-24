import React from "react";
import { FaMoon, FaSun } from "react-icons/fa";

const Navbar = ({ darkMode, setDarkMode }) => {
  return (
    <div className="flex justify-between items-center bg-gray-800 p-4 shadow-md rounded-lg">
      <h1 className="text-2xl text-teal-400 font-bold">EduEase</h1>
      <button
        onClick={() => setDarkMode(!darkMode)}
        className="flex items-center gap-2 bg-gray-700 text-white px-4 py-2 rounded-lg shadow-md hover:bg-gray-600 transition"
      >
        {darkMode ? <FaSun /> : <FaMoon />} 
        {darkMode ? "Light Mode" : "Dark Mode"}
      </button>
    </div>
  );
};

export default Navbar;
