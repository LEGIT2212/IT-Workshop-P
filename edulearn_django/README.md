# EduLearn - Django & MySQL E-Learning Web Application

A full-stack e-learning platform built with **Python**, **Django 4.2+**, and **MySQL**, preserving custom frontend HTML/CSS styling.

---

## 1. Architecture Overview

### Relational Database Models (MySQL via Django ORM):
- **Category**: `name`, `slug`, `description`
- **Course**: `title`, `slug`, `description`, `instructor`, `image_url`, `category` (ForeignKey)
- **Notes**: `course` (ForeignKey), `title`, `content` / `file_url`, `uploaded_at`
- **Quiz & Question**: `quiz title`, `course` (ForeignKey), `question_text`, `options A/B/C/D`, `correct_answer`, `explanation`
- **TestResult**: `student` (ForeignKey), `quiz` (ForeignKey), `score`, `total_questions`, `percentage`, `passed`, `submitted_at`
- **Enrollment**: `student` (ForeignKey), `course` (ForeignKey), `enrolled_at`, `progress_percent`
- **UserProfile**: `user` (OneToOneField), `role` (`student`, `staff`, `admin`)

---

## 2. Quick Setup with MySQL

### Step 1: Clone or Navigate to the Django Directory
```bash
cd edulearn_django
```

### Step 2: Create a Virtual Environment & Install Dependencies
```bash
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
pip install -r requirements.txt
```

### Step 3: Configure MySQL Database
Create a database in MySQL:
```sql
CREATE DATABASE edulearn_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
CREATE USER 'edulearn_user'@'localhost' IDENTIFIED BY 'SecurePassword123!';
GRANT ALL PRIVILEGES ON edulearn_db.* TO 'edulearn_user'@'localhost';
FLUSH PRIVILEGES;
```

Update your `.env` or set environment variables:
```bash
export MYSQL_DATABASE=edulearn_db
export MYSQL_USER=edulearn_user
export MYSQL_PASSWORD=SecurePassword123!
export MYSQL_HOST=127.0.0.1
export MYSQL_PORT=3306
```

### Step 4: Run Migrations & Create Admin Superuser
```bash
python manage.py makemigrations
python manage.py migrate
python manage.py createsuperuser
```

### Step 5: Start the Development Server
```bash
python manage.py runserver 8000
```
Visit http://127.0.0.1:8000 in your browser.
Admin portal: http://127.0.0.1:8000/admin/ or http://127.0.0.1:8000/admin-dashboard/
