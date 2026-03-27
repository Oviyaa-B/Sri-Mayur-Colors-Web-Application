import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Sparkles, LayoutDashboard, Home, Factory, Package, ArrowRight, LogOut } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const { user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const isActive = (path) => location.pathname === path ? "text-blue-600 bg-blue-50" : "text-slate-600 hover:bg-slate-50";

  return (
    <nav className="fixed top-0 w-full z-50 bg-white/90 backdrop-blur-xl border-b border-slate-100 px-8 py-5">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        {/* Professional Identity */}
        <Link to="/" className="flex items-center gap-3 group">
          <div className="w-10 h-10 bg-slate-900 rounded-xl flex items-center justify-center shadow-lg group-hover:rotate-12 transition-transform">
            <Factory className="text-white" size={20} />
          </div>
          <div className="flex flex-col">
            <span className="text-lg font-black text-slate-900 tracking-tighter leading-none uppercase">Sri Mayur Colors</span>
            <span className="text-[9px] font-bold text-blue-600 uppercase tracking-[0.3em]">Industrial Precision</span>
          </div>
        </Link>

        {/* Global Navigation Hub */}
        <div className="hidden lg:flex items-center gap-2">
          {user?.role !== 'admin' && (
            <>
              <NavLink to="/" label="Home" active={isActive('/')} />
              <NavLink to="/factory" label="Facility" active={isActive('/factory')} />
              <NavLink to="/matcher" label="Color Matcher" active={isActive('/matcher')} />
              <NavLink to="/design-lab" label="3D Design Lab" active={isActive('/design-lab')} icon={<Sparkles size={14} className="text-blue-500" />} />
            </>
          )}
          
          {(user?.role === 'admin' || user?.role === 'user') && (
            <NavLink to="/admin/dashboard" label="Logistics" active={isActive('/admin/dashboard')} />
          )}
        </div>

        {/* High-Conversion CTA & Logout */}
        <div className="flex items-center gap-4">
          {user?.role !== 'admin' && (
            <Link to="/bulk" className="bg-blue-600 text-white px-7 py-3 rounded-xl text-xs font-black uppercase tracking-widest hover:bg-slate-900 transition-all shadow-xl shadow-blue-100 flex items-center gap-2">
              <Package size={16} /> Bulk Inquiry <ArrowRight size={14} />
            </Link>
          )}
          
          {user && (
            <button 
              onClick={() => { logout(); navigate('/login'); }}
              className="px-4 py-2 border-2 border-slate-100 rounded-xl text-slate-500 hover:text-red-500 hover:bg-red-50 hover:border-red-100 font-bold text-sm transition-all flex items-center gap-2"
              title="Logout"
            >
               <LogOut size={16} /> Logout
            </button>
          )}
        </div>
      </div>
    </nav>
  );
};

const NavLink = ({ to, label, active, icon }) => (
  <Link to={to} className={`flex items-center gap-2 px-5 py-2.5 rounded-lg text-[11px] font-black uppercase tracking-widest transition-all ${active}`}>
    {icon} {label}
  </Link>
);

export default Navbar;