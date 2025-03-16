import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import toonzKartLogo from '../assets/toonzkart_logo.png';
import { FaMapMarkerAlt, FaChevronDown, FaSearch, FaBars, FaTimes } from 'react-icons/fa';

const HeroSection = () => {
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Check login status from localStorage (or however you track auth)
  const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const navItems = [
    { name: 'Home', path: '/' },
    { name: 'Order Now', path: '/shop' },
    { name: 'About Us', path: '/about' },
    { name: 'Contact Us', path: '/contact' },
  ];

  return (
    <div className="relative w-full h-[50vh] sm:h-[60vh] md:h-[70vh] overflow-hidden">
      {/* Header Section */}
      <header className="absolute top-0 left-0 w-full bg-transparent text-white py-4 md:py-6 px-4 md:px-10 z-10">
        <nav className="flex justify-between items-center">
          {/* Logo for mobile */}
          <div className="flex md:hidden">
            <img 
              src={toonzKartLogo} 
              alt="ToonzKart Logo" 
              className="h-12 object-contain"
            />
          </div>
          
          {/* Mobile menu button */}
          <button 
            className="md:hidden text-white focus:outline-none"
            onClick={toggleMobileMenu}
          >
            {mobileMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
          </button>
          
          {/* Desktop Navigation */}
          <ul className="hidden md:flex space-x-4 lg:space-x-10 xl:space-x-16 justify-center text-base lg:text-lg uppercase">
            {navItems.map((item, index) => (
              <li
                key={index}
                className="cursor-pointer hover:text-gray-300 transition duration-200"
                onClick={() => navigate(item.path)}
              >
                {item.name}
              </li>
            ))}

            {/* Conditional profile/login/signup */}
            {!isLoggedIn ? (
              <>
                <li
                  className="cursor-pointer hover:text-gray-300 transition duration-200"
                  onClick={() => navigate('/login')}
                >
                  Login
                </li>
                <li
                  className="cursor-pointer hover:text-gray-300 transition duration-200"
                  onClick={() => navigate('/signup')}
                >
                  Sign Up
                </li>
              </>
            ) : (
              <li
                className="cursor-pointer hover:text-gray-300 transition duration-200"
                onClick={() => navigate('/profile')}
              >
                Profile
              </li>
            )}
          </ul>
        </nav>
        
        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-black bg-opacity-95 absolute top-16 left-0 w-full py-4 z-20">
            <ul className="flex flex-col space-y-4 px-6">
              {navItems.map((item, index) => (
                <li
                  key={index}
                  className="cursor-pointer hover:text-gray-300 transition duration-200"
                  onClick={() => {
                    navigate(item.path);
                    setMobileMenuOpen(false);
                  }}
                >
                  {item.name}
                </li>
              ))}
              
              {!isLoggedIn ? (
                <>
                  <li
                    className="cursor-pointer hover:text-gray-300 transition duration-200"
                    onClick={() => {
                      navigate('/login');
                      setMobileMenuOpen(false);
                    }}
                  >
                    Login
                  </li>
                  <li
                    className="cursor-pointer hover:text-gray-300 transition duration-200"
                    onClick={() => {
                      navigate('/signup');
                      setMobileMenuOpen(false);
                    }}
                  >
                    Sign Up
                  </li>
                </>
              ) : (
                <li
                  className="cursor-pointer hover:text-gray-300 transition duration-200"
                  onClick={() => {
                    navigate('/profile');
                    setMobileMenuOpen(false);
                  }}
                >
                  Profile
                </li>
              )}
            </ul>
          </div>
        )}
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
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-full px-4 sm:px-6 md:w-4/5 lg:w-3/5 py-5 text-center">
          <img
            src={toonzKartLogo}
            alt="ToonzKart Logo"
            className="hidden md:block mx-auto mb-4 h-24 sm:h-28 md:h-32 lg:h-40"
          />
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-2 sm:mb-3 md:mb-4">
            Online Mega Store For Learning Essentials
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-white/90 mb-4 sm:mb-6 md:mb-8">
            Books, stationery, school supplies and more — all in one place
          </p>

          {/* Search Bar */}
          <div className="flex justify-center items-center w-full sm:w-4/5 lg:w-3/4 mx-auto bg-white rounded-full shadow px-3 py-1 border border-gray-300">
            <div className="flex items-center border-r border-gray-300 pl-4 pr-3">
              <FaMapMarkerAlt className="text-red-500" />
              <select className="focus:outline-none bg-transparent cursor-pointer pl-2 pr-1 appearance-none text-gray-700">
                <option>Indore</option>
                <option>New York</option>
                <option>London</option>
                <option>Tokyo</option>
              </select>
              <FaChevronDown className="text-gray-500 ml-1" />
            </div>
            <input
              type="text"
              className="flex-grow focus:outline-none pl-4 py-2 text-base md:text-lg"
              placeholder="Search for books, authors, or genres"
            />
            <button className="p-2 text-blue-900">
              <FaSearch className="text-lg" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;