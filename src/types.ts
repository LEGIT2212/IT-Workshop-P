export interface Category {
  id: number;
  name: string;
  slug: string;
  description: string;
  icon?: string;
  courseCount?: number;
}

export interface Course {
  id: number;
  title: string;
  slug: string;
  description: string;
  instructor: string;
  instructorRole?: string;
  imageUrl: string;
  categoryId: number;
  categoryName?: string;
  duration?: string;
  level?: 'Beginner' | 'Intermediate' | 'Advanced';
  isFeatured?: boolean;
}

export interface Note {
  id: number;
  courseId: number;
  title: string;
  content: string;
  fileUrl?: string;
  uploadedAt: string;
  fileSize?: string;
}

export interface Question {
  id: number;
  quizId: number;
  questionText: string;
  optionA: string;
  optionB: string;
  optionC: string;
  optionD: string;
  correctAnswer: 'A' | 'B' | 'C' | 'D';
  explanation?: string;
}

export interface Quiz {
  id: number;
  courseId: number;
  title: string;
  description?: string;
  timeLimitMinutes?: number;
  passingScore?: number;
  questions?: Question[];
}

export interface TestResult {
  id: number;
  userId: number;
  userName: string;
  quizId: number;
  quizTitle: string;
  courseId: number;
  courseTitle: string;
  score: number;
  totalQuestions: number;
  percentage: number;
  passed: boolean;
  submittedAt: string;
  userAnswers?: Record<number, string>;
}

export interface Enrollment {
  id: number;
  userId: number;
  courseId: number;
  enrolledAt: string;
  progressPercent: number;
  lastAccessedAt?: string;
}

export type UserRole = 'student' | 'admin';

export interface User {
  id: number;
  username: string;
  email: string;
  role: UserRole;
  fullName: string;
  avatarUrl?: string;
}

export type AppView = 
  | 'home' 
  | 'courses' 
  | 'course-detail' 
  | 'quiz' 
  | 'quiz-result' 
  | 'dashboard' 
  | 'admin' 
  | 'django-code'
  | 'about'
  | 'contact';
