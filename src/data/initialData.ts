import { Category, Course, Note, Question, Quiz, TestResult, Enrollment, User } from '../types';

export const INITIAL_CATEGORIES: Category[] = [
  {
    id: 1,
    name: 'Programming',
    slug: 'programming',
    description: 'Master core programming languages including Python, Java, C++, and algorithms.',
    icon: 'Code',
    courseCount: 12
  },
  {
    id: 2,
    name: 'Web Development',
    slug: 'web-development',
    description: 'Build modern responsive websites and web applications with frontend & backend frameworks.',
    icon: 'Globe',
    courseCount: 18
  },
  {
    id: 3,
    name: 'Data Science',
    slug: 'data-science',
    description: 'Analyze data, visualize trends, and engineer predictive models using Python and SQL.',
    icon: 'BarChart2',
    courseCount: 9
  },
  {
    id: 4,
    name: 'Graphic Design',
    slug: 'graphic-design',
    description: 'Learn visual hierarchy, UI/UX wireframing, branding, typography, and color theory.',
    icon: 'Palette',
    courseCount: 7
  }
];

export const INITIAL_COURSES: Course[] = [
  {
    id: 1,
    title: 'Python Programming',
    slug: 'python-programming',
    description: 'Comprehensive Python course covering core syntax, data structures, OOP, file handling, and real-world scripting projects from beginner to advanced.',
    instructor: 'Dr. Angela Vance',
    instructorRole: 'Senior Python Architect & Educator',
    imageUrl: 'https://images.unsplash.com/photo-1526379095098-d400fd0bf935?w=800&auto=format&fit=crop&q=80',
    categoryId: 1,
    categoryName: 'Programming',
    duration: '8 Weeks (32 Hours)',
    level: 'Beginner',
    isFeatured: true
  },
  {
    id: 2,
    title: 'Full Stack Development',
    slug: 'full-stack-development',
    description: 'End-to-end full stack web engineering with HTML5, CSS3, modern JavaScript, Python Django backend, and MySQL database integration.',
    instructor: 'Marcus Chen',
    instructorRole: 'Principal Full-Stack Engineer',
    imageUrl: 'https://images.unsplash.com/photo-1593720213428-28a5b9e94613?w=800&auto=format&fit=crop&q=80',
    categoryId: 2,
    categoryName: 'Web Development',
    duration: '12 Weeks (48 Hours)',
    level: 'Intermediate',
    isFeatured: true
  },
  {
    id: 3,
    title: 'Data Analytics with SQL & Python',
    slug: 'data-analytics',
    description: 'Analyze complex datasets, generate automated business reports, and unlock actionable insights using Pandas, NumPy, MySQL, and Matplotlib.',
    instructor: 'Priya Sharma',
    instructorRole: 'Lead Data Scientist',
    imageUrl: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&auto=format&fit=crop&q=80',
    categoryId: 3,
    categoryName: 'Data Science',
    duration: '6 Weeks (24 Hours)',
    level: 'Intermediate',
    isFeatured: true
  },
  {
    id: 4,
    title: 'Modern Django & MySQL Mastery',
    slug: 'django-mysql-mastery',
    description: 'Deep dive into Django ORM, MySQL database indexing, session authentication, custom middleware, Django REST Framework, and secure deployment.',
    instructor: 'Marcus Chen',
    instructorRole: 'Principal Full-Stack Engineer',
    imageUrl: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&auto=format&fit=crop&q=80',
    categoryId: 2,
    categoryName: 'Web Development',
    duration: '10 Weeks (40 Hours)',
    level: 'Advanced',
    isFeatured: false
  },
  {
    id: 5,
    title: 'UI/UX Design Systems',
    slug: 'ui-ux-design-systems',
    description: 'Create cohesive digital design systems, user personas, wireframes, prototypes, and high-fidelity interfaces adhering to modern accessibility guidelines.',
    instructor: 'Elena Rostova',
    instructorRole: 'Design Director & UX Strategist',
    imageUrl: 'https://images.unsplash.com/photo-1581291518655-9523c932edcf?w=800&auto=format&fit=crop&q=80',
    categoryId: 4,
    categoryName: 'Graphic Design',
    duration: '5 Weeks (20 Hours)',
    level: 'Beginner',
    isFeatured: false
  },
  {
    id: 6,
    title: 'Machine Learning Fundamentals',
    slug: 'machine-learning-fundamentals',
    description: 'Supervised and unsupervised learning algorithms, model evaluation, scikit-learn, cross-validation, and practical machine learning pipelines in Python.',
    instructor: 'Dr. Angela Vance',
    instructorRole: 'Senior AI Researcher',
    imageUrl: 'https://images.unsplash.com/photo-1501504905252-473c47e087f8?w=800&auto=format&fit=crop&q=80',
    categoryId: 3,
    categoryName: 'Data Science',
    duration: '9 Weeks (36 Hours)',
    level: 'Advanced',
    isFeatured: false
  }
];

export const INITIAL_NOTES: Note[] = [
  {
    id: 1,
    courseId: 1,
    title: 'Lecture 1: Python Core Syntax, Variables & Operators',
    content: `# Lecture 1: Python Basics & Syntax Summary

## 1. Variables and Dynamic Typing
Python is dynamically typed. You don't declare types explicitly:
\`\`\`python
student_name = "Alex Rivera"
enrolled_courses = 3
gpa = 3.85
is_active = True
\`\`\`

## 2. Core Data Types
- **Integers & Floats**: Numeric values with built-in precision.
- **Strings**: Immutable sequences of Unicode characters supporting slicing \`text[0:4]\`.
- **Booleans**: \`True\` or \`False\`.

## 3. Control Flow
Use indentation (4 spaces) instead of braces:
\`\`\`python
if gpa >= 3.5:
    print("Honor Roll Student")
elif gpa >= 2.0:
    print("Good Standing")
else:
    print("Academic Warning")
\`\`\`

## 4. Key Takeaways
- Always use snake_case for Python variables and functions.
- Comments start with '#'.
- Python 3 uses UTF-8 strings by default.`,
    fileUrl: '/downloads/python_lecture_1_syntax.pdf',
    uploadedAt: '2026-09-10T14:30:00Z',
    fileSize: '1.4 MB'
  },
  {
    id: 2,
    courseId: 1,
    title: 'Lecture 2: Lists, Dictionaries & Tuples in Depth',
    content: `# Lecture 2: Python Data Collections

## Lists vs Tuples vs Dictionaries
- **List**: Ordered, mutable, indexed by integer. \`[1, 2, 3]\`
- **Tuple**: Ordered, immutable sequence. \`(10, 20)\`
- **Dict**: Key-value pairs with O(1) hash lookup. \`{"id": 1, "title": "EduLearn"}\`

## List Comprehensions
\`\`\`python
numbers = [1, 2, 3, 4, 5, 6]
evens = [n for n in numbers if n % 2 == 0]
# evens is [2, 4, 6]
\`\`\`

## Dictionary Iteration
\`\`\`python
grades = {"Alice": 95, "Bob": 88, "Charlie": 92}
for student, score in grades.items():
    print(f"{student} scored {score}%")
\`\`\``,
    fileUrl: '/downloads/python_lecture_2_collections.pdf',
    uploadedAt: '2026-09-12T10:15:00Z',
    fileSize: '2.1 MB'
  },
  {
    id: 3,
    courseId: 2,
    title: 'Full Stack Guide: Connecting Django to MySQL',
    content: `# Full Stack Guide: Connecting Django to MySQL

## Step 1: Install MySQL Client
\`\`\`bash
pip install mysqlclient
# or alternative pure-python driver:
pip install pymysql
\`\`\`

## Step 2: Configure settings.py
\`\`\`python
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.mysql',
        'NAME': 'edulearn_db',
        'USER': 'edulearn_user',
        'PASSWORD': 'SecurePassword123!',
        'HOST': '127.0.0.1',
        'PORT': '3306',
        'OPTIONS': {
            'charset': 'utf8mb4',
            'init_command': "SET sql_mode='STRICT_TRANS_TABLES'",
        }
    }
}
\`\`\`

## Step 3: Run Database Migrations
\`\`\`bash
python manage.py makemigrations
python manage.py migrate
\`\`\`

## Step 4: Verification
Launch \`python manage.py shell\` and query:
\`\`\`python
from courses.models import Course
print(Course.objects.count())
\`\`\``,
    fileUrl: '/downloads/django_mysql_guide.pdf',
    uploadedAt: '2026-09-11T16:00:00Z',
    fileSize: '3.0 MB'
  },
  {
    id: 4,
    courseId: 3,
    title: 'SQL Cheat Sheet: Queries, Joins & Aggregations',
    content: `# SQL Cheat Sheet for Data Analytics

## Relational Joins
- **INNER JOIN**: Returns rows with matching keys in both tables.
- **LEFT JOIN**: Returns all rows from left table, with nulls for non-matches.
- **GROUP BY & HAVING**: Aggregates grouped records.

\`\`\`sql
SELECT 
    c.title AS course_title,
    COUNT(e.id) AS total_enrolled,
    AVG(tr.score) AS average_quiz_score
FROM courses_course c
LEFT JOIN courses_enrollment e ON c.id = e.course_id
LEFT JOIN courses_testresult tr ON c.id = tr.course_id
GROUP BY c.id, c.title
HAVING total_enrolled > 0
ORDER BY average_quiz_score DESC;
\`\`\``,
    fileUrl: '/downloads/sql_analytics_cheatsheet.pdf',
    uploadedAt: '2026-09-08T09:45:00Z',
    fileSize: '1.8 MB'
  }
];

export const INITIAL_QUIZZES: Quiz[] = [
  {
    id: 1,
    courseId: 1,
    title: 'Python Core Fundamentals Test',
    description: 'Test your understanding of Python syntax, data types, list comprehensions, and functions.',
    timeLimitMinutes: 10,
    passingScore: 70
  },
  {
    id: 2,
    courseId: 2,
    title: 'Full Stack Web & Django Assessment',
    description: 'Evaluate your knowledge of MVC/MVT architecture, Django ORM, and MySQL database relations.',
    timeLimitMinutes: 15,
    passingScore: 70
  },
  {
    id: 3,
    courseId: 3,
    title: 'Data Analytics & SQL Mastery Quiz',
    description: 'Check your mastery of SQL joins, aggregation clauses, and Pandas dataframes.',
    timeLimitMinutes: 10,
    passingScore: 75
  }
];

export const INITIAL_QUESTIONS: Question[] = [
  // Quiz 1 (Python)
  {
    id: 1,
    quizId: 1,
    questionText: 'What is the correct syntax to output "Hello World" in Python 3?',
    optionA: 'echo "Hello World"',
    optionB: 'print("Hello World")',
    optionC: 'System.out.println("Hello World");',
    optionD: 'Console.WriteLine("Hello World");',
    correctAnswer: 'B',
    explanation: 'In Python 3, print() is a built-in function that requires parentheses.'
  },
  {
    id: 2,
    quizId: 1,
    questionText: 'Which of the following data structures in Python is immutable?',
    optionA: 'List',
    optionB: 'Dictionary',
    optionC: 'Tuple',
    optionD: 'Set',
    correctAnswer: 'C',
    explanation: 'Tuples cannot be changed or modified after creation, making them immutable.'
  },
  {
    id: 3,
    quizId: 1,
    questionText: 'What is the result of expression [x * 2 for x in [1, 2, 3]]?',
    optionA: '[1, 2, 3, 1, 2, 3]',
    optionB: '[2, 4, 6]',
    optionC: '[2, 2, 2]',
    optionD: 'Error: invalid comprehension syntax',
    correctAnswer: 'B',
    explanation: 'This is a list comprehension multiplying each element of [1, 2, 3] by 2, producing [2, 4, 6].'
  },
  {
    id: 4,
    quizId: 1,
    questionText: 'How do you define a function in Python?',
    optionA: 'function myFunc():',
    optionB: 'def myFunc():',
    optionC: 'func myFunc():',
    optionD: 'define myFunc():',
    correctAnswer: 'B',
    explanation: 'The "def" keyword is used in Python to define custom functions.'
  },

  // Quiz 2 (Full Stack / Django)
  {
    id: 5,
    quizId: 2,
    questionText: 'In Django architecture (MVT), what does the "V" represent?',
    optionA: 'Visual interface rendered by browser CSS',
    optionB: 'View - the business logic processing requests and returning responses',
    optionC: 'Virtual environment container',
    optionD: 'Variable storage layer',
    correctAnswer: 'B',
    explanation: 'In Django\'s MVT pattern, the View acts similarly to the Controller in traditional MVC, executing business logic.'
  },
  {
    id: 6,
    quizId: 2,
    questionText: 'Which command applies pending migrations to a MySQL database in Django?',
    optionA: 'python manage.py runmigrations',
    optionB: 'python manage.py makemigrations',
    optionC: 'python manage.py migrate',
    optionD: 'python manage.py db:push',
    correctAnswer: 'C',
    explanation: 'makemigrations creates migration files, while migrate applies them to the database.'
  },
  {
    id: 7,
    quizId: 2,
    questionText: 'How do you define a one-to-many relation in a Django model?',
    optionA: 'models.OneToOneField()',
    optionB: 'models.ForeignKey()',
    optionC: 'models.ManyToManyField()',
    optionD: 'models.ParentChildRelation()',
    correctAnswer: 'B',
    explanation: 'models.ForeignKey represents a many-to-one or one-to-many relationship in the relational database schema.'
  },

  // Quiz 3 (Data Analytics / SQL)
  {
    id: 8,
    quizId: 3,
    questionText: 'Which SQL clause is used to filter groups created by the GROUP BY statement?',
    optionA: 'WHERE',
    optionB: 'HAVING',
    optionC: 'FILTER',
    optionD: 'LIMIT',
    correctAnswer: 'B',
    explanation: 'The WHERE clause filters individual rows before grouping, whereas HAVING filters aggregated groups.'
  },
  {
    id: 9,
    quizId: 3,
    questionText: 'Which SQL JOIN returns all rows from the left table and matched records from the right table?',
    optionA: 'FULL OUTER JOIN',
    optionB: 'INNER JOIN',
    optionC: 'CROSS JOIN',
    optionD: 'LEFT JOIN',
    correctAnswer: 'D',
    explanation: 'A LEFT JOIN returns all rows from the left table, plus matched records from the right table (with NULLs for unmatched).'
  }
];

export const INITIAL_USERS: User[] = [
  {
    id: 1,
    username: 'student_alex',
    email: 'alex.rivera@edulearn.org',
    role: 'student',
    fullName: 'Alex Rivera',
    avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80'
  },
  {
    id: 2,
    username: 'admin_sarah',
    email: 'sarah.connor@edulearn.org',
    role: 'admin',
    fullName: 'Sarah Connor (Staff Admin)',
    avatarUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80'
  }
];

export const INITIAL_ENROLLMENTS: Enrollment[] = [
  {
    id: 1,
    userId: 1,
    courseId: 1,
    enrolledAt: '2026-09-01T12:00:00Z',
    progressPercent: 75,
    lastAccessedAt: '2026-09-14T18:20:00Z'
  },
  {
    id: 2,
    userId: 1,
    courseId: 2,
    enrolledAt: '2026-09-05T14:30:00Z',
    progressPercent: 40,
    lastAccessedAt: '2026-09-13T09:10:00Z'
  }
];

export const INITIAL_TEST_RESULTS: TestResult[] = [
  {
    id: 1,
    userId: 1,
    userName: 'Alex Rivera',
    quizId: 1,
    quizTitle: 'Python Core Fundamentals Test',
    courseId: 1,
    courseTitle: 'Python Programming',
    score: 4,
    totalQuestions: 4,
    percentage: 100,
    passed: true,
    submittedAt: '2026-09-12T15:24:00Z',
    userAnswers: { 1: 'B', 2: 'C', 3: 'B', 4: 'B' }
  }
];
