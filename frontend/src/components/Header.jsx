import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";
import { motion } from "framer-motion";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedRole, setSelectedRole] = useState("Student"); // Default role

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleRoleChange = (role) => {
    setSelectedRole(role);
    setIsOpen(false); // Close dropdown after selection
  };

  return (
    <header className="bg-gray-900 text-white py-4 px-6 flex justify-between items-center shadow-lg">
      {/* Logo */}
      <Link to="/" className="text-2xl font-bold text-teal-400">
        EduEase
      </Link>

      {/* Profile Section */}
      <div className="relative">
        <button
          onClick={toggleDropdown}
          className="flex items-center space-x-2 text-white hover:text-teal-300 transition-all"
        >
          <FaUserCircle size={28} />
          <span>{selectedRole}</span>
        </button>

        {/* Role Selection Dropdown */}
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="absolute right-0 mt-2 w-48 bg-gray-800 shadow-md rounded-lg overflow-hidden border border-gray-700"
          >
            {["Admin", "Teacher", "Student"].map((role) => (
              <button
                key={role}
                className="block w-full px-4 py-2 text-left hover:bg-teal-500 transition-all"
                onClick={() => handleRoleChange(role)}
              >
                {role}
              </button>
            ))}
          </motion.div>
        )}
      </div>
    </header>
  );
};

export default Header;
