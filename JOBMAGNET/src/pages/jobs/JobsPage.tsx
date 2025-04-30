import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Filter, MapPin, Clock, Briefcase as BriefcaseBusiness, Tag, Search } from 'lucide-react';
import { useJobs } from '../../contexts/JobContext';
import JobCard from '../../components/shared/JobCard';
import SearchBar from '../../components/shared/SearchBar';
import { FilterOptions, Job } from '../../types';

const JobsPage: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const searchParams = new URLSearchParams(location.search);
  
  const { jobs, isLoading, filterJobs } = useJobs();
  
  // State for filter options
  const [filterOptions, setFilterOptions] = useState<FilterOptions>({
    search: searchParams.get('search') || '',
    location: searchParams.get('location') || '',
    employmentType: [],
    experienceLevel: [],
    postedWithin: undefined,
    sortBy: 'relevance'
  });
  
  // State for filter panel visibility on mobile
  const [showFilters, setShowFilters] = useState(false);
  
  // State for filtered jobs
  const [filteredJobs, setFilteredJobs] = useState<Job[]>([]);
  
  // Apply filters when filter options change
  useEffect(() => {
    const filtered = filterJobs(filterOptions);
    setFilteredJobs(filtered);
    
    // Update URL with search parameters
    const params = new URLSearchParams();
    if (filterOptions.search) params.append('search', filterOptions.search);
    if (filterOptions.location) params.append('location', filterOptions.location);
    
    navigate({
      pathname: location.pathname,
      search: params.toString()
    }, { replace: true });
  }, [filterOptions, jobs]);
  
  // Handle search bar submissions
  const handleSearch = (search: string, location: string) => {
    setFilterOptions(prev => ({
      ...prev,
      search,
      location
    }));
  };
  
  // Toggle filter for employment type
  const toggleEmploymentType = (type: string) => {
    setFilterOptions(prev => {
      const types = [...(prev.employmentType || [])];
      const index = types.indexOf(type);
      
      if (index === -1) {
        types.push(type);
      } else {
        types.splice(index, 1);
      }
      
      return {
        ...prev,
        employmentType: types
      };
    });
  };
  
  // Toggle filter for experience level
  const toggleExperienceLevel = (level: string) => {
    setFilterOptions(prev => {
      const levels = [...(prev.experienceLevel || [])];
      const index = levels.indexOf(level);
      
      if (index === -1) {
        levels.push(level);
      } else {
        levels.splice(index, 1);
      }
      
      return {
        ...prev,
        experienceLevel: levels
      };
    });
  };
  
  // Set posted within filter
  const setPostedWithin = (days: number | undefined) => {
    setFilterOptions(prev => ({
      ...prev,
      postedWithin: days
    }));
  };
  
  // Set sort order
  const setSortBy = (sortBy: 'relevance' | 'date' | 'salary') => {
    setFilterOptions(prev => ({
      ...prev,
      sortBy
    }));
  };
  
  // Reset all filters
  const resetFilters = () => {
    setFilterOptions({
      search: '',
      location: '',
      employmentType: [],
      experienceLevel: [],
      postedWithin: undefined,
      sortBy: 'relevance'
    });
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="bg-primary-700 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-white mb-6">Find Your Perfect Job</h1>
          <SearchBar 
            onSearch={handleSearch} 
            size="lg"
          />
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row gap-6">
          {/* Filter sidebar - desktop */}
          <div className="md:w-64 lg:w-72 hidden md:block">
            <div className="bg-white rounded-lg shadow-sm p-4 sticky top-20">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold">Filters</h2>
                <button
                  onClick={resetFilters}
                  className="text-sm text-primary-600 hover:text-primary-800"
                >
                  Reset
                </button>
              </div>
              
              {/* Employment Type */}
              <div className="mb-6">
                <h3 className="font-medium text-gray-900 mb-2 flex items-center">
                  <BriefcaseBusiness className="h-4 w-4 mr-2 text-gray-500" />
                  Employment Type
                </h3>
                <div className="space-y-2">
                  {['full-time', 'part-time', 'contract', 'internship', 'remote'].map(type => (
                    <label key={type} className="flex items-center">
                      <input
                        type="checkbox"
                        checked={filterOptions.employmentType?.includes(type) || false}
                        onChange={() => toggleEmploymentType(type)}
                        className="rounded text-primary-500 focus:ring-primary-500 h-4 w-4"
                      />
                      <span className="ml-2 text-gray-700 capitalize">
                        {type.replace('-', ' ')}
                      </span>
                    </label>
                  ))}
                </div>
              </div>
              
              {/* Experience Level */}
              <div className="mb-6">
                <h3 className="font-medium text-gray-900 mb-2 flex items-center">
                  <Tag className="h-4 w-4 mr-2 text-gray-500" />
                  Experience Level
                </h3>
                <div className="space-y-2">
                  {[
                    { value: 'entry', label: 'Entry Level' },
                    { value: 'intermediate', label: 'Mid Level' },
                    { value: 'senior', label: 'Senior Level' },
                    { value: 'executive', label: 'Executive' }
                  ].map(level => (
                    <label key={level.value} className="flex items-center">
                      <input
                        type="checkbox"
                        checked={filterOptions.experienceLevel?.includes(level.value) || false}
                        onChange={() => toggleExperienceLevel(level.value)}
                        className="rounded text-primary-500 focus:ring-primary-500 h-4 w-4"
                      />
                      <span className="ml-2 text-gray-700">{level.label}</span>
                    </label>
                  ))}
                </div>
              </div>
              
              {/* Date Posted */}
              <div className="mb-6">
                <h3 className="font-medium text-gray-900 mb-2 flex items-center">
                  <Clock className="h-4 w-4 mr-2 text-gray-500" />
                  Date Posted
                </h3>
                <div className="space-y-2">
                  {[
                    { value: undefined, label: 'Any time' },
                    { value: 1, label: 'Past 24 hours' },
                    { value: 7, label: 'Past week' },
                    { value: 30, label: 'Past month' }
                  ].map(option => (
                    <label key={option.label} className="flex items-center">
                      <input
                        type="radio"
                        checked={filterOptions.postedWithin === option.value}
                        onChange={() => setPostedWithin(option.value)}
                        className="rounded-full text-primary-500 focus:ring-primary-500 h-4 w-4"
                      />
                      <span className="ml-2 text-gray-700">{option.label}</span>
                    </label>
                  ))}
                </div>
              </div>
              
              {/* Sort By */}
              <div>
                <h3 className="font-medium text-gray-900 mb-2">Sort By</h3>
                <select
                  value={filterOptions.sortBy}
                  onChange={(e) => setSortBy(e.target.value as any)}
                  className="input mt-1"
                >
                  <option value="relevance">Relevance</option>
                  <option value="date">Most Recent</option>
                  <option value="salary">Salary (High to Low)</option>
                </select>
              </div>
            </div>
          </div>
          
          {/* Main content */}
          <div className="flex-1">
            {/* Mobile filter button */}
            <div className="md:hidden mb-4">
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="w-full flex items-center justify-center btn-outline py-2"
              >
                <Filter className="h-4 w-4 mr-2" />
                {showFilters ? 'Hide Filters' : 'Show Filters'}
              </button>
              
              {/* Mobile filters */}
              {showFilters && (
                <div className="bg-white rounded-lg shadow-sm p-4 mt-2">
                  <div className="flex justify-between items-center mb-4">
                    <h2 className="text-lg font-semibold">Filters</h2>
                    <button
                      onClick={resetFilters}
                      className="text-sm text-primary-600 hover:text-primary-800"
                    >
                      Reset
                    </button>
                  </div>
                  
                  {/* Employment Type */}
                  <div className="mb-6">
                    <h3 className="font-medium text-gray-900 mb-2">Employment Type</h3>
                    <div className="grid grid-cols-2 gap-2">
                      {['full-time', 'part-time', 'contract', 'internship', 'remote'].map(type => (
                        <label key={type} className="flex items-center">
                          <input
                            type="checkbox"
                            checked={filterOptions.employmentType?.includes(type) || false}
                            onChange={() => toggleEmploymentType(type)}
                            className="rounded text-primary-500 focus:ring-primary-500 h-4 w-4"
                          />
                          <span className="ml-2 text-gray-700 capitalize">
                            {type.replace('-', ' ')}
                          </span>
                        </label>
                      ))}
                    </div>
                  </div>
                  
                  {/* Experience Level */}
                  <div className="mb-6">
                    <h3 className="font-medium text-gray-900 mb-2">Experience Level</h3>
                    <div className="grid grid-cols-2 gap-2">
                      {[
                        { value: 'entry', label: 'Entry Level' },
                        { value: 'intermediate', label: 'Mid Level' },
                        { value: 'senior', label: 'Senior Level' },
                        { value: 'executive', label: 'Executive' }
                      ].map(level => (
                        <label key={level.value} className="flex items-center">
                          <input
                            type="checkbox"
                            checked={filterOptions.experienceLevel?.includes(level.value) || false}
                            onChange={() => toggleExperienceLevel(level.value)}
                            className="rounded text-primary-500 focus:ring-primary-500 h-4 w-4"
                          />
                          <span className="ml-2 text-gray-700">{level.label}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                  
                  {/* Date Posted */}
                  <div className="mb-6">
                    <h3 className="font-medium text-gray-900 mb-2">Date Posted</h3>
                    <div className="grid grid-cols-2 gap-2">
                      {[
                        { value: undefined, label: 'Any time' },
                        { value: 1, label: 'Past 24 hours' },
                        { value: 7, label: 'Past week' },
                        { value: 30, label: 'Past month' }
                      ].map(option => (
                        <label key={option.label} className="flex items-center">
                          <input
                            type="radio"
                            checked={filterOptions.postedWithin === option.value}
                            onChange={() => setPostedWithin(option.value)}
                            className="rounded-full text-primary-500 focus:ring-primary-500 h-4 w-4"
                          />
                          <span className="ml-2 text-gray-700">{option.label}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                  
                  {/* Sort By */}
                  <div>
                    <h3 className="font-medium text-gray-900 mb-2">Sort By</h3>
                    <select
                      value={filterOptions.sortBy}
                      onChange={(e) => setSortBy(e.target.value as any)}
                      className="input mt-1 w-full"
                    >
                      <option value="relevance">Relevance</option>
                      <option value="date">Most Recent</option>
                      <option value="salary">Salary (High to Low)</option>
                    </select>
                  </div>
                </div>
              )}
            </div>
            
            {/* Results info */}
            <div className="bg-white rounded-lg shadow-sm p-4 mb-4 flex justify-between items-center">
              <div>
                <p className="text-gray-700">
                  {isLoading 
                    ? 'Loading jobs...' 
                    : `Showing ${filteredJobs.length} jobs`}
                </p>
              </div>
              <div className="hidden md:block">
                <select
                  value={filterOptions.sortBy}
                  onChange={(e) => setSortBy(e.target.value as any)}
                  className="input py-1 px-2 text-sm"
                >
                  <option value="relevance">Relevance</option>
                  <option value="date">Most Recent</option>
                  <option value="salary">Salary (High to Low)</option>
                </select>
              </div>
            </div>
            
            {/* Job listings */}
            {isLoading ? (
              <div className="space-y-4">
                {[...Array(5)].map((_, i) => (
                  <div key={i} className="bg-white rounded-lg shadow-sm p-6 animate-pulse">
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
            ) : filteredJobs.length > 0 ? (
              <div className="space-y-4">
                {filteredJobs.map(job => (
                  <JobCard key={job.id} job={job} />
                ))}
              </div>
            ) : (
              <div className="bg-white rounded-lg shadow-sm p-8 text-center">
                <Search className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-800 mb-2">No jobs found</h3>
                <p className="text-gray-600 mb-6">
                  We couldn't find any jobs matching your search criteria.
                </p>
                <button
                  onClick={resetFilters}
                  className="btn-primary"
                >
                  Reset Filters
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobsPage;