import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { FiLock, FiUser } from 'react-icons/fi';
import './Login.css';

export default function Login() {
  const { login } = useAuth();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [popup, setPopup] = useState({ show: false, type: '', message: '' });

  const showPopup = (type, message) => {
    setPopup({ show: true, type, message });
    setTimeout(() => setPopup({ show: false, type: '', message: '' }), 3000);
  };

  const onSubmit = e => {
    e.preventDefault();

    if (!username || !password) {
      showPopup('error', 'Username and password are required!');
      return;
    }

    if (username !== 'admin' || password !== 'admin') {
      showPopup('error', 'Invalid username or password!');
      return;
    }

    login({ username, password });
    showPopup('success', 'Login successful! Redirecting...');
  };

  return (
    <div className="login-container">
      {popup.show && (
        <div className={`popup ${popup.type}`}>
          <p>{popup.message}</p>
        </div>
      )}

      <div className="login-card">
        <h2 className="login-title bebas-neue-regular">Admin Login</h2>
        <form onSubmit={onSubmit} className="login-form">
          {/* Username */}
          <div className="login-field">
            <label className="login-label">Username</label>
            <div className="login-input-wrapper">
              <FiUser className="login-icon" />
              <input
                type="text"
                className="login-input"
                value={username}
                onChange={e => setUsername(e.target.value)}
                placeholder="admin"
              />
            </div>
          </div>

          {/* Password */}
          <div className="login-field">
            <label className="login-label">Password</label>
            <div className="login-input-wrapper">
              <FiLock className="login-icon" />
              <input
                type="password"
                className="login-input"
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="••••••"
              />
            </div>
          </div>

          {/* Login Button */}
          <button type="submit" className="login-button">
            Login
          </button>
        </form>

        {/* Footer */}
        <p className="login-footer">
          © {new Date().getFullYear()} EpicMinds Inc. All rights reserved.
        </p>
      </div>
    </div>
  );
}
