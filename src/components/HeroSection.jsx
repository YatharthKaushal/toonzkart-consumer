import React from 'react';
import { useNavigate } from 'react-router-dom';  // Using useNavigate for programmatic navigation
import toonzKartLogo from '../assets/toonzkart_logo.png';

const HeroSection = () => {
  const navigate = useNavigate();  // Hook for navigation

  return (
    <div className="relative w-full h-[70vh] overflow-hidden">
      {/* Header Section */}
      <header className="absolute top-0 left-0 w-full bg-transparent text-white py-6 px-10 z-10">
        <nav className='flex justify-center'>
          <ul className="flex space-x-50 justify-end pr-10 text-xl uppercase">
            <li 
              className="cursor-pointer hover:text-gray-300 transition duration-200"
              onClick={() => navigate('/')}
            >
              Home
            </li>
            <li 
              className="cursor-pointer hover:text-gray-300 transition duration-200"
              onClick={() => navigate('/shop')}
            >
              Order Now
            </li>
            <li 
              className="cursor-pointer hover:text-gray-300 transition duration-200"
              onClick={() => navigate('/about')}
            >
              About Us
            </li>
            <li 
              className="cursor-pointer hover:text-gray-300 transition duration-200"
              onClick={() => navigate('/contact')}
            >
              Contact Us
            </li>
          </ul>
        </nav>
      </header>

      {/* Hero Image */}
      <img 
        src="https://booksalmirah.com/wp-content/uploads/2023/08/alfons-morales-YLSwjSy7stw-unsplash-1.jpg" 
        alt="Bookshelf Background" 
        className="object-cover w-full h-full"
      />
      
      {/* Overlay */}
      <div className="absolute inset-0 bg-black opacity-70"></div>

      {/* Content Container */}
      <div className="absolute left-1/2 bottom-5 transform -translate-x-1/2 -translate-y-10 w-1/2 py-5">
        <div className="text-center">
          <img
            src={toonzKartLogo}
            alt="ToonzKart Logo"
            className="mx-auto mb-4 h-[15rem]"
          />
          <h1 className="text-5xl font-bold text-white mb-8">Discover the Best Books & Reads</h1>
          
          {/* Search Bar */}
          <div className="flex justify-center items-center w-4/5 mx-auto bg-white rounded-full shadow px-3 py-1 border border-gray-300">
            <div className="flex items-center border-r border-gray-300 pl-4 pr-3">
              <i className="fas fa-map-marker-alt text-red-500"></i>
              <select className="focus:outline-none bg-transparent cursor-pointer pl-2 pr-8">
                <option>Indore</option>
                <option>New York</option>
                <option>London</option>
                <option>Tokyo</option>
              </select>
              <i className="fas fa-chevron-down text-gray-500"></i>
            </div>
            <input 
              type="text" 
              className="flex-grow focus:outline-none pl-4 py-2 text-lg"
              placeholder="Search for books, authors, or genres"
            />
            <button className="p-3">
              <i className="fas fa-search text-blue-900 text-xl"></i>  {/* Font Awesome Icon */}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
