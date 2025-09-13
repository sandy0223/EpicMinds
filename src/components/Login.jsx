import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';

export default function Login() {
  const { login } = useAuth();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const onSubmit = e => {
    e.preventDefault();
    login({ username, password });
  };

  return (
    <div className="flex items-center justify-center min-h-screen login-bg">
      <div className="bg-white rounded-lg shadow-xl p-8 w-full max-w-md animate-fadeIn">
        <h2 className="text-2xl font-bold text-primary mb-6 text-center">Admin Login</h2>
        <form onSubmit={onSubmit} className="space-y-5">
          <div>
            <label className="block text-gray-700">Username</label>
            <input
              type="text"
              className="w-full mt-1 p-2 border rounded-lg focus:outline-none focus:ring focus:ring-primary"
              value={username}
              onChange={e => setUsername(e.target.value)}
              placeholder="admin"
            />
          </div>
          <div>
            <label className="block text-gray-700">Password</label>
            <input
              type="password"
              className="w-full mt-1 p-2 border rounded-lg focus:outline-none focus:ring focus:ring-primary"
              value={password}
              onChange={e => setPassword(e.target.value)}
              placeholder="admin"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-indigo-500 text-white py-2 rounded-lg hover:bg-indigo-600 transition-all"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}
