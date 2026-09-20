import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  Shield, PlusCircle, BookOpen, Layers, FileText, 
  HelpCircle, Users, CheckCircle, Database, ExternalLink 
} from 'lucide-react';

export const AdminDashboard: React.FC = () => {
  const { 
    courses, 
    categories, 
    notes, 
    quizzes, 
    testResults, 
    enrollments,
    addCourse, 
    addCategory, 
    addNote, 
    addQuizWithQuestions,
    setActiveView
  } = useApp();

  const [activeTab, setActiveTab] = useState<'courses' | 'categories' | 'notes' | 'quizzes' | 'results'>('courses');
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  // Form states
  // Course form
  const [courseTitle, setCourseTitle] = useState('');
  const [courseCategory, setCourseCategory] = useState<number>(categories[0]?.id || 1);
  const [courseInstructor, setCourseInstructor] = useState('');
  const [courseImage, setCourseImage] = useState('https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&auto=format&fit=crop&q=80');
  const [courseDescription, setCourseDescription] = useState('');
  const [courseFeatured, setCourseFeatured] = useState(true);

  // Category form
  const [catName, setCatName] = useState('');
  const [catDesc, setCatDesc] = useState('');

  // Note form
  const [noteCourseId, setNoteCourseId] = useState<number>(courses[0]?.id || 1);
  const [noteTitle, setNoteTitle] = useState('');
  const [noteContent, setNoteContent] = useState('');
  const [noteFileUrl, setNoteFileUrl] = useState('/downloads/custom_notes.pdf');

  // Quiz form
  const [quizCourseId, setQuizCourseId] = useState<number>(courses[0]?.id || 1);
  const [quizTitle, setQuizTitle] = useState('');
  const [quizDesc, setQuizDesc] = useState('');
  const [quizTime, setQuizTime] = useState(15);
  const [quizPassScore, setQuizPassScore] = useState(70);
  
  // Quiz question item
  const [qText, setQText] = useState('');
  const [qA, setQA] = useState('');
  const [qB, setQB] = useState('');
  const [qC, setQC] = useState('');
  const [qD, setQD] = useState('');
  const [qCorrect, setQCorrect] = useState<'A' | 'B' | 'C' | 'D'>('B');
  const [qExplanation, setQExplanation] = useState('');

  const showNotification = (msg: string) => {
    setSuccessMessage(msg);
    setTimeout(() => setSuccessMessage(null), 3500);
  };

  const handleCreateCourse = (e: React.FormEvent) => {
    e.preventDefault();
    if (!courseTitle.trim() || !courseInstructor.trim()) return;
    
    const cat = categories.find(c => c.id === Number(courseCategory));
    addCourse({
      title: courseTitle,
      description: courseDescription,
      instructor: courseInstructor,
      imageUrl: courseImage,
      categoryId: Number(courseCategory),
      categoryName: cat?.name || 'General',
      duration: '8 Weeks (32 Hours)',
      level: 'Intermediate',
      isFeatured: courseFeatured
    });

    setCourseTitle('');
    setCourseDescription('');
    setCourseInstructor('');
    showNotification(`New course "${courseTitle}" saved to MySQL Database!`);
  };

  const handleCreateCategory = (e: React.FormEvent) => {
    e.preventDefault();
    if (!catName.trim()) return;

    addCategory({
      name: catName,
      description: catDesc
    });

    setCatName('');
    setCatDesc('');
    showNotification(`Category "${catName}" added successfully!`);
  };

  const handleCreateNote = (e: React.FormEvent) => {
    e.preventDefault();
    if (!noteTitle.trim() || !noteContent.trim()) return;

    addNote({
      courseId: Number(noteCourseId),
      title: noteTitle,
      content: noteContent,
      fileUrl: noteFileUrl,
      fileSize: '1.5 MB'
    });

    setNoteTitle('');
    setNoteContent('');
    showNotification(`Study Note "${noteTitle}" published to course!`);
  };

  const handleCreateQuiz = (e: React.FormEvent) => {
    e.preventDefault();
    if (!quizTitle.trim() || !qText.trim()) return;

    addQuizWithQuestions(
      {
        courseId: Number(quizCourseId),
        title: quizTitle,
        description: quizDesc,
        timeLimitMinutes: quizTime,
        passingScore: quizPassScore
      },
      [
        {
          questionText: qText,
          optionA: qA || 'Option A description',
          optionB: qB || 'Option B description',
          optionC: qC || 'Option C description',
          optionD: qD || 'Option D description',
          correctAnswer: qCorrect,
          explanation: qExplanation || 'Verified answer from official instructor notes.'
        }
      ]
    );

    setQuizTitle('');
    setQuizDesc('');
    setQText('');
    setQA('');
    setQB('');
    setQC('');
    setQD('');
    showNotification(`Interactive Quiz "${quizTitle}" created with question!`);
  };

  return (
    <div className="max-w-6xl mx-auto px-6 py-10">
      {/* Top Banner */}
      <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-200 mb-8 flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-red-50 text-red-700 text-xs font-bold rounded-full mb-2">
            <Shield className="w-3.5 h-3.5" />
            <span>EduLearn Academic Administration</span>
          </div>
          <h1 className="text-3xl font-black text-gray-900">Admin Control Panel</h1>
          <p className="text-gray-500 text-sm mt-1">
            Publish courses, study notes, interactive quizzes, and inspect live student test records.
          </p>
        </div>

        <div className="flex gap-3">
          <button
            type="button"
            onClick={() => setActiveView('django-code')}
            className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-800 font-bold rounded-lg text-xs flex items-center gap-1.5 transition cursor-pointer"
          >
            <Database className="w-3.5 h-3.5 text-blue-600" />
            <span>View Django Models</span>
          </button>
        </div>
      </div>

      {/* Alert toast */}
      {successMessage && (
        <div className="mb-6 p-4 bg-emerald-50 border border-emerald-200 text-emerald-800 text-sm font-semibold rounded-xl flex items-center gap-2 shadow-sm animate-in fade-in">
          <CheckCircle className="w-5 h-5 text-emerald-600 shrink-0" />
          <span>{successMessage}</span>
        </div>
      )}

      {/* Metrics Row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-2xs">
          <div className="text-xs font-semibold text-gray-400 uppercase">Courses</div>
          <div className="text-2xl font-black text-blue-600 mt-1">{courses.length}</div>
        </div>
        <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-2xs">
          <div className="text-xs font-semibold text-gray-400 uppercase">Categories</div>
          <div className="text-2xl font-black text-emerald-600 mt-1">{categories.length}</div>
        </div>
        <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-2xs">
          <div className="text-xs font-semibold text-gray-400 uppercase">Study Notes</div>
          <div className="text-2xl font-black text-purple-600 mt-1">{notes.length}</div>
        </div>
        <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-2xs">
          <div className="text-xs font-semibold text-gray-400 uppercase">Tests Taken</div>
          <div className="text-2xl font-black text-amber-600 mt-1">{testResults.length}</div>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="flex border-b border-gray-200 mb-8 space-x-2 overflow-x-auto">
        {[
          { id: 'courses', label: 'Courses Management', icon: BookOpen },
          { id: 'categories', label: 'Categories', icon: Layers },
          { id: 'notes', label: 'Upload Study Notes', icon: FileText },
          { id: 'quizzes', label: 'Quiz Builder', icon: HelpCircle },
          { id: 'results', label: 'Student Test Submissions', icon: Users },
        ].map(tab => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center gap-2 px-4 py-3 border-b-2 font-bold text-sm transition-colors whitespace-nowrap cursor-pointer ${
                isActive 
                  ? 'border-blue-600 text-blue-600 bg-blue-50/50' 
                  : 'border-transparent text-gray-500 hover:text-gray-900'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* TAB 1: COURSES */}
      {activeTab === 'courses' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1 bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
            <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
              <PlusCircle className="w-5 h-5 text-blue-600" />
              <span>Add New Course</span>
            </h3>

            <form onSubmit={handleCreateCourse} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">Course Title</label>
                <input 
                  type="text"
                  required
                  placeholder="e.g. Advanced MySQL Query Optimization"
                  value={courseTitle}
                  onChange={(e) => setCourseTitle(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-blue-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">Category</label>
                <select
                  value={courseCategory}
                  onChange={(e) => setCourseCategory(Number(e.target.value))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-blue-500"
                >
                  {categories.map(c => (
                    <option key={c.id} value={c.id}>{c.name}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">Instructor Name</label>
                <input 
                  type="text"
                  required
                  placeholder="e.g. Dr. Alex Morgan"
                  value={courseInstructor}
                  onChange={(e) => setCourseInstructor(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-blue-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">Cover Image URL</label>
                <input 
                  type="url"
                  value={courseImage}
                  onChange={(e) => setCourseImage(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-blue-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">Description & Syllabus</label>
                <textarea 
                  rows={3}
                  required
                  placeholder="Explain learning outcomes and module highlights..."
                  value={courseDescription}
                  onChange={(e) => setCourseDescription(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-blue-500"
                />
              </div>

              <div className="flex items-center gap-2">
                <input 
                  type="checkbox"
                  id="featCheck"
                  checked={courseFeatured}
                  onChange={(e) => setCourseFeatured(e.target.checked)}
                  className="w-4 h-4 text-blue-600 rounded"
                />
                <label htmlFor="featCheck" className="text-xs font-semibold text-gray-700">
                  Feature on EduLearn Homepage
                </label>
              </div>

              <button
                type="submit"
                className="w-full py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg text-sm transition cursor-pointer"
              >
                Publish Course to MySQL
              </button>
            </form>
          </div>

          <div className="lg:col-span-2 bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
            <h3 className="text-lg font-bold text-gray-900 mb-4">Published Courses Directory</h3>
            <div className="divide-y divide-gray-100">
              {courses.map(course => (
                <div key={course.id} className="py-3.5 flex items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <img src={course.imageUrl} alt="" className="w-12 h-12 rounded-lg object-cover" />
                    <div>
                      <h4 className="text-sm font-bold text-gray-900">{course.title}</h4>
                      <p className="text-xs text-gray-500">
                        {course.categoryName} • By {course.instructor}
                      </p>
                    </div>
                  </div>
                  <span className="text-xs px-2.5 py-1 bg-gray-100 font-semibold rounded-md text-gray-700">
                    ID #{course.id}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: CATEGORIES */}
      {activeTab === 'categories' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
            <h3 className="text-lg font-bold text-gray-900 mb-4">Add Category</h3>
            <form onSubmit={handleCreateCategory} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">Category Name</label>
                <input 
                  type="text"
                  required
                  placeholder="e.g. Artificial Intelligence"
                  value={catName}
                  onChange={(e) => setCatName(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">Description</label>
                <textarea 
                  rows={3}
                  placeholder="Overview of subject discipline..."
                  value={catDesc}
                  onChange={(e) => setCatDesc(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                />
              </div>
              <button
                type="submit"
                className="w-full py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg text-sm cursor-pointer"
              >
                Save Category
              </button>
            </form>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
            <h3 className="text-lg font-bold text-gray-900 mb-4">Existing Categories</h3>
            <div className="space-y-3">
              {categories.map(cat => (
                <div key={cat.id} className="p-4 rounded-xl border border-gray-100 bg-gray-50 flex items-center justify-between">
                  <div>
                    <h4 className="text-sm font-bold text-gray-900">{cat.name}</h4>
                    <p className="text-xs text-gray-500 mt-0.5">{cat.description}</p>
                  </div>
                  <span className="text-xs font-semibold px-2 py-1 bg-white border border-gray-200 rounded text-blue-600">
                    slug: {cat.slug}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: NOTES */}
      {activeTab === 'notes' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
            <h3 className="text-lg font-bold text-gray-900 mb-4">Upload Study Notes / Handout</h3>
            <form onSubmit={handleCreateNote} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">Target Course</label>
                <select
                  value={noteCourseId}
                  onChange={(e) => setNoteCourseId(Number(e.target.value))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                >
                  {courses.map(c => (
                    <option key={c.id} value={c.id}>{c.title}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">Note Title</label>
                <input 
                  type="text"
                  required
                  placeholder="e.g. Chapter 4: Database Indexing & B-Trees"
                  value={noteTitle}
                  onChange={(e) => setNoteTitle(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">Lecture Content / Notes Summary</label>
                <textarea 
                  rows={5}
                  required
                  placeholder="Write comprehensive lecture notes, key formulas, or code snippets..."
                  value={noteContent}
                  onChange={(e) => setNoteContent(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm font-mono text-xs"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">Downloadable Asset URL</label>
                <input 
                  type="text"
                  value={noteFileUrl}
                  onChange={(e) => setNoteFileUrl(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                />
              </div>

              <button
                type="submit"
                className="w-full py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg text-sm cursor-pointer"
              >
                Upload Note
              </button>
            </form>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
            <h3 className="text-lg font-bold text-gray-900 mb-4">Uploaded Study Notes ({notes.length})</h3>
            <div className="space-y-3 max-h-[500px] overflow-y-auto">
              {notes.map(note => {
                const c = courses.find(x => x.id === note.courseId);
                return (
                  <div key={note.id} className="p-3.5 rounded-xl border border-gray-100 bg-gray-50 flex items-start justify-between">
                    <div>
                      <h4 className="text-sm font-bold text-gray-900">{note.title}</h4>
                      <p className="text-xs text-blue-600 font-semibold">{c?.title}</p>
                      <p className="text-xs text-gray-400 mt-1">Uploaded {new Date(note.uploadedAt).toLocaleDateString()}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* TAB 4: QUIZZES */}
      {activeTab === 'quizzes' && (
        <div className="bg-white p-8 rounded-2xl border border-gray-200 shadow-sm">
          <h3 className="text-lg font-bold text-gray-900 mb-6 flex items-center gap-2">
            <HelpCircle className="w-5 h-5 text-amber-500" />
            <span>Create New Quiz & Diagnostic Question</span>
          </h3>

          <form onSubmit={handleCreateQuiz} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">Target Course</label>
                <select
                  value={quizCourseId}
                  onChange={(e) => setQuizCourseId(Number(e.target.value))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                >
                  {courses.map(c => (
                    <option key={c.id} value={c.id}>{c.title}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">Quiz Title</label>
                <input 
                  type="text"
                  required
                  placeholder="e.g. Django ORM Querysets Assessment"
                  value={quizTitle}
                  onChange={(e) => setQuizTitle(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">Time Limit (Minutes)</label>
                <input 
                  type="number"
                  min={1}
                  max={120}
                  value={quizTime}
                  onChange={(e) => setQuizTime(Number(e.target.value))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">Passing Percentage Threshold (%)</label>
                <input 
                  type="number"
                  min={10}
                  max={100}
                  value={quizPassScore}
                  onChange={(e) => setQuizPassScore(Number(e.target.value))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                />
              </div>
            </div>

            {/* Question Builder */}
            <div className="p-6 bg-gray-50 rounded-xl border border-gray-200">
              <h4 className="text-sm font-bold text-gray-900 mb-4">Initial Question Data</h4>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">Question Text</label>
                  <input 
                    type="text"
                    required
                    placeholder="e.g. Which method is used to filter records without executing immediate SQL?"
                    value={qText}
                    onChange={(e) => setQText(e.target.value)}
                    className="w-full px-3 py-2 bg-white border border-gray-300 rounded-lg text-sm"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">Option A</label>
                    <input 
                      type="text"
                      required
                      placeholder="Option A text"
                      value={qA}
                      onChange={(e) => setQA(e.target.value)}
                      className="w-full px-3 py-2 bg-white border border-gray-300 rounded-lg text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">Option B</label>
                    <input 
                      type="text"
                      required
                      placeholder="Option B text"
                      value={qB}
                      onChange={(e) => setQB(e.target.value)}
                      className="w-full px-3 py-2 bg-white border border-gray-300 rounded-lg text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">Option C</label>
                    <input 
                      type="text"
                      required
                      placeholder="Option C text"
                      value={qC}
                      onChange={(e) => setQC(e.target.value)}
                      className="w-full px-3 py-2 bg-white border border-gray-300 rounded-lg text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">Option D</label>
                    <input 
                      type="text"
                      required
                      placeholder="Option D text"
                      value={qD}
                      onChange={(e) => setQD(e.target.value)}
                      className="w-full px-3 py-2 bg-white border border-gray-300 rounded-lg text-sm"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">Correct Option</label>
                    <select
                      value={qCorrect}
                      onChange={(e) => setQCorrect(e.target.value as any)}
                      className="w-full px-3 py-2 bg-white border border-gray-300 rounded-lg text-sm"
                    >
                      <option value="A">Option A</option>
                      <option value="B">Option B</option>
                      <option value="C">Option C</option>
                      <option value="D">Option D</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">Explanation / Solution Note</label>
                    <input 
                      type="text"
                      placeholder="Why is this answer correct?"
                      value={qExplanation}
                      onChange={(e) => setQExplanation(e.target.value)}
                      className="w-full px-3 py-2 bg-white border border-gray-300 rounded-lg text-sm"
                    />
                  </div>
                </div>
              </div>
            </div>

            <button
              type="submit"
              className="px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg text-sm cursor-pointer shadow-sm"
            >
              Publish Quiz & Question
            </button>
          </form>
        </div>
      )}

      {/* TAB 5: RESULTS */}
      {activeTab === 'results' && (
        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
          <div className="p-6 border-b border-gray-100 flex items-center justify-between">
            <h3 className="text-lg font-bold text-gray-900">Student Quiz Submissions & Instant Grading Log</h3>
            <span className="text-xs text-gray-500 font-semibold">{testResults.length} Submissions</span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-gray-50 text-gray-500 font-semibold border-b border-gray-200">
                <tr>
                  <th className="px-6 py-3.5">Student</th>
                  <th className="px-6 py-3.5">Quiz Title</th>
                  <th className="px-6 py-3.5">Score</th>
                  <th className="px-6 py-3.5">Percentage</th>
                  <th className="px-6 py-3.5">Grading Result</th>
                  <th className="px-6 py-3.5">Timestamp</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {testResults.map(res => (
                  <tr key={res.id} className="hover:bg-gray-50/70">
                    <td className="px-6 py-4 font-bold text-gray-900">{res.userName}</td>
                    <td className="px-6 py-4 text-gray-700">{res.quizTitle}</td>
                    <td className="px-6 py-4 font-semibold text-gray-800">
                      {res.score} / {res.totalQuestions}
                    </td>
                    <td className="px-6 py-4 font-bold text-blue-600">{res.percentage}%</td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold ${
                        res.passed 
                          ? 'bg-emerald-100 text-emerald-800' 
                          : 'bg-red-100 text-red-800'
                      }`}>
                        {res.passed ? 'PASSED' : 'FAILED'}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-xs text-gray-500">
                      {new Date(res.submittedAt).toLocaleString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};
