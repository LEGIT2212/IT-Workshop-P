import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  Category, Course, Note, Question, Quiz, TestResult, Enrollment, User, AppView 
} from '../types';
import { 
  INITIAL_CATEGORIES, INITIAL_COURSES, INITIAL_NOTES, 
  INITIAL_QUIZZES, INITIAL_QUESTIONS, INITIAL_USERS, 
  INITIAL_ENROLLMENTS, INITIAL_TEST_RESULTS 
} from '../data/initialData';

interface AppContextType {
  categories: Category[];
  courses: Course[];
  notes: Note[];
  quizzes: Quiz[];
  questions: Question[];
  enrollments: Enrollment[];
  testResults: TestResult[];
  currentUser: User | null;
  activeView: AppView;
  selectedCourseSlug: string | null;
  selectedQuizId: number | null;
  activeResultId: number | null;
  selectedCategorySlug: string | null;
  searchQuery: string;
  activeNote: Note | null;
  authModalOpen: boolean;
  authModalTab: 'login' | 'signup';
  
  // Actions
  setActiveView: (view: AppView) => void;
  setSelectedCategorySlug: (slug: string | null) => void;
  setSearchQuery: (query: string) => void;
  viewCourse: (slug: string) => void;
  startQuiz: (quizId: number) => void;
  enrollInCourse: (courseId: number) => boolean;
  isEnrolledInCourse: (courseId: number) => boolean;
  submitQuiz: (quizId: number, answers: Record<number, string>) => TestResult;
  openNoteReader: (note: Note) => void;
  closeNoteReader: () => void;
  openAuthModal: (tab?: 'login' | 'signup') => void;
  closeAuthModal: () => void;
  loginUser: (username: string, role?: 'student' | 'admin') => boolean;
  signupUser: (data: { username: string; email: string; fullName: string; role: 'student' | 'admin' }) => boolean;
  logoutUser: () => void;
  quickSwitchRole: (role: 'student' | 'admin') => void;
  
  // Admin Operations
  addCourse: (course: Omit<Course, 'id' | 'slug'>) => void;
  addCategory: (cat: Omit<Category, 'id' | 'slug'>) => void;
  addNote: (note: Omit<Note, 'id' | 'uploadedAt'>) => void;
  addQuizWithQuestions: (quiz: Omit<Quiz, 'id'>, questions: Omit<Question, 'id' | 'quizId'>[]) => void;
  resetToDefaults: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const STORAGE_KEYS = {
  CATEGORIES: 'edulearn_categories_v1',
  COURSES: 'edulearn_courses_v1',
  NOTES: 'edulearn_notes_v1',
  QUIZZES: 'edulearn_quizzes_v1',
  QUESTIONS: 'edulearn_questions_v1',
  ENROLLMENTS: 'edulearn_enrollments_v1',
  RESULTS: 'edulearn_results_v1',
  CURRENT_USER: 'edulearn_current_user_v1'
};

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Load state from localStorage with fallback to initialData
  const [categories, setCategories] = useState<Category[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.CATEGORIES);
    return saved ? JSON.parse(saved) : INITIAL_CATEGORIES;
  });

  const [courses, setCourses] = useState<Course[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.COURSES);
    return saved ? JSON.parse(saved) : INITIAL_COURSES;
  });

  const [notes, setNotes] = useState<Note[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.NOTES);
    return saved ? JSON.parse(saved) : INITIAL_NOTES;
  });

  const [quizzes, setQuizzes] = useState<Quiz[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.QUIZZES);
    return saved ? JSON.parse(saved) : INITIAL_QUIZZES;
  });

  const [questions, setQuestions] = useState<Question[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.QUESTIONS);
    return saved ? JSON.parse(saved) : INITIAL_QUESTIONS;
  });

  const [enrollments, setEnrollments] = useState<Enrollment[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.ENROLLMENTS);
    return saved ? JSON.parse(saved) : INITIAL_ENROLLMENTS;
  });

  const [testResults, setTestResults] = useState<TestResult[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.RESULTS);
    return saved ? JSON.parse(saved) : INITIAL_TEST_RESULTS;
  });

  const [currentUser, setCurrentUser] = useState<User | null>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.CURRENT_USER);
    return saved ? JSON.parse(saved) : INITIAL_USERS[0]; // Default to student Alex
  });

  // Navigation and UI state
  const [activeView, setActiveView] = useState<AppView>('home');
  const [selectedCourseSlug, setSelectedCourseSlug] = useState<string | null>(null);
  const [selectedQuizId, setSelectedQuizId] = useState<number | null>(null);
  const [activeResultId, setActiveResultId] = useState<number | null>(1);
  const [selectedCategorySlug, setSelectedCategorySlug] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activeNote, setActiveNote] = useState<Note | null>(null);
  const [authModalOpen, setAuthModalOpen] = useState<boolean>(false);
  const [authModalTab, setAuthModalTab] = useState<'login' | 'signup'>('login');

  // Persistence to localStorage
  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.CATEGORIES, JSON.stringify(categories));
  }, [categories]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.COURSES, JSON.stringify(courses));
  }, [courses]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.NOTES, JSON.stringify(notes));
  }, [notes]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.QUIZZES, JSON.stringify(quizzes));
  }, [quizzes]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.QUESTIONS, JSON.stringify(questions));
  }, [questions]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.ENROLLMENTS, JSON.stringify(enrollments));
  }, [enrollments]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.RESULTS, JSON.stringify(testResults));
  }, [testResults]);

  useEffect(() => {
    if (currentUser) {
      localStorage.setItem(STORAGE_KEYS.CURRENT_USER, JSON.stringify(currentUser));
    } else {
      localStorage.removeItem(STORAGE_KEYS.CURRENT_USER);
    }
  }, [currentUser]);

  // Actions
  const viewCourse = (slug: string) => {
    setSelectedCourseSlug(slug);
    setActiveView('course-detail');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const startQuiz = (quizId: number) => {
    setSelectedQuizId(quizId);
    setActiveView('quiz');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const isEnrolledInCourse = (courseId: number): boolean => {
    if (!currentUser) return false;
    return enrollments.some(e => e.userId === currentUser.id && e.courseId === courseId);
  };

  const enrollInCourse = (courseId: number): boolean => {
    if (!currentUser) {
      setAuthModalTab('login');
      setAuthModalOpen(true);
      return false;
    }
    if (isEnrolledInCourse(courseId)) {
      return true;
    }
    const newEnrollment: Enrollment = {
      id: Date.now(),
      userId: currentUser.id,
      courseId,
      enrolledAt: new Date().toISOString(),
      progressPercent: 10,
      lastAccessedAt: new Date().toISOString()
    };
    setEnrollments(prev => [newEnrollment, ...prev]);
    return true;
  };

  const submitQuiz = (quizId: number, answers: Record<number, string>): TestResult => {
    const quiz = quizzes.find(q => q.id === quizId);
    const quizQuestions = questions.filter(q => q.quizId === quizId);
    const course = courses.find(c => c.id === quiz?.courseId);

    let score = 0;
    quizQuestions.forEach(q => {
      const userChoice = (answers[q.id] || '').toUpperCase();
      if (userChoice === q.correctAnswer.toUpperCase()) {
        score += 1;
      }
    });

    const totalQuestions = quizQuestions.length || 1;
    const percentage = Math.round((score / totalQuestions) * 100);
    const passingScore = quiz?.passingScore ?? 70;
    const passed = percentage >= passingScore;

    const newResult: TestResult = {
      id: Date.now(),
      userId: currentUser?.id ?? 1,
      userName: currentUser?.fullName ?? 'Student',
      quizId,
      quizTitle: quiz?.title ?? 'Course Assessment',
      courseId: course?.id ?? 1,
      courseTitle: course?.title ?? 'Online Course',
      score,
      totalQuestions,
      percentage,
      passed,
      submittedAt: new Date().toISOString(),
      userAnswers: answers
    };

    setTestResults(prev => [newResult, ...prev]);
    setActiveResultId(newResult.id);

    // Update enrollment progress
    if (currentUser && course) {
      setEnrollments(prev => prev.map(e => {
        if (e.userId === currentUser.id && e.courseId === course.id) {
          return {
            ...e,
            progressPercent: Math.min(100, e.progressPercent + 30),
            lastAccessedAt: new Date().toISOString()
          };
        }
        return e;
      }));
    }

    setActiveView('quiz-result');
    window.scrollTo({ top: 0, behavior: 'smooth' });
    return newResult;
  };

  const openNoteReader = (note: Note) => {
    setActiveNote(note);
  };

  const closeNoteReader = () => {
    setActiveNote(null);
  };

  const openAuthModal = (tab: 'login' | 'signup' = 'login') => {
    setAuthModalTab(tab);
    setAuthModalOpen(true);
  };

  const closeAuthModal = () => {
    setAuthModalOpen(false);
  };

  const loginUser = (username: string, role: 'student' | 'admin' = 'student'): boolean => {
    const existing = INITIAL_USERS.find(u => u.username === username || u.role === role);
    if (existing) {
      setCurrentUser(existing);
    } else {
      setCurrentUser({
        id: Date.now(),
        username,
        email: `${username}@edulearn.org`,
        role,
        fullName: username.charAt(0).toUpperCase() + username.slice(1)
      });
    }
    setAuthModalOpen(false);
    return true;
  };

  const signupUser = (data: { username: string; email: string; fullName: string; role: 'student' | 'admin' }): boolean => {
    const newUser: User = {
      id: Date.now(),
      username: data.username,
      email: data.email,
      role: data.role,
      fullName: data.fullName
    };
    setCurrentUser(newUser);
    setAuthModalOpen(false);
    return true;
  };

  const logoutUser = () => {
    setCurrentUser(null);
    setActiveView('home');
  };

  const quickSwitchRole = (role: 'student' | 'admin') => {
    if (role === 'admin') {
      setCurrentUser(INITIAL_USERS[1]); // Sarah Connor (Admin)
    } else {
      setCurrentUser(INITIAL_USERS[0]); // Alex Rivera (Student)
    }
  };

  // Admin Actions
  const addCourse = (courseData: Omit<Course, 'id' | 'slug'>) => {
    const slug = courseData.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
    const newCourse: Course = {
      ...courseData,
      id: Date.now(),
      slug
    };
    setCourses(prev => [newCourse, ...prev]);
  };

  const addCategory = (catData: Omit<Category, 'id' | 'slug'>) => {
    const slug = catData.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
    const newCat: Category = {
      ...catData,
      id: Date.now(),
      slug,
      courseCount: 0
    };
    setCategories(prev => [...prev, newCat]);
  };

  const addNote = (noteData: Omit<Note, 'id' | 'uploadedAt'>) => {
    const newNote: Note = {
      ...noteData,
      id: Date.now(),
      uploadedAt: new Date().toISOString()
    };
    setNotes(prev => [newNote, ...prev]);
  };

  const addQuizWithQuestions = (
    quizData: Omit<Quiz, 'id'>, 
    questionItems: Omit<Question, 'id' | 'quizId'>[]
  ) => {
    const newQuizId = Date.now();
    const newQuiz: Quiz = {
      ...quizData,
      id: newQuizId
    };
    const createdQuestions: Question[] = questionItems.map((q, idx) => ({
      ...q,
      id: newQuizId + idx + 1,
      quizId: newQuizId
    }));

    setQuizzes(prev => [...prev, newQuiz]);
    setQuestions(prev => [...prev, ...createdQuestions]);
  };

  const resetToDefaults = () => {
    localStorage.clear();
    setCategories(INITIAL_CATEGORIES);
    setCourses(INITIAL_COURSES);
    setNotes(INITIAL_NOTES);
    setQuizzes(INITIAL_QUIZZES);
    setQuestions(INITIAL_QUESTIONS);
    setEnrollments(INITIAL_ENROLLMENTS);
    setTestResults(INITIAL_TEST_RESULTS);
    setCurrentUser(INITIAL_USERS[0]);
    setActiveView('home');
  };

  return (
    <AppContext.Provider value={{
      categories,
      courses,
      notes,
      quizzes,
      questions,
      enrollments,
      testResults,
      currentUser,
      activeView,
      selectedCourseSlug,
      selectedQuizId,
      activeResultId,
      selectedCategorySlug,
      searchQuery,
      activeNote,
      authModalOpen,
      authModalTab,
      setActiveView,
      setSelectedCategorySlug,
      setSearchQuery,
      viewCourse,
      startQuiz,
      enrollInCourse,
      isEnrolledInCourse,
      submitQuiz,
      openNoteReader,
      closeNoteReader,
      openAuthModal,
      closeAuthModal,
      loginUser,
      signupUser,
      logoutUser,
      quickSwitchRole,
      addCourse,
      addCategory,
      addNote,
      addQuizWithQuestions,
      resetToDefaults
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
