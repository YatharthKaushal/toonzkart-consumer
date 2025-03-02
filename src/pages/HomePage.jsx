import React from 'react';
import HeroSection from '../components/HeroSection';
import ShopBy from '../components/ShopBy';
import Stores from '../components/Stores';
import WhatWeAre from '../components/WhatWeAre';
import AffiliatedPartners from '../components/AffiliatedPartners';
import Footer from '../components/Footer';

const HomePage = () => {
  return (
    <div>
      <HeroSection />
      <ShopBy />
      <Stores />
      <WhatWeAre />
      <AffiliatedPartners></AffiliatedPartners>
      <Footer />
    </div>
  );
};

export default HomePage;
