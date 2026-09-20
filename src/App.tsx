import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { CategoriesSection } from './components/CategoriesSection';
import { CoursesSection } from './components/CoursesSection';
import { StatsSection } from './components/StatsSection';
import { TestimonialsSection } from './components/TestimonialsSection';
import { Footer } from './components/Footer';
import { CourseDetailView } from './components/CourseDetailView';
import { QuizView } from './components/QuizView';
import { QuizResultView } from './components/QuizResultView';
import { StudentDashboard } from './components/StudentDashboard';
import { AdminDashboard } from './components/AdminDashboard';
import { NotesReaderModal } from './components/NotesReaderModal';
import { AuthModal } from './components/AuthModal';
import { DjangoCodeViewer } from './components/DjangoCodeViewer';

const AppContent: React.FC = () => {
  const { activeView } = useApp();

  return (
    <div className="min-h-screen flex flex-col bg-white font-sans text-gray-800">
      <Navbar />

      <main className="flex-1">
        {activeView === 'home' && (
          <>
            <Hero />
            <CategoriesSection />
            <CoursesSection showOnlyFeatured={true} title="Featured Courses" />
            <StatsSection />
            <TestimonialsSection />
          </>
        )}

        {activeView === 'courses' && (
          <CoursesSection showOnlyFeatured={false} title="Explore All Online Courses" />
        )}

        {activeView === 'course-detail' && <CourseDetailView />}

        {activeView === 'quiz' && <QuizView />}

        {activeView === 'quiz-result' && <QuizResultView />}

        {activeView === 'dashboard' && <StudentDashboard />}

        {activeView === 'admin' && <AdminDashboard />}

        {activeView === 'django-code' && <DjangoCodeViewer />}
      </main>

      <Footer />

      {/* Modals */}
      <NotesReaderModal />
      <AuthModal />
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}
