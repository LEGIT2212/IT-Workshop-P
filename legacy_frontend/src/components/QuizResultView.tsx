import React from 'react';
import { useApp } from '../context/AppContext';
import { CheckCircle2, XCircle, RotateCcw, ArrowRight, Award, HelpCircle } from 'lucide-react';

export const QuizResultView: React.FC = () => {
  const { 
    testResults, 
    activeResultId, 
    quizzes, 
    questions, 
    courses, 
    startQuiz, 
    viewCourse, 
    setActiveView 
  } = useApp();

  const result = testResults.find(r => r.id === activeResultId) || testResults[0];
  const quiz = quizzes.find(q => q.id === result?.quizId);
  const course = courses.find(c => c.id === result?.courseId);
  const quizQuestions = questions.filter(q => q.quizId === result?.quizId);

  if (!result) {
    return (
      <div className="max-w-2xl mx-auto py-20 text-center">
        <p className="text-gray-500">No recent quiz result found.</p>
        <button 
          onClick={() => setActiveView('courses')}
          className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md"
        >
          Go to Courses
        </button>
      </div>
    );
  }

  const passed = result.passed;

  return (
    <div className="max-w-3xl mx-auto px-6 py-10">
      {/* Result Overview Card */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8 sm:p-10 text-center mb-8">
        <div className="inline-flex items-center justify-center w-20 h-20 rounded-full mb-4 shadow-inner"
          style={{ backgroundColor: passed ? '#dcfce7' : '#fee2e2' }}
        >
          {passed ? (
            <CheckCircle2 className="w-10 h-10 text-emerald-600" />
          ) : (
            <XCircle className="w-10 h-10 text-red-600" />
          )}
        </div>

        <h1 className="text-3xl font-black text-gray-900 mb-2">
          {passed ? 'Quiz Successfully Passed!' : 'Quiz Needs Review'}
        </h1>
        <p className="text-gray-600 text-sm max-w-md mx-auto mb-6">
          {passed 
            ? `Outstanding achievement! You met the passing criteria for "${result.quizTitle}".`
            : `You scored below the passing threshold of ${quiz?.passingScore || 70}%. Review the explanations below and try again.`}
        </p>

        {/* Score Metrics Grid */}
        <div className="grid grid-cols-3 gap-4 max-w-lg mx-auto bg-gray-50 p-4 rounded-xl border border-gray-200 mb-8">
          <div>
            <div className="text-xs text-gray-400 font-semibold uppercase">Score</div>
            <div className="text-2xl font-black text-gray-900 mt-1">
              {result.score} / {result.totalQuestions}
            </div>
          </div>
          <div className="border-x border-gray-200">
            <div className="text-xs text-gray-400 font-semibold uppercase">Percentage</div>
            <div className={`text-2xl font-black mt-1 ${passed ? 'text-emerald-600' : 'text-red-600'}`}>
              {result.percentage}%
            </div>
          </div>
          <div>
            <div className="text-xs text-gray-400 font-semibold uppercase">Status</div>
            <div className="mt-1">
              <span className={`inline-block px-2.5 py-0.5 rounded-full text-xs font-bold ${
                passed ? 'bg-emerald-100 text-emerald-800' : 'bg-red-100 text-red-800'
              }`}>
                {passed ? 'PASSED' : 'FAILED'}
              </span>
            </div>
          </div>
        </div>

        {/* Action buttons */}
        <div className="flex flex-wrap items-center justify-center gap-3">
          <button
            type="button"
            onClick={() => startQuiz(result.quizId)}
            className="px-5 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-800 font-bold rounded-lg text-sm transition flex items-center gap-1.5 cursor-pointer"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Retake Quiz</span>
          </button>

          {course && (
            <button
              type="button"
              onClick={() => viewCourse(course.slug)}
              className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg text-sm transition shadow-sm flex items-center gap-1.5 cursor-pointer"
            >
              <span>Return to Course</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          )}

          <button
            type="button"
            onClick={() => setActiveView('dashboard')}
            className="px-5 py-2.5 bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 font-bold rounded-lg text-sm transition cursor-pointer"
          >
            View Dashboard
          </button>
        </div>
      </div>

      {/* Answer Breakdown & Explanations */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8">
        <div className="flex items-center gap-2 mb-6 pb-4 border-b border-gray-100">
          <HelpCircle className="w-5 h-5 text-blue-600" />
          <h2 className="text-xl font-bold text-gray-900">Question Breakdown & Solutions</h2>
        </div>

        <div className="space-y-6">
          {quizQuestions.map((q, idx) => {
            const userChoice = result.userAnswers ? result.userAnswers[q.id] : null;
            const isCorrect = userChoice?.toUpperCase() === q.correctAnswer.toUpperCase();

            return (
              <div 
                key={q.id}
                className={`p-5 rounded-xl border ${
                  isCorrect 
                    ? 'border-emerald-200 bg-emerald-50/40' 
                    : 'border-red-200 bg-red-50/40'
                }`}
              >
                <div className="flex items-start justify-between gap-3 mb-2">
                  <h4 className="text-base font-bold text-gray-900">
                    Q{idx + 1}: {q.questionText}
                  </h4>
                  {isCorrect ? (
                    <span className="shrink-0 flex items-center gap-1 text-xs font-bold text-emerald-700 bg-emerald-100 px-2.5 py-1 rounded-md">
                      <CheckCircle2 className="w-3.5 h-3.5" /> Correct (+1)
                    </span>
                  ) : (
                    <span className="shrink-0 flex items-center gap-1 text-xs font-bold text-red-700 bg-red-100 px-2.5 py-1 rounded-md">
                      <XCircle className="w-3.5 h-3.5" /> Incorrect
                    </span>
                  )}
                </div>

                <div className="text-sm space-y-1 mb-3">
                  <div className="text-gray-700">
                    Your choice: <strong className={isCorrect ? 'text-emerald-700' : 'text-red-600'}>
                      {userChoice ? `Option ${userChoice}` : 'Unanswered'}
                    </strong>
                  </div>
                  {!isCorrect && (
                    <div className="text-emerald-700 font-medium">
                      Correct choice: <strong>Option {q.correctAnswer}</strong>
                    </div>
                  )}
                </div>

                {q.explanation && (
                  <div className="text-xs text-gray-600 bg-white/80 p-3 rounded-lg border border-gray-100 leading-relaxed">
                    💡 <strong>Solution Note:</strong> {q.explanation}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
