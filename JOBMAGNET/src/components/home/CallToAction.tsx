import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

const CallToAction: React.FC = () => {
  return (
    <div className="py-16 bg-gradient-to-r from-primary-600 to-secondary-600">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
          <div className="mb-8 md:mb-0 md:mr-8">
            <h2 className="text-3xl font-bold text-white mb-4">
              Ready to Take the Next Step in Your Career?
            </h2>
            <p className="text-white text-opacity-90 text-lg">
              Join thousands of professionals who've found their dream jobs through JobMagnet.
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
            <Link
              to="/register"
              className="btn bg-white text-primary-600 hover:bg-gray-100 px-6 py-3 text-base font-medium transition-colors"
            >
              Sign Up for Free
            </Link>
            <Link
              to="/post-job"
              className="btn bg-primary-700 text-white hover:bg-primary-800 px-6 py-3 text-base font-medium transition-colors flex items-center justify-center"
            >
              For Employers
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CallToAction;