import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import Login from "./pages/Login";
import Register from "./pages/Register";

// ✅ Import Admin Pages
import AdminDashboard from "./pages/admin/AdminDashboard";
import ManageStudents from "./pages/admin/ManageStudents";
import ManageTeachers from "./pages/admin/ManageTeachers";
import ManageParents from "./pages/admin/ManageParents";
import ReportsAnalytics from "./pages/admin/ReportsAnalytics";

// ✅ Import Other Role-Based Dashboards
import TeacherDashboard from "./pages/teacher/TeacherDashboard";
import StudentDashboard from "./pages/student/StudentDashboard";
import ParentDashboard from "./pages/parent/ParentDashboard";

// ✅ Secure Protected Route Component
const ProtectedRoute = ({ element, allowedRoles }) => {
  const token = localStorage.getItem("accessToken");
  const userRole = localStorage.getItem("role");

  console.log("🔍 Checking authentication...");
  console.log("🔹 Token:", token);
  console.log("🔹 Role:", userRole);

  if (!token) {
    console.log("❌ No token found - Redirecting to Login...");
    return <Navigate to="/login" replace />;
  }

  if (!allowedRoles.includes(userRole)) {
    console.log("❌ Unauthorized Access - Redirecting to Landing Page...");
    return <Navigate to="/" replace />;
  }

  console.log("✅ Access granted - Rendering Dashboard...");
  return element;
};

function App() {
  return (
    <Router>
      <Routes>
        {/* ✅ Public Routes */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* ✅ Admin Routes */}
        <Route path="/admin/dashboard" element={<ProtectedRoute element={<AdminDashboard />} allowedRoles={["admin"]} />} />
        <Route path="/admin/manage-students" element={<ProtectedRoute element={<ManageStudents />} allowedRoles={["admin"]} />} />
        <Route path="/admin/manage-teachers" element={<ProtectedRoute element={<ManageTeachers />} allowedRoles={["admin"]} />} />
        <Route path="/admin/manage-parents" element={<ProtectedRoute element={<ManageParents />} allowedRoles={["admin"]} />} />
        <Route path="/admin/reports-analytics" element={<ProtectedRoute element={<ReportsAnalytics />} allowedRoles={["admin"]} />} />

        {/* ✅ Other Role-Based Routes */}
        <Route path="/teacher/dashboard" element={<ProtectedRoute element={<TeacherDashboard />} allowedRoles={["teacher"]} />} />
        <Route path="/student/dashboard" element={<ProtectedRoute element={<StudentDashboard />} allowedRoles={["student"]} />} />
        <Route path="/parent/dashboard" element={<ProtectedRoute element={<ParentDashboard />} allowedRoles={["parent"]} />} />

        {/* ✅ Fallback Route (404 Handling) */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
