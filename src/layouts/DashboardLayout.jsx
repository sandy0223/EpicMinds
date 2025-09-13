import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../components/Navbar';

const DashboardLayout = () => {
  return (
    <div className="flex min-h-screen">
      <Navbar />
      <main className="flex-grow p-8 bg-gray-50">
        <Outlet />
      </main>
    </div>
  );
};

export default DashboardLayout;
