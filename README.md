# EduLearn

EduLearn is a Django and MySQL e-learning platform with course browsing,
student accounts, enrollments, quizzes, results, and an administrator portal.

## Project Layout

```text
manage.py                 Django command-line entry point
edulearn/                 Django project settings and WSGI module
courses/                  Courses, quizzes, users, enrollments, and admin
templates/                Django HTML templates
static/                   CSS assets
requirements.txt          Python dependencies
legacy_frontend/          Archived React/Vite prototype
```

## Run Locally

```powershell
python -m venv venv
.\venv\Scripts\Activate.ps1
pip install -r requirements.txt
Copy-Item .env.example .env
python manage.py migrate
python manage.py createsuperuser
python manage.py runserver
```

Create the MySQL database first, then update `.env` with the database
credentials. Never commit `.env` or production credentials.

## Main URLs

- Application: `http://127.0.0.1:8000/`
- Course catalog: `http://127.0.0.1:8000/courses/`
- Admin site: `http://127.0.0.1:8000/admin/`
- Admin dashboard: `http://127.0.0.1:8000/admin-dashboard/`

## Deployment

GitHub stores the source code, but GitHub Pages cannot run this Django backend
or MySQL database. Deploy the application to a Python-capable host such as
Render, Railway, or a VPS with a managed MySQL database.

Use this production start command:

```text
gunicorn edulearn.wsgi:application
```
