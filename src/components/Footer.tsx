import React from 'react';
import { useApp } from '../context/AppContext';
import { Database, Terminal, Shield } from 'lucide-react';

export const Footer: React.FC = () => {
  const { setActiveView, resetToDefaults } = useApp();

  return (
    <footer className="bg-gray-900 text-white text-center py-12 px-6 mt-16">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 pb-8 border-b border-gray-800">
        <div className="text-left">
          <h3 className="text-2xl font-bold text-blue-400">EduLearn</h3>
          <p className="text-gray-400 text-sm mt-1">
            Enterprise-grade e-learning built with Python, Django ORM & MySQL Relational Models.
          </p>
        </div>

        <div className="flex flex-wrap gap-4 text-sm text-gray-300">
          <button 
            type="button" 
            onClick={() => setActiveView('home')} 
            className="hover:text-blue-400 transition"
          >
            Home
          </button>
          <button 
            type="button" 
            onClick={() => setActiveView('courses')} 
            className="hover:text-blue-400 transition"
          >
            Course Catalog
          </button>
          <button 
            type="button" 
            onClick={() => setActiveView('django-code')} 
            className="hover:text-emerald-400 transition flex items-center gap-1 font-semibold text-emerald-300"
          >
            <Terminal className="w-4 h-4" />
            Django & MySQL Architecture
          </button>
          <button 
            type="button" 
            onClick={() => setActiveView('admin')} 
            className="hover:text-red-400 transition flex items-center gap-1 font-semibold text-red-300"
          >
            <Shield className="w-4 h-4" />
            Admin Portal
          </button>
        </div>
      </div>

      <div className="max-w-6xl mx-auto mt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-gray-500 gap-4">
        <p>© 2026 EduLearn Inc. All Rights Reserved. Django MVT & MySQL Schema.</p>
        <div className="flex items-center gap-4">
          <span className="flex items-center gap-1 text-gray-400">
            <Database className="w-3.5 h-3.5 text-blue-400" />
            MySQL Schema Connected
          </span>
          <button
            type="button"
            onClick={resetToDefaults}
            className="text-gray-500 hover:text-gray-300 underline cursor-pointer"
            title="Reset simulated data"
          >
            Reset Demo Data
          </button>
        </div>
      </div>
    </footer>
  );
};
