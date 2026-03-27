import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { ROUTES } from '../../config/constants';

const AdminRoute = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
        <div className="min-h-screen flex items-center justify-center bg-slate-50">
            <div className="animate-pulse font-bold text-slate-500">Verifying Admin Access...</div>
        </div>
    );
  }

  // If not logged in, they hit the standard login wall anyway, but let's be safe
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // Only allow admin
  if (user.role !== 'admin') {
    return <Navigate to="/" replace />; // Send users back to home
  }

  return children;
};

export default AdminRoute;
