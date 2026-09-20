<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://ai.google.dev/static/site-assets/images/share-ais-513315318.png" />
</div>

# EduLearn

EduLearn is a Django and MySQL e-learning platform with course browsing,
student accounts, enrollments, quizzes, results, and an administrator portal.

## Run Locally

```powershell
python -m venv venv
.\venv\Scripts\Activate.ps1
pip install -r requirements.txt
python manage.py migrate
python manage.py createsuperuser
python manage.py runserver
```

Configure `MYSQL_DATABASE`, `MYSQL_USER`, `MYSQL_PASSWORD`, `MYSQL_HOST`, and
`MYSQL_PORT` in a local `.env` file before running migrations.

## Deployment

The full application is server-side Django and cannot run on GitHub Pages,
which only serves static HTML, CSS, and JavaScript. The GitHub Pages preview is
published from `docs/`; it is a project landing page, not the live Django app.
The included Pages workflow publishes it after GitHub Pages is enabled with
**Settings > Pages > Source: GitHub Actions**.

Deploy the Django application on a Python-capable service such as Render,
Railway, or a VPS, with a managed MySQL database. Set the service's start
command to:

```text
gunicorn edulearn.wsgi:application
```

The Django app is in the repository root.
