import React from 'react';
import HeroSection from '../components/home/HeroSection';
import FeaturedJobs from '../components/home/FeaturedJobs';
import CategoriesSection from '../components/home/CategoriesSection';
import HowItWorks from '../components/home/HowItWorks';
import TestimonialSection from '../components/home/TestimonialSection';
import CallToAction from '../components/home/CallToAction';

const HomePage: React.FC = () => {
  return (
    <div>
      <HeroSection />
      <FeaturedJobs />
      <CategoriesSection />
      <HowItWorks />
      <TestimonialSection />
      <CallToAction />
    </div>
  );
};

export default HomePage;