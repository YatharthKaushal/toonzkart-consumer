import React, { useState, useEffect, useRef } from "react";
import podarschool_poster from "../assets/podarschool_poster.png";
// Import additional images
import poster2 from "../assets/toonzkart_logo.png"; // You'll need to add these images
import poster3 from "../assets/toonzkart_logo1.png"; // to your assets folder

const Poster = () => {
  // Array of poster images
  const images = [poster2, podarschool_poster, poster3];
  const [currentIndex, setCurrentIndex] = useState(0);
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  // Auto-slide functionality
  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 3000); // Change slide every 3 seconds

    return () => clearInterval(interval);
  }, [currentIndex]);

  // Handler for next slide
  const nextSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  // Handler for previous slide
  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  // Touch handlers for mobile swipe
  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e) => {
    touchEndX.current = e.changedTouches[0].clientX;
    handleSwipe();
  };

  const handleSwipe = () => {
    // Swipe threshold
    const threshold = 50;

    if (touchStartX.current - touchEndX.current > threshold) {
      // Swipe left, show next slide
      nextSlide();
    } else if (touchEndX.current - touchStartX.current > threshold) {
      // Swipe right, show previous slide
      prevSlide();
    }
  };

  return (
    <div className="flex flex-col items-center w-full sm:w-1/2 m-auto pt-8">
      {/* Image container with touch events */}
      <div
        className="w-full relative overflow-hidden"
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        <div
          className="flex transition-transform duration-300 ease-in-out"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {images.map((image, index) => (
            <img
              key={index}
              className="w-full flex-shrink-0"
              src={image}
              alt={`Poster ${index + 1}`}
            />
          ))}
        </div>
      </div>

      {/* Controls below the image */}
      <div className="flex justify-center items-center mt-4 w-full">
        {/* Previous button */}
        <button
          onClick={prevSlide}
          className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-2 px-4 rounded-l"
        >
          &lt;
        </button>

        {/* Dots indicators */}
        <div className="flex mx-4">
          {images.map((_, index) => (
            <div
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`h-3 w-3 mx-1 rounded-full cursor-pointer ${
                index === currentIndex ? "bg-blue-500" : "bg-gray-300"
              }`}
            />
          ))}
        </div>

        {/* Next button */}
        <button
          onClick={nextSlide}
          className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-2 px-4 rounded-r"
        >
          &gt;
        </button>
      </div>
    </div>
  );
};

export default Poster;
