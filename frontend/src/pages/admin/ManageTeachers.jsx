import React, { useState, useEffect } from "react";
import API from "../../utils/api";

const ManageTeachers = () => {
  const [teachers, setTeachers] = useState([]);
  const [formData, setFormData] = useState({
    full_name: "",
    subject: "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const userRole = localStorage.getItem("role");

  // Fetch teachers on component mount
  useEffect(() => {
    const fetchTeachers = async () => {
      try {
        console.log("🔍 Fetching teachers...");
        const response = await API.get("/teachers/");
        setTeachers(response.data);
      } catch (error) {
        console.error("❌ Error:", error);
        setError("Failed to fetch teachers");
      }
    };
    fetchTeachers();
  }, []);

  // Handle form input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    try {
      console.log("🔹 Adding teacher:", formData);
      const response = await API.post("/teachers/", formData);
      setTeachers([...teachers, response.data]);
      setSuccess("✅ Teacher added successfully!");
      setFormData({ full_name: "", subject: "" });
    } catch (error) {
      console.error("❌ Error:", error);
      setError("Failed to add teacher");
    }
  };

  // Handle teacher deletion
  const handleDelete = async (id) => {
    try {
      await API.delete(`/teachers/${id}/`);
      setTeachers(teachers.filter((teacher) => teacher.id !== id));
      setSuccess("✅ Teacher deleted successfully!");
    } catch (error) {
      setError("Failed to delete teacher");
    }
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold text-green-500 mb-6">Manage Teachers</h1>

      {/* Messages */}
      {error && <p className="text-red-500 mb-4">{error}</p>}
      {success && <p className="text-green-500 mb-4">{success}</p>}

      {/* Add Teacher Form */}
      {userRole === "admin" && (
        <div className="bg-white p-6 rounded-lg shadow-md mb-6">
          <h2 className="text-xl font-semibold mb-4">Add New Teacher</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-gray-700 mb-2">Full Name:</label>
              <input
                type="text"
                name="full_name"
                value={formData.full_name}
                onChange={handleChange}
                className="w-full p-2 border rounded"
                required
              />
            </div>
            <div>
              <label className="block text-gray-700 mb-2">Subject:</label>
              <input
                type="text"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                className="w-full p-2 border rounded"
                required
              />
            </div>
            <button
              type="submit"
              className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
            >
              Add Teacher
            </button>
          </form>
        </div>
      )}

      {/* Teachers List */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4">Teachers List</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {teachers.map((teacher) => (
            <div
              key={teacher.id}
              className="bg-gray-50 p-4 rounded-lg shadow border"
            >
              <h3 className="font-semibold">{teacher.full_name}</h3>
              <p className="text-gray-600">Subject: {teacher.subject}</p>
              {userRole === "admin" && (
                <button
                  onClick={() => handleDelete(teacher.id)}
                  className="mt-2 text-red-500 hover:text-red-700"
                >
                  Delete
                </button>
              )}
            </div>
          ))}
        </div>
        {teachers.length === 0 && (
          <p className="text-gray-500">No teachers found.</p>
        )}
      </div>
    </div>
  );
};

export default ManageTeachers;