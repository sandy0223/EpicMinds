import React, { createContext, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  const login = ({ username, password }) => {
    if (username === 'admin' && password === 'admin') {
      setUser({ username: 'admin' });
      navigate('/dashboard');
    } else {
      alert('Invalid credentials');
    }
  };

  const logout = () => {
    setUser(null);
    navigate('/login');
  };

  const value = {
    user,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
