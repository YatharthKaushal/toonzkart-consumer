import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import toonzKartLogo from '../assets/toonzkart_logo.png';
import { FaMapMarkerAlt, FaChevronDown, FaSearch, FaBars, FaTimes, FaBook, FaTimes as FaClose } from 'react-icons/fa';

const HeroSection = () => {
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [books, setBooks] = useState([]);
  const [filteredBooks, setFilteredBooks] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const searchRef = useRef(null);
  
  // List of cities - same as in Header component
  const cities = [
    "Indore", 
    "Ujjain", 
    "Dewas", 
    // "Baroda", 
    "Bhopal"
    // "Surat", 
    // "Ahmedabad", 
    // "Raipur", 
    // "Nagpur", 
    // "Nashik", 
    // "Pune"
  ];
  
  // Get the selected city from localStorage for consistency with Header
  const [selectedCity, setSelectedCity] = useState(localStorage.getItem('selectedCity') || "Indore");

  // Update localStorage when the city changes
  const handleCityChange = (e) => {
    const newCity = e.target.value;
    setSelectedCity(newCity);
    localStorage.setItem('selectedCity', newCity);
  };

  // Check login status from localStorage (or however you track auth)
  const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  // Fetch book names when the component mounts
  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await fetch('https://backend-lzb7.onrender.com/api/books/book-names');
        const data = await response.json();
        setBooks(data);
      } catch (error) {
        console.error('Error fetching books:', error);
      }
    };

    fetchBooks();
  }, []);

  // Handle search input change
  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    
    if (value.trim()) {
      const filtered = books.filter(book => 
        book.title.toLowerCase().includes(value.toLowerCase())
      );
      setFilteredBooks(filtered);
    } else {
      setFilteredBooks([]);
    }
  };

  // Handle search input focus
  const handleSearchFocus = () => {
    setIsSearchFocused(true);
    setIsLoading(true);
    // Simulate loading time
    setTimeout(() => {
      setIsLoading(false);
    }, 800);
  };
  
  // Close search dropdown with Escape key
  useEffect(() => {
    const handleEscKey = (event) => {
      if (event.key === 'Escape') {
        setIsSearchFocused(false);
      }
    };
    
    document.addEventListener('keydown', handleEscKey);
    return () => {
      document.removeEventListener('keydown', handleEscKey);
    };
  }, []);

  // Handle click outside search dropdown
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setIsSearchFocused(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Handle book selection from search dropdown
  const handleBookSelect = (book) => {
    // Navigate to shop page with the selected book
    navigate('/shop', { 
      state: { 
        selectedBook: book 
      } 
    });
    setIsSearchFocused(false);
  };

  const navItems = [
    { name: 'Home', path: '/' },
    { name: 'Order Now', path: '/shop' },
    { name: 'About Us', path: '/about' },
    { name: 'Contact Us', path: '/contact' },
  ];

  return (
    <div className="relative w-full h-[50vh] sm:h-[60vh] md:h-[70vh] overflow-visible">
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
      <div className="absolute inset-0 flex items-center justify-center overflow-visible">
        <div className="w-full px-4 sm:px-6 md:w-4/5 lg:w-3/5 py-5 text-center overflow-visible">
          <img
            src={toonzKartLogo}
            alt="ToonzKart Logo"
            className="hidden md:block mx-auto mb-4 h-24 sm:h-28 md:h-32 lg:h-40"
          />
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-2 sm:mb-3 md:mb-4">
            Online Megastore For Learning Essentials
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-white/90 mb-4 sm:mb-6 md:mb-8">
            Books, stationery, school supplies and more — all in one place
          </p>

          {/* Search Bar with Dropdown */}
          <div className="relative w-full sm:w-4/5 lg:w-3/4 mx-auto" ref={searchRef}>
            <div className="flex justify-center items-center w-full bg-white rounded-full shadow px-3 py-1 border border-gray-300">
              <div className="flex items-center border-r border-gray-300 pl-4 pr-3">
                <FaMapMarkerAlt className="text-red-500" />
                <select 
                  className="focus:outline-none bg-transparent cursor-pointer pl-2 pr-1 appearance-none text-gray-700"
                  value={selectedCity}
                  onChange={handleCityChange}
                >
                  {cities.map((city, index) => (
                    <option key={index} value={city}>{city}</option>
                  ))}
                </select>
                <FaChevronDown className="text-gray-500 ml-1" />
              </div>
              <div className="relative flex-grow flex items-center">
                <input
                  type="text"
                  className="w-full focus:outline-none pl-4 py-2 text-base md:text-lg"
                  placeholder="Search for books, authors, or genres"
                  value={searchTerm}
                  onChange={handleSearchChange}
                  onFocus={handleSearchFocus}
                />
                {searchTerm && (
                  <button 
                    onClick={() => {
                      setSearchTerm('');
                      setFilteredBooks([]);
                    }}
                    className="absolute right-2 text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    <FaClose size={16} />
                  </button>
                )}
              </div>
              <button className="p-2 text-blue-900 hover:text-blue-700 transition-colors">
                <FaSearch className="text-lg" />
              </button>
            </div>

            {/* Search Results Dropdown */}
            {isSearchFocused && (
              <div className="absolute z-50 w-full mt-2 bg-white shadow-xl rounded-lg max-h-96 overflow-y-auto text-left border border-gray-200" style={{ maxHeight: '80vh' }}>
                <div className="sticky top-0 bg-white border-b border-gray-200 px-4 py-2 text-sm font-medium text-gray-600">
                  {searchTerm ? 'Search Results' : 'Recent Books'}
                </div>
                
                {isLoading ? (
                  /* Shimmering Loader */
                  <div className="p-4">
                    {[1, 2, 3, 4, 5].map((item) => (
                      <div key={item} className="animate-pulse flex items-center py-3">
                        <div className="h-4 bg-gray-200 rounded w-1/6 mr-3"></div>
                        <div className="h-5 bg-gray-200 rounded w-2/3"></div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <>
                    {searchTerm && filteredBooks.length === 0 ? (
                      <div className="flex flex-col items-center justify-center p-8 text-gray-500">
                        <FaSearch className="text-4xl mb-2 text-gray-300" />
                        <p className="text-center">No books found matching "{searchTerm}"</p>
                        <p className="text-sm text-gray-400 mt-1">Try a different search term</p>
                      </div>
                    ) : (
                      <ul className="py-1">
                        {filteredBooks.map((book) => (
                          <li 
                            key={book._id} 
                            className="px-4 py-3 hover:bg-blue-50 cursor-pointer transition duration-150 flex items-center"
                            onClick={() => handleBookSelect(book)}
                          >
                            <div className="bg-blue-100 text-blue-800 h-8 w-8 rounded-full flex items-center justify-center mr-3">
                              <FaBook className="text-xs" />
                            </div>
                            <div>
                              <p className="font-medium text-gray-800">{book.title}</p>
                              <p className="text-xs text-gray-500">Book ID: {book._id.substring(0, 8)}...</p>
                            </div>
                          </li>
                        ))}
                      </ul>
                    )}
                  </>
                )}
                
                <div className="border-t border-gray-200 px-4 py-2 bg-gray-50 text-xs text-center text-gray-500">
                  Press ESC to close or click outside
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;