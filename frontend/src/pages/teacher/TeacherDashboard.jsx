import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../../components/Sidebar";
import Navbar from "../../components/Navbar";

const TeacherDashboard = () => {
  const [darkMode, setDarkMode] = useState(false);
  const navigate = useNavigate();

  // Logout Function
  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <div className={`${darkMode ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-900"} flex min-h-screen`}>
      {/* Sidebar */}
      <Sidebar role="teacher" />

      {/* Main Content */}
      <div className="flex-1 p-6 transition-all duration-300">
        <Navbar darkMode={darkMode} setDarkMode={setDarkMode} />

        {/* Header */}
        <div className="mb-6 flex justify-between items-center">
          <h1 className="text-4xl font-bold text-blue-400">Teacher Dashboard</h1>
          <button 
            onClick={handleLogout} 
            className="bg-red-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-red-600 transition"
          >
            Logout
          </button>
        </div>

        {/* Grid Cards Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-blue-500 p-6 rounded-lg shadow-md transform hover:scale-105 transition hover:bg-blue-600 cursor-pointer">
            <h2 className="text-xl font-semibold text-white">📖 Class Management</h2>
            <p className="text-gray-200">Organize classes and student assignments.</p>
          </div>

          <div className="bg-orange-500 p-6 rounded-lg shadow-md transform hover:scale-105 transition hover:bg-orange-600 cursor-pointer">
            <h2 className="text-xl font-semibold text-white">✅ Attendance</h2>
            <p className="text-gray-200">Track student attendance and generate reports.</p>
          </div>

          <div className="bg-indigo-500 p-6 rounded-lg shadow-md transform hover:scale-105 transition hover:bg-indigo-600 cursor-pointer">
            <h2 className="text-xl font-semibold text-white">📝 Gradebook</h2>
            <p className="text-gray-200">Manage and update student grades.</p>
          </div>

          <div className="bg-pink-500 p-6 rounded-lg shadow-md transform hover:scale-105 transition hover:bg-pink-600 cursor-pointer">
            <h2 className="text-xl font-semibold text-white">📢 Announcements</h2>
            <p className="text-gray-200">Post important updates for students.</p>
          </div>

          <div className="bg-teal-500 p-6 rounded-lg shadow-md transform hover:scale-105 transition hover:bg-teal-600 cursor-pointer">
            <h2 className="text-xl font-semibold text-white">🔎 Student Insights</h2>
            <p className="text-gray-200">View analytics on student performance.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeacherDashboard;
