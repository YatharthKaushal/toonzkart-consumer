import React, { useState, useEffect, useRef } from "react";
import podarschool_poster from "../assets/podarschool_poster.png";
import poster2 from "../assets/toonzkart_logo.png";
import poster3 from "../assets/toonzkart_logo1.png";

const Poster = () => {
  // Array of poster images
  const images = [poster2, podarschool_poster, poster3];
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [dragStartX, setDragStartX] = useState(0);
  const [dragOffset, setDragOffset] = useState(0);
  const sliderRef = useRef(null);
  const containerRef = useRef(null);
  const autoScrollTimerRef = useRef(null);

  // Function to handle slide change
  const goToSlide = (index) => {
    // Ensure index is within bounds with wrapping
    const newIndex = ((index % images.length) + images.length) % images.length;
    setCurrentIndex(newIndex);
  };

  // Auto-slide functionality
  useEffect(() => {
    const startAutoScroll = () => {
      clearTimeout(autoScrollTimerRef.current);
      autoScrollTimerRef.current = setTimeout(() => {
        goToSlide(currentIndex + 1);
      }, 3000);
    };

    startAutoScroll();

    // Clean up timer on unmount
    return () => clearTimeout(autoScrollTimerRef.current);
  }, [currentIndex]);

  // Reset auto-scroll when dragging starts/ends
  useEffect(() => {
    if (isDragging) {
      clearTimeout(autoScrollTimerRef.current);
    }
  }, [isDragging]);

  // Mouse event handlers
  const handleMouseDown = (e) => {
    setIsDragging(true);
    setDragStartX(e.clientX);
    setDragOffset(0);
    e.preventDefault();
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    
    const currentX = e.clientX;
    const newOffset = currentX - dragStartX;
    setDragOffset(newOffset);
    
    if (sliderRef.current) {
      const slideWidth = containerRef.current?.offsetWidth * 0.5; // Each slide takes 50% of container
      const totalOffset = (currentIndex * slideWidth) - newOffset;
      sliderRef.current.style.transform = `translateX(calc(-${totalOffset}px + 25%))`;
    }
  };

  const handleMouseUp = (e) => {
    if (!isDragging) return;
    
    const finalOffset = e.clientX - dragStartX;
    const threshold = containerRef.current?.offsetWidth * 0.1 || 50;
    
    if (finalOffset < -threshold) {
      // Dragged left - go to next slide
      goToSlide(currentIndex + 1);
    } else if (finalOffset > threshold) {
      // Dragged right - go to previous slide
      goToSlide(currentIndex - 1);
    } else {
      // Return to current slide if threshold not reached
      goToSlide(currentIndex);
    }
    
    setIsDragging(false);
  };

  const handleMouseLeave = () => {
    if (isDragging) {
      goToSlide(currentIndex);
      setIsDragging(false);
    }
  };

  // Touch event handlers for mobile
  const handleTouchStart = (e) => {
    setIsDragging(true);
    setDragStartX(e.touches[0].clientX);
    setDragOffset(0);
    clearTimeout(autoScrollTimerRef.current);
  };

  const handleTouchMove = (e) => {
    if (!isDragging) return;
    
    const currentX = e.touches[0].clientX;
    const newOffset = currentX - dragStartX;
    setDragOffset(newOffset);
    
    if (sliderRef.current) {
      const slideWidth = containerRef.current?.offsetWidth * 0.5; // Each slide takes 50% of container
      const totalOffset = (currentIndex * slideWidth) - newOffset;
      sliderRef.current.style.transform = `translateX(calc(-${totalOffset}px + 25%))`;
    }
  };

  const handleTouchEnd = (e) => {
    if (!isDragging) return;
    
    const finalOffset = e.changedTouches[0].clientX - dragStartX;
    const threshold = containerRef.current?.offsetWidth * 0.1 || 50;
    
    if (finalOffset < -threshold) {
      goToSlide(currentIndex + 1);
    } else if (finalOffset > threshold) {
      goToSlide(currentIndex - 1);
    } else {
      goToSlide(currentIndex);
    }
    
    setIsDragging(false);
  };

  return (
    <div 
      ref={containerRef}
      className="w-full max-w-6xl mx-auto mt-2 mb-2 overflow-hidden relative"
    >
      {/* Main slider container - responsive height */}
      <div className="relative px-4">
        {/* Slider track - responsive height for mobile */}
        <div
          ref={sliderRef}
          className={`flex transition-transform ${isDragging ? '' : 'duration-500 ease-out'}`}
          style={{ 
            transform: `translateX(calc(-${currentIndex * 50}% + 25%))`,
            width: "100%",
            height: "auto", // Auto height based on content
            maxHeight: "360px", // Increased max height for larger screens
          }}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseLeave}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          {images.map((image, index) => (
            <div
              key={index}
              className={`w-[50%] px-3 flex-shrink-0 transition-all duration-500 ${
                currentIndex === index 
                  ? 'scale-100 opacity-100 z-10' 
                  : 'scale-90 opacity-70 z-0'
              }`}
            >
              <div className="h-full rounded-lg overflow-hidden shadow-md border border-gray-200">
                <img
                  src={image}
                  alt={`Slide ${index + 1}`}
                  className="w-full h-full object-contain"
                  style={{ maxHeight: "260px" }} // Increased height from 220px to 260px
                  draggable="false"
                />
              </div>
            </div>
          ))}
        </div>
        
        {/* Subtle indicator dots - moved closer to content */}
        <div className="absolute -bottom-4 left-0 right-0 flex justify-center space-x-2 z-20">
          {images.map((_, index) => (
            <div
              key={index}
              className={`h-1.5 w-1.5 rounded-full transition-all duration-300 ${
                index === currentIndex 
                  ? 'bg-blue-500 w-5' 
                  : 'bg-gray-300 hover:bg-gray-400'
              }`}
              onClick={() => goToSlide(index)}
            />
          ))}
        </div>
      </div>
      
      {/* Left and right gradient overlays to hint at more content */}
      <div className="absolute top-0 bottom-0 left-0 w-[25%] bg-gradient-to-r from-white to-transparent z-10 pointer-events-none"></div>
      <div className="absolute top-0 bottom-0 right-0 w-[25%] bg-gradient-to-l from-white to-transparent z-10 pointer-events-none"></div>
      
      {/* Styling for cursor */}
      <style jsx>{`
        div[ref="sliderRef"] {
          cursor: ${isDragging ? 'grabbing' : 'grab'};
          user-select: none;
        }
        
        img {
          pointer-events: none;
        }
        
        /* Responsive height adjustments */
        @media (max-width: 768px) {
          div[ref="sliderRef"] {
            height: auto !important;
            max-height: 280px !important;
          }
        }
      `}</style>
    </div>
  );
};

export default Poster;