import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

export const ProtectedRoute: React.FC = () => {
  const isAuthenticated = localStorage.getItem('isAdminAuthenticated') === 'true';

  return isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />;
};