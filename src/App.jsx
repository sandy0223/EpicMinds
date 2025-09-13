import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

import Login from './components/Login';
import PeopleView from './components/PeopleView';
import FileView from './components/FileView';
import ProtectedRoute from './routes/ProtectedRoute';
import DashboardLayout from './layouts/DashboardLayout';

function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Routes>
        {/* Public Route */}
        <Route path="/login" element={<Login />} />

        {/* Protected Dashboard Route */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <DashboardLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<Navigate to="people" replace />} />
          <Route path="people" element={<PeopleView />} />
          <Route path="files" element={<FileView />} />
        </Route>

        {/* Default redirect */}
        <Route path="/" element={<Navigate to="/login" replace />} />
        {/* Catch-all fallback */}
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </div>
  );
}

export default App;
