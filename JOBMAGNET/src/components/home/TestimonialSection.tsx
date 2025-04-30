import React from 'react';
import { Star } from 'lucide-react';

const testimonials = [
  {
    content: "JobMagnet helped me land my dream job as a software engineer at a top tech company. The platform's user-friendly interface and job matching algorithm made it easy to find the perfect fit for my skills and career goals.",
    author: "Michael Chen",
    position: "Software Engineer",
    company: "TechGiant Inc.",
    avatar: "https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=300",
    rating: 5
  },
  {
    content: "As a recent graduate, finding internship opportunities was challenging until I discovered JobMagnet. Within two weeks, I secured an internship that aligned perfectly with my field of study. I couldn't be happier!",
    author: "Priya Sharma",
    position: "Marketing Intern",
    company: "Global Brands",
    avatar: "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=300",
    rating: 5
  },
  {
    content: "From an employer perspective, JobMagnet has revolutionized our hiring process. We've found high-quality candidates quickly, saving us time and resources. The platform's analytics help us optimize our job listings too.",
    author: "Sarah Williams",
    position: "HR Director",
    company: "Innovate Solutions",
    avatar: "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=300",
    rating: 4
  }
];

const TestimonialSection: React.FC = () => {
  return (
    <div className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900">Success Stories</h2>
          <p className="mt-4 text-lg text-gray-600">See how JobMagnet has helped professionals achieve their career goals</p>
        </div>
        
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((testimonial, index) => (
            <div 
              key={index} 
              className="bg-gray-50 rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="flex items-center mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`h-5 w-5 ${
                      i < testimonial.rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'
                    }`}
                  />
                ))}
              </div>
              
              <blockquote className="text-gray-700 mb-6">
                "{testimonial.content}"
              </blockquote>
              
              <div className="flex items-center">
                <img
                  src={testimonial.avatar}
                  alt={testimonial.author}
                  className="h-12 w-12 rounded-full object-cover mr-4"
                />
                <div>
                  <p className="font-semibold text-gray-900">{testimonial.author}</p>
                  <p className="text-sm text-gray-600">{testimonial.position}, {testimonial.company}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TestimonialSection;