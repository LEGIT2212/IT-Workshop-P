import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { X, BookOpen, Download, Check, FileText } from 'lucide-react';

export const NotesReaderModal: React.FC = () => {
  const { activeNote, closeNoteReader, courses } = useApp();
  const [downloaded, setDownloaded] = useState(false);

  if (!activeNote) return null;

  const course = courses.find(c => c.id === activeNote.courseId);

  const handleDownload = () => {
    setDownloaded(true);
    // Create text file blob simulation
    const blob = new Blob([activeNote.content], { type: 'text/markdown;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${activeNote.title.replace(/\s+/g, '_')}.md`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    setTimeout(() => setDownloaded(false), 2500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-xs p-4">
      <div className="bg-white w-full max-w-3xl max-h-[85vh] rounded-2xl shadow-2xl flex flex-col overflow-hidden animate-in fade-in zoom-in duration-200">
        {/* Header */}
        <div className="px-6 py-5 border-b border-gray-200 flex items-center justify-between bg-gray-50/50">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-100 text-blue-600 rounded-xl flex items-center justify-center">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <span className="text-xs font-bold text-blue-600 uppercase tracking-wider block">
                {course?.title || 'Study Material'}
              </span>
              <h3 className="text-lg font-bold text-gray-900 line-clamp-1">{activeNote.title}</h3>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleDownload}
              className={`px-3 py-1.5 text-xs font-bold rounded-lg flex items-center gap-1.5 transition cursor-pointer ${
                downloaded 
                  ? 'bg-emerald-100 text-emerald-700' 
                  : 'bg-blue-600 hover:bg-blue-700 text-white'
              }`}
            >
              {downloaded ? (
                <>
                  <Check className="w-3.5 h-3.5" />
                  <span>Downloaded</span>
                </>
              ) : (
                <>
                  <Download className="w-3.5 h-3.5" />
                  <span>Download Notes</span>
                </>
              )}
            </button>

            <button
              type="button"
              onClick={closeNoteReader}
              className="p-1.5 rounded-lg text-gray-400 hover:text-gray-700 hover:bg-gray-200 transition cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Content Area */}
        <div className="p-8 overflow-y-auto space-y-4 text-gray-800 text-sm leading-relaxed whitespace-pre-wrap font-sans bg-white">
          <div className="bg-blue-50/70 p-4 rounded-xl border border-blue-100 text-xs text-blue-900 flex items-center justify-between">
            <span>Uploaded: {new Date(activeNote.uploadedAt).toLocaleDateString()}</span>
            <span>Course: {course?.title}</span>
            <span>Status: Verified Official Notes</span>
          </div>

          <div className="prose max-w-none text-gray-700 pt-2 font-mono text-xs sm:text-sm bg-gray-50 p-6 rounded-xl border border-gray-200 overflow-x-auto">
            {activeNote.content}
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-gray-100 bg-gray-50 flex items-center justify-between text-xs text-gray-500">
          <span>EduLearn Academic Repository • MySQL Notes Model</span>
          <button
            type="button"
            onClick={closeNoteReader}
            className="px-4 py-2 bg-white border border-gray-300 rounded-lg text-gray-700 font-semibold hover:bg-gray-100 cursor-pointer"
          >
            Close Reader
          </button>
        </div>
      </div>
    </div>
  );
};
