import React, { useState, useEffect } from "react";
import axios from "axios";

const StudentTimetable = () => {
  const [timetable, setTimetable] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchTimetable = async () => {
      try {
        const token = localStorage.getItem("accessToken");
        const response = await axios.get("http://127.0.0.1:8000/api/student/timetable/", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setTimetable(response.data);
      } catch (error) {
        setError("Failed to load timetable.");
      } finally {
        setLoading(false);
      }
    };
    fetchTimetable();
  }, []);

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center p-6">
      <h2 className="text-3xl font-bold mb-4 text-teal-400">Student Timetable</h2>

      {loading ? (
        <p className="text-gray-400">Loading timetable...</p>
      ) : error ? (
        <p className="text-red-400">{error}</p>
      ) : (
        <div className="w-full max-w-4xl bg-gray-800 p-6 rounded-lg shadow-lg">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-teal-500">
                <th className="p-3">Day</th>
                <th className="p-3">Time</th>
                <th className="p-3">Subject</th>
                <th className="p-3">Teacher</th>
              </tr>
            </thead>
            <tbody>
              {Object.keys(timetable).map((day) =>
                timetable[day].length > 0 ? (
                  timetable[day].map((entry, index) => (
                    <tr key={index} className="border-b border-gray-600">
                      {index === 0 && <td rowSpan={timetable[day].length} className="p-3 font-bold text-teal-400">{day}</td>}
                      <td className="p-3">{entry.time}</td>
                      <td className="p-3">{entry.subject}</td>
                      <td className="p-3">{entry.teacher}</td>
                    </tr>
                  ))
                ) : (
                  <tr key={day} className="border-b border-gray-600">
                    <td className="p-3 font-bold text-teal-400">{day}</td>
                    <td colSpan="3" className="p-3 text-gray-400">No classes</td>
                  </tr>
                )
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default StudentTimetable;
