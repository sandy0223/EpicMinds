import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { FiMenu } from 'react-icons/fi';
import './DashboardLayout.css';

const DashboardLayout = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="dashboard-layout">
      {/* Mobile Toggle Button */}
      <button
        className="menu-toggle"
        onClick={() => setSidebarOpen(!isSidebarOpen)}
      >
        <FiMenu size={22} />
      </button>

      {/* Sidebar */}
      <Navbar isOpen={isSidebarOpen} onClose={() => setSidebarOpen(false)} />

      {/* Main Content */}
      <main className="dashboard-main">
        <Outlet />
      </main>
    </div>
  );
};

export default DashboardLayout;
