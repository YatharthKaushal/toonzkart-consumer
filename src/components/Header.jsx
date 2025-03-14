import React, { useState } from "react";
import { FaSearch, FaMapMarkerAlt } from "react-icons/fa";
import { Search, MapPin, ShoppingCart, User } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import toonzkartLogo from "../assets/toonzkart_logo.png";

const Header = ({ logo }) => {
  const navigate = useNavigate();
  const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  
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

  return (
    <header className="bg-white py-4 px-6 shadow-md flex items-center justify-between">
      {/* Logo & Search Bar */}
      <div className="flex items-center space-x-6">
        {/* Logo */}
        <Link to="/">
          <img src={toonzkartLogo} alt="ToonzKart Logo" className="h-14 w-auto" />
        </Link>
        
        {/* Search Bar */}
        <div className="flex items-center bg-gray-200 rounded-lg px-4 py-3">
          <FaMapMarkerAlt className="text-gray-500 mr-2 text-lg" />
          <select className="bg-transparent focus:outline-none text-gray-700 font-medium">
            <option>Indore</option>
            <option>New York</option>
            <option>Los Angeles</option>
            <option>Chicago</option>
            <option>Delhi</option>
            <option>Mumbai</option>
          </select>
          <div className="h-6 w-px bg-gray-400 mx-3"></div>
          <input
            type="text"
            placeholder="Search for products, subjects..."
            className="bg-transparent focus:outline-none w-100 text-gray-700"
          />
          <FaSearch className="text-gray-500 ml-3 text-lg" />
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