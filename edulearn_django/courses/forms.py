from django import forms
from django.contrib.auth.models import User
from .models import Category, Course, Notes, Quiz, Question, UserProfile

class UserSignupForm(forms.ModelForm):
    password = forms.CharField(widget=forms.PasswordInput(attrs={
        'class': 'form-input', 'placeholder': 'Enter a secure password'
    }))
    password_confirm = forms.CharField(widget=forms.PasswordInput(attrs={
        'class': 'form-input', 'placeholder': 'Confirm your password'
    }))
    role = forms.ChoiceField(choices=UserProfile.ROLE_CHOICES, initial='student', widget=forms.Select(attrs={
        'class': 'form-input'
    }))

    class Meta:
        model = User
        fields = ['username', 'email', 'first_name', 'last_name']
        widgets = {
            'username': forms.TextInput(attrs={'class': 'form-input', 'placeholder': 'Username'}),
            'email': forms.EmailInput(attrs={'class': 'form-input', 'placeholder': 'Email address'}),
            'first_name': forms.TextInput(attrs={'class': 'form-input', 'placeholder': 'First Name'}),
            'last_name': forms.TextInput(attrs={'class': 'form-input', 'placeholder': 'Last Name'}),
        }

    def clean(self):
        cleaned_data = super().clean()
        p1 = cleaned_data.get('password')
        p2 = cleaned_data.get('password_confirm')
        if p1 and p2 and p1 != p2:
            raise forms.ValidationError("Passwords do not match.")
        return cleaned_data


class UserLoginForm(forms.Form):
    username = forms.CharField(widget=forms.TextInput(attrs={
        'class': 'form-input', 'placeholder': 'Username'
    }))
    password = forms.CharField(widget=forms.PasswordInput(attrs={
        'class': 'form-input', 'placeholder': 'Password'
    }))


class CourseForm(forms.ModelForm):
    class Meta:
        model = Course
        fields = ['title', 'category', 'instructor', 'description', 'image_url', 'is_featured']
        widgets = {
            'title': forms.TextInput(attrs={'class': 'form-input', 'placeholder': 'Course Title'}),
            'category': forms.Select(attrs={'class': 'form-input'}),
            'instructor': forms.TextInput(attrs={'class': 'form-input', 'placeholder': 'Instructor Name'}),
            'description': forms.Textarea(attrs={'class': 'form-input', 'rows': 4, 'placeholder': 'Detailed syllabus and course description'}),
            'image_url': forms.URLInput(attrs={'class': 'form-input', 'placeholder': 'https://example.com/course-banner.jpg'}),
            'is_featured': forms.CheckboxInput(attrs={'class': 'form-checkbox'}),
        }


class CategoryForm(forms.ModelForm):
    class Meta:
        model = Category
        fields = ['name', 'description']
        widgets = {
            'name': forms.TextInput(attrs={'class': 'form-input', 'placeholder': 'Category Name'}),
            'description': forms.Textarea(attrs={'class': 'form-input', 'rows': 3, 'placeholder': 'Category Description'}),
        }


class NotesForm(forms.ModelForm):
    class Meta:
        model = Notes
        fields = ['course', 'title', 'content', 'file_url']
        widgets = {
            'course': forms.Select(attrs={'class': 'form-input'}),
            'title': forms.TextInput(attrs={'class': 'form-input', 'placeholder': 'Note / Lecture Title'}),
            'content': forms.Textarea(attrs={'class': 'form-input', 'rows': 5, 'placeholder': 'Enter comprehensive study notes or summary content'}),
            'file_url': forms.URLInput(attrs={'class': 'form-input', 'placeholder': 'Optional PDF/File URL'}),
        }


class QuizForm(forms.ModelForm):
    class Meta:
        model = Quiz
        fields = ['course', 'title', 'description', 'time_limit_minutes', 'passing_score']
        widgets = {
            'course': forms.Select(attrs={'class': 'form-input'}),
            'title': forms.TextInput(attrs={'class': 'form-input', 'placeholder': 'Quiz Title'}),
            'description': forms.Textarea(attrs={'class': 'form-input', 'rows': 3, 'placeholder': 'Quiz instructions'}),
            'time_limit_minutes': forms.NumberInput(attrs={'class': 'form-input', 'min': 1}),
            'passing_score': forms.NumberInput(attrs={'class': 'form-input', 'min': 0, 'max': 100}),
        }


class QuestionForm(forms.ModelForm):
    class Meta:
        model = Question
        fields = ['quiz', 'question_text', 'option_a', 'option_b', 'option_c', 'option_d', 'correct_answer', 'explanation']
        widgets = {
            'quiz': forms.Select(attrs={'class': 'form-input'}),
            'question_text': forms.Textarea(attrs={'class': 'form-input', 'rows': 2, 'placeholder': 'Enter question text'}),
            'option_a': forms.TextInput(attrs={'class': 'form-input', 'placeholder': 'Option A'}),
            'option_b': forms.TextInput(attrs={'class': 'form-input', 'placeholder': 'Option B'}),
            'option_c': forms.TextInput(attrs={'class': 'form-input', 'placeholder': 'Option C'}),
            'option_d': forms.TextInput(attrs={'class': 'form-input', 'placeholder': 'Option D'}),
            'correct_answer': forms.Select(attrs={'class': 'form-input'}),
            'explanation': forms.Textarea(attrs={'class': 'form-input', 'rows': 2, 'placeholder': 'Why is this answer correct?'}),
        }
