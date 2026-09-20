import React from 'react';
import { Star } from 'lucide-react';

export const TestimonialsSection: React.FC = () => {
  return (
    <section className="testimonials">
      <h2>Student Reviews</h2>

      <div className="review-container">
        <div className="review">
          <div className="flex text-amber-400 mb-3">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-4 h-4 fill-current" />
            ))}
          </div>
          <p>
            "Excellent platform. Easy to learn and understand lessons. The Django and MySQL integration module made full-stack development crystal clear for me!"
          </p>
          <h4>- John Doe, Software Intern</h4>
        </div>

        <div className="review">
          <div className="flex text-amber-400 mb-3">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-4 h-4 fill-current" />
            ))}
          </div>
          <p>
            "The interactive quizzes and instant grading really helped me evaluate my skills before my technical interviews. The study notes are also very well organized."
          </p>
          <h4>- Emma Watson, Data Analyst</h4>
        </div>

        <div className="review">
          <div className="flex text-amber-400 mb-3">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-4 h-4 fill-current" />
            ))}
          </div>
          <p>
            "Being able to review lecture summaries and test scores directly on my student dashboard keeps me focused and on track every week."
          </p>
          <h4>- David Kumar, Web Developer</h4>
        </div>
      </div>
    </section>
  );
};
