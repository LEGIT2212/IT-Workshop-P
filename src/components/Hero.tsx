import React from 'react';
import { useApp } from '../context/AppContext';
import { Award, BookCheck, Sparkles } from 'lucide-react';

export const Hero: React.FC = () => {
  const { setActiveView, setSelectedCategorySlug, setSearchQuery } = useApp();

  const handleExploreCourses = () => {
    setSelectedCategorySlug(null);
    setSearchQuery('');
    setActiveView('courses');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <section className="hero">
      <div className="hero-text">
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-50 text-blue-700 text-sm font-semibold rounded-full mb-4 border border-blue-100">
          <Sparkles className="w-4 h-4 text-blue-600" />
          <span>Complete Python, Django & MySQL Architecture</span>
        </div>

        <h1>Learn Anywhere, Anytime</h1>

        <p>
          Access high-quality online courses from expert teachers.
          Improve your skills, read structured study notes, and evaluate your knowledge with interactive instant-graded quizzes.
        </p>

        <div className="flex flex-wrap items-center gap-4">
          <button 
            type="button" 
            onClick={handleExploreCourses}
            className="cursor-pointer shadow-md hover:bg-blue-700 transition"
          >
            Explore Courses
          </button>
          
          <button
            type="button"
            onClick={() => setActiveView('django-code')}
            className="px-6 py-3.5 bg-white border border-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-50 transition cursor-pointer text-base"
          >
            View Django Architecture
          </button>
        </div>
      </div>

      <div className="hero-image relative">
        <img 
          src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=600&auto=format&fit=crop&q=80" 
          alt="EduLearn Students Collaborating" 
          className="rounded-2xl shadow-xl border-4 border-white"
        />

        {/* Floating badge */}
        <div className="absolute -bottom-6 -left-6 bg-white p-4 rounded-xl shadow-lg border border-gray-100 flex items-center gap-3">
          <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center">
            <Award className="w-6 h-6" />
          </div>
          <div>
            <div className="text-sm font-bold text-gray-900">100% Certified Learning</div>
            <div className="text-xs text-gray-500">Real-time instant scoring</div>
          </div>
        </div>

        {/* Floating badge top right */}
        <div className="absolute -top-4 -right-4 bg-white px-4 py-2 rounded-xl shadow-md border border-gray-100 flex items-center gap-2">
          <BookCheck className="w-4 h-4 text-green-600" />
          <span className="text-xs font-semibold text-gray-700">MySQL Database Active</span>
        </div>
      </div>
    </section>
  );
};
