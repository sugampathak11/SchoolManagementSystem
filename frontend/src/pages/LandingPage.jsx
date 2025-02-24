import React from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const features = [
  {
    title: "Student Management",
    description:
      "Track student profiles, grades, attendance, co-curricular activities, and achievements for holistic monitoring.",
  },
  {
    title: "Teacher Management",
    description:
      "Manage teacher profiles, qualifications, subjects handled, and class assignments while enabling performance evaluations.",
  },
  {
    title: "Class Management",
    description:
      "Create and organize classes efficiently, ensuring an optimal student-teacher ratio with necessary teaching tools.",
  },
  {
    title: "Attendance Management",
    description:
      "Automate attendance tracking with biometric, RFID, or traditional roll calls. Generate reports and notify parents of absences.",
  },
  {
    title: "Timetable Management",
    description:
      "Avoid class and teacher schedule overlaps with automated timetable creation and real-time updates for all users.",
  },
  {
    title: "Fee Management",
    description:
      "Automate fee invoices, payment tracking, and overdue reminders. Generate financial reports for better auditing.",
  },
  {
    title: "Parent-Teacher Communication",
    description:
      "Enable real-time messaging between parents and teachers for progress updates, attendance records, and school notifications.",
  },
];

const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-black to-gray-900 text-white flex flex-col items-center justify-center">
      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="text-center"
      >
        <h1 className="text-5xl md:text-7xl font-extrabold tracking-widest bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-teal-300 drop-shadow-lg">
          Welcome to EduEase
        </h1>
        <p className="text-lg md:text-2xl mt-4 text-gray-300">
          Empowering Education with Technology
        </p>

        {/* Animated Buttons */}
        <div className="mt-6 flex gap-4">
          <motion.button
            whileHover={{ scale: 1.1, boxShadow: "0px 0px 10px rgba(59, 130, 246, 0.8)" }}
            whileTap={{ scale: 0.9 }}
            transition={{ duration: 0.2 }}
            onClick={() => navigate("/login")}
            className="px-6 py-3 text-lg font-semibold rounded-full bg-blue-500 hover:bg-blue-600 transition-all shadow-lg"
          >
            Get Started
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.1, boxShadow: "0px 0px 10px rgba(75, 85, 99, 0.8)" }}
            whileTap={{ scale: 0.9 }}
            transition={{ duration: 0.2 }}
            className="px-6 py-3 text-lg font-semibold rounded-full bg-gray-700 hover:bg-gray-800 transition-all shadow-lg"
          >
            Learn More
          </motion.button>
        </div>
      </motion.div>

      {/* Features Section */}
      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-20 px-6 max-w-7xl"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.5, ease: "easeOut" }}
      >
        {features.map((feature, index) => (
          <motion.div
            key={index}
            whileHover={{ scale: 1.05, boxShadow: "0px 0px 20px rgba(0, 255, 255, 0.3)" }}
            transition={{ duration: 0.3 }}
            className="p-6 bg-black bg-opacity-20 backdrop-blur-lg rounded-lg shadow-xl border border-gray-700 hover:border-teal-400 transition-all"
          >
            <h2 className="text-xl font-semibold text-teal-400">{feature.title}</h2>
            <p className="mt-2 text-gray-300">{feature.description}</p>
          </motion.div>
        ))}
      </motion.div>

      {/* Footer */}
      <motion.footer
        className="mt-20 py-4 text-center text-gray-400"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1 }}
      >
        © 2025 EduEase. All Rights Reserved.
      </motion.footer>
    </div>
  );
};

export default LandingPage;
