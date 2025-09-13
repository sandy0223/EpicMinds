import React from 'react';
import { NavLink } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { FiUsers, FiFileText, FiLogOut } from 'react-icons/fi'; // feather icons

export default function Navbar() {
  const { logout, user } = useAuth();

  return (
    <div className="w-64 h-screen bg-gradient-to-b from-indigo-600 to-purple-700 text-white shadow-xl flex flex-col p-6">
      {/* Header */}
      <div className="mb-12">
        <h1 className="text-3xl font-extrabold tracking-wide">🚀 Dashboard</h1>
        <p className="text-gray-200 mt-2 text-sm">Welcome, <span className="font-semibold">{user.username}</span></p>
      </div>

      {/* Navigation */}
      <nav className="flex flex-col space-y-3">
        <NavLink
          to="people"
          className={({ isActive }) =>
            `flex items-center gap-3 py-2.5 px-4 rounded-lg transition-all duration-300 ${
              isActive
                ? 'bg-white text-indigo-700 shadow-md font-semibold'
                : 'text-gray-200 hover:bg-indigo-500 hover:shadow-md'
            }`
          }
        >
          <FiUsers className="text-lg" />
          People View
        </NavLink>

        <NavLink
          to="files"
          className={({ isActive }) =>
            `flex items-center gap-3 py-2.5 px-4 rounded-lg transition-all duration-300 ${
              isActive
                ? 'bg-white text-indigo-700 shadow-md font-semibold'
                : 'text-gray-200 hover:bg-indigo-500 hover:shadow-md'
            }`
          }
        >
          <FiFileText className="text-lg" />
          File View
        </NavLink>
      </nav>

      {/* Logout */}
      <div className="mt-auto">
        <button
          onClick={logout}
          className="flex items-center gap-3 w-full py-2.5 px-4 rounded-lg text-red-100 hover:bg-red-500 hover:text-white transition-all duration-300 font-semibold"
        >
          <FiLogOut className="text-lg" />
          Logout
        </button>
      </div>
    </div>
  );
}
