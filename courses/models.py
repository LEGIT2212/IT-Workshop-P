from django.db import models
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

    def get_absolute_url(self):
        return reverse('course_detail', kwargs={'slug': self.slug})


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
    passing_score = models.PositiveIntegerField(default=70, help_text="Passing percentage (e.g. 70%)")
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
    explanation = models.TextField(blank=True, help_text="Explanation shown after quiz grading")

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
        return f"{self.student.username} - {self.quiz.title}: {self.score}/{self.total_questions} ({self.percentage}%)"


class Enrollment(models.Model):
    student = models.ForeignKey(User, on_delete=models.CASCADE, related_name='enrollments')
    course = models.ForeignKey(Course, on_delete=models.CASCADE, related_name='enrolled_students')
    enrolled_at = models.DateTimeField(auto_now_add=True)
    progress_percent = models.PositiveIntegerField(default=0)

    class Meta:
        unique_together = ('student', 'course')
        ordering = ['-enrolled_at']

    def __str__(self):
        return f"{self.student.username} -> {self.course.title}"


class UserProfile(models.Model):
    ROLE_CHOICES = [
        ('student', 'Student'),
        ('staff', 'Staff / Instructor'),
        ('admin', 'Administrator'),
    ]
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='profile')
    role = models.CharField(max_length=20, choices=ROLE_CHOICES, default='student')
    bio = models.TextField(blank=True)
    avatar_url = models.URLField(blank=True, default='')

    def __str__(self):
        return f"{self.user.username} ({self.get_role_display()})"
