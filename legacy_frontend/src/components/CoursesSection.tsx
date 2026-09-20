import React from 'react';
import { useApp } from '../context/AppContext';
import { BookOpen, HelpCircle, CheckCircle, Search, Filter } from 'lucide-react';

interface CoursesSectionProps {
  showOnlyFeatured?: boolean;
  title?: string;
}

export const CoursesSection: React.FC<CoursesSectionProps> = ({ 
  showOnlyFeatured = false,
  title = "Featured Courses" 
}) => {
  const { 
    courses, 
    categories, 
    notes, 
    quizzes, 
    viewCourse, 
    isEnrolledInCourse, 
    enrollInCourse,
    selectedCategorySlug,
    setSelectedCategorySlug,
    searchQuery,
    setSearchQuery
  } = useApp();

  // Filter courses
  let filtered = courses;
  if (showOnlyFeatured) {
    filtered = courses.filter(c => c.isFeatured);
  } else {
    if (selectedCategorySlug) {
      const cat = categories.find(c => c.slug === selectedCategorySlug);
      if (cat) {
        filtered = filtered.filter(c => c.categoryId === cat.id);
      }
    }
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      filtered = filtered.filter(c => 
        c.title.toLowerCase().includes(q) || 
        c.description.toLowerCase().includes(q) ||
        c.instructor.toLowerCase().includes(q)
      );
    }
  }

  return (
    <section className="courses" id="courses">
      <h2>{title}</h2>

      {/* Filter and Search Bar when on full Courses view */}
      {!showOnlyFeatured && (
        <div className="mb-10 max-w-4xl mx-auto flex flex-col md:flex-row gap-4 items-center justify-between">
          {/* Search input */}
          <div className="relative w-full md:w-80">
            <Search className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input 
              type="text" 
              placeholder="Search courses or instructor..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-white border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-blue-500 shadow-sm"
            />
          </div>

          {/* Category tabs */}
          <div className="flex flex-wrap gap-2 justify-center">
            <button
              type="button"
              onClick={() => setSelectedCategorySlug(null)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-semibold cursor-pointer transition-colors ${
                selectedCategorySlug === null
                  ? 'bg-blue-600 text-white'
                  : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200'
              }`}
            >
              All Categories ({courses.length})
            </button>
            {categories.map(cat => (
              <button
                key={cat.id}
                type="button"
                onClick={() => setSelectedCategorySlug(cat.slug)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-semibold cursor-pointer transition-colors ${
                  selectedCategorySlug === cat.slug
                    ? 'bg-blue-600 text-white'
                    : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200'
                }`}
              >
                {cat.name}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Courses Grid */}
      <div className="course-container">
        {filtered.map((course) => {
          const courseNotes = notes.filter(n => n.courseId === course.id);
          const courseQuizzes = quizzes.filter(q => q.courseId === course.id);
          const enrolled = isEnrolledInCourse(course.id);

          return (
            <div key={course.id} className="course-card hover:shadow-xl transition-shadow flex flex-col justify-between">
              <div>
                <div className="relative">
                  <img 
                    src={course.imageUrl} 
                    alt={course.title}
                    className="w-full h-48 object-cover"
                    loading="lazy"
                  />
                  <span className="absolute top-3 left-3 bg-white/90 backdrop-blur-xs text-blue-700 text-xs font-bold px-2.5 py-1 rounded-md shadow-xs">
                    {course.categoryName || 'General'}
                  </span>
                  {enrolled && (
                    <span className="absolute top-3 right-3 bg-emerald-600 text-white text-xs font-bold px-2 py-1 rounded-md flex items-center gap-1 shadow-xs">
                      <CheckCircle className="w-3.5 h-3.5" /> Enrolled
                    </span>
                  )}
                </div>

                <div className="p-4 pb-2">
                  <div className="text-xs text-gray-500 font-medium mb-1">
                    Instructor: <strong className="text-gray-700">{course.instructor}</strong>
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 line-clamp-1 p-0 mb-2">
                    {course.title}
                  </h3>
                  <p className="text-sm text-gray-600 line-clamp-2 p-0 leading-relaxed">
                    {course.description}
                  </p>

                  <div className="mt-4 pt-3 border-t border-gray-100 flex items-center justify-between text-xs text-gray-500">
                    <span className="flex items-center gap-1">
                      <BookOpen className="w-3.5 h-3.5 text-blue-500" />
                      {courseNotes.length} {courseNotes.length === 1 ? 'Study Note' : 'Study Notes'}
                    </span>
                    <span className="flex items-center gap-1">
                      <HelpCircle className="w-3.5 h-3.5 text-amber-500" />
                      {courseQuizzes.length} {courseQuizzes.length === 1 ? 'Quiz' : 'Quizzes'}
                    </span>
                  </div>
                </div>
              </div>

              <div className="p-4 pt-0 flex gap-2">
                <button
                  type="button"
                  onClick={() => viewCourse(course.slug)}
                  className="w-full py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold rounded-md transition-colors cursor-pointer"
                >
                  {enrolled ? 'Go to Lessons & Tests' : 'View Course & Enroll'}
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-16 bg-white rounded-xl shadow-xs max-w-lg mx-auto">
          <p className="text-gray-500 text-base mb-4">No courses found matching your criteria.</p>
          <button
            type="button"
            onClick={() => { setSelectedCategorySlug(null); setSearchQuery(''); }}
            className="px-4 py-2 bg-blue-600 text-white text-sm font-semibold rounded-md"
          >
            Clear Filters
          </button>
        </div>
      )}
    </section>
  );
};
