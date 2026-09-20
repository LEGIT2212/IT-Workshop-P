import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { X, User, Shield, Lock, Mail, CheckCircle } from 'lucide-react';

export const AuthModal: React.FC = () => {
  const { 
    authModalOpen, 
    authModalTab, 
    closeAuthModal, 
    loginUser, 
    signupUser, 
    quickSwitchRole 
  } = useApp();

  const [tab, setTab] = useState<'login' | 'signup'>(authModalTab);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [fullName, setFullName] = useState('');
  const [role, setRole] = useState<'student' | 'admin'>('student');

  if (!authModalOpen) return null;

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!username.trim()) return;
    loginUser(username.trim(), 'student');
  };

  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault();
    if (!username.trim() || !email.trim()) return;
    signupUser({
      username: username.trim(),
      email: email.trim(),
      fullName: fullName.trim() || username.trim(),
      role
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-xs p-4">
      <div className="bg-white w-full max-w-md rounded-2xl shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200">
        {/* Header Tabs */}
        <div className="relative border-b border-gray-100 flex bg-gray-50/70">
          <button
            type="button"
            onClick={() => setTab('login')}
            className={`flex-1 py-4 text-sm font-bold text-center cursor-pointer transition ${
              tab === 'login' 
                ? 'bg-white text-blue-600 border-b-2 border-blue-600' 
                : 'text-gray-500 hover:text-gray-900'
            }`}
          >
            Login to EduLearn
          </button>
          <button
            type="button"
            onClick={() => setTab('signup')}
            className={`flex-1 py-4 text-sm font-bold text-center cursor-pointer transition ${
              tab === 'signup' 
                ? 'bg-white text-blue-600 border-b-2 border-blue-600' 
                : 'text-gray-500 hover:text-gray-900'
            }`}
          >
            Create Account
          </button>

          <button
            type="button"
            onClick={closeAuthModal}
            className="absolute right-3 top-3 p-1.5 rounded-lg text-gray-400 hover:text-gray-700 hover:bg-gray-200 transition cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-8">
          {/* Quick Demo Selector */}
          <div className="mb-6 p-3.5 bg-blue-50/70 border border-blue-100 rounded-xl">
            <span className="text-xs font-bold text-blue-800 uppercase tracking-wider block mb-2">
              Instant 1-Click Demo Login
            </span>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => { quickSwitchRole('student'); closeAuthModal(); }}
                className="px-3 py-2 bg-white border border-blue-200 hover:border-blue-500 text-blue-700 rounded-lg text-xs font-bold transition flex items-center justify-center gap-1.5 cursor-pointer shadow-2xs"
              >
                <User className="w-3.5 h-3.5" />
                <span>Student Alex</span>
              </button>

              <button
                type="button"
                onClick={() => { quickSwitchRole('admin'); closeAuthModal(); }}
                className="px-3 py-2 bg-white border border-red-200 hover:border-red-500 text-red-700 rounded-lg text-xs font-bold transition flex items-center justify-center gap-1.5 cursor-pointer shadow-2xs"
              >
                <Shield className="w-3.5 h-3.5 text-red-500" />
                <span>Admin Sarah</span>
              </button>
            </div>
          </div>

          {tab === 'login' ? (
            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">Username or Email</label>
                <div className="relative">
                  <User className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    required
                    placeholder="student_alex or admin_sarah"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="w-full pl-9 pr-3 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-blue-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">Password</label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="password"
                    required
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full pl-9 pr-3 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-blue-500"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg text-sm transition cursor-pointer shadow-sm mt-2"
              >
                Sign In to Account
              </button>
            </form>
          ) : (
            <form onSubmit={handleSignup} className="space-y-3.5">
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">Full Name</label>
                <input
                  type="text"
                  required
                  placeholder="Alex Rivera"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">Username</label>
                <input
                  type="text"
                  required
                  placeholder="alex_dev"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">Email Address</label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="email"
                    required
                    placeholder="alex@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-9 pr-3 py-2 border border-gray-300 rounded-lg text-sm"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">Account Role</label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setRole('student')}
                    className={`py-2 px-3 text-xs font-bold rounded-lg border flex items-center justify-center gap-1.5 cursor-pointer ${
                      role === 'student'
                        ? 'bg-blue-50 border-blue-600 text-blue-700'
                        : 'bg-white border-gray-200 text-gray-600'
                    }`}
                  >
                    <User className="w-3.5 h-3.5" />
                    <span>Student</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setRole('admin')}
                    className={`py-2 px-3 text-xs font-bold rounded-lg border flex items-center justify-center gap-1.5 cursor-pointer ${
                      role === 'admin'
                        ? 'bg-red-50 border-red-600 text-red-700'
                        : 'bg-white border-gray-200 text-gray-600'
                    }`}
                  >
                    <Shield className="w-3.5 h-3.5" />
                    <span>Staff / Admin</span>
                  </button>
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg text-sm transition cursor-pointer shadow-sm mt-3"
              >
                Create Account
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
