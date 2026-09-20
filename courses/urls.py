from django.urls import path
from . import views

urlpatterns = [
    # Student & Public Views
    path('', views.home, name='home'),
    path('courses/', views.course_list, name='courses'),
    path('course/<slug:slug>/', views.course_detail, name='course_detail'),
    path('enroll/<int:course_id>/', views.enroll_course, name='enroll_course'),
    
    # Quiz & Instant Scoring
    path('quiz/<int:quiz_id>/', views.take_quiz, name='take_quiz'),
    path('quiz/<int:quiz_id>/submit/', views.submit_quiz, name='submit_quiz'),
    
    # User Dashboards & Auth
    path('dashboard/', views.student_dashboard, name='dashboard'),
    path('signup/', views.user_signup, name='signup'),
    path('login/', views.user_login, name='login'),
    path('logout/', views.user_logout, name='logout'),
    
    # Admin Dashboard & Course Management
    path('admin-dashboard/', views.admin_dashboard, name='admin_dashboard'),
    path('admin-dashboard/course/add/', views.admin_add_course, name='admin_add_course'),
    path('admin-dashboard/category/add/', views.admin_add_category, name='admin_add_category'),
    path('admin-dashboard/notes/add/', views.admin_add_notes, name='admin_add_notes'),
    path('admin-dashboard/quiz/add/', views.admin_add_quiz, name='admin_add_quiz'),
    path('admin-dashboard/question/add/', views.admin_add_question, name='admin_add_question'),
]
