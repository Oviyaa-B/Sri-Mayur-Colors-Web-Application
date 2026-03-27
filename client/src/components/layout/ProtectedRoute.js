import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { ROUTES } from '../../config/constants';

const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
        <div className="min-h-screen flex items-center justify-center bg-slate-50">
            <div className="animate-pulse font-bold text-slate-500">Checking Authentication...</div>
        </div>
    );
  }

  if (!user) {
    // Redirect unauthenticated to the /login page
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // Admin users should strictly stay on the Dashboard page or bulk inquiry pages
  // We'll redirect them if they try to access the public-facing App pages (like Home, Factory, etc.)
  const adminAllowedPaths = [ROUTES.ADMIN?.DASHBOARD || '/admin/dashboard', ROUTES.BULK_INQUIRY || '/bulk'];
  
  if (user.role === 'admin' && !adminAllowedPaths.some(p => location.pathname.startsWith(p))) {
    return <Navigate to={ROUTES.ADMIN?.DASHBOARD || '/admin/dashboard'} replace />;
  }

  return children;
};

export default ProtectedRoute;
