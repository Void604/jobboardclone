export type UserRole = 'jobseeker' | 'employer' | 'admin';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  profilePicture?: string;
  createdAt: string;
}

export interface JobSeeker extends User {
  role: 'jobseeker';
  resume?: string;
  skills: string[];
  education: Education[];
  experience: Experience[];
  applications: string[]; // IDs of applied jobs
}

export interface Employer extends User {
  role: 'employer';
  company: string;
  companyLogo?: string;
  industry: string;
  location: string;
  about: string;
  website?: string;
  jobsPosted: string[]; // IDs of posted jobs
}

export interface Admin extends User {
  role: 'admin';
  permissions: string[];
}

export interface Education {
  id: string;
  institution: string;
  degree: string;
  field: string;
  startDate: string;
  endDate?: string;
  current: boolean;
  description?: string;
}

export interface Experience {
  id: string;
  company: string;
  position: string;
  location: string;
  startDate: string;
  endDate?: string;
  current: boolean;
  description?: string;
}

export interface Job {
  id: string;
  title: string;
  company: string;
  companyLogo?: string;
  location: string;
  salary?: string;
  employmentType: 'full-time' | 'part-time' | 'contract' | 'internship' | 'remote';
  experienceLevel: 'entry' | 'intermediate' | 'senior' | 'executive';
  description: string;
  requirements: string[];
  responsibilities: string[];
  skills: string[];
  employerId: string;
  postedDate: string;
  expiryDate: string;
  applicants: string[]; // IDs of applicants
  status: 'active' | 'closed' | 'draft';
  featured: boolean;
}

export interface Application {
  id: string;
  jobId: string;
  jobseekerId: string;
  appliedDate: string;
  resume: string;
  coverLetter?: string;
  status: 'pending' | 'reviewed' | 'shortlisted' | 'rejected' | 'hired';
  notes?: string;
}

export interface Notification {
  id: string;
  userId: string;
  title: string;
  message: string;
  type: 'info' | 'success' | 'warning' | 'error';
  read: boolean;
  createdAt: string;
  link?: string;
}

export interface FilterOptions {
  search?: string;
  location?: string;
  employmentType?: string[];
  experienceLevel?: string[];
  salary?: {
    min?: number;
    max?: number;
  };
  skills?: string[];
  postedWithin?: number; // days
  sortBy?: 'relevance' | 'date' | 'salary';
}