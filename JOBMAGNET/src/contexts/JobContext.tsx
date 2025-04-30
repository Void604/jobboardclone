import React, { createContext, useContext, useState, useEffect } from 'react';
import { Job, FilterOptions, Application } from '../types';
import { mockJobs, mockApplications } from '../data/mockData';

interface JobContextType {
  jobs: Job[];
  featuredJobs: Job[];
  recentJobs: Job[];
  isLoading: boolean;
  error: string | null;
  getJobById: (id: string) => Job | undefined;
  getJobsByEmployer: (employerId: string) => Job[];
  getApplicationsForJob: (jobId: string) => Application[];
  getApplicationsByJobseeker: (jobseekerId: string) => Application[];
  filterJobs: (options: FilterOptions) => Job[];
  applyToJob: (jobId: string, jobseekerId: string, application: Partial<Application>) => Promise<void>;
  createJob: (job: Partial<Job>) => Promise<void>;
  updateJob: (id: string, updates: Partial<Job>) => Promise<void>;
}

const JobContext = createContext<JobContextType | undefined>(undefined);

export const JobProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [applications, setApplications] = useState<Application[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Simulate fetching jobs from API
    const fetchJobs = async () => {
      try {
        setIsLoading(true);
        // Simulate API call delay
        await new Promise(resolve => setTimeout(resolve, 800));
        
        setJobs(mockJobs);
        setApplications(mockApplications);
        setError(null);
      } catch (err) {
        setError('Failed to fetch jobs');
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchJobs();
  }, []);

  const featuredJobs = jobs.filter(job => job.featured && job.status === 'active');
  
  const recentJobs = [...jobs]
    .filter(job => job.status === 'active')
    .sort((a, b) => new Date(b.postedDate).getTime() - new Date(a.postedDate).getTime())
    .slice(0, 6);

  const getJobById = (id: string) => {
    return jobs.find(job => job.id === id);
  };

  const getJobsByEmployer = (employerId: string) => {
    return jobs.filter(job => job.employerId === employerId);
  };

  const getApplicationsForJob = (jobId: string) => {
    return applications.filter(app => app.jobId === jobId);
  };

  const getApplicationsByJobseeker = (jobseekerId: string) => {
    return applications.filter(app => app.jobseekerId === jobseekerId);
  };

  const filterJobs = (options: FilterOptions) => {
    let filteredJobs = [...jobs].filter(job => job.status === 'active');
    
    if (options.search) {
      const searchTerm = options.search.toLowerCase();
      filteredJobs = filteredJobs.filter(job => 
        job.title.toLowerCase().includes(searchTerm) || 
        job.company.toLowerCase().includes(searchTerm) ||
        job.description.toLowerCase().includes(searchTerm)
      );
    }
    
    if (options.location) {
      const locationTerm = options.location.toLowerCase();
      filteredJobs = filteredJobs.filter(job => 
        job.location.toLowerCase().includes(locationTerm)
      );
    }
    
    if (options.employmentType && options.employmentType.length > 0) {
      filteredJobs = filteredJobs.filter(job => 
        options.employmentType?.includes(job.employmentType)
      );
    }
    
    if (options.experienceLevel && options.experienceLevel.length > 0) {
      filteredJobs = filteredJobs.filter(job => 
        options.experienceLevel?.includes(job.experienceLevel)
      );
    }
    
    if (options.skills && options.skills.length > 0) {
      filteredJobs = filteredJobs.filter(job => 
        options.skills?.some(skill => job.skills.includes(skill))
      );
    }
    
    if (options.postedWithin) {
      const cutoffDate = new Date();
      cutoffDate.setDate(cutoffDate.getDate() - options.postedWithin);
      
      filteredJobs = filteredJobs.filter(job => 
        new Date(job.postedDate) >= cutoffDate
      );
    }
    
    // Sort
    if (options.sortBy) {
      switch (options.sortBy) {
        case 'date':
          filteredJobs.sort((a, b) => new Date(b.postedDate).getTime() - new Date(a.postedDate).getTime());
          break;
        case 'salary':
          // This is a simplistic approach - in a real app we'd parse the salary ranges properly
          filteredJobs.sort((a, b) => {
            if (!a.salary) return 1;
            if (!b.salary) return -1;
            return b.salary.localeCompare(a.salary);
          });
          break;
        // 'relevance' would typically involve more complex scoring
        default:
          break;
      }
    }
    
    return filteredJobs;
  };

  const applyToJob = async (jobId: string, jobseekerId: string, application: Partial<Application>) => {
    try {
      setIsLoading(true);
      
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 800));
      
      // Check if already applied
      const existingApplication = applications.find(
        app => app.jobId === jobId && app.jobseekerId === jobseekerId
      );
      
      if (existingApplication) {
        throw new Error('You have already applied for this job');
      }
      
      // Create new application
      const newApplication: Application = {
        id: `app-${Date.now()}`,
        jobId,
        jobseekerId,
        appliedDate: new Date().toISOString(),
        resume: application.resume || 'default_resume.pdf',
        coverLetter: application.coverLetter,
        status: 'pending',
        notes: ''
      };
      
      setApplications(prev => [...prev, newApplication]);
      
      // Update job applicants
      setJobs(prev => prev.map(job => {
        if (job.id === jobId) {
          return {
            ...job,
            applicants: [...job.applicants, jobseekerId]
          };
        }
        return job;
      }));
      
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to apply for job');
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const createJob = async (job: Partial<Job>) => {
    try {
      setIsLoading(true);
      
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 800));
      
      // Create new job
      const newJob: Job = {
        id: `job-${Date.now()}`,
        title: job.title || 'Untitled Position',
        company: job.company || '',
        companyLogo: job.companyLogo,
        location: job.location || 'Remote',
        salary: job.salary,
        employmentType: job.employmentType || 'full-time',
        experienceLevel: job.experienceLevel || 'entry',
        description: job.description || '',
        requirements: job.requirements || [],
        responsibilities: job.responsibilities || [],
        skills: job.skills || [],
        employerId: job.employerId || '',
        postedDate: new Date().toISOString(),
        expiryDate: job.expiryDate || new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
        applicants: [],
        status: job.status || 'active',
        featured: job.featured || false
      };
      
      setJobs(prev => [...prev, newJob]);
      
    } catch (err) {
      setError('Failed to create job');
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const updateJob = async (id: string, updates: Partial<Job>) => {
    try {
      setIsLoading(true);
      
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 800));
      
      setJobs(prev => prev.map(job => {
        if (job.id === id) {
          return { ...job, ...updates };
        }
        return job;
      }));
      
    } catch (err) {
      setError('Failed to update job');
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <JobContext.Provider
      value={{
        jobs,
        featuredJobs,
        recentJobs,
        isLoading,
        error,
        getJobById,
        getJobsByEmployer,
        getApplicationsForJob,
        getApplicationsByJobseeker,
        filterJobs,
        applyToJob,
        createJob,
        updateJob
      }}
    >
      {children}
    </JobContext.Provider>
  );
};

export const useJobs = () => {
  const context = useContext(JobContext);
  if (context === undefined) {
    throw new Error('useJobs must be used within a JobProvider');
  }
  return context;
};