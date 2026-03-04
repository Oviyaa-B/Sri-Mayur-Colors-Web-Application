import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';

// 1. IMPORT FROM ORGANIZED STRUCTURE
import { Navbar, Footer, PageTransition } from './components/layout';

// 2. IMPORT PAGES BY CATEGORY
import { Home, Factory, Process, Shop } from './pages/public';
import { Dashboard, BulkInquiry } from './pages/admin';
import { DesignMatcher } from './pages/tools';

// 3. IMPORT CONFIG
import { ROUTES } from './config/constants';

// 4. ANIMATED ROUTES WRAPPER
function AnimatedRoutes() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        {/* Public Pages */}
        <Route path={ROUTES.HOME} element={<PageTransition><Home /></PageTransition>} />
        <Route path={ROUTES.FACTORY} element={<PageTransition><Factory /></PageTransition>} />
        <Route path={ROUTES.PROCESS} element={<PageTransition><Process /></PageTransition>} />
        <Route path={ROUTES.SHOP} element={<PageTransition><Shop /></PageTransition>} />
        
        {/* Tools Pages */}
        <Route path={ROUTES.MATCHER} element={<PageTransition><DesignMatcher /></PageTransition>} />
        
        {/* Admin Pages */}
        <Route path={ROUTES.BULK_INQUIRY} element={<PageTransition><BulkInquiry /></PageTransition>} />
        <Route path={ROUTES.ADMIN.DASHBOARD} element={<PageTransition><Dashboard /></PageTransition>} />
      </Routes>
    </AnimatePresence>
  );
}

// 5. MAIN APP COMPONENT
function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-grow">
          <AnimatedRoutes />
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
