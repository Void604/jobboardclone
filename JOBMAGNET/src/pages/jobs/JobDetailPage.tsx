import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { 
  MapPin, 
  Calendar, 
  DollarSign, 
  Briefcase, 
  Share2,
  BookmarkPlus,
  Flag,
  ArrowLeft,
  Building,
  Clock
} from 'lucide-react';
import { useJobs } from '../../contexts/JobContext';
import { useAuth } from '../../contexts/AuthContext';
import { formatDistanceToNow, format } from 'date-fns';

const JobDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { getJobById, applyToJob, isLoading } = useJobs();
  const { user, isAuthenticated } = useAuth();
  
  const [isApplying, setIsApplying] = useState(false);
  const [coverLetter, setCoverLetter] = useState('');
  const [applicationSuccess, setApplicationSuccess] = useState(false);
  
  const job = getJobById(id || '');
  
  if (isLoading) {
    return (
      <div className="bg-gray-50 min-h-screen py-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white p-8 rounded-lg shadow-sm animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-3/4 mb-6"></div>
            <div className="h-5 bg-gray-200 rounded w-1/2 mb-6"></div>
            <div className="h-64 bg-gray-200 rounded mb-6"></div>
            <div className="h-8 bg-gray-200 rounded w-1/3 mb-4"></div>
            <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
            <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
            <div className="h-4 bg-gray-200 rounded w-3/4"></div>
          </div>
        </div>
      </div>
    );
  }
  
  if (!job) {
    return (
      <div className="bg-gray-50 min-h-screen py-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white p-8 rounded-lg shadow-sm text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">Job Not Found</h1>
            <p className="text-gray-600 mb-6">
              The job you're looking for doesn't exist or has been removed.
            </p>
            <Link to="/jobs" className="btn-primary">
              Browse All Jobs
            </Link>
          </div>
        </div>
      </div>
    );
  }
  
  const timeAgo = formatDistanceToNow(new Date(job.postedDate), { addSuffix: true });
  const expiryDate = format(new Date(job.expiryDate), 'MMM dd, yyyy');
  
  const hasApplied = user && job.applicants.includes(user.id);
  
  const handleApply = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user || !isAuthenticated) {
      navigate('/login', { state: { from: `/jobs/${job.id}` } });
      return;
    }
    
    try {
      setIsApplying(true);
      await applyToJob(job.id, user.id, {
        coverLetter
      });
      setApplicationSuccess(true);
    } catch (error) {
      console.error('Failed to apply:', error);
    } finally {
      setIsApplying(false);
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back button */}
        <div className="mb-6">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center text-gray-600 hover:text-gray-900"
          >
            <ArrowLeft className="h-4 w-4 mr-1" />
            Back to jobs
          </button>
        </div>
        
        {/* Job header */}
        <div className="bg-white p-6 rounded-lg shadow-sm mb-6">
          <div className="flex flex-col md:flex-row md:items-start">
            {job.companyLogo ? (
              <div className="flex-shrink-0 mb-4 md:mb-0 md:mr-6">
                <img
                  src={job.companyLogo}
                  alt={`${job.company} logo`}
                  className="w-16 h-16 object-contain rounded"
                />
              </div>
            ) : (
              <div className="flex-shrink-0 w-16 h-16 bg-gray-200 rounded mb-4 md:mb-0 md:mr-6 flex items-center justify-center">
                <Building className="h-8 w-8 text-gray-500" />
              </div>
            )}
            
            <div className="flex-1">
              <div className="flex flex-wrap justify-between items-start">
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">{job.title}</h1>
                  <p className="text-lg text-gray-700 mb-2">{job.company}</p>
                  
                  <div className="flex flex-wrap items-center text-gray-600 text-sm gap-y-1">
                    <div className="flex items-center mr-4">
                      <MapPin className="h-4 w-4 mr-1" />
                      <span>{job.location}</span>
                    </div>
                    
                    <div className="flex items-center mr-4">
                      <Clock className="h-4 w-4 mr-1" />
                      <span>Posted {timeAgo}</span>
                    </div>
                    
                    {job.salary && (
                      <div className="flex items-center mr-4">
                        <DollarSign className="h-4 w-4 mr-1" />
                        <span>{job.salary}</span>
                      </div>
                    )}
                    
                    <div className="flex items-center mr-4">
                      <Calendar className="h-4 w-4 mr-1" />
                      <span>Apply by {expiryDate}</span>
                    </div>
                    
                    <div className="flex items-center">
                      <Briefcase className="h-4 w-4 mr-1" />
                      <span className="capitalize">{job.employmentType.replace('-', ' ')}</span>
                    </div>
                  </div>
                </div>
                
                <div className="mt-4 md:mt-0 flex space-x-2">
                  <button className="btn-outline p-2" title="Share">
                    <Share2 className="h-5 w-5" />
                  </button>
                  <button className="btn-outline p-2" title="Save">
                    <BookmarkPlus className="h-5 w-5" />
                  </button>
                  <button className="btn-outline p-2" title="Report">
                    <Flag className="h-5 w-5" />
                  </button>
                </div>
              </div>
              
              <div className="mt-4 flex flex-wrap gap-2">
                <span className={`badge ${
                  job.employmentType === 'full-time' ? 'badge-primary' :
                  job.employmentType === 'part-time' ? 'badge-secondary' :
                  job.employmentType === 'contract' ? 'badge-accent' :
                  job.employmentType === 'internship' ? 'badge-success' :
                  'badge-warning'
                }`}>
                  {job.employmentType.replace('-', ' ')}
                </span>
                
                <span className="badge bg-gray-100 text-gray-800">
                  {job.experienceLevel === 'entry' ? 'Entry Level' :
                   job.experienceLevel === 'intermediate' ? 'Mid Level' :
                   job.experienceLevel === 'senior' ? 'Senior Level' :
                   'Executive'}
                </span>
                
                {job.featured && (
                  <span className="badge-primary">
                    Featured
                  </span>
                )}
              </div>
              
              {/* Apply button */}
              {job.status === 'active' && (
                <div className="mt-6">
                  {applicationSuccess ? (
                    <div className="bg-green-50 text-green-800 p-4 rounded-md">
                      <p className="font-medium">Application submitted successfully!</p>
                      <p className="text-sm mt-1">The employer will review your application and get back to you soon.</p>
                    </div>
                  ) : hasApplied ? (
                    <div className="bg-blue-50 text-blue-800 p-4 rounded-md">
                      <p className="font-medium">You have already applied for this job</p>
                      <p className="text-sm mt-1">You can check the status of your application in your dashboard.</p>
                    </div>
                  ) : (
                    <button
                      onClick={() => user && isAuthenticated ? window.scrollTo({top: document.body.scrollHeight, behavior: 'smooth'}) : navigate('/login')}
                      className="btn-primary"
                    >
                      Apply Now
                    </button>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
        
        {/* Job description */}
        <div className="bg-white p-6 rounded-lg shadow-sm mb-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Job Description</h2>
          <div className="prose max-w-none text-gray-700">
            <p className="mb-6">{job.description}</p>
          </div>
        </div>
        
        {/* Job requirements */}
        <div className="bg-white p-6 rounded-lg shadow-sm mb-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Requirements</h2>
          <ul className="list-disc pl-5 space-y-2 text-gray-700">
            {job.requirements.map((requirement, index) => (
              <li key={index}>{requirement}</li>
            ))}
          </ul>
        </div>
        
        {/* Job responsibilities */}
        <div className="bg-white p-6 rounded-lg shadow-sm mb-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Responsibilities</h2>
          <ul className="list-disc pl-5 space-y-2 text-gray-700">
            {job.responsibilities.map((responsibility, index) => (
              <li key={index}>{responsibility}</li>
            ))}
          </ul>
        </div>
        
        {/* Skills */}
        <div className="bg-white p-6 rounded-lg shadow-sm mb-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Skills</h2>
          <div className="flex flex-wrap gap-2">
            {job.skills.map((skill, index) => (
              <span key={index} className="badge bg-gray-100 text-gray-800">
                {skill}
              </span>
            ))}
          </div>
        </div>
        
        {/* Application form */}
        {job.status === 'active' && !applicationSuccess && !hasApplied && isAuthenticated && (
          <div className="bg-white p-6 rounded-lg shadow-sm mb-6" id="apply-form">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Apply for this Position</h2>
            
            <form onSubmit={handleApply}>
              <div className="mb-4">
                <label htmlFor="cover-letter" className="label">
                  Cover Letter (Optional)
                </label>
                <textarea
                  id="cover-letter"
                  rows={6}
                  value={coverLetter}
                  onChange={(e) => setCoverLetter(e.target.value)}
                  className="input"
                  placeholder="Introduce yourself and explain why you're a good fit for this position..."
                />
              </div>
              
              <div className="mb-6">
                <label className="label">Resume/CV</label>
                <div className="border border-gray-300 rounded-md p-4 bg-gray-50">
                  <p className="text-gray-700">Your latest resume will be used: <strong>resume.pdf</strong></p>
                  <p className="text-sm text-gray-500 mt-1">
                    You can update your resume in your profile settings.
                  </p>
                </div>
              </div>
              
              <button
                type="submit"
                className="btn-primary w-full sm:w-auto"
                disabled={isApplying}
              >
                {isApplying ? 'Submitting Application...' : 'Submit Application'}
              </button>
            </form>
          </div>
        )}
        
        {/* Similar jobs */}
        <div className="mt-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Similar Jobs</h2>
          <p className="text-gray-600">
            Looking for more opportunities like this one? 
            <Link to="/jobs" className="text-primary-600 hover:text-primary-700 ml-1">
              Browse all jobs
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default JobDetailPage;