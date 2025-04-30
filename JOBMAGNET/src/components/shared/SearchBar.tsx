import React, { useState } from 'react';
import { Search, MapPin, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface SearchBarProps {
  onSearch?: (search: string, location: string) => void;
  size?: 'sm' | 'lg';
  className?: string;
}

const SearchBar: React.FC<SearchBarProps> = ({ 
  onSearch, 
  size = 'lg',
  className = ''
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [location, setLocation] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (onSearch) {
      onSearch(searchTerm, location);
    } else {
      // If no onSearch prop, navigate to jobs page with query params
      const params = new URLSearchParams();
      if (searchTerm) params.append('search', searchTerm);
      if (location) params.append('location', location);
      
      navigate({
        pathname: '/jobs',
        search: params.toString()
      });
    }
  };

  const clearSearch = () => {
    setSearchTerm('');
  };

  const clearLocation = () => {
    setLocation('');
  };

  return (
    <form onSubmit={handleSubmit} className={`w-full ${className}`}>
      <div className={`flex flex-col md:flex-row ${size === 'lg' ? 'gap-3' : 'gap-2'}`}>
        <div className="relative flex-1">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className={`${size === 'lg' ? 'h-5 w-5' : 'h-4 w-4'} text-gray-400`} />
          </div>
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Job title, keywords, or company"
            className={`input ${size === 'lg' ? 'pl-10 py-3' : 'pl-9 py-2'} pr-8 w-full`}
          />
          {searchTerm && (
            <button
              type="button"
              onClick={clearSearch}
              className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>
        
        <div className="relative flex-1">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <MapPin className={`${size === 'lg' ? 'h-5 w-5' : 'h-4 w-4'} text-gray-400`} />
          </div>
          <input
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            placeholder="City, state, or remote"
            className={`input ${size === 'lg' ? 'pl-10 py-3' : 'pl-9 py-2'} pr-8 w-full`}
          />
          {location && (
            <button
              type="button"
              onClick={clearLocation}
              className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>
        
        <button
          type="submit"
          className={`btn-primary ${size === 'lg' ? 'px-6 py-3' : 'px-4 py-2'} whitespace-nowrap`}
        >
          Find Jobs
        </button>
      </div>
    </form>
  );
};

export default SearchBar;