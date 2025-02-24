import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../../components/Sidebar";  // ✅ Fixed Import Path
import Navbar from "../../components/Navbar";    // ✅ Fixed Import Path

import { FaUsers, FaChalkboardTeacher, FaChartBar } from "react-icons/fa";

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [darkMode, setDarkMode] = useState(false);

  // ✅ Handle Logout
  const handleLogout = () => {
    localStorage.clear();
    navigate("/login", { replace: true });
  };

  return (
    <div className={`${darkMode ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-900"} flex min-h-screen`}>
      {/* ✅ Sidebar */}
      <Sidebar role="admin" />

      {/* ✅ Main Content */}
      <div className="flex-1 p-6 transition-all duration-300">
        <Navbar darkMode={darkMode} setDarkMode={setDarkMode} />

        {/* ✅ Header */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-4xl font-bold text-blue-500">Admin Dashboard</h1>
        </div>

        {/* ✅ Dashboard Cards Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* ➤ Manage Students */}
          <div
            className="bg-blue-600 p-6 rounded-lg shadow-md transform hover:scale-105 transition hover:bg-blue-700 cursor-pointer flex items-center space-x-4"
            onClick={() => navigate("/admin/manage-students")}
            aria-label="Manage Students"
          >
            <FaUsers className="text-white text-4xl" />
            <div>
              <h2 className="text-xl font-semibold">Manage Students</h2>
              <p className="text-gray-200">Add, update, and view student details.</p>
            </div>
          </div>

          {/* ➤ Manage Teachers */}
          <div
            className="bg-green-600 p-6 rounded-lg shadow-md transform hover:scale-105 transition hover:bg-green-700 cursor-pointer flex items-center space-x-4"
            onClick={() => navigate("/admin/teachers")}
            aria-label="Manage Teachers"
          >
            <FaChalkboardTeacher className="text-white text-4xl" />
            <div>
              <h2 className="text-xl font-semibold">Manage Teachers</h2>
              <p className="text-gray-200">View teacher profiles and classes.</p>
            </div>
          </div>

          {/* ➤ Reports & Analytics */}
          <div
            className="bg-yellow-600 p-6 rounded-lg shadow-md transform hover:scale-105 transition hover:bg-yellow-700 cursor-pointer flex items-center space-x-4"
            onClick={() => navigate("/admin/reports")}
            aria-label="Reports & Analytics"
          >
            <FaChartBar className="text-white text-4xl" />
            <div>
              <h2 className="text-xl font-semibold">Reports & Analytics</h2>
              <p className="text-gray-200">Track system activity and user engagement.</p>
            </div>
          </div>
        </div>

        {/* ✅ Logout Button */}
        <div className="mt-8 flex justify-start md:justify-end">
          <button
            onClick={handleLogout}
            className="bg-red-600 px-5 py-2 rounded-lg text-white hover:bg-red-700 transition shadow-md"
            aria-label="Logout"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
