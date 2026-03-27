import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Lock, Mail, AlertCircle } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import PageTransition from '../../components/PageTransition';
import { ROUTES } from '../../config/constants';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  const { user, login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  // Redirect depending on origin or default role-based paths
  const from = location.state?.from?.pathname || (user?.role === 'admin' ? ROUTES.ADMIN?.DASHBOARD : ROUTES.HOME) || '/';

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    const result = await login(email, password);
    
    if (result.success) {
      // We will parse the raw result data to fetch the role, since context 'user' might take a cycle to update
      const loggedInRole = result.data?.role;
      const targetPath = location.state?.from?.pathname 
        ? location.state.from.pathname 
        : (loggedInRole === 'admin' ? (ROUTES.ADMIN?.DASHBOARD || '/admin/dashboard') : (ROUTES.HOME || '/'));
      
      navigate(targetPath, { replace: true });
    } else {
      setError(result.error);
    }
    setIsLoading(false);
  };

  return (
    <PageTransition>
      <div className="min-h-screen flex items-center justify-center bg-slate-50 pt-20 px-4">
        <div className="max-w-md w-full bg-white p-8 rounded-3xl shadow-xl shadow-slate-200/50 border border-slate-200">
          
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center p-3 bg-blue-600 rounded-2xl text-white mb-4">
              <Lock size={32} />
            </div>
            <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">Admin Portal</h2>
            <p className="text-sm font-bold text-slate-400 mt-2 uppercase tracking-widest">Authorize to continue</p>
          </div>

          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl flex items-center gap-3 text-red-600 text-sm font-bold">
              <AlertCircle size={18} />
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-4 top-3.5 text-slate-400" size={18} />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 font-medium focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                  placeholder="admin@srimayur.com"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Password</label>
              <div className="relative">
                <Lock className="absolute left-4 top-3.5 text-slate-400" size={18} />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 font-medium focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                  placeholder="••••••••"
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-slate-900 text-white py-4 rounded-xl font-bold hover:bg-slate-800 transition-all shadow-lg active:scale-95 flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {isLoading ? 'Authenticating...' : 'Sign In'}
            </button>
          </form>

        </div>
      </div>
    </PageTransition>
  );
};

export default Login;
