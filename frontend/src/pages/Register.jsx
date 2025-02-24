import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Register = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        username: "",
        email: "",
        password: "",
        role: "student", // Default role
        grade: "",
    });

    const [message, setMessage] = useState("");
    const [success, setSuccess] = useState(false);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage("");
        setSuccess(false);

        try {
            let requestData = {
                username: formData.username,
                email: formData.email,
                password: formData.password,
                role: formData.role,
            };

            // ✅ Include `grade` only if registering a student
            if (formData.role === "student") {
                requestData.grade = formData.grade;
            }

            // ✅ API call to backend
            const response = await axios.post("http://127.0.0.1:8000/api/auth/register/", requestData, {
                headers: { "Content-Type": "application/json" },
            });

            if (response.status === 201) {
                setSuccess(true);
                setMessage("✅ Registration successful! Redirecting to login...");
                setTimeout(() => navigate("/login"), 2000);
            }
        } catch (error) {
            console.error("Registration error:", error.response?.data || error.message);
            setMessage("❌ Registration failed! Try again.");
        }
    };

    return (
        <div className="flex flex-col items-center justify-center h-screen bg-gray-900 text-white">
            <h2 className="text-3xl font-bold mb-4">Register</h2>

            <form onSubmit={handleSubmit} className="bg-gray-800 p-6 rounded-lg shadow-md w-96">
                <label className="block mb-2">Username:</label>
                <input 
                    type="text" 
                    name="username" 
                    value={formData.username} 
                    onChange={handleChange} 
                    required 
                    className="w-full p-2 rounded bg-gray-700 text-white"
                />

                <label className="block mt-4 mb-2">Email:</label>
                <input 
                    type="email" 
                    name="email" 
                    value={formData.email} 
                    onChange={handleChange} 
                    required 
                    className="w-full p-2 rounded bg-gray-700 text-white"
                />

                <label className="block mt-4 mb-2">Password:</label>
                <input 
                    type="password" 
                    name="password" 
                    value={formData.password} 
                    onChange={handleChange} 
                    required 
                    className="w-full p-2 rounded bg-gray-700 text-white"
                />

                <label className="block mt-4 mb-2">Role:</label>
                <select 
                    name="role" 
                    value={formData.role} 
                    onChange={handleChange} 
                    className="w-full p-2 rounded bg-gray-700 text-white"
                >
                    <option value="student">Student</option>
                    <option value="parent">Parent</option>
                </select>

                {/* ✅ Show Grade field only if Student is selected */}
                {formData.role === "student" && (
                    <>
                        <label className="block mt-4 mb-2">Grade:</label>
                        <input 
                            type="text" 
                            name="grade" 
                            value={formData.grade} 
                            onChange={handleChange} 
                            className="w-full p-2 rounded bg-gray-700 text-white"
                        />
                    </>
                )}

                <button 
                    type="submit" 
                    className="mt-4 bg-teal-500 hover:bg-teal-600 text-white p-2 rounded w-full"
                >
                    Register
                </button>
            </form>

            {message && (
                <p className={`mt-4 ${success ? "text-green-400" : "text-red-400"}`}>
                    {message}
                </p>
            )}
        </div>
    );
};

export default Register;
