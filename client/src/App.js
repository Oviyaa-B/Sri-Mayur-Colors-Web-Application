import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';

// 1. IMPORT FROM ORGANIZED STRUCTURE
import { Navbar, Footer, PageTransition } from './components/layout';

// 2. IMPORT PAGES BY CATEGORY
import { Home, Factory, Process, Shop } from './pages/public';
import { Dashboard, BulkInquiry } from './pages/admin';
import Login from './pages/admin/Login';
import { DesignMatcher } from './pages/tools';
import DesignLab from './pages/DesignLab';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/layout/ProtectedRoute';
import AdminRoute from './components/layout/AdminRoute';

// 3. IMPORT CONFIG
import { ROUTES } from './config/constants';

// 4. ANIMATED ROUTES WRAPPER
function AnimatedRoutes() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        {/* Public Login Page */}
        <Route path={ROUTES.LOGIN} element={<PageTransition><Login /></PageTransition>} />

        {/* Protected User Pages */}
        <Route path={ROUTES.HOME} element={<ProtectedRoute><PageTransition><Home /></PageTransition></ProtectedRoute>} />
        <Route path={ROUTES.FACTORY} element={<ProtectedRoute><PageTransition><Factory /></PageTransition></ProtectedRoute>} />
        <Route path={ROUTES.PROCESS} element={<ProtectedRoute><PageTransition><Process /></PageTransition></ProtectedRoute>} />
        <Route path={ROUTES.SHOP} element={<ProtectedRoute><PageTransition><Shop /></PageTransition></ProtectedRoute>} />
        
        {/* Tools Pages */}
        <Route path={ROUTES.MATCHER} element={<ProtectedRoute><PageTransition><DesignMatcher /></PageTransition></ProtectedRoute>} />
        <Route path={ROUTES.DESIGN_LAB} element={<ProtectedRoute><PageTransition><DesignLab /></PageTransition></ProtectedRoute>} />
        
        {/* Logistics / Dashboard Pages */}
        <Route path={ROUTES.BULK_INQUIRY} element={<ProtectedRoute><PageTransition><BulkInquiry /></PageTransition></ProtectedRoute>} />
        <Route path={ROUTES.ADMIN.DASHBOARD} element={<ProtectedRoute><PageTransition><Dashboard /></PageTransition></ProtectedRoute>} />
      </Routes>
    </AnimatePresence>
  );
}

// 5. MAIN APP COMPONENT
function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="flex flex-col min-h-screen">
          <Navbar />
          <main className="flex-grow">
            <AnimatedRoutes />
          </main>
          <Footer />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
