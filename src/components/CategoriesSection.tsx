import React from 'react';
import { useApp } from '../context/AppContext';
import { Code, Globe, BarChart2, Palette, Layers } from 'lucide-react';

export const CategoriesSection: React.FC = () => {
  const { categories, courses, setSelectedCategorySlug, setActiveView } = useApp();

  const getIcon = (slug: string) => {
    switch (slug) {
      case 'programming':
        return <Code className="w-8 h-8 text-blue-600 mb-3 mx-auto" />;
      case 'web-development':
        return <Globe className="w-8 h-8 text-indigo-600 mb-3 mx-auto" />;
      case 'data-science':
        return <BarChart2 className="w-8 h-8 text-emerald-600 mb-3 mx-auto" />;
      case 'graphic-design':
        return <Palette className="w-8 h-8 text-purple-600 mb-3 mx-auto" />;
      default:
        return <Layers className="w-8 h-8 text-blue-600 mb-3 mx-auto" />;
    }
  };

  const handleCategoryClick = (slug: string) => {
    setSelectedCategorySlug(slug);
    setActiveView('courses');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <section className="categories">
      <h1>Popular Categories</h1>

      <div className="category-container">
        {categories.map((cat) => {
          const count = courses.filter(c => c.categoryId === cat.id).length;
          return (
            <div 
              key={cat.id} 
              className="card cursor-pointer hover:border-blue-500 border border-transparent transition-all group"
              onClick={() => handleCategoryClick(cat.slug)}
            >
              {getIcon(cat.slug)}
              <h3 className="group-hover:text-blue-600 transition-colors">{cat.name}</h3>
              <p className="mt-2 text-sm text-gray-500">{count} {count === 1 ? 'Course' : 'Courses'}</p>
            </div>
          );
        })}
      </div>
    </section>
  );
};
