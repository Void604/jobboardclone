import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useJobs } from '../../contexts/JobContext';
import { useAuth } from '../../contexts/AuthContext';
import { Job } from '../../types';
import { ArrowLeft, Info, Plus, X } from 'lucide-react';

const PostJobPage: React.FC = () => {
  const navigate = useNavigate();
  const { createJob } = useJobs();
  const { user, isAuthenticated } = useAuth();
  
  const [formData, setFormData] = useState<Partial<Job>>({
    title: '',
    company: user?.role === 'employer' ? (user as any).company || '' : '',
    location: '',
    salary: '',
    employmentType: 'full-time',
    experienceLevel: 'entry',
    description: '',
    requirements: [''],
    responsibilities: [''],
    skills: [''],
    expiryDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    status: 'active',
    featured: false
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  
  // Redirect to login if not authenticated or not an employer
  React.useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login', { state: { from: '/post-job' } });
    } else if (user?.role !== 'employer') {
      navigate('/dashboard', { state: { message: 'Only employers can post jobs' } });
    }
  }, [isAuthenticated, user, navigate]);
  
  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.title) newErrors.title = 'Job title is required';
    if (!formData.company) newErrors.company = 'Company name is required';
    if (!formData.location) newErrors.location = 'Location is required';
    if (!formData.description) newErrors.description = 'Job description is required';
    
    if (formData.requirements?.some(req => !req.trim())) {
      newErrors.requirements = 'All requirements must be filled or removed';
    }
    
    if (formData.responsibilities?.some(resp => !resp.trim())) {
      newErrors.responsibilities = 'All responsibilities must be filled or removed';
    }
    
    if (formData.skills?.some(skill => !skill.trim())) {
      newErrors.skills = 'All skills must be filled or removed';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    try {
      setIsSubmitting(true);
      
      // Filter out empty values from arrays
      const filteredData = {
        ...formData,
        requirements: formData.requirements?.filter(req => req.trim()) || [],
        responsibilities: formData.responsibilities?.filter(resp => resp.trim()) || [],
        skills: formData.skills?.filter(skill => skill.trim()) || [],
        employerId: user?.id || ''
      };
      
      await createJob(filteredData);
      navigate('/dashboard', { state: { message: 'Job posted successfully!' } });
    } catch (error) {
      console.error('Failed to post job:', error);
    } finally {
      setIsSubmitting(false);
    }
  };
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: checked
    }));
  };
  
  const handleArrayChange = (
    arrayName: 'requirements' | 'responsibilities' | 'skills',
    index: number,
    value: string
  ) => {
    setFormData(prev => {
      const array = [...(prev[arrayName] || [])];
      array[index] = value;
      return { ...prev, [arrayName]: array };
    });
  };
  
  const addArrayItem = (arrayName: 'requirements' | 'responsibilities' | 'skills') => {
    setFormData(prev => {
      const array = [...(prev[arrayName] || []), ''];
      return { ...prev, [arrayName]: array };
    });
  };
  
  const removeArrayItem = (
    arrayName: 'requirements' | 'responsibilities' | 'skills',
    index: number
  ) => {
    setFormData(prev => {
      const array = [...(prev[arrayName] || [])];
      array.splice(index, 1);
      return { ...prev, [arrayName]: array };
    });
  };

  return (
    <div className="bg-gray-50 min-h-screen py-8">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back button */}
        <div className="mb-6">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center text-gray-600 hover:text-gray-900"
          >
            <ArrowLeft className="h-4 w-4 mr-1" />
            Back
          </button>
        </div>
        
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-6">Post a New Job</h1>
          
          <form onSubmit={handleSubmit}>
            <div className="space-y-6">
              {/* Basic Information */}
              <div>
                <h2 className="text-lg font-semibold text-gray-900 mb-4">Basic Information</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="title" className="label">
                      Job Title*
                    </label>
                    <input
                      type="text"
                      id="title"
                      name="title"
                      value={formData.title}
                      onChange={handleChange}
                      className={`input ${errors.title ? 'border-red-500' : ''}`}
                      placeholder="e.g. Senior Frontend Developer"
                    />
                    {errors.title && (
                      <p className="mt-1 text-sm text-red-500">{errors.title}</p>
                    )}
                  </div>
                  
                  <div>
                    <label htmlFor="company" className="label">
                      Company Name*
                    </label>
                    <input
                      type="text"
                      id="company"
                      name="company"
                      value={formData.company}
                      onChange={handleChange}
                      className={`input ${errors.company ? 'border-red-500' : ''}`}
                      placeholder="e.g. Acme Inc."
                    />
                    {errors.company && (
                      <p className="mt-1 text-sm text-red-500">{errors.company}</p>
                    )}
                  </div>
                  
                  <div>
                    <label htmlFor="location" className="label">
                      Location*
                    </label>
                    <input
                      type="text"
                      id="location"
                      name="location"
                      value={formData.location}
                      onChange={handleChange}
                      className={`input ${errors.location ? 'border-red-500' : ''}`}
                      placeholder="e.g. New York, NY (Remote)"
                    />
                    {errors.location && (
                      <p className="mt-1 text-sm text-red-500">{errors.location}</p>
                    )}
                  </div>
                  
                  <div>
                    <label htmlFor="salary" className="label">
                      Salary Range
                    </label>
                    <input
                      type="text"
                      id="salary"
                      name="salary"
                      value={formData.salary}
                      onChange={handleChange}
                      className="input"
                      placeholder="e.g. $80,000 - $100,000"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="employmentType" className="label">
                      Employment Type*
                    </label>
                    <select
                      id="employmentType"
                      name="employmentType"
                      value={formData.employmentType}
                      onChange={handleChange}
                      className="input"
                    >
                      <option value="full-time">Full-time</option>
                      <option value="part-time">Part-time</option>
                      <option value="contract">Contract</option>
                      <option value="internship">Internship</option>
                      <option value="remote">Remote</option>
                    </select>
                  </div>
                  
                  <div>
                    <label htmlFor="experienceLevel" className="label">
                      Experience Level*
                    </label>
                    <select
                      id="experienceLevel"
                      name="experienceLevel"
                      value={formData.experienceLevel}
                      onChange={handleChange}
                      className="input"
                    >
                      <option value="entry">Entry Level</option>
                      <option value="intermediate">Mid Level</option>
                      <option value="senior">Senior Level</option>
                      <option value="executive">Executive</option>
                    </select>
                  </div>
                  
                  <div>
                    <label htmlFor="expiryDate" className="label">
                      Expires On*
                    </label>
                    <input
                      type="date"
                      id="expiryDate"
                      name="expiryDate"
                      value={formData.expiryDate}
                      onChange={handleChange}
                      className="input"
                      min={new Date().toISOString().split('T')[0]}
                    />
                  </div>
                  
                  <div className="md:col-span-2">
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        id="featured"
                        name="featured"
                        checked={formData.featured}
                        onChange={handleCheckboxChange}
                        className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                      />
                      <label htmlFor="featured" className="ml-2 block text-sm text-gray-700">
                        Feature this job (highlighted in search results)
                      </label>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Description */}
              <div>
                <label htmlFor="description" className="label">
                  Job Description*
                </label>
                <textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  rows={6}
                  className={`input ${errors.description ? 'border-red-500' : ''}`}
                  placeholder="Describe the job role, responsibilities, and company culture..."
                />
                {errors.description && (
                  <p className="mt-1 text-sm text-red-500">{errors.description}</p>
                )}
              </div>
              
              {/* Requirements */}
              <div>
                <div className="flex justify-between items-center mb-4">
                  <label className="text-sm font-medium text-gray-700">
                    Requirements*
                  </label>
                  <button
                    type="button"
                    onClick={() => addArrayItem('requirements')}
                    className="flex items-center text-sm text-primary-600 hover:text-primary-700"
                  >
                    <Plus className="h-4 w-4 mr-1" />
                    Add Requirement
                  </button>
                </div>
                
                {formData.requirements?.map((requirement, index) => (
                  <div key={index} className="flex space-x-2 mb-2">
                    <input
                      type="text"
                      value={requirement}
                      onChange={(e) => handleArrayChange('requirements', index, e.target.value)}
                      className="input flex-1"
                      placeholder="e.g. 3+ years of experience with React"
                    />
                    <button
                      type="button"
                      onClick={() => removeArrayItem('requirements', index)}
                      className="p-2 text-gray-400 hover:text-gray-600"
                      disabled={formData.requirements?.length === 1}
                    >
                      <X className="h-5 w-5" />
                    </button>
                  </div>
                ))}
                
                {errors.requirements && (
                  <p className="mt-1 text-sm text-red-500">{errors.requirements}</p>
                )}
              </div>
              
              {/* Responsibilities */}
              <div>
                <div className="flex justify-between items-center mb-4">
                  <label className="text-sm font-medium text-gray-700">
                    Responsibilities*
                  </label>
                  <button
                    type="button"
                    onClick={() => addArrayItem('responsibilities')}
                    className="flex items-center text-sm text-primary-600 hover:text-primary-700"
                  >
                    <Plus className="h-4 w-4 mr-1" />
                    Add Responsibility
                  </button>
                </div>
                
                {formData.responsibilities?.map((responsibility, index) => (
                  <div key={index} className="flex space-x-2 mb-2">
                    <input
                      type="text"
                      value={responsibility}
                      onChange={(e) => handleArrayChange('responsibilities', index, e.target.value)}
                      className="input flex-1"
                      placeholder="e.g. Design and implement user interfaces"
                    />
                    <button
                      type="button"
                      onClick={() => removeArrayItem('responsibilities', index)}
                      className="p-2 text-gray-400 hover:text-gray-600"
                      disabled={formData.responsibilities?.length === 1}
                    >
                      <X className="h-5 w-5" />
                    </button>
                  </div>
                ))}
                
                {errors.responsibilities && (
                  <p className="mt-1 text-sm text-red-500">{errors.responsibilities}</p>
                )}
              </div>
              
              {/* Skills */}
              <div>
                <div className="flex justify-between items-center mb-4">
                  <label className="text-sm font-medium text-gray-700">
                    Required Skills*
                  </label>
                  <button
                    type="button"
                    onClick={() => addArrayItem('skills')}
                    className="flex items-center text-sm text-primary-600 hover:text-primary-700"
                  >
                    <Plus className="h-4 w-4 mr-1" />
                    Add Skill
                  </button>
                </div>
                
                {formData.skills?.map((skill, index) => (
                  <div key={index} className="flex space-x-2 mb-2">
                    <input
                      type="text"
                      value={skill}
                      onChange={(e) => handleArrayChange('skills', index, e.target.value)}
                      className="input flex-1"
                      placeholder="e.g. JavaScript"
                    />
                    <button
                      type="button"
                      onClick={() => removeArrayItem('skills', index)}
                      className="p-2 text-gray-400 hover:text-gray-600"
                      disabled={formData.skills?.length === 1}
                    >
                      <X className="h-5 w-5" />
                    </button>
                  </div>
                ))}
                
                {errors.skills && (
                  <p className="mt-1 text-sm text-red-500">{errors.skills}</p>
                )}
              </div>
              
              {/* Information note */}
              <div className="bg-blue-50 p-4 rounded-md flex">
                <Info className="h-5 w-5 text-blue-500 mr-2 flex-shrink-0 mt-0.5" />
                <div className="text-sm text-blue-700">
                  <p className="font-medium">Important information:</p>
                  <ul className="list-disc pl-5 mt-1 space-y-1">
                    <li>Your job posting will be live for 30 days or until the expiry date.</li>
                    <li>Featured jobs appear at the top of search results and cost additional credits.</li>
                    <li>You can edit or close this job at any time from your dashboard.</li>
                  </ul>
                </div>
              </div>
              
              {/* Submit buttons */}
              <div className="flex justify-end space-x-4">
                <button
                  type="button"
                  onClick={() => navigate(-1)}
                  className="btn-outline"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn-primary"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Posting...' : 'Post Job'}
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default PostJobPage;