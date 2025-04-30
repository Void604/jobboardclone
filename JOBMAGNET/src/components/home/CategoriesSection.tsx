import React from 'react';
import { Link } from 'react-router-dom';
import { Code, PenTool, TrendingUp, Database, Globe, Briefcase, Cpu, Lightbulb } from 'lucide-react';

const categories = [
  {
    title: 'Engineering & Development',
    icon: <Code className="h-8 w-8 text-primary-500" />,
    count: 1432,
    path: '/jobs?category=engineering'
  },
  {
    title: 'Design & Creative',
    icon: <PenTool className="h-8 w-8 text-primary-500" />,
    count: 867,
    path: '/jobs?category=design'
  },
  {
    title: 'Marketing & Sales',
    icon: <TrendingUp className="h-8 w-8 text-primary-500" />,
    count: 953,
    path: '/jobs?category=marketing'
  },
  {
    title: 'Data Science & Analytics',
    icon: <Database className="h-8 w-8 text-primary-500" />,
    count: 623,
    path: '/jobs?category=data'
  },
  {
    title: 'Remote Work',
    icon: <Globe className="h-8 w-8 text-primary-500" />,
    count: 1897,
    path: '/jobs?remote=true'
  },
  {
    title: 'Business & Management',
    icon: <Briefcase className="h-8 w-8 text-primary-500" />,
    count: 742,
    path: '/jobs?category=business'
  },
  {
    title: 'IT & Networking',
    icon: <Cpu className="h-8 w-8 text-primary-500" />,
    count: 578,
    path: '/jobs?category=it'
  },
  {
    title: 'Internships',
    icon: <Lightbulb className="h-8 w-8 text-primary-500" />,
    count: 483,
    path: '/jobs?type=internship'
  }
];

const CategoriesSection: React.FC = () => {
  return (
    <div className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900">Popular Categories</h2>
          <p className="mt-4 text-lg text-gray-600">Explore opportunities by category and find your perfect match</p>
        </div>
        
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {categories.map((category, index) => (
            <Link 
              key={index}
              to={category.path}
              className="group bg-white border border-gray-200 rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="flex flex-col items-center text-center">
                <div className="mb-4 p-3 bg-primary-50 rounded-full group-hover:bg-primary-100 transition-colors">
                  {category.icon}
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-primary-600 transition-colors">
                  {category.title}
                </h3>
                <p className="text-gray-500">
                  {category.count.toLocaleString()} jobs available
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CategoriesSection;