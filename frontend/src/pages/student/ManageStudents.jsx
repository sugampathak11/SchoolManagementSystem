import React, { useState, useEffect } from "react";
import API from "../../utils/api"; // ✅ Import API

const ManageStudents = () => {
  const [students, setStudents] = useState([]);
  const [formData, setFormData] = useState({ full_name: "", grade: "", parent: "" });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const userRole = localStorage.getItem("role"); // ✅ Get user role

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        console.log("🔍 Fetching students from API...");
        const response = await API.get("/students/");
        console.log("✅ API Response:", response.data);
        setStudents(response.data);
      } catch (error) {
        console.error("❌ Error fetching students:", error.response?.data || error.message);
        setError("Failed to fetch students.");
      }
    };
    fetchStudents();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    try {
        // Create student data object
        const studentData = {
            username: formData.username,
            email: formData.email,
            password: formData.password,
            full_name: formData.full_name,
            grade: formData.grade,
            // Only include parent if it's provided
            ...(formData.parent && { parent: formData.parent }),
        };

        console.log("🔹 Sending student data:", studentData);
        const response = await API.post("/students/", studentData);
        console.log("✅ Student added:", response.data);

        setStudents([...students, response.data]);
        setSuccess(`Student ${response.data.full_name} added successfully!`);
        
        // Reset form
        setFormData({
            username: "",
            full_name: "",
            email: "",
            password: "",
            grade: "",
            parent: ""
        });
    } catch (error) {
        console.error("❌ Error:", error.response?.data || error.message);
        setError(error.response?.data?.detail || "Failed to add student");
    }
};
  const handleDelete = async (id) => {
    try {
      console.log(`🗑️ Deleting student ID: ${id}`);
      await API.delete(`/students/${id}/`);
      setStudents(students.filter((student) => student.id !== id));
    } catch (error) {
      console.error("❌ Error deleting student:", error.response?.data || error.message);
      setError("Failed to delete student.");
    }
  };

  return (
    <div>
      <h2>Manage Students</h2>

      {userRole === "admin" && (
        <form onSubmit={handleSubmit}>
          <label>Full Name:</label>
          <input type="text" name="full_name" value={formData.full_name} onChange={handleChange} required />

          <label>Grade:</label>
          <input type="text" name="grade" value={formData.grade} onChange={handleChange} required />

          <label>Parent (Optional):</label>
          <input type="text" name="parent" value={formData.parent} onChange={handleChange} />

          <button type="submit">Add Student</button>
        </form>
      )}

      {success && <p className="text-green-500">{success}</p>}
      {error && <p className="text-red-500">{error}</p>}

      <h3>Student List</h3>
      <ul>
        {students.length > 0 ? (
          students.map((student) => (
            <li key={student.id}>
              {student.full_name} (Grade: {student.grade}) - Parent: {student.parent ? student.parent.username : "N/A"}
              {userRole === "admin" && (
                <button onClick={() => handleDelete(student.id)}>Delete</button>
              )}
            </li>
          ))
        ) : (
          <p>No students found.</p>
        )}
      </ul>
    </div>
  );
};

export default ManageStudents;
