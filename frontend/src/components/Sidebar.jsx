import React from "react";
import { Link } from "react-router-dom";
import { FaHome, FaUserGraduate, FaChalkboardTeacher, FaMoneyBill, FaChartBar, FaBook, FaCalendarAlt } from "react-icons/fa";

const Sidebar = ({ role }) => {
  const menuItems = {
    admin: [
      { name: "Dashboard", path: "/admin-dashboard", icon: <FaHome /> },
      { name: "Manage Students", path: "/admin/manage-students", icon: <FaUserGraduate /> },
      { name: "Manage Teachers", path: "/admin/manage-teachers", icon: <FaChalkboardTeacher /> },
      { name: "Fee Management", path: "/admin/fee-management", icon: <FaMoneyBill /> },
      { name: "Reports", path: "/admin/reports", icon: <FaChartBar /> },
    ],
    teacher: [
      { name: "Dashboard", path: "/teacher-dashboard", icon: <FaHome /> },
      { name: "My Classes", path: "/teacher-classes", icon: <FaBook /> },
      { name: "Student Progress", path: "/teacher-progress", icon: <FaChartBar /> },
    ],
    student: [
      { name: "Dashboard", path: "/student-dashboard", icon: <FaHome /> },
      { name: "Timetable", path: "/student-timetable", icon: <FaCalendarAlt /> },
      { name: "Assignments", path: "/student-assignments", icon: <FaBook /> },
    ],
    parent: [
      { name: "Dashboard", path: "/parent-dashboard", icon: <FaHome /> },
      { name: "Child's Performance", path: "/parent-performance", icon: <FaChartBar /> },
      { name: "Attendance", path: "/parent-attendance", icon: <FaCalendarAlt /> },
    ],
  };

  return (
    <div className="w-64 bg-gray-900 text-white min-h-screen p-5 transition-all duration-300 shadow-lg">
      <h1 className="text-2xl font-bold text-teal-400 mb-6">EduEase</h1>
      <ul className="space-y-4">
        {menuItems[role]?.map((item, index) => (
          <li key={index} className="flex items-center space-x-3 px-4 py-2 hover:bg-teal-500 rounded-lg transition">
            {item.icon}
            <Link to={item.path} className="text-lg">
              {item.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
