import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Clock, Briefcase, DollarSign } from 'lucide-react';
import { Job } from '../../types';
import { formatDistanceToNow } from 'date-fns';

interface JobCardProps {
  job: Job;
  featured?: boolean;
}

const JobCard: React.FC<JobCardProps> = ({ job, featured = false }) => {
  const timeAgo = formatDistanceToNow(new Date(job.postedDate), { addSuffix: true });
  
  // Extract employmentType and experienceLevel for badges
  const getEmploymentTypeLabel = (type: string) => {
    switch (type) {
      case 'full-time': return 'Full-time';
      case 'part-time': return 'Part-time';
      case 'contract': return 'Contract';
      case 'internship': return 'Internship';
      case 'remote': return 'Remote';
      default: return type;
    }
  };
  
  const getExperienceLevelLabel = (level: string) => {
    switch (level) {
      case 'entry': return 'Entry Level';
      case 'intermediate': return 'Mid Level';
      case 'senior': return 'Senior Level';
      case 'executive': return 'Executive';
      default: return level;
    }
  };

  return (
    <div className={`card p-4 ${featured ? 'border-l-4 border-primary-500' : ''}`}>
      {featured && (
        <div className="flex justify-end mb-2">
          <span className="badge-primary">Featured</span>
        </div>
      )}
      
      <div className="flex items-start">
        {job.companyLogo ? (
          <div className="flex-shrink-0 mr-4">
            <img
              src={job.companyLogo}
              alt={`${job.company} logo`}
              className="w-12 h-12 object-contain rounded"
            />
          </div>
        ) : (
          <div className="flex-shrink-0 w-12 h-12 bg-gray-200 rounded mr-4 flex items-center justify-center">
            <Briefcase className="h-6 w-6 text-gray-500" />
          </div>
        )}
        
        <div className="flex-1">
          <Link to={`/jobs/${job.id}`}>
            <h3 className="text-lg font-semibold text-gray-900 hover:text-primary-600 transition-colors">
              {job.title}
            </h3>
          </Link>
          
          <p className="text-gray-700 mb-2">{job.company}</p>
          
          <div className="flex flex-wrap items-center text-gray-500 text-sm gap-y-1">
            <div className="flex items-center mr-4">
              <MapPin className="h-4 w-4 mr-1" />
              <span>{job.location}</span>
            </div>
            
            {job.salary && (
              <div className="flex items-center mr-4">
                <DollarSign className="h-4 w-4 mr-1" />
                <span>{job.salary}</span>
              </div>
            )}
            
            <div className="flex items-center">
              <Clock className="h-4 w-4 mr-1" />
              <span>{timeAgo}</span>
            </div>
          </div>
          
          <div className="mt-3 flex flex-wrap gap-2">
            <span className="badge-secondary">
              {getEmploymentTypeLabel(job.employmentType)}
            </span>
            <span className="badge-accent">
              {getExperienceLevelLabel(job.experienceLevel)}
            </span>
            {job.skills.slice(0, 2).map((skill, index) => (
              <span key={index} className="badge bg-gray-100 text-gray-800">
                {skill}
              </span>
            ))}
            {job.skills.length > 2 && (
              <span className="badge bg-gray-100 text-gray-800">
                +{job.skills.length - 2}
              </span>
            )}
          </div>
        </div>
        
        <div className="ml-4 hidden sm:block">
          <Link 
            to={`/jobs/${job.id}`}
            className="btn-primary"
          >
            View
          </Link>
        </div>
      </div>
    </div>
  );
};

export default JobCard;