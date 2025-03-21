import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaFireAlt } from 'react-icons/fa';

const ShopByDemandButton = () => {
  const navigate = useNavigate();
  const [isVisible, setIsVisible] = useState(true);
  const [isPulsing, setIsPulsing] = useState(true);

  // Set up animation timing without any scroll handling
  useEffect(() => {
    // Set interval for attention-grabbing animation cycles
    const pulseInterval = setInterval(() => {
      setIsPulsing(prev => !prev);
    }, 5000);
    
    return () => {
      clearInterval(pulseInterval);
    };
  }, []);

  const handleClick = () => {
    navigate('/shop', { state: { activeTab: 'demand' } });
  };

  return (
    <div 
      className={`fixed z-50 transition-all duration-500 ${
        isVisible ? 'translate-y-0 opacity-100' : 'translate-y-16 opacity-0'
      } bottom-6 left-6`}
    >
      <button
        onClick={handleClick}
        className={`group relative flex items-center justify-center bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 p-3 ${
          isPulsing ? 'animate-bounce' : ''
        }`}
        aria-label="Shop by Demand"
      >
        {/* Hot badge */}
        <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs px-2 py-0.5 rounded-full animate-pulse">
          HOT
        </span>
        
        {/* Outer glow effect */}
        <span className={`absolute inset-0 rounded-full ${
          isPulsing ? 'bg-orange-400 animate-ping opacity-75' : ''
        }`}></span>
        
        {/* Icon and text - responsive layout */}
        <span className="flex items-center justify-center relative z-10">
          <span className="text-xl md:text-2xl transform group-hover:scale-110 transition-transform duration-300 mr-1 md:mr-2">🔥</span>
          {/* Text only visible on larger screens */}
          <span className="hidden md:inline font-bold whitespace-nowrap">Shop by Demand</span>
        </span>
        
        {/* USP tag - repositioned for left-side button */}
        <span className="absolute -top-2 -right-2 md:-top-3 md:-right-2 bg-yellow-200 text-yellow-800 text-[8px] md:text-xs font-bold px-1 md:px-2 py-0.5 rounded transform rotate-12 shadow hidden sm:inline-block">
          OUR USP
        </span>
      </button>
      
      {/* Mobile tooltip that's always visible */}
      <div className="absolute -top-8 md:-top-10 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-[10px] md:text-xs rounded py-1 px-2 transition-opacity whitespace-nowrap md:opacity-0 md:group-hover:opacity-100 md:pointer-events-none block sm:hidden">
        Demand
      </div>
    </div>
  );
};

export default ShopByDemandButton;