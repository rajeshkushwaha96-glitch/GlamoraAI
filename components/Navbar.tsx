import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, Wand2, Zap, Crown, LogOut } from 'lucide-react';
import { useUser } from '../contexts/UserContext';
import { UserPlan } from '../types';
import { checkUserPremium } from '../src/lib/premium';
import { useAuth } from '../contexts/AuthContext';
import { getUsageLeft } from '../src/lib/usage';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [usageLeft, setUsageLeft] = useState(5);
  const [isPremium, setIsPremium] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { user } = useUser();
  const { isAuthenticated, user: authUser, logout } = useAuth();

  useEffect(() => {
    const updateStatus = async () => {
      const premium = checkUserPremium();
      setIsPremium(premium);
      const left = await getUsageLeft();
      setUsageLeft(left);
    };

    updateStatus();
    const interval = setInterval(updateStatus, 2000);
    return () => clearInterval(interval);
  }, [isAuthenticated]);

  const isActive = (path: string) => location.pathname === path ? 'text-indigo-600 font-semibold' : 'text-slate-600 hover:text-indigo-600';

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0 flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white">
                <Wand2 size={20} />
              </div>
              <span className="text-xl font-bold text-slate-900">Glamora AI</span>
            </Link>
          </div>
          
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/" className={isActive('/')}>Home</Link>
            <Link to="/tools" className={isActive('/tools')}>Tools</Link>
            <Link to="/pricing" className={isActive('/pricing')}>Pricing</Link>
            <Link to="/about" className={isActive('/about')}>About</Link>
            
            <div className="flex items-center space-x-4 ml-4">
              {isAuthenticated ? (
                <>
                  <div className={`flex items-center gap-1.5 text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full ${
                    isPremium 
                      ? 'bg-amber-100 text-amber-700' 
                      : 'bg-slate-200 text-slate-600'
                  }`}>
                    {isPremium ? '💎 PREMIUM' : `FREE • ${usageLeft} / 5`}
                  </div>
                  <span className="text-sm text-slate-600">{authUser?.email}</span>
                  <button onClick={handleLogout} className="text-slate-600 hover:text-red-600 flex items-center gap-1">
                    <LogOut size={16} /> Logout
                  </button>
                </>
              ) : (
                <>
                  <Link to="/login" className="text-slate-600 hover:text-indigo-600 font-medium">Log in</Link>
                  <Link to="/signup" className="bg-slate-900 hover:bg-slate-800 text-white px-4 py-2 rounded-lg font-medium transition-colors text-sm">
                    Get Started
                  </Link>
                </>
              )}
            </div>
          </div>

          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-slate-600 hover:text-indigo-600 focus:outline-none"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden bg-white border-t border-slate-100">
          <div className="px-4 pt-2 pb-6 space-y-1 shadow-lg">
            {user && (
              <div className="flex items-center justify-between p-4 mb-4 bg-slate-50 rounded-2xl border border-slate-100">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 font-bold">
                    {user.name[0]}
                  </div>
                  <div>
                    <div className="text-sm font-bold text-slate-900">{user.name}</div>
                    <div className="text-[10px] font-medium text-slate-500">{user.email}</div>
                  </div>
                </div>
                <div className={`flex items-center gap-1.5 text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full ${
                  isPremium 
                    ? 'bg-amber-100 text-amber-700' 
                    : 'bg-slate-200 text-slate-600'
                }`}>
                  {isPremium ? '💎 PREMIUM' : `FREE • ${usageLeft} / 5`}
                </div>
              </div>
            )}
            <Link to="/" className="block px-3 py-2 rounded-md text-base font-medium text-slate-700 hover:text-indigo-600 hover:bg-slate-50" onClick={() => setIsOpen(false)}>Home</Link>
            <Link to="/tools" className="block px-3 py-2 rounded-md text-base font-medium text-slate-700 hover:text-indigo-600 hover:bg-slate-50" onClick={() => setIsOpen(false)}>Tools</Link>
            <Link to="/pricing" className="block px-3 py-2 rounded-md text-base font-medium text-slate-700 hover:text-indigo-600 hover:bg-slate-50" onClick={() => setIsOpen(false)}>Pricing</Link>
            {isAuthenticated ? (
              <button onClick={handleLogout} className="block w-full text-center mt-4 px-4 py-3 rounded-lg bg-red-50 text-red-600 font-medium hover:bg-red-100">
                Logout
              </button>
            ) : (
              <>
                <Link to="/login" className="block px-3 py-2 rounded-md text-base font-medium text-slate-700 hover:text-indigo-600 hover:bg-slate-50" onClick={() => setIsOpen(false)}>Log in</Link>
                <Link to="/signup" className="block w-full text-center mt-4 px-4 py-3 rounded-lg bg-slate-900 text-white font-medium hover:bg-slate-800" onClick={() => setIsOpen(false)}>Get Started</Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;