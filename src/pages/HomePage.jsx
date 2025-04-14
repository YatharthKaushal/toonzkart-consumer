import React from "react";
import HeroSection from "../components/HeroSection";
import ShopBy from "../components/ShopBy";
import AboutUs from "../components/AboutUs";
import Stores from "../components/Stores";
import WhatWeAre from "../components/WhatWeAre";
import AffiliatedPartners from "../components/AffiliatedPartners";
import Footer from "../components/Footer";
import RetailerPartners from "../components/RetailerPartners";
import WhatsAppButton from "../components/WhatsAppButton";
import ShopByDemandButton from "../components/ShopByDemandButton";
import Poster from "../components/Poster";

const HomePage = () => {
  return (
    <div>
      <HeroSection />
      <Poster />
      <ShopBy />
      <AboutUs />
      <Stores />
      <WhatWeAre />
      <RetailerPartners />
      <AffiliatedPartners />
      <Footer />
      <WhatsAppButton />
      <ShopByDemandButton />
    </div>
  );
};

export default HomePage;
