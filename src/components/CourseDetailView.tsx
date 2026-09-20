import React from 'react';
import { useApp } from '../context/AppContext';
import { 
  ArrowLeft, BookOpen, HelpCircle, CheckCircle, Clock, 
  Award, FileText, PlayCircle, Lock, User 
} from 'lucide-react';

export const CourseDetailView: React.FC = () => {
  const { 
    courses, 
    selectedCourseSlug, 
    notes, 
    quizzes, 
    currentUser, 
    isEnrolledInCourse, 
    enrollInCourse, 
    startQuiz, 
    openNoteReader, 
    setActiveView,
    openAuthModal
  } = useApp();

  const course = courses.find(c => c.slug === selectedCourseSlug) || courses[0];
  const courseNotes = notes.filter(n => n.courseId === course.id);
  const courseQuizzes = quizzes.filter(q => q.courseId === course.id);
  const enrolled = isEnrolledInCourse(course.id);

  const handleEnrollClick = () => {
    if (!currentUser) {
      openAuthModal('login');
      return;
    }
    enrollInCourse(course.id);
  };

  return (
    <div className="max-w-6xl mx-auto px-6 py-10">
      {/* Back button */}
      <button 
        type="button"
        onClick={() => setActiveView('courses')}
        className="flex items-center gap-2 text-sm text-gray-600 hover:text-blue-600 font-semibold mb-6 transition cursor-pointer"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to All Courses
      </button>

      {/* Main Course Header Card */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden mb-10">
        <div className="flex flex-col lg:flex-row">
          <div className="lg:w-1/2 relative min-h-[320px]">
            <img 
              src={course.imageUrl} 
              alt={course.title} 
              className="w-full h-full object-cover"
            />
            <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-xs text-blue-700 font-bold text-xs px-3 py-1.5 rounded-md shadow-sm">
              {course.categoryName}
            </div>
            {enrolled && (
              <div className="absolute top-4 right-4 bg-emerald-600 text-white font-bold text-xs px-3 py-1.5 rounded-md flex items-center gap-1.5 shadow-sm">
                <CheckCircle className="w-4 h-4" />
                Enrolled Student
              </div>
            )}
          </div>

          <div className="lg:w-1/2 p-8 lg:p-10 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-4 text-xs font-semibold text-gray-500 mb-2">
                <span className="flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5 text-blue-500" />
                  {course.duration || '8 Weeks'}
                </span>
                <span className="flex items-center gap-1">
                  <Award className="w-3.5 h-3.5 text-amber-500" />
                  {course.level || 'Beginner'} Level
                </span>
              </div>

              <h1 className="text-3xl font-extrabold text-gray-900 mb-3 leading-tight">
                {course.title}
              </h1>

              <div className="flex items-center gap-2 text-sm text-blue-600 font-semibold mb-4">
                <User className="w-4 h-4" />
                <span>Instructor: {course.instructor}</span>
                {course.instructorRole && (
                  <span className="text-gray-400 font-normal">({course.instructorRole})</span>
                )}
              </div>

              <p className="text-gray-600 text-base leading-relaxed mb-6">
                {course.description}
              </p>
            </div>

            <div className="pt-6 border-t border-gray-100 flex items-center justify-between">
              <div>
                <span className="text-xs text-gray-400 uppercase tracking-wider font-semibold block">Tuition Fee</span>
                <span className="text-2xl font-black text-emerald-600">Free Access</span>
              </div>

              {enrolled ? (
                <div className="flex items-center gap-2 text-emerald-700 bg-emerald-50 px-4 py-2.5 rounded-lg font-bold text-sm border border-emerald-200">
                  <CheckCircle className="w-5 h-5 text-emerald-600" />
                  <span>Enrolled & Ready</span>
                </div>
              ) : (
                <button
                  type="button"
                  onClick={handleEnrollClick}
                  className="px-8 py-3.5 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg shadow-md hover:shadow-lg transition cursor-pointer text-sm"
                >
                  {currentUser ? 'Enroll in Course Now' : 'Login to Enroll'}
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Grid: Study Notes on Left, Quizzes & Tests on Right */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Section 1: Study Notes & Course Materials */}
        <div className="bg-white p-7 rounded-2xl shadow-sm border border-gray-200">
          <div className="flex items-center justify-between mb-6 pb-4 border-b border-gray-100">
            <div className="flex items-center gap-2">
              <FileText className="w-5 h-5 text-blue-600" />
              <h2 className="text-xl font-bold text-gray-900">Study Notes & Materials</h2>
            </div>
            <span className="text-xs font-semibold px-2.5 py-1 bg-blue-50 text-blue-700 rounded-full">
              {courseNotes.length} available
            </span>
          </div>

          <div className="space-y-4">
            {courseNotes.map((note) => (
              <div 
                key={note.id} 
                className="p-4 rounded-xl border border-gray-200 hover:border-blue-400 bg-gray-50/50 hover:bg-blue-50/30 transition flex items-center justify-between"
              >
                <div className="pr-4">
                  <h4 className="text-base font-bold text-gray-900 mb-1">{note.title}</h4>
                  <div className="flex items-center gap-3 text-xs text-gray-500">
                    <span>Uploaded: {new Date(note.uploadedAt).toLocaleDateString()}</span>
                    {note.fileSize && <span>• {note.fileSize}</span>}
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => openNoteReader(note)}
                  className="px-3.5 py-1.5 bg-white border border-gray-300 hover:border-blue-500 text-blue-600 text-xs font-bold rounded-md shadow-2xs hover:bg-blue-50 transition cursor-pointer shrink-0"
                >
                  Read Notes
                </button>
              </div>
            ))}

            {courseNotes.length === 0 && (
              <p className="text-sm text-gray-400 text-center py-8">
                No study notes have been uploaded for this course yet.
              </p>
            )}
          </div>
        </div>

        {/* Section 2: Quizzes & Instant Tests */}
        <div className="bg-white p-7 rounded-2xl shadow-sm border border-gray-200">
          <div className="flex items-center justify-between mb-6 pb-4 border-b border-gray-100">
            <div className="flex items-center gap-2">
              <HelpCircle className="w-5 h-5 text-amber-500" />
              <h2 className="text-xl font-bold text-gray-900">Interactive Quizzes & Tests</h2>
            </div>
            <span className="text-xs font-semibold px-2.5 py-1 bg-amber-50 text-amber-700 rounded-full">
              {courseQuizzes.length} available
            </span>
          </div>

          <div className="space-y-4">
            {courseQuizzes.map((quiz) => (
              <div 
                key={quiz.id} 
                className="p-4 rounded-xl border border-gray-200 hover:border-amber-400 bg-gray-50/50 hover:bg-amber-50/20 transition flex items-center justify-between"
              >
                <div className="pr-4">
                  <h4 className="text-base font-bold text-gray-900 mb-1">{quiz.title}</h4>
                  <p className="text-xs text-gray-500 line-clamp-1 mb-2">{quiz.description}</p>
                  <div className="flex items-center gap-3 text-xs text-gray-500 font-medium">
                    <span>⏱ {quiz.timeLimitMinutes || 10} Mins</span>
                    <span>• Pass Score: {quiz.passingScore || 70}%</span>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => startQuiz(quiz.id)}
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-md shadow-xs transition cursor-pointer shrink-0 flex items-center gap-1.5"
                >
                  <PlayCircle className="w-3.5 h-3.5" />
                  <span>Start Test</span>
                </button>
              </div>
            ))}

            {courseQuizzes.length === 0 && (
              <p className="text-sm text-gray-400 text-center py-8">
                No quizzes have been published for this course yet.
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
