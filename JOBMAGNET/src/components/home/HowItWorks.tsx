import React from 'react';
import { Search, FileCheck, Send } from 'lucide-react';

const steps = [
  {
    title: 'Search Jobs',
    description: 'Browse through thousands of job listings filtered to match your skills and preferences.',
    icon: <Search className="h-12 w-12 text-primary-500" />,
    color: 'bg-primary-100'
  },
  {
    title: 'Create Your Profile',
    description: 'Build a standout profile with your resume, experience, and skills to attract employers.',
    icon: <FileCheck className="h-12 w-12 text-secondary-500" />,
    color: 'bg-secondary-100'
  },
  {
    title: 'Apply with Ease',
    description: 'Apply to jobs with just a few clicks and track your application status in real-time.',
    icon: <Send className="h-12 w-12 text-accent-500" />,
    color: 'bg-accent-100'
  }
];

const HowItWorks: React.FC = () => {
  return (
    <div className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900">How It Works</h2>
          <p className="mt-4 text-lg text-gray-600">Find your dream job in three simple steps</p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <div key={index} className="flex flex-col items-center">
              <div className={`flex items-center justify-center h-24 w-24 rounded-full ${step.color} mb-6`}>
                {step.icon}
              </div>
              <div className="text-center">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{step.title}</h3>
                <p className="text-gray-600">{step.description}</p>
              </div>
              
              {index < steps.length - 1 && (
                <div className="hidden md:flex justify-center items-center mt-12 relative">
                  <div className="absolute w-full h-0.5 bg-gray-200 left-full transform translate-x-4">
                    <div className="absolute right-0 -top-1.5 h-4 w-4 rounded-full bg-gray-200"></div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HowItWorks;