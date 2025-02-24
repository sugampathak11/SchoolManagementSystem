import { useNavigate } from "react-router-dom";
import { FaUserGraduate, FaCalendarAlt, FaClipboardList, FaChalkboardTeacher, FaSignOutAlt } from "react-icons/fa";

const ParentDashboard = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <div className="flex min-h-screen bg-gray-900 text-white">
      {/* Sidebar */}
      <div className="w-64 bg-gray-800 p-6 shadow-lg">
        <h1 className="text-2xl font-bold text-teal-400 mb-6">EduEase</h1>
        <ul className="space-y-4">
          <li className="hover:text-teal-400 cursor-pointer">Dashboard</li>
          <li className="hover:text-teal-400 cursor-pointer">Child's Performance</li>
          <li className="hover:text-teal-400 cursor-pointer">Attendance</li>
          <li className="hover:text-teal-400 cursor-pointer">Timetable</li>
        </ul>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-4xl font-bold text-teal-400">Parent Dashboard</h1>
          <button 
            onClick={handleLogout} 
            className="bg-red-500 text-white px-4 py-2 rounded-lg flex items-center gap-2 shadow-md hover:bg-red-600 transition"
          >
            <FaSignOutAlt /> Logout
          </button>
        </div>

        {/* Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Child's Academic Performance */}
          <div className="bg-blue-500 p-6 rounded-lg shadow-md transform hover:scale-105 transition hover:bg-blue-600 cursor-pointer">
            <h2 className="text-xl font-semibold text-white flex items-center gap-2">
              <FaUserGraduate /> Child's Performance
            </h2>
            <p className="text-gray-200">Track your child's academic progress and grades.</p>
          </div>

          {/* Attendance Monitoring */}
          <div className="bg-yellow-500 p-6 rounded-lg shadow-md transform hover:scale-105 transition hover:bg-yellow-600 cursor-pointer">
            <h2 className="text-xl font-semibold text-white flex items-center gap-2">
              <FaClipboardList /> Attendance
            </h2>
            <p className="text-gray-200">Monitor attendance and ensure regularity.</p>
          </div>

          {/* Timetable View */}
          <div className="bg-green-500 p-6 rounded-lg shadow-md transform hover:scale-105 transition hover:bg-green-600 cursor-pointer">
            <h2 className="text-xl font-semibold text-white flex items-center gap-2">
              <FaCalendarAlt /> Timetable
            </h2>
            <p className="text-gray-200">View your child's daily schedule and subjects.</p>
          </div>

          {/* Teacher Communication */}
          <div className="bg-purple-500 p-6 rounded-lg shadow-md transform hover:scale-105 transition hover:bg-purple-600 cursor-pointer">
            <h2 className="text-xl font-semibold text-white flex items-center gap-2">
              <FaChalkboardTeacher /> Contact Teacher
            </h2>
            <p className="text-gray-200">Communicate with teachers regarding your child's progress.</p>
          </div>

          {/* School Announcements */}
          <div className="bg-orange-500 p-6 rounded-lg shadow-md transform hover:scale-105 transition hover:bg-orange-600 cursor-pointer">
            <h2 className="text-xl font-semibold text-white flex items-center gap-2">
              📢 Announcements
            </h2>
            <p className="text-gray-200">Stay updated with important school notifications.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ParentDashboard;
