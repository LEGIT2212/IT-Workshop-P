import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { BookOpen, User, Shield, Terminal, LogOut, CheckCircle, ChevronDown } from 'lucide-react';

export const Navbar: React.FC = () => {
  const { 
    currentUser, 
    activeView, 
    setActiveView, 
    openAuthModal, 
    logoutUser, 
    quickSwitchRole,
    setSelectedCategorySlug,
    setSearchQuery
  } = useApp();

  const [roleDropdownOpen, setRoleDropdownOpen] = useState(false);

  const handleNavClick = (view: 'home' | 'courses' | 'dashboard' | 'admin' | 'django-code') => {
    if (view === 'courses') {
      setSelectedCategorySlug(null);
      setSearchQuery('');
    }
    setActiveView(view);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <nav className="sticky top-0 z-50 bg-white shadow-sm">
      <div 
        className="logo cursor-pointer flex items-center gap-2"
        onClick={() => handleNavClick('home')}
      >
        <BookOpen className="w-8 h-8 text-blue-600" />
        <span>EduLearn</span>
      </div>

      <ul>
        <li>
          <a 
            href="#home" 
            className={activeView === 'home' ? 'text-blue-600 font-bold' : ''}
            onClick={(e) => { e.preventDefault(); handleNavClick('home'); }}
          >
            Home
          </a>
        </li>
        <li>
          <a 
            href="#courses" 
            className={activeView === 'courses' ? 'text-blue-600 font-bold' : ''}
            onClick={(e) => { e.preventDefault(); handleNavClick('courses'); }}
          >
            Courses
          </a>
        </li>
        {currentUser && (
          <li>
            <a 
              href="#dashboard" 
              className={activeView === 'dashboard' ? 'text-blue-600 font-bold' : ''}
              onClick={(e) => { e.preventDefault(); handleNavClick('dashboard'); }}
            >
              Dashboard
            </a>
          </li>
        )}
        {currentUser?.role === 'admin' && (
          <li>
            <a 
              href="#admin" 
              className={activeView === 'admin' ? 'text-blue-600 font-bold' : ''}
              onClick={(e) => { e.preventDefault(); handleNavClick('admin'); }}
            >
              Admin Portal
            </a>
          </li>
        )}
        <li>
          <button 
            type="button"
            onClick={() => handleNavClick('django-code')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-semibold cursor-pointer border transition-colors ${
              activeView === 'django-code' 
                ? 'bg-emerald-50 border-emerald-500 text-emerald-700' 
                : 'bg-gray-50 border-gray-200 text-gray-700 hover:bg-gray-100'
            }`}
            title="Inspect Django & MySQL Backend Architecture"
          >
            <Terminal className="w-3.5 h-3.5 text-emerald-600" />
            <span>Django & MySQL Code</span>
          </button>
        </li>
      </ul>

      <div className="buttons relative">
        {currentUser ? (
          <div className="flex items-center gap-3">
            {/* Role indicator and quick switcher */}
            <div className="relative">
              <button 
                type="button"
                onClick={() => setRoleDropdownOpen(!roleDropdownOpen)}
                className="flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border border-gray-200 bg-gray-50 hover:bg-gray-100 cursor-pointer"
              >
                {currentUser.role === 'admin' ? (
                  <Shield className="w-3.5 h-3.5 text-red-600" />
                ) : (
                  <User className="w-3.5 h-3.5 text-blue-600" />
                )}
                <span className="capitalize">{currentUser.role}: {currentUser.fullName.split(' ')[0]}</span>
                <ChevronDown className="w-3 h-3 text-gray-500" />
              </button>

              {roleDropdownOpen && (
                <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-xl border border-gray-100 py-2 z-50 text-sm">
                  <div className="px-3 py-1.5 text-xs text-gray-400 font-semibold uppercase tracking-wider">
                    Quick Role Switcher
                  </div>
                  <button
                    type="button"
                    onClick={() => { quickSwitchRole('student'); setRoleDropdownOpen(false); }}
                    className="w-full text-left px-3 py-2 hover:bg-gray-50 flex items-center justify-between text-gray-700 cursor-pointer"
                  >
                    <span className="flex items-center gap-2">
                      <User className="w-4 h-4 text-blue-500" />
                      Student View (Alex)
                    </span>
                    {currentUser.role === 'student' && <CheckCircle className="w-4 h-4 text-green-500" />}
                  </button>
                  <button
                    type="button"
                    onClick={() => { quickSwitchRole('admin'); setRoleDropdownOpen(false); }}
                    className="w-full text-left px-3 py-2 hover:bg-gray-50 flex items-center justify-between text-gray-700 cursor-pointer"
                  >
                    <span className="flex items-center gap-2">
                      <Shield className="w-4 h-4 text-red-500" />
                      Admin View (Sarah)
                    </span>
                    {currentUser.role === 'admin' && <CheckCircle className="w-4 h-4 text-green-500" />}
                  </button>
                  <div className="border-t border-gray-100 my-1"></div>
                  <button
                    type="button"
                    onClick={() => { logoutUser(); setRoleDropdownOpen(false); }}
                    className="w-full text-left px-3 py-2 hover:bg-red-50 text-red-600 flex items-center gap-2 cursor-pointer"
                  >
                    <LogOut className="w-4 h-4" />
                    Sign Out
                  </button>
                </div>
              )}
            </div>

            <button 
              type="button" 
              className="login flex items-center gap-1 cursor-pointer" 
              onClick={logoutUser}
              title="Logout"
            >
              <LogOut className="w-4 h-4" />
              <span>Logout</span>
            </button>
          </div>
        ) : (
          <>
            <button 
              type="button" 
              className="login cursor-pointer" 
              onClick={() => openAuthModal('login')}
            >
              Login
            </button>
            <button 
              type="button" 
              className="signup cursor-pointer" 
              onClick={() => openAuthModal('signup')}
            >
              Sign Up
            </button>
          </>
        )}
      </div>
    </nav>
  );
};
