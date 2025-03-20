import React from 'react';
import HeroSection from '../components/HeroSection';
import ShopBy from '../components/ShopBy';
import AboutUs from '../components/AboutUs';
import Stores from '../components/Stores';
import WhatWeAre from '../components/WhatWeAre';
import AffiliatedPartners from '../components/AffiliatedPartners';
import Footer from '../components/Footer';

const HomePage = () => {
  return (
    <div>
      <HeroSection />
      <ShopBy />
      <AboutUs />
      <Stores />
      <WhatWeAre />
      <AffiliatedPartners />
      <Footer />
    </div>
  );
};

export default HomePage;