import React, { useState, useEffect } from "react";
import API from "../../utils/api"; // ✅ Import API

const ManageStudents = () => {
  const [students, setStudents] = useState([]);
  const [formData, setFormData] = useState({
    username: "",
    full_name: "",
    email: "",
    password: "",
    grade: "",
    parent: "",
  });
  const [error, setError] = useState(""); // ✅ Used in UI now
  const [success, setSuccess] = useState(""); // ✅ Used in UI now
  const userRole = localStorage.getItem("role"); // ✅ Get user role

  // ✅ Fetch all students when page loads
  useEffect(() => {
    const fetchStudents = async () => {
      try {
        console.log("🔍 Fetching students from API...");
        const token = localStorage.getItem("accessToken");
        const response = await API.get("/students/", {
          headers: { Authorization: `Bearer ${token}` },
        });
        console.log("✅ API Response:", response.data);
        setStudents(response.data);
      } catch (error) {
        console.error("❌ Error fetching students:", error.response?.data || error.message);
        setError("Failed to fetch students.");
      }
    };

    fetchStudents();
  }, []);

  // ✅ Handle input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // ✅ Add student
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    try {
      console.log("🔹 Sending student data:", formData);
      const response = await API.post("/students/", formData);
      console.log("✅ Student added:", response.data);

      setStudents([...students, response.data]);
      setSuccess(`🎉 Student Added! Username: ${response.data.username}`);
      setFormData({ username: "", full_name: "", email: "", password: "", grade: "", parent: "" });
    } catch (error) {
      console.error("❌ Error adding student:", error.response?.data || error.message);
      setError("Failed to add student.");
    }
  };

  // ✅ Delete student (Used inside JSX now)
  const handleDelete = async (id) => {
    try {
      console.log(`🗑️ Deleting student ID: ${id}`);
      await API.delete(`/students/${id}/`);
      setStudents(students.filter((student) => student.id !== id));
      setSuccess("✅ Student deleted successfully!");
    } catch (error) {
      console.error("❌ Error deleting student:", error.response?.data || error.message);
      setError("Failed to delete student.");
    }
  };

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">Manage Students</h2>

      {/* ✅ Show Error & Success Messages */}
      {success && <p className="text-green-600 font-semibold">{success}</p>}
      {error && <p className="text-red-600 font-semibold">{error}</p>}

      {userRole === "admin" && (
        <form onSubmit={handleSubmit} className="bg-gray-100 p-4 rounded-lg mb-6 shadow">
          <h3 className="text-lg font-semibold mb-3">➕ Add New Student</h3>

          <input type="text" name="username" value={formData.username} onChange={handleChange} placeholder="Username" required />
          <input type="text" name="full_name" value={formData.full_name} onChange={handleChange} placeholder="Full Name" required />
          <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Email" required />
          <input type="password" name="password" value={formData.password} onChange={handleChange} placeholder="Password" required />
          <input type="text" name="grade" value={formData.grade} onChange={handleChange} placeholder="Grade" required />
          <input type="text" name="parent" value={formData.parent} onChange={handleChange} placeholder="Parent (Optional)" />

          <button type="submit" className="mt-4 w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600">
            ➕ Add Student
          </button>
        </form>
      )}

      {/* ✅ Student List */}
      <h3 className="text-xl font-bold mt-6">📜 Student List</h3>
      <ul className="mt-4 space-y-3">
        {students.length > 0 ? (
          students.map((student) => (
            <li key={student.id} className="flex justify-between bg-gray-100 p-3 rounded-lg shadow-md">
              <div>
                <span className="font-bold">{student.full_name}</span> (Grade: {student.grade})  
                <br />
                <span className="text-sm text-gray-600">📧 {student.email}</span>
                <br />
                <span className="text-sm text-gray-500">👤 Parent: {student.parent ? student.parent : "No Parent Assigned"}</span>
              </div>
              
              {userRole === "admin" && (
                <button
                  onClick={() => handleDelete(student.id)}
                  className="text-red-500 font-bold hover:text-red-700"
                >
                  ❌ Delete
                </button>
              )}
            </li>
          ))
        ) : (
          <p className="text-gray-500">No students found.</p>
        )}
      </ul>
    </div>
  );
};

export default ManageStudents;
