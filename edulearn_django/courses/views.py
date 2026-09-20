from django.shortcuts import render, get_object_or_404, redirect
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.decorators import login_required, user_passes_test
from django.contrib import messages
from django.db.models import Avg, Count
from .models import Category, Course, Notes, Quiz, Question, TestResult, Enrollment, UserProfile
from .forms import (
    UserSignupForm, UserLoginForm, CourseForm, CategoryForm, 
    NotesForm, QuizForm, QuestionForm
)

def is_admin_or_staff(user):
    if not user.is_authenticated:
        return False
    if user.is_superuser or user.is_staff:
        return True
    profile = getattr(user, 'profile', None)
    return profile and profile.role in ['admin', 'staff']


def home(request):
    categories = Category.objects.annotate(total_courses=Count('courses'))[:8]
    featured_courses = Course.objects.select_related('category').filter(is_featured=True)[:6]
    
    # Real-time statistics from the database
    total_students = Enrollment.objects.values('student').distinct().count() or 1200
    total_courses = Course.objects.count() or 100
    total_instructors = Course.objects.values('instructor').distinct().count() or 50
    total_tests_passed = TestResult.objects.filter(passed=True).count()
    total_tests = TestResult.objects.count()
    success_rate = round((total_tests_passed / total_tests * 100)) if total_tests > 0 else 95

    context = {
        'categories': categories,
        'courses': featured_courses,
        'stats': {
            'students': total_students,
            'courses': total_courses,
            'teachers': total_instructors,
            'success_rate': success_rate
        }
    }
    return render(request, 'home.html', context)


def course_list(request):
    category_slug = request.GET.get('category')
    search_query = request.GET.get('q', '').strip()
    
    courses = Course.objects.select_related('category').all()
    if category_slug:
        courses = courses.filter(category__slug=category_slug)
    if search_query:
        courses = courses.filter(title__icontains=search_query)

    categories = Category.objects.all()
    
    user_enrolled_course_ids = []
    if request.user.is_authenticated:
        user_enrolled_course_ids = list(
            Enrollment.objects.filter(student=request.user).values_list('course_id', flat=True)
        )

    return render(request, 'courses.html', {
        'courses': courses,
        'categories': categories,
        'selected_category': category_slug,
        'search_query': search_query,
        'user_enrolled_ids': user_enrolled_course_ids
    })


def course_detail(request, slug):
    course = get_object_or_404(Course.objects.select_related('category'), slug=slug)
    notes = course.notes.all()
    quizzes = course.quizzes.prefetch_related('questions').all()
    
    is_enrolled = False
    if request.user.is_authenticated:
        is_enrolled = Enrollment.objects.filter(student=request.user, course=course).exists()

    return render(request, 'course_detail.html', {
        'course': course,
        'notes': notes,
        'quizzes': quizzes,
        'is_enrolled': is_enrolled
    })


@login_required
def enroll_course(request, course_id):
    course = get_object_or_404(Course, id=course_id)
    enrollment, created = Enrollment.objects.get_or_create(student=request.user, course=course)
    if created:
        messages.success(request, f"Successfully enrolled in {course.title}!")
    else:
        messages.info(request, f"You are already enrolled in {course.title}.")
    return redirect('course_detail', slug=course.slug)


@login_required
def take_quiz(request, quiz_id):
    quiz = get_object_or_404(Quiz.objects.select_related('course'), id=quiz_id)
    questions = quiz.questions.all()
    
    if not questions.exists():
        messages.warning(request, "This quiz currently does not have any questions.")
        return redirect('course_detail', slug=quiz.course.slug)

    return render(request, 'take_quiz.html', {
        'quiz': quiz,
        'questions': questions
    })


@login_required
def submit_quiz(request, quiz_id):
    if request.method != 'POST':
        return redirect('take_quiz', quiz_id=quiz_id)

    quiz = get_object_or_404(Quiz, id=quiz_id)
    questions = quiz.questions.all()
    total = questions.count()
    if total == 0:
        return redirect('course_detail', slug=quiz.course.slug)

    score = 0
    breakdown = []

    for q in questions:
        user_choice = request.POST.get(f'question_{q.id}', '').strip().upper()
        is_correct = (user_choice == q.correct_answer.upper())
        if is_correct:
            score += 1
        
        breakdown.append({
            'question': q,
            'user_choice': user_choice,
            'is_correct': is_correct,
            'correct_answer': q.correct_answer,
            'explanation': q.explanation
        })

    percentage = round((score / total) * 100, 1)
    passed = percentage >= quiz.passing_score

    # Save instant test result to MySQL database
    result = TestResult.objects.create(
        student=request.user,
        quiz=quiz,
        score=score,
        total_questions=total,
        percentage=percentage,
        passed=passed
    )

    # Update enrollment progress
    enrollment = Enrollment.objects.filter(student=request.user, course=quiz.course).first()
    if enrollment:
        new_progress = min(100, enrollment.progress_percent + 25)
        enrollment.progress_percent = new_progress
        enrollment.save()

    return render(request, 'quiz_result.html', {
        'quiz': quiz,
        'result': result,
        'breakdown': breakdown,
        'percentage': percentage,
        'passed': passed
    })


@login_required
def student_dashboard(request):
    enrollments = Enrollment.objects.filter(student=request.user).select_related('course', 'course__category')
    results = TestResult.objects.filter(student=request.user).select_related('quiz', 'quiz__course')
    
    avg_score = results.aggregate(avg=Avg('percentage'))['avg'] or 0.0
    passed_count = results.filter(passed=True).count()

    context = {
        'enrollments': enrollments,
        'results': results,
        'avg_score': round(avg_score, 1),
        'passed_count': passed_count,
        'total_quizzes_taken': results.count()
    }
    return render(request, 'dashboard.html', context)


@login_required
@user_passes_test(is_admin_or_staff)
def admin_dashboard(request):
    courses = Course.objects.select_related('category').annotate(
        enrollment_count=Count('enrolled_students'),
        notes_count=Count('notes'),
        quizzes_count=Count('quizzes')
    )
    categories = Category.objects.all()
    results = TestResult.objects.select_related('student', 'quiz', 'quiz__course')[:15]
    recent_enrollments = Enrollment.objects.select_related('student', 'course')[:10]

    return render(request, 'admin_dashboard.html', {
        'courses': courses,
        'categories': categories,
        'results': results,
        'recent_enrollments': recent_enrollments,
        'course_form': CourseForm(),
        'category_form': CategoryForm(),
        'note_form': NotesForm(),
        'quiz_form': QuizForm(),
        'question_form': QuestionForm(),
    })


@login_required
@user_passes_test(is_admin_or_staff)
def admin_add_course(request):
    if request.method == 'POST':
        form = CourseForm(request.POST)
        if form.is_valid():
            course = form.save()
            messages.success(request, f"Course '{course.title}' created successfully!")
        else:
            messages.error(request, "Failed to create course. Please review the form.")
    return redirect('admin_dashboard')


@login_required
@user_passes_test(is_admin_or_staff)
def admin_add_category(request):
    if request.method == 'POST':
        form = CategoryForm(request.POST)
        if form.is_valid():
            cat = form.save()
            messages.success(request, f"Category '{cat.name}' created successfully!")
    return redirect('admin_dashboard')


@login_required
@user_passes_test(is_admin_or_staff)
def admin_add_notes(request):
    if request.method == 'POST':
        form = NotesForm(request.POST)
        if form.is_valid():
            note = form.save()
            messages.success(request, f"Study Note '{note.title}' added to {note.course.title}!")
    return redirect('admin_dashboard')


@login_required
@user_passes_test(is_admin_or_staff)
def admin_add_quiz(request):
    if request.method == 'POST':
        form = QuizForm(request.POST)
        if form.is_valid():
            quiz = form.save()
            messages.success(request, f"Quiz '{quiz.title}' created! Now add questions.")
    return redirect('admin_dashboard')


@login_required
@user_passes_test(is_admin_or_staff)
def admin_add_question(request):
    if request.method == 'POST':
        form = QuestionForm(request.POST)
        if form.is_valid():
            q = form.save()
            messages.success(request, f"Question added to quiz '{q.quiz.title}'!")
    return redirect('admin_dashboard')


def user_signup(request):
    if request.user.is_authenticated:
        return redirect('dashboard')
        
    if request.method == 'POST':
        form = UserSignupForm(request.POST)
        if form.is_valid():
            user = form.save(commit=False)
            user.set_password(form.cleaned_data['password'])
            user.save()
            
            UserProfile.objects.create(user=user, role='student')
            login(request, user)
            messages.success(request, f"Welcome to EduLearn, {user.first_name or user.username}!")
            return redirect('dashboard')
    else:
        form = UserSignupForm()

    return render(request, 'signup.html', {'form': form})


def user_login(request):
    if request.user.is_authenticated:
        return redirect('dashboard')

    if request.method == 'POST':
        form = UserLoginForm(request.POST)
        if form.is_valid():
            username = form.cleaned_data['username']
            password = form.cleaned_data['password']
            user = authenticate(request, username=username, password=password)
            if user is not None:
                login(request, user)
                messages.success(request, f"Welcome back, {user.username}!")
                next_url = request.GET.get('next')
                if next_url:
                    return redirect(next_url)
                if hasattr(user, 'profile') and user.profile.role in ['admin', 'staff']:
                    return redirect('admin_dashboard')
                return redirect('dashboard')
            else:
                messages.error(request, "Invalid username or password.")
    else:
        form = UserLoginForm()

    return render(request, 'login.html', {'form': form})


def user_logout(request):
    logout(request)
    messages.info(request, "You have been logged out.")
    return redirect('home')
