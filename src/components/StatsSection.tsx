import React from 'react';
import { useApp } from '../context/AppContext';

export const StatsSection: React.FC = () => {
  const { courses, enrollments, testResults } = useApp();

  const totalStudents = Math.max(1200, 1200 + enrollments.length);
  const totalCourses = courses.length;
  const totalPassed = testResults.filter(r => r.passed).length;
  const totalTests = testResults.length;
  const successRate = totalTests > 0 ? Math.round((totalPassed / totalTests) * 100) : 95;

  return (
    <section className="stats">
      <div className="stat">
        <h2>{totalStudents}+</h2>
        <p>Students Enrolled</p>
      </div>

      <div className="stat">
        <h2>{totalCourses > 0 ? totalCourses : 100}+</h2>
        <p>Active Courses</p>
      </div>

      <div className="stat">
        <h2>50+</h2>
        <p>Expert Teachers</p>
      </div>

      <div className="stat">
        <h2>{successRate}%</h2>
        <p>Test Success Rate</p>
      </div>
    </section>
  );
};
