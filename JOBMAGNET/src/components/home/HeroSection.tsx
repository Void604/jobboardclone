import React from 'react';
import SearchBar from '../shared/SearchBar';

const HeroSection: React.FC = () => {
  return (
    <div className="relative bg-gradient-to-r from-primary-600 to-secondary-600 py-20 md:py-32">
      {/* Background pattern */}
      <div className="absolute inset-0 z-0 opacity-10">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="white" strokeWidth="1"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-3xl mx-auto text-center mb-10 animate-fade-in">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
            Find Your Dream Job Today
          </h1>
          <p className="text-lg md:text-xl text-white opacity-90 mb-8">
            Connect with top employers and discover opportunities that match your skills and career goals.
          </p>
          
          <div className="bg-white rounded-lg p-4 shadow-lg">
            <SearchBar />
          </div>
          
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <span className="badge bg-white/20 text-white hover:bg-white/30 cursor-pointer transition-colors">Remote</span>
            <span className="badge bg-white/20 text-white hover:bg-white/30 cursor-pointer transition-colors">Full-time</span>
            <span className="badge bg-white/20 text-white hover:bg-white/30 cursor-pointer transition-colors">Part-time</span>
            <span className="badge bg-white/20 text-white hover:bg-white/30 cursor-pointer transition-colors">Internship</span>
            <span className="badge bg-white/20 text-white hover:bg-white/30 cursor-pointer transition-colors">Contract</span>
          </div>
        </div>
      </div>
      
      {/* Wave divider */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 120" fill="#f9fafb">
          <path d="M0,64L80,69.3C160,75,320,85,480,80C640,75,800,53,960,53.3C1120,53,1280,75,1360,85.3L1440,96L1440,120L1360,120C1280,120,1120,120,960,120C800,120,640,120,480,120C320,120,160,120,80,120L0,120Z"></path>
        </svg>
      </div>
    </div>
  );
};

export default HeroSection;