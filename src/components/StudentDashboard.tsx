import React from 'react';
import { useApp } from '../context/AppContext';
import { BookOpen, Award, CheckCircle, Clock, ArrowRight, PlayCircle, BarChart2 } from 'lucide-react';

export const StudentDashboard: React.FC = () => {
  const { 
    currentUser, 
    enrollments, 
    courses, 
    testResults, 
    viewCourse, 
    startQuiz, 
    setActiveView 
  } = useApp();

  const userEnrollments = enrollments.filter(e => e.userId === currentUser?.id);
  const userResults = testResults.filter(r => r.userId === currentUser?.id);

  const totalScore = userResults.reduce((acc, r) => acc + r.percentage, 0);
  const avgScore = userResults.length > 0 ? Math.round(totalScore / userResults.length) : 0;
  const passedCount = userResults.filter(r => r.passed).length;

  return (
    <div className="max-w-6xl mx-auto px-6 py-10">
      {/* Header Profile Greeting */}
      <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-200 mb-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <span className="text-xs font-bold text-blue-600 uppercase tracking-wider block mb-1">
            Student Learning Portal
          </span>
          <h1 className="text-3xl font-extrabold text-gray-900">
            Welcome back, {currentUser?.fullName || 'Student'}!
          </h1>
          <p className="text-gray-500 text-sm mt-1">
            Email: <span className="text-gray-700">{currentUser?.email}</span> • Role: <span className="capitalize font-semibold text-blue-600">{currentUser?.role}</span>
          </p>
        </div>

        {/* Top Metric Pills */}
        <div className="flex flex-wrap gap-4">
          <div className="bg-blue-50/80 border border-blue-100 px-5 py-3 rounded-xl text-center">
            <div className="text-2xl font-black text-blue-600">{userEnrollments.length}</div>
            <div className="text-xs text-gray-600 font-semibold">Enrolled Courses</div>
          </div>
          <div className="bg-emerald-50/80 border border-emerald-100 px-5 py-3 rounded-xl text-center">
            <div className="text-2xl font-black text-emerald-600">{avgScore}%</div>
            <div className="text-xs text-gray-600 font-semibold">Average Test Score</div>
          </div>
          <div className="bg-amber-50/80 border border-amber-100 px-5 py-3 rounded-xl text-center">
            <div className="text-2xl font-black text-amber-600">{passedCount}</div>
            <div className="text-xs text-gray-600 font-semibold">Tests Passed</div>
          </div>
        </div>
      </div>

      {/* Enrolled Courses Section */}
      <div className="mb-12">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-blue-600" />
            <h2 className="text-2xl font-bold text-gray-900">My Enrolled Courses</h2>
          </div>
          <button
            type="button"
            onClick={() => setActiveView('courses')}
            className="text-sm font-semibold text-blue-600 hover:text-blue-700 flex items-center gap-1 cursor-pointer"
          >
            <span>Browse More</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {userEnrollments.map((enrollment) => {
            const course = courses.find(c => c.id === enrollment.courseId);
            if (!course) return null;

            return (
              <div 
                key={enrollment.id}
                className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden flex flex-col justify-between hover:shadow-md transition"
              >
                <div>
                  <img 
                    src={course.imageUrl} 
                    alt={course.title} 
                    className="w-full h-40 object-cover"
                  />
                  <div className="p-5 pb-3">
                    <span className="text-xs font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded">
                      {course.categoryName}
                    </span>
                    <h3 className="text-base font-bold text-gray-900 mt-2 mb-1">
                      {course.title}
                    </h3>
                    <p className="text-xs text-gray-500 mb-4">
                      Instructor: {course.instructor}
                    </p>

                    {/* Progress Bar */}
                    <div className="space-y-1.5 mb-2">
                      <div className="flex justify-between text-xs font-semibold text-gray-600">
                        <span>Course Completion</span>
                        <span>{enrollment.progressPercent}%</span>
                      </div>
                      <div className="w-full bg-gray-100 h-2 rounded-full overflow-hidden">
                        <div 
                          className="bg-blue-600 h-full rounded-full transition-all duration-500"
                          style={{ width: `${enrollment.progressPercent}%` }}
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="p-5 pt-0">
                  <button
                    type="button"
                    onClick={() => viewCourse(course.slug)}
                    className="w-full py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg text-xs transition cursor-pointer flex items-center justify-center gap-1.5"
                  >
                    <span>Continue Learning</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })}

          {userEnrollments.length === 0 && (
            <div className="col-span-full bg-white p-10 rounded-2xl border border-gray-200 text-center">
              <BookOpen className="w-10 h-10 text-gray-300 mx-auto mb-3" />
              <h3 className="text-lg font-bold text-gray-700">No courses enrolled yet</h3>
              <p className="text-sm text-gray-500 mt-1 mb-6">
                Explore our rich curriculum of Python, Full Stack, and Data Science courses.
              </p>
              <button
                type="button"
                onClick={() => setActiveView('courses')}
                className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg text-sm transition"
              >
                Browse Catalog
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Quiz Submission History */}
      <div>
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <Award className="w-5 h-5 text-amber-500" />
            <h2 className="text-2xl font-bold text-gray-900">Quiz & Test History</h2>
          </div>
          <span className="text-xs text-gray-500 font-semibold">
            {userResults.length} Submissions Recorded
          </span>
        </div>

        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-gray-50 text-gray-500 font-semibold border-b border-gray-200">
                <tr>
                  <th className="px-6 py-3.5">Quiz Name</th>
                  <th className="px-6 py-3.5">Course</th>
                  <th className="px-6 py-3.5">Score</th>
                  <th className="px-6 py-3.5">Percentage</th>
                  <th className="px-6 py-3.5">Status</th>
                  <th className="px-6 py-3.5">Date & Time</th>
                  <th className="px-6 py-3.5 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {userResults.map((res) => (
                  <tr key={res.id} className="hover:bg-gray-50/70">
                    <td className="px-6 py-4 font-bold text-gray-900">{res.quizTitle}</td>
                    <td className="px-6 py-4 text-gray-600">{res.courseTitle}</td>
                    <td className="px-6 py-4 text-gray-800 font-semibold">
                      {res.score} / {res.totalQuestions}
                    </td>
                    <td className="px-6 py-4 font-bold text-blue-600">{res.percentage}%</td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold ${
                        res.passed 
                          ? 'bg-emerald-100 text-emerald-800' 
                          : 'bg-red-100 text-red-800'
                      }`}>
                        {res.passed ? 'PASSED' : 'FAILED'}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-xs text-gray-500">
                      {new Date(res.submittedAt).toLocaleString()}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button
                        type="button"
                        onClick={() => startQuiz(res.quizId)}
                        className="text-xs font-bold text-blue-600 hover:text-blue-800 cursor-pointer"
                      >
                        Retake
                      </button>
                    </td>
                  </tr>
                ))}

                {userResults.length === 0 && (
                  <tr>
                    <td colSpan={7} className="px-6 py-10 text-center text-gray-400">
                      You haven't attempted any tests yet. Visit an enrolled course and launch a quiz!
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};
