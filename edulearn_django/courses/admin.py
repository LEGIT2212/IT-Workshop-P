from django.contrib import admin
from .models import Category, Course, Notes, Quiz, Question, TestResult, Enrollment, UserProfile

class QuestionInline(admin.TabularInline):
    model = Question
    extra = 4

class NotesInline(admin.StackedInline):
    model = Notes
    extra = 1

class QuizInline(admin.TabularInline):
    model = Quiz
    extra = 1

@admin.register(Category)
class CategoryAdmin(admin.ModelAdmin):
    list_display = ('name', 'slug', 'course_count')
    prepopulated_fields = {'slug': ('name',)}
    search_fields = ('name', 'description')

    def course_count(self, obj):
        return obj.courses.count()
    course_count.short_description = "Total Courses"

@admin.register(Course)
class CourseAdmin(admin.ModelAdmin):
    list_display = ('title', 'category', 'instructor', 'is_featured', 'created_at')
    list_filter = ('category', 'is_featured', 'created_at')
    search_fields = ('title', 'instructor', 'description')
    prepopulated_fields = {'slug': ('title',)}
    inlines = [NotesInline, QuizInline]

@admin.register(Notes)
class NotesAdmin(admin.ModelAdmin):
    list_display = ('title', 'course', 'uploaded_at', 'has_file')
    list_filter = ('course__category', 'uploaded_at')
    search_fields = ('title', 'content', 'course__title')

    def has_file(self, obj):
        return bool(obj.file_url)
    has_file.boolean = True

@admin.register(Quiz)
class QuizAdmin(admin.ModelAdmin):
    list_display = ('title', 'course', 'time_limit_minutes', 'passing_score', 'question_count')
    list_filter = ('course',)
    search_fields = ('title', 'course__title')
    inlines = [QuestionInline]

    def question_count(self, obj):
        return obj.questions.count()
    question_count.short_description = "Questions"

@admin.register(Question)
class QuestionAdmin(admin.ModelAdmin):
    list_display = ('question_text_short', 'quiz', 'correct_answer')
    list_filter = ('quiz__course', 'correct_answer')
    search_fields = ('question_text', 'quiz__title')

    def question_text_short(self, obj):
        return obj.question_text[:60] + ('...' if len(obj.question_text) > 60 else '')
    question_text_short.short_description = "Question"

@admin.register(TestResult)
class TestResultAdmin(admin.ModelAdmin):
    list_display = ('student', 'quiz', 'score', 'total_questions', 'percentage', 'passed', 'submitted_at')
    list_filter = ('passed', 'quiz__course', 'submitted_at')
    search_fields = ('student__username', 'quiz__title')
    readonly_fields = ('student', 'quiz', 'score', 'total_questions', 'percentage', 'passed', 'submitted_at')

@admin.register(Enrollment)
class EnrollmentAdmin(admin.ModelAdmin):
    list_display = ('student', 'course', 'enrolled_at', 'progress_percent')
    list_filter = ('course', 'enrolled_at')
    search_fields = ('student__username', 'course__title')

@admin.register(UserProfile)
class UserProfileAdmin(admin.ModelAdmin):
    list_display = ('user', 'role')
    list_filter = ('role',)
    search_fields = ('user__username', 'user__email')
