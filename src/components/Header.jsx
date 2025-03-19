import React, { useState, useEffect, useRef } from "react";
import { FaMapMarkerAlt } from "react-icons/fa";
import { ShoppingCart, User } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import toonzkartLogo from "../assets/toonzkart_logo.png";

const Header = ({ logo }) => {
  const navigate = useNavigate();
  const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  
  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('userName');
    localStorage.removeItem('userEmail');
    setIsDropdownOpen(false);
    navigate('/login');
  };
  
  // Get user name from localStorage
  const userName = localStorage.getItem('userName') || localStorage.getItem('userEmail') || 'User';

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const goToProfile = () => {
    navigate('/profile');
  };

  // Handle clicks outside of the dropdown
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };

    // Add event listener when dropdown is open
    if (isDropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    // Clean up the event listener
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isDropdownOpen]);

  return (
    <header className="bg-white py-4 px-6 shadow-md flex items-center justify-between">
      {/* Logo & Location Selector */}
      <div className="flex items-center space-x-6">
        {/* Logo */}
        <Link to="/">
          <img src={toonzkartLogo} alt="ToonzKart Logo" className="h-14 w-auto" />
        </Link>
        
        {/* Location Selector - Only Indore */}
        <div className="relative" ref={dropdownRef}>
          <div className="flex items-center bg-gray-200 rounded-lg px-4 py-3 cursor-pointer" onClick={toggleDropdown}>
            <FaMapMarkerAlt className="text-gray-500 mr-2 text-lg" />
            <span className="text-gray-700 font-medium">Indore</span>
          </div>
          
          {/* Dropdown with expansion message */}
          {isDropdownOpen && (
            <div className="absolute z-10 mt-1 w-64 bg-white rounded-md shadow-lg py-1 border border-gray-200">
              <div className="px-4 py-2 border-b border-gray-100">
                <div className="font-medium text-gray-700">Indore</div>
                <div className="text-xs text-gray-500 mt-1">Current service area</div>
              </div>
              <div className="px-4 py-3 bg-blue-50 border-l-4 border-blue-500">
                <div className="text-sm font-semibold text-blue-700">
                  Expanding to other cities soon!
                </div>
                <div className="text-xs text-blue-600 mt-1">
                  Stay tuned for updates
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Login/Signup or User Profile */}
      {isLoggedIn ? (
        <div className="flex items-center space-x-5">
          <Link to="/cart" className="relative">
            <ShoppingCart size={24} className="text-gray-700" />
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">3</span>
          </Link>
          <div className="flex items-center space-x-2">
            <div 
              className="w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center cursor-pointer"
              onClick={goToProfile}
            >
              <User size={20} />
            </div>
            <button 
              onClick={goToProfile}
              className="text-gray-700 font-medium flex items-center"
            >
              {userName}
            </button>
          </div>
        </div>
      ) : (
        <div className="space-x-5">
          <Link to="/login" className="text-gray-600 font-semibold text-lg">Log in</Link>
          <Link to="/signup" className="bg-blue-500 text-white px-5 py-2 rounded-lg text-lg font-semibold">
            Sign up
          </Link>
        </div>
      )}
    </header>
  );
};

export default Header;