import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../../components/Sidebar";  // ✅ Fixed Path
import Navbar from "../../components/Navbar";    // ✅ Fixed Path

const StudentDashboard = () => {
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
      <Sidebar role="student" />

      {/* Main Content */}
      <div className="flex-1 p-6 transition-all duration-300">
        <Navbar darkMode={darkMode} setDarkMode={setDarkMode} />

        {/* Header */}
        <div className="mb-6 flex justify-between items-center">
          <h1 className="text-4xl font-bold text-teal-400">Student Dashboard</h1>
          <button 
            onClick={handleLogout} 
            className="bg-red-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-red-600 transition"
          >
            Logout
          </button>
        </div>

        {/* Grid Cards Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-teal-500 p-6 rounded-lg shadow-md transform hover:scale-105 transition hover:bg-teal-600 cursor-pointer">
            <h2 className="text-xl font-semibold text-white">📅 My Timetable</h2>
            <p className="text-gray-200">View upcoming classes and exams.</p>
          </div>

          <div className="bg-purple-500 p-6 rounded-lg shadow-md transform hover:scale-105 transition hover:bg-purple-600 cursor-pointer">
            <h2 className="text-xl font-semibold text-white">📚 Assignments</h2>
            <p className="text-gray-200">Submit and track your assignments.</p>
          </div>

          <div className="bg-blue-500 p-6 rounded-lg shadow-md transform hover:scale-105 transition hover:bg-blue-600 cursor-pointer">
            <h2 className="text-xl font-semibold text-white">📈 Performance</h2>
            <p className="text-gray-200">Monitor grades and progress reports.</p>
          </div>

          <div className="bg-yellow-500 p-6 rounded-lg shadow-md transform hover:scale-105 transition hover:bg-yellow-600 cursor-pointer">
            <h2 className="text-xl font-semibold text-white">💬 Announcements</h2>
            <p className="text-gray-200">Stay updated with school notifications.</p>
          </div>

          <div className="bg-green-500 p-6 rounded-lg shadow-md transform hover:scale-105 transition hover:bg-green-600 cursor-pointer">
            <h2 className="text-xl font-semibold text-white">🎓 Online Courses</h2>
            <p className="text-gray-200">Access extra learning materials.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;
