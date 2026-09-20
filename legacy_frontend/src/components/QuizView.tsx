import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { Clock, AlertCircle, ArrowLeft, CheckCircle2 } from 'lucide-react';

export const QuizView: React.FC = () => {
  const { 
    quizzes, 
    questions, 
    selectedQuizId, 
    courses, 
    submitQuiz, 
    setActiveView,
    viewCourse
  } = useApp();

  const quiz = quizzes.find(q => q.id === selectedQuizId) || quizzes[0];
  const quizQuestions = questions.filter(q => q.quizId === quiz.id);
  const course = courses.find(c => c.id === quiz.courseId);

  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [timeLeftSeconds, setTimeLeftSeconds] = useState((quiz.timeLimitMinutes || 10) * 60);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Timer countdown
  useEffect(() => {
    if (timeLeftSeconds <= 0) {
      handleSubmit();
      return;
    }
    const timer = setInterval(() => {
      setTimeLeftSeconds(prev => prev - 1);
    }, 1000);
    return () => clearInterval(timer);
  }, [timeLeftSeconds]);

  const formatTime = (secs: number) => {
    const mins = Math.floor(secs / 60);
    const s = secs % 60;
    return `${mins}:${s < 10 ? '0' : ''}${s}`;
  };

  const handleSelectOption = (questionId: number, optionLetter: string) => {
    setAnswers(prev => ({
      ...prev,
      [questionId]: optionLetter
    }));
  };

  const answeredCount = Object.keys(answers).length;
  const totalCount = quizQuestions.length;

  const handleSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      submitQuiz(quiz.id, answers);
      setIsSubmitting(false);
    }, 400);
  };

  return (
    <div className="max-w-3xl mx-auto px-6 py-10">
      {/* Top action bar */}
      <div className="flex items-center justify-between mb-6">
        <button
          type="button"
          onClick={() => course ? viewCourse(course.slug) : setActiveView('courses')}
          className="flex items-center gap-1 text-sm text-gray-500 hover:text-gray-900 cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          Cancel & Return
        </button>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 px-3 py-1.5 bg-blue-50 text-blue-700 font-bold text-xs rounded-full">
            <Clock className="w-3.5 h-3.5" />
            <span>Time Left: {formatTime(timeLeftSeconds)}</span>
          </div>

          <div className="text-xs font-semibold text-gray-500">
            Answered: <strong className="text-gray-900">{answeredCount}/{totalCount}</strong>
          </div>
        </div>
      </div>

      {/* Main Quiz Card */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8 sm:p-10">
        <div className="border-b border-gray-100 pb-6 mb-8">
          <span className="text-xs font-bold text-blue-600 uppercase tracking-wider block mb-1">
            {course?.title || 'EduLearn Assessment'}
          </span>
          <h1 className="text-2xl font-bold text-gray-900">{quiz.title}</h1>
          <p className="text-gray-500 text-sm mt-1">
            Minimum required passing score is {quiz.passingScore || 70}%. Answers are graded automatically.
          </p>
        </div>

        {/* Question Items */}
        <form onSubmit={handleSubmit} className="space-y-8">
          {quizQuestions.map((q, idx) => {
            const selected = answers[q.id];

            return (
              <div key={q.id} className="p-6 rounded-xl bg-gray-50/70 border border-gray-200">
                <div className="flex items-start gap-3 mb-4">
                  <span className="w-6 h-6 rounded-full bg-blue-600 text-white text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
                    {idx + 1}
                  </span>
                  <h3 className="text-base font-bold text-gray-900 leading-snug">
                    {q.questionText}
                  </h3>
                </div>

                <div className="space-y-2.5 ml-9">
                  {[
                    { key: 'A', text: q.optionA },
                    { key: 'B', text: q.optionB },
                    { key: 'C', text: q.optionC },
                    { key: 'D', text: q.optionD }
                  ].map(({ key, text }) => {
                    const isChecked = selected === key;

                    return (
                      <label 
                        key={key} 
                        className={`flex items-center gap-3 p-3.5 rounded-lg border text-sm font-medium transition cursor-pointer ${
                          isChecked 
                            ? 'bg-blue-50 border-blue-500 text-blue-900 shadow-2xs' 
                            : 'bg-white border-gray-200 hover:bg-gray-100 text-gray-800'
                        }`}
                        onClick={() => handleSelectOption(q.id, key)}
                      >
                        <input
                          type="radio"
                          name={`question_${q.id}`}
                          value={key}
                          checked={isChecked}
                          onChange={() => handleSelectOption(q.id, key)}
                          className="w-4 h-4 text-blue-600 focus:ring-blue-500 cursor-pointer"
                        />
                        <span className="font-bold text-gray-500 w-5">{key}.</span>
                        <span>{text}</span>
                      </label>
                    );
                  })}
                </div>
              </div>
            );
          })}

          {/* Submission Notice & Button */}
          <div className="pt-6 border-t border-gray-100 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2 text-xs text-gray-500">
              <AlertCircle className="w-4 h-4 text-amber-500" />
              <span>Make sure to answer all questions before submitting for evaluation.</span>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full sm:w-auto px-8 py-3.5 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg shadow-md transition cursor-pointer flex items-center justify-center gap-2"
            >
              {isSubmitting ? (
                <span>Grading Test...</span>
              ) : (
                <>
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Submit & Score Test</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
