import React, { useState } from 'react';
import { 
  Database, FileCode, Copy, Check, Terminal, Folder, 
  Layers, Server, Shield, CheckCircle 
} from 'lucide-react';

export const DjangoCodeViewer: React.FC = () => {
  const [selectedFile, setSelectedFile] = useState<string>('models.py');
  const [copied, setCopied] = useState<boolean>(false);

  const DJANGO_FILES: Record<string, { label: string; language: string; content: string; desc: string }> = {
    'models.py': {
      label: 'courses/models.py',
      language: 'python',
      desc: 'Django ORM Models configured for MySQL (Category, Course, Notes, Quiz, Question, TestResult, Enrollment, UserProfile)',
      content: `from django.db import models
from django.contrib.auth.models import User
from django.utils.text import slugify
from django.urls import reverse

class Category(models.Model):
    name = models.CharField(max_length=100, unique=True)
    slug = models.SlugField(max_length=120, unique=True, blank=True)
    description = models.TextField(blank=True)

    class Meta:
        verbose_name_plural = "Categories"
        ordering = ['name']

    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.name)
        super().save(*args, **kwargs)

    def __str__(self):
        return self.name


class Course(models.Model):
    title = models.CharField(max_length=200)
    slug = models.SlugField(max_length=220, unique=True, blank=True)
    description = models.TextField()
    instructor = models.CharField(max_length=150)
    image_url = models.URLField(max_length=500, blank=True, default='https://via.placeholder.com/300x180')
    category = models.ForeignKey(Category, on_delete=models.CASCADE, related_name='courses')
    created_at = models.DateTimeField(auto_now_add=True)
    is_featured = models.BooleanField(default=True)

    class Meta:
        ordering = ['-created_at']

    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.title)
        super().save(*args, **kwargs)

    def __str__(self):
        return self.title


class Notes(models.Model):
    course = models.ForeignKey(Course, on_delete=models.CASCADE, related_name='notes')
    title = models.CharField(max_length=200)
    content = models.TextField(help_text="Markdown or plain text notes content")
    file_url = models.URLField(max_length=500, blank=True, null=True)
    uploaded_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        verbose_name_plural = "Notes"
        ordering = ['-uploaded_at']

    def __str__(self):
        return f"{self.title} - {self.course.title}"


class Quiz(models.Model):
    course = models.ForeignKey(Course, on_delete=models.CASCADE, related_name='quizzes')
    title = models.CharField(max_length=200)
    description = models.TextField(blank=True)
    time_limit_minutes = models.PositiveIntegerField(default=15)
    passing_score = models.PositiveIntegerField(default=70)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        verbose_name_plural = "Quizzes"

    def __str__(self):
        return f"{self.title} ({self.course.title})"


class Question(models.Model):
    CHOICES = [
        ('A', 'Option A'),
        ('B', 'Option B'),
        ('C', 'Option C'),
        ('D', 'Option D'),
    ]
    quiz = models.ForeignKey(Quiz, on_delete=models.CASCADE, related_name='questions')
    question_text = models.TextField()
    option_a = models.CharField(max_length=255)
    option_b = models.CharField(max_length=255)
    option_c = models.CharField(max_length=255)
    option_d = models.CharField(max_length=255)
    correct_answer = models.CharField(max_length=1, choices=CHOICES)
    explanation = models.TextField(blank=True)

    def __str__(self):
        return f"Q: {self.question_text[:50]}... ({self.quiz.title})"


class TestResult(models.Model):
    student = models.ForeignKey(User, on_delete=models.CASCADE, related_name='test_results')
    quiz = models.ForeignKey(Quiz, on_delete=models.CASCADE, related_name='results')
    score = models.PositiveIntegerField()
    total_questions = models.PositiveIntegerField()
    percentage = models.FloatField()
    passed = models.BooleanField(default=False)
    submitted_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['-submitted_at']

    def __str__(self):
        return f"{self.student.username} - {self.quiz.title}: {self.score}/{self.total_questions}"


class Enrollment(models.Model):
    student = models.ForeignKey(User, on_delete=models.CASCADE, related_name='enrollments')
    course = models.ForeignKey(Course, on_delete=models.CASCADE, related_name='enrolled_students')
    enrolled_at = models.DateTimeField(auto_now_add=True)
    progress_percent = models.PositiveIntegerField(default=0)

    class Meta:
        unique_together = ('student', 'course')
        ordering = ['-enrolled_at']


class UserProfile(models.Model):
    ROLE_CHOICES = [
        ('student', 'Student'),
        ('staff', 'Staff / Instructor'),
        ('admin', 'Administrator'),
    ]
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='profile')
    role = models.CharField(max_length=20, choices=ROLE_CHOICES, default='student')
    bio = models.TextField(blank=True)
    avatar_url = models.URLField(blank=True, default='')`
    },

    'settings.py': {
      label: 'edulearn/settings.py',
      language: 'python',
      desc: 'Django configuration with MySQL database settings and credentials',
      content: `from pathlib import Path
import os

BASE_DIR = Path(__file__).resolve().parent.parent

SECRET_KEY = os.environ.get('DJANGO_SECRET_KEY', 'django-insecure-edulearn-key-2026')
DEBUG = True
ALLOWED_HOSTS = ['*']

INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'courses.apps.CoursesConfig',
]

# Database Configuration: MySQL via Django ORM
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.mysql',
        'NAME': os.environ.get('MYSQL_DATABASE', 'edulearn_db'),
        'USER': os.environ.get('MYSQL_USER', 'root'),
        'PASSWORD': os.environ.get('MYSQL_PASSWORD', 'rootpassword'),
        'HOST': os.environ.get('MYSQL_HOST', '127.0.0.1'),
        'PORT': os.environ.get('MYSQL_PORT', '3306'),
        'OPTIONS': {
            'charset': 'utf8mb4',
            'init_command': "SET sql_mode='STRICT_TRANS_TABLES'",
        }
    }
}

LOGIN_REDIRECT_URL = 'dashboard'
LOGIN_URL = 'login'`
    },

    'views.py': {
      label: 'courses/views.py',
      language: 'python',
      desc: 'Django MVT views for Home, Course details, Quiz submission with instant grading, Dashboard, and Admin views',
      content: `from django.shortcuts import render, get_object_or_404, redirect
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.decorators import login_required, user_passes_test
from django.contrib import messages
from .models import Category, Course, Notes, Quiz, Question, TestResult, Enrollment

def home(request):
    categories = Category.objects.all()[:8]
    featured_courses = Course.objects.filter(is_featured=True)[:6]
    return render(request, 'home.html', {
        'categories': categories,
        'courses': featured_courses,
        'stats': {'students': 1200, 'courses': 100, 'teachers': 50, 'success_rate': 95}
    })

def course_detail(request, slug):
    course = get_object_or_404(Course, slug=slug)
    notes = course.notes.all()
    quizzes = course.quizzes.all()
    is_enrolled = False
    if request.user.is_authenticated:
        is_enrolled = Enrollment.objects.filter(student=request.user, course=course).exists()
    return render(request, 'course_detail.html', {
        'course': course, 'notes': notes, 'quizzes': quizzes, 'is_enrolled': is_enrolled
    })

@login_required
def submit_quiz(request, quiz_id):
    quiz = get_object_or_404(Quiz, id=quiz_id)
    questions = quiz.questions.all()
    score = 0
    breakdown = []
    
    for q in questions:
        choice = request.POST.get(f'question_{q.id}', '').strip().upper()
        correct = (choice == q.correct_answer.upper())
        if correct:
            score += 1
        breakdown.append({'question': q, 'user_choice': choice, 'is_correct': correct})

    total = questions.count()
    percentage = round((score / total) * 100, 1) if total > 0 else 0
    passed = percentage >= quiz.passing_score

    # Save instant test result to MySQL database
    result = TestResult.objects.create(
        student=request.user, quiz=quiz, score=score, 
        total_questions=total, percentage=percentage, passed=passed
    )
    return render(request, 'quiz_result.html', {'quiz': quiz, 'result': result, 'passed': passed})`
    },

    'admin.py': {
      label: 'courses/admin.py',
      language: 'python',
      desc: 'Django Admin registration with Inline Question editor and Search filters',
      content: `from django.contrib import admin
from .models import Category, Course, Notes, Quiz, Question, TestResult, Enrollment, UserProfile

class QuestionInline(admin.TabularInline):
    model = Question
    extra = 4

class NotesInline(admin.StackedInline):
    model = Notes
    extra = 1

@admin.register(Course)
class CourseAdmin(admin.ModelAdmin):
    list_display = ('title', 'category', 'instructor', 'is_featured', 'created_at')
    list_filter = ('category', 'is_featured')
    search_fields = ('title', 'instructor')
    prepopulated_fields = {'slug': ('title',)}
    inlines = [NotesInline]

@admin.register(Quiz)
class QuizAdmin(admin.ModelAdmin):
    list_display = ('title', 'course', 'time_limit_minutes', 'passing_score')
    inlines = [QuestionInline]

@admin.register(TestResult)
class TestResultAdmin(admin.ModelAdmin):
    list_display = ('student', 'quiz', 'score', 'percentage', 'passed', 'submitted_at')
    readonly_fields = ('student', 'quiz', 'score', 'percentage', 'passed')`
    },

    'templates/home.html': {
      label: 'templates/home.html',
      language: 'html',
      desc: 'User frontend HTML adapted into Django template syntax with dynamic loops and template tags',
      content: `{% extends 'base.html' %}

{% block title %}EduLearn - Learn Anywhere, Anytime{% endblock %}

{% block content %}
    <!-- Hero Section -->
    <section class="hero">
        <div class="hero-text">
            <h1>Learn Anywhere, Anytime</h1>
            <p>Access high-quality online courses from expert teachers.</p>
            <a href="{% url 'courses' %}"><button>Explore Courses</button></a>
        </div>
        <div class="hero-image">
            <img src="https://via.placeholder.com/500x350" alt="Hero Illustration">
        </div>
    </section>

    <!-- Categories -->
    <section class="categories">
        <h1>Popular Categories</h1>
        <div class="category-container">
            {% for cat in categories %}
            <div class="card">
                <a href="{% url 'courses' %}?category={{ cat.slug }}">
                    <h3>{{ cat.name }}</h3>
                    <p>{{ cat.courses.count }} Courses</p>
                </a>
            </div>
            {% endfor %}
        </div>
    </section>

    <!-- Courses -->
    <section class="courses">
        <h2>Featured Courses</h2>
        <div class="course-container">
            {% for course in courses %}
            <div class="course-card">
                <img src="{{ course.image_url }}" alt="{{ course.title }}">
                <h3>{{ course.title }}</h3>
                <p>{{ course.description|truncatewords:15 }}</p>
                <a href="{% url 'course_detail' slug=course.slug %}"><button>View Course</button></a>
            </div>
            {% endfor %}
        </div>
    </section>
{% endblock %}`
    },

    'mysql_schema.sql': {
      label: 'MySQL Relational Schema (DDL)',
      language: 'sql',
      desc: 'Complete MySQL DDL generated from Django ORM migrations',
      content: `-- MySQL Database Schema for EduLearn
CREATE DATABASE IF NOT EXISTS edulearn_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE edulearn_db;

-- 1. Categories
CREATE TABLE courses_category (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL UNIQUE,
    slug VARCHAR(120) NOT NULL UNIQUE,
    description LONGTEXT NOT NULL
);

-- 2. Courses
CREATE TABLE courses_course (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(200) NOT NULL,
    slug VARCHAR(220) NOT NULL UNIQUE,
    description LONGTEXT NOT NULL,
    instructor VARCHAR(150) NOT NULL,
    image_url VARCHAR(500) NOT NULL,
    category_id BIGINT NOT NULL,
    is_featured BOOLEAN NOT NULL DEFAULT TRUE,
    created_at DATETIME(6) NOT NULL,
    FOREIGN KEY (category_id) REFERENCES courses_category(id) ON DELETE CASCADE
);

-- 3. Notes & Materials
CREATE TABLE courses_notes (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    course_id BIGINT NOT NULL,
    title VARCHAR(200) NOT NULL,
    content LONGTEXT NOT NULL,
    file_url VARCHAR(500) NULL,
    uploaded_at DATETIME(6) NOT NULL,
    FOREIGN KEY (course_id) REFERENCES courses_course(id) ON DELETE CASCADE
);

-- 4. Quizzes
CREATE TABLE courses_quiz (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    course_id BIGINT NOT NULL,
    title VARCHAR(200) NOT NULL,
    description LONGTEXT NOT NULL,
    time_limit_minutes INT UNSIGNED NOT NULL DEFAULT 15,
    passing_score INT UNSIGNED NOT NULL DEFAULT 70,
    created_at DATETIME(6) NOT NULL,
    FOREIGN KEY (course_id) REFERENCES courses_course(id) ON DELETE CASCADE
);

-- 5. Questions
CREATE TABLE courses_question (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    quiz_id BIGINT NOT NULL,
    question_text LONGTEXT NOT NULL,
    option_a VARCHAR(255) NOT NULL,
    option_b VARCHAR(255) NOT NULL,
    option_c VARCHAR(255) NOT NULL,
    option_d VARCHAR(255) NOT NULL,
    correct_answer VARCHAR(1) NOT NULL,
    explanation LONGTEXT NOT NULL,
    FOREIGN KEY (quiz_id) REFERENCES courses_quiz(id) ON DELETE CASCADE
);

-- 6. Test Results
CREATE TABLE courses_testresult (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    student_id INT NOT NULL,
    quiz_id BIGINT NOT NULL,
    score INT UNSIGNED NOT NULL,
    total_questions INT UNSIGNED NOT NULL,
    percentage DOUBLE NOT NULL,
    passed BOOLEAN NOT NULL,
    submitted_at DATETIME(6) NOT NULL,
    FOREIGN KEY (student_id) REFERENCES auth_user(id) ON DELETE CASCADE,
    FOREIGN KEY (quiz_id) REFERENCES courses_quiz(id) ON DELETE CASCADE
);

-- 7. Enrollments
CREATE TABLE courses_enrollment (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    student_id INT NOT NULL,
    course_id BIGINT NOT NULL,
    enrolled_at DATETIME(6) NOT NULL,
    progress_percent INT UNSIGNED NOT NULL DEFAULT 0,
    UNIQUE KEY (student_id, course_id),
    FOREIGN KEY (student_id) REFERENCES auth_user(id) ON DELETE CASCADE,
    FOREIGN KEY (course_id) REFERENCES courses_course(id) ON DELETE CASCADE
);`
    }
  };

  const currentFileData = DJANGO_FILES[selectedFile];

  const handleCopy = () => {
    navigator.clipboard.writeText(currentFileData.content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="max-w-6xl mx-auto px-6 py-10">
      {/* Banner */}
      <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-200 mb-8 flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-50 text-emerald-800 text-xs font-bold rounded-full mb-2">
            <Terminal className="w-3.5 h-3.5 text-emerald-600" />
            <span>Python, Django & MySQL Architecture Explorer</span>
          </div>
          <h1 className="text-3xl font-black text-gray-900">EduLearn Django Codebase</h1>
          <p className="text-gray-500 text-sm mt-1">
            Browse the generated Python & Django files (`edulearn_django/`), models, views, MySQL configurations, and adapted templates.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-1.5 text-xs font-bold text-gray-600 bg-gray-100 px-3 py-1.5 rounded-lg border border-gray-200">
            <Database className="w-4 h-4 text-blue-600" />
            MySQL Relational ORM Ready
          </span>
        </div>
      </div>

      {/* Code Inspector Layout */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden flex flex-col md:flex-row min-h-[600px]">
        {/* Left file navigator */}
        <div className="w-full md:w-64 bg-gray-50/80 border-r border-gray-200 p-4">
          <div className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3 px-2 flex items-center gap-1.5">
            <Folder className="w-4 h-4 text-amber-500" />
            <span>Project Files</span>
          </div>

          <div className="space-y-1">
            {Object.keys(DJANGO_FILES).map((key) => {
              const file = DJANGO_FILES[key];
              const isSelected = selectedFile === key;

              return (
                <button
                  key={key}
                  type="button"
                  onClick={() => setSelectedFile(key)}
                  className={`w-full text-left px-3 py-2.5 rounded-lg text-xs font-semibold flex items-center justify-between transition cursor-pointer ${
                    isSelected
                      ? 'bg-blue-600 text-white shadow-xs'
                      : 'text-gray-700 hover:bg-gray-200/60'
                  }`}
                >
                  <span className="flex items-center gap-2 truncate">
                    <FileCode className={`w-4 h-4 shrink-0 ${isSelected ? 'text-white' : 'text-blue-600'}`} />
                    <span className="truncate">{file.label}</span>
                  </span>
                </button>
              );
            })}
          </div>

          <div className="mt-8 p-3 bg-blue-50/80 rounded-xl border border-blue-100 text-xs text-blue-900 leading-relaxed">
            <div className="font-bold flex items-center gap-1 mb-1">
              <CheckCircle className="w-3.5 h-3.5 text-blue-600" />
              <span>Full Project Saved</span>
            </div>
            All Django files are created in your workspace under <code className="bg-white px-1 py-0.5 rounded font-mono">/edulearn_django/</code>.
          </div>
        </div>

        {/* Right Code Display */}
        <div className="flex-1 flex flex-col bg-gray-900 text-gray-100">
          {/* Top Bar */}
          <div className="px-6 py-3.5 bg-gray-950 border-b border-gray-800 flex items-center justify-between">
            <div>
              <span className="text-sm font-bold text-emerald-400 font-mono">{currentFileData.label}</span>
              <p className="text-xs text-gray-400 mt-0.5">{currentFileData.desc}</p>
            </div>

            <button
              type="button"
              onClick={handleCopy}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition cursor-pointer ${
                copied 
                  ? 'bg-emerald-600 text-white' 
                  : 'bg-gray-800 hover:bg-gray-700 text-gray-200'
              }`}
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5" />
                  <span>Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span>Copy Code</span>
                </>
              )}
            </button>
          </div>

          {/* Pre Code Box */}
          <div className="p-6 flex-1 overflow-auto max-h-[650px] font-mono text-xs leading-relaxed">
            <pre className="text-gray-300 selection:bg-blue-600 selection:text-white">
              <code>{currentFileData.content}</code>
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
};
