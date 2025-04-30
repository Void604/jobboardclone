import React from 'react';
import { Link } from 'react-router-dom';
import { ExternalLink } from 'lucide-react';
import JobCard from '../shared/JobCard';
import { useJobs } from '../../contexts/JobContext';

const FeaturedJobs: React.FC = () => {
  const { featuredJobs, isLoading } = useJobs();

  if (isLoading) {
    return (
      <div className="py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900">Featured Jobs</h2>
            <p className="mt-4 text-lg text-gray-600">Loading featured opportunities...</p>
          </div>
          
          <div className="grid gap-6 md:grid-cols-2">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="bg-white rounded-lg shadow-md p-6 animate-pulse">
                <div className="flex items-center space-x-4">
                  <div className="h-12 w-12 bg-gray-200 rounded-md"></div>
                  <div className="flex-1">
                    <div className="h-5 bg-gray-200 rounded w-3/4 mb-3"></div>
                    <div className="h-4 bg-gray-200 rounded w-1/2 mb-3"></div>
                    <div className="h-4 bg-gray-200 rounded w-5/6"></div>
                  </div>
                </div>
                <div className="mt-4 flex space-x-2">
                  <div className="h-6 bg-gray-200 rounded w-24"></div>
                  <div className="h-6 bg-gray-200 rounded w-24"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="py-12 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-gray-900">Featured Jobs</h2>
          <p className="mt-4 text-lg text-gray-600">Explore our handpicked opportunities from top employers</p>
        </div>
        
        <div className="grid gap-6 md:grid-cols-2">
          {featuredJobs.slice(0, 6).map(job => (
            <JobCard key={job.id} job={job} featured={true} />
          ))}
        </div>
        
        <div className="mt-10 text-center">
          <Link
            to="/jobs"
            className="inline-flex items-center text-primary-600 hover:text-primary-700 font-medium"
          >
            View all jobs
            <ExternalLink className="ml-1 h-4 w-4" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default FeaturedJobs;