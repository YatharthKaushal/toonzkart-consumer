import React from "react";
import { FaBook, FaSchool, FaChalkboardTeacher, FaShoppingCart, FaTools } from "react-icons/fa";

const services = [
  {
    icon: <FaBook className="text-4xl text-blue-600" />,
    title: "Wide Range of Books",
    description: "From school books to bestsellers, we provide a curated collection for every reader.",
  },
  {
    icon: <FaSchool className="text-4xl text-green-600" />,
    title: "Shop by School",
    description: "Easily find and buy books based on your school's curriculum and syllabus.",
  },
  {
    icon: <FaChalkboardTeacher className="text-4xl text-red-600" />,
    title: "Academic & Competitive Exam Materials",
    description: "Get the best resources for competitive exams, school, and university studies.",
  },
  {
    icon: <FaShoppingCart className="text-4xl text-yellow-600" />,
    title: "Stationery & Supplies",
    description: "Find high-quality stationery, notebooks, and other school/office essentials.",
  },
  {
    icon: <FaTools className="text-4xl text-purple-600" />,
    title: "Customization Services",
    description: "Get your books, notebooks, and uniforms customized as per your needs.",
  },
];

const WhatWeAre = () => {
  return (
    <div className="w-full py-16 px-8 bg-gradient-to-r from-blue-100 via-pink-100 to-yellow-100">
      {/* Section Header */}
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold text-gray-800">What We Are?</h2>
        <p className="text-lg text-gray-600 mt-2">
          Your one-stop solution for books, stationery, and educational essentials.
        </p>
      </div>

      {/* Services Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 max-w-6xl mx-auto">
        {services.map((service, index) => (
          <div
            key={index}
            className="flex flex-col items-center bg-white p-6 rounded-lg shadow-lg transform hover:scale-105 transition-all duration-300"
          >
            {/* Icon */}
            <div className="mb-4">{service.icon}</div>
            {/* Title */}
            <h3 className="text-xl font-semibold text-gray-800">{service.title}</h3>
            {/* Description */}
            <p className="text-gray-600 text-center mt-2">{service.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WhatWeAre;
