import React from "react";
import { FaBook, FaSchool, FaChalkboardTeacher, FaShoppingCart, FaTools, FaPencilAlt, FaBriefcase, FaFootballBall } from "react-icons/fa";

const services = [
  {
    icon: <FaBook className="text-3xl md:text-4xl text-blue-600" />,
    title: "Wide Range of Books",
    description: "From school books to bestsellers, we provide a curated collection for every reader.",
  },
  {
    icon: <FaSchool className="text-3xl md:text-4xl text-green-600" />,
    title: "Shop by School",
    description: "Easily find and buy books based on your school's curriculum and syllabus.",
  },
  {
    icon: <FaChalkboardTeacher className="text-3xl md:text-4xl text-red-600" />,
    title: "Academic & Exam Materials",
    description: "Get the best resources for competitive exams, school, and university studies.",
  },
  {
    icon: <FaShoppingCart className="text-3xl md:text-4xl text-yellow-600" />,
    title: "Stationery & Supplies",
    description: "Find high-quality stationery, notebooks, and other school/office essentials.",
  },
  {
    icon: <FaTools className="text-3xl md:text-4xl text-purple-600" />,
    title: "Customization Services",
    description: "Get your books, notebooks, and uniforms customized as per your needs.",
  },
  {
    icon: <FaPencilAlt className="text-3xl md:text-4xl text-pink-600" />,
    title: "Art Supplies",
    description: "Premium art supplies, craft materials, and creative stationery for artists of all ages.",
  },
  {
    icon: <FaBriefcase className="text-3xl md:text-4xl text-indigo-600" />,
    title: "Office Materials",
    description: "Complete range of professional office supplies, organizers, and business essentials.",
  },
  {
    icon: <FaFootballBall className="text-3xl md:text-4xl text-orange-600" />,
    title: "Sports & Toys",
    description: "Educational toys, board games, and sports equipment for recreation and development.",
  },
];

const WhatWeAre = () => {
  return (
    <div className="w-full py-8 md:py-16 px-4 md:px-8 bg-gradient-to-r from-blue-100 via-pink-100 to-yellow-100">
      {/* Section Header - Optimized for mobile */}
      <div className="text-center mb-8 md:mb-12">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-800">What We Are</h2>
        <p className="text-base md:text-lg text-gray-600 mt-2 px-2 md:px-0">
          Your one-stop solution for educational essentials
        </p>
      </div>

      {/* Services Grid - Optimized for mobile */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-8 max-w-7xl mx-auto">
        {services.map((service, index) => (
          <div
            key={index}
            className="flex flex-col items-center bg-white p-4 md:p-6 rounded-lg shadow-md md:shadow-lg transform hover:scale-102 md:hover:scale-105 transition-all duration-300"
          >
            {/* Icon - Smaller on mobile */}
            <div className="mb-3 md:mb-4">{service.icon}</div>
            {/* Title - Adjusted for mobile */}
            <h3 className="text-lg md:text-xl font-semibold text-gray-800 text-center">{service.title}</h3>
            {/* Description - Smaller on mobile */}
            <p className="text-sm md:text-base text-gray-600 text-center mt-1 md:mt-2">{service.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WhatWeAre;