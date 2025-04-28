import React, { useState, useEffect, useRef } from "react";
import { FaMapMarkerAlt, FaBars, FaChevronDown } from "react-icons/fa";
import { ShoppingCart, User, X } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import toonzkartLogo from "../assets/toonzkart_logo.png";

const Header = ({ logo }) => {
  const navigate = useNavigate();
  const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const dropdownRef = useRef(null);
  const mobileMenuRef = useRef(null);

  // List of cities
  const cities = [
    "Indore",
    "Ujjain",
    "Dewas",
    "Baroda",
    "Bhopal",
    "Bhilwara",
    "Surat",
    "Ahmedabad",
    "Raipur",
    "Nagpur",
    "Nashik",
    "Pune",
    "Jaipur",
    "Kota",
    "Ajmer",
    "Rajkot",
    "Mumbai",
    "Hyderabad",
    "Banglore",
    "Aurangabad",
    "Delhi",
    "Chandigarh",
  ];

  // State for the selected city
  const [selectedCity, setSelectedCity] = useState(
    localStorage.getItem("selectedCity") || "Indore"
  );

  // Set the selected city to localStorage when it changes
  useEffect(() => {
    localStorage.setItem("selectedCity", selectedCity);
  }, [selectedCity]);

  const handleCitySelect = (city) => {
    setSelectedCity(city);
    setIsDropdownOpen(false);
  };

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("userName");
    localStorage.removeItem("userEmail");
    setIsDropdownOpen(false);
    setIsMobileMenuOpen(false);
    navigate("/login");
  };

  // Get user name from localStorage
  const userName =
    localStorage.getItem("userName") ||
    localStorage.getItem("userEmail") ||
    "User";

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const goToProfile = () => {
    navigate("/profile");
    setIsMobileMenuOpen(false);
  };

  // Handle clicks outside of the dropdown and mobile menu
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
      if (
        mobileMenuRef.current &&
        !mobileMenuRef.current.contains(event.target) &&
        event.target.id !== "mobile-menu-button"
      ) {
        setIsMobileMenuOpen(false);
      }
    };

    // Add event listener when dropdown or mobile menu is open
    if (isDropdownOpen || isMobileMenuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    // Clean up the event listener
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isDropdownOpen, isMobileMenuOpen]);

  return (
    <header className="bg-white py-2 px-3 md:py-4 md:px-6 shadow-md flex items-center justify-between">
      {/* Logo & Location Selector */}
      <div className="flex items-center">
        {/* Logo */}
        <Link to="/">
          <img
            src={toonzkartLogo}
            alt="ToonzKart Logo"
            className="h-10 md:h-14 w-auto"
          />
        </Link>

        {/* Location Selector - Enhanced with proper dropdown */}
        <div className="relative ml-2 md:ml-6" ref={dropdownRef}>
          <div
            className="flex items-center bg-gray-200 rounded-lg px-2 md:px-4 py-1 md:py-2 cursor-pointer text-sm md:text-base"
            onClick={toggleDropdown}
          >
            <FaMapMarkerAlt className="text-gray-500 mr-1 md:mr-2 text-sm md:text-lg" />
            <span className="text-gray-700 font-medium">{selectedCity}</span>
            <FaChevronDown className="ml-1 md:ml-2 text-gray-500 text-xs md:text-sm" />
          </div>

          {/* City dropdown */}
          {isDropdownOpen && (
            <div className="absolute z-20 mt-1 w-48 md:w-64 bg-white rounded-md shadow-lg py-1 border border-gray-200 max-h-80 overflow-y-auto">
              <div className="px-3 md:px-4 py-2 border-b border-gray-100">
                <div className="font-medium text-gray-700">Select City</div>
                <div className="text-xs text-gray-500 mt-1">
                  Choose your service area
                </div>
              </div>
              <div className="city-list">
                {cities.map((city, index) => (
                  <div
                    key={index}
                    className={`px-3 md:px-4 py-2 cursor-pointer hover:bg-gray-100 ${
                      city === selectedCity
                        ? "bg-blue-50 font-medium text-blue-700"
                        : "text-gray-700"
                    }`}
                    onClick={() => handleCitySelect(city)}
                  >
                    {city}
                    {city === selectedCity && (
                      <span className="text-xs ml-2 text-blue-600">
                        (Current)
                      </span>
                    )}
                  </div>
                ))}
              </div>
              <div className="px-3 md:px-4 py-2 md:py-3 bg-blue-50 border-l-4 border-blue-500">
                <div className="text-xs md:text-sm font-semibold text-blue-700">
                  More cities coming soon!
                </div>
                <div className="text-xs text-blue-600 mt-1">
                  Stay tuned for updates
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Desktop view for user actions */}
      <div className="hidden md:flex">
        {isLoggedIn ? (
          <div className="flex items-center space-x-5">
            <Link to="/cart" className="relative">
              <ShoppingCart size={24} className="text-gray-700" />
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
                className="text-gray-700 font-medium"
              >
                {userName}
              </button>
            </div>
          </div>
        ) : (
          <div className="space-x-5">
            <Link to="/login" className="text-gray-600 font-semibold">
              Log in
            </Link>
            <Link
              to="/signup"
              className="bg-blue-500 text-white px-4 py-2 rounded-lg font-semibold"
            >
              Sign up
            </Link>
          </div>
        )}
      </div>

      {/* Mobile view for cart and menu */}
      <div className="flex items-center space-x-2 md:hidden">
        {isLoggedIn && (
          <Link to="/cart" className="relative mr-1">
            <ShoppingCart size={20} className="text-gray-700" />
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] w-4 h-4 flex items-center justify-center rounded-full">
              3
            </span>
          </Link>
        )}
        <button
          id="mobile-menu-button"
          className="p-1 text-gray-700"
          onClick={toggleMobileMenu}
        >
          {isMobileMenuOpen ? <X size={24} /> : <FaBars size={20} />}
        </button>
      </div>

      {/* Mobile menu overlay */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden">
          <div
            ref={mobileMenuRef}
            className="absolute right-0 top-0 w-3/4 max-w-xs h-full bg-white shadow-xl z-50 transform transition-transform overflow-y-auto"
          >
            <div className="p-4 border-b border-gray-200">
              {isLoggedIn ? (
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center">
                    <User size={20} />
                  </div>
                  <div>
                    <div className="font-semibold">{userName}</div>
                    <div className="text-xs text-gray-500">Welcome back!</div>
                  </div>
                </div>
              ) : (
                <div>
                  <h3 className="text-lg font-bold">Welcome</h3>
                  <p className="text-sm text-gray-600">Sign in to continue</p>
                </div>
              )}
            </div>

            {/* Mobile location selector */}
            <div className="p-4 border-b border-gray-200">
              <div className="text-sm font-medium text-gray-500 mb-2">
                Your location
              </div>
              <div className="flex items-center bg-gray-100 rounded-lg p-2">
                <FaMapMarkerAlt className="text-gray-500 mr-2" />
                <select
                  className="bg-transparent text-gray-700 w-full outline-none"
                  value={selectedCity}
                  onChange={(e) => setSelectedCity(e.target.value)}
                >
                  {cities.map((city, index) => (
                    <option key={index} value={city}>
                      {city}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <nav className="p-4">
              <ul className="space-y-4">
                <li>
                  <Link
                    to="/"
                    className="block py-2 text-gray-700 hover:text-blue-600"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Home
                  </Link>
                </li>
                {isLoggedIn ? (
                  <>
                    <li>
                      <button
                        onClick={goToProfile}
                        className="w-full text-left py-2 text-gray-700 hover:text-blue-600"
                      >
                        My Profile
                      </button>
                    </li>
                    <li>
                      <Link
                        to="/orders"
                        className="block py-2 text-gray-700 hover:text-blue-600"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        My Orders
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/cart"
                        className="block py-2 text-gray-700 hover:text-blue-600"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        Cart
                      </Link>
                    </li>
                    <li className="border-t border-gray-200 pt-2 mt-4">
                      <button
                        onClick={handleLogout}
                        className="w-full text-left py-2 text-red-600"
                      >
                        Logout
                      </button>
                    </li>
                  </>
                ) : (
                  <>
                    <li>
                      <Link
                        to="/login"
                        className="block py-2 text-gray-700 hover:text-blue-600"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        Log in
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/signup"
                        className="block py-2 px-4 bg-blue-500 text-white rounded-lg text-center"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        Sign up
                      </Link>
                    </li>
                  </>
                )}
              </ul>
            </nav>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
