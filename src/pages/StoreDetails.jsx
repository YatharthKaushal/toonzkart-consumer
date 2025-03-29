import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Info, Navigation, Share, Star, FileText, Book, ShoppingCart, Filter, Search, ArrowLeft, Menu, X, Flame, MapPin, Clock, Phone } from 'lucide-react';
import Header from '../components/Header';
import toonzkartLogo from "../assets/toonzkart_logo.png";

const API_BASE_URL = "https://backend-lzb7.onrender.com"; // Backend API URL

const StoreDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  // State for store data
  const [store, setStore] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  
  // State for books data
  const [allBooks, setAllBooks] = useState([]);
  const [storeBooks, setStoreBooks] = useState([]);
  const [booksLoading, setBooksLoading] = useState(true);
  const [booksError, setBooksError] = useState("");
  
  // Cart state
  const [cartItems, setCartItems] = useState([]);
  const [bookQuantities, setBookQuantities] = useState({});
  const [cartLoading, setCartLoading] = useState(false);
  const [cartError, setCartError] = useState("");
  const [cartSuccess, setCartSuccess] = useState("");

  // UI state
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('All Books');
  const [activeSubject, setActiveSubject] = useState(null);
  const [showSchools, setShowSchools] = useState(true);
  
  // Mobile-specific state
  const [showFilters, setShowFilters] = useState(false);
  const [showSearchBar, setShowSearchBar] = useState(false);

  // Fetch store details from API
  useEffect(() => {
    const fetchStoreDetails = async () => {
      setLoading(true);
      try {
        console.log("Fetching store with ID:", id);
        const response = await axios.get(`${API_BASE_URL}/api/stores/${id}`);
        console.log("Store API Response:", response.data);
        setStore(response.data);

        // Fetch books data after store is loaded
        if (response.data && response.data.inventory && response.data.inventory.length > 0) {
          fetchAllBooks(response.data.inventory);
        } else {
          setBooksLoading(false);
        }
      } catch (err) {
        console.error("Error fetching store details:", err);
        setError("Failed to load store details. Please try again.");
        setBooksLoading(false);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchStoreDetails();
    } else {
      console.error("No store ID provided in URL parameters");
      setError("No store ID provided");
      setLoading(false);
      setBooksLoading(false);
    }
  }, [id]);

  // Fetch all books and filter for this store's inventory
  const fetchAllBooks = async (inventory) => {
    setBooksLoading(true);
    try {
      const response = await axios.get(`${API_BASE_URL}/api/books`);
      console.log("Books API Response:", response.data);
      
      // Save all books
      setAllBooks(response.data);
      
      // Filter books for this store's inventory
      const inventoryBookIds = inventory.map(item => item.book);
      const filteredBooks = response.data.filter(book => 
        inventoryBookIds.includes(book._id)
      );
      
      console.log("Filtered books for this store:", filteredBooks);
      setStoreBooks(filteredBooks);
    } catch (err) {
      console.error("Error fetching books:", err);
      setBooksError("Failed to load books. Please try again.");
    } finally {
      setBooksLoading(false);
    }
  };

  // Get unique categories from books
  const getUniqueCategories = () => {
    if (!storeBooks || storeBooks.length === 0) return [];
    
    const categories = ['All Books'];
    storeBooks.forEach(book => {
      if (book.category && !categories.includes(book.category)) {
        categories.push(book.category);
      }
    });
    
    return categories.map(category => ({
      name: category,
      count: category === 'All Books' 
        ? storeBooks.length 
        : storeBooks.filter(book => book.category === category).length,
      active: activeCategory === category
    }));
  };

  const bookCategories = getUniqueCategories();

  const handleCategoryClick = (category) => {
    setActiveCategory(category);
    if (category === 'School Books') {
      setShowSchools(true);
    } else {
      setShowSchools(false);
    }
    // On mobile, close the filters sidebar after selection
    if (window.innerWidth < 768) {
      setShowFilters(false);
    }
  };

  const handleSubjectClick = (subject) => {
    setActiveSubject(subject === activeSubject ? null : subject);
  };

  // Add to cart function using API with the correct endpoint
  const addToCart = async (book) => {
    try {
      setCartLoading(true);
      setCartError("");
      
      // Get the token from localStorage
      const token = localStorage.getItem('token');
      
      if (!token) {
        throw new Error('Authentication required. Please log in.');
      }
      
      // Determine the category - default to "Books" if not specified
      const category = book.category === "Stationery" ? "Stationery" : "Book";
      
      // Make API call to add to cart
      const response = await axios.post(
        `${API_BASE_URL}/api/cart`,
        {
          productId: book._id,
          quantity: 1,
          category: category
        },
        {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        }
      );
      
      if (response.data) {
        console.log("Added to cart:", response.data);
        
        // Find and store the cart item ID for this product
        const cartItem = response.data.items.find(item => item.productId === book._id);
        
        // Update local state for UI feedback
        setBookQuantities(prev => ({
          ...prev,
          [book._id]: 1
        }));
        
        // Add to cart items if not already there
        if (!cartItems.find(item => item._id === book._id)) {
          setCartItems(prev => [...prev, book]);
        }
        
        setCartSuccess(`${book.title || "Product"} added to cart!`);
        
        // Clear success message after 3 seconds
        setTimeout(() => {
          setCartSuccess("");
        }, 3000);
      }
    } catch (err) {
      console.error("Error adding to cart:", err);
      const message = err.response?.data?.message || "Failed to add to cart. Please try again.";
      setCartError(message);
      
      // Clear error message after 3 seconds
      setTimeout(() => {
        setCartError("");
      }, 3000);
    } finally {
      setCartLoading(false);
    }
  };
  
  // Update quantity using API
  const updateQuantity = async (bookId, change) => {
    try {
      setCartLoading(true);
      setCartError("");
      
      const currentQty = bookQuantities[bookId] || 0;
      const newQty = Math.max(0, currentQty + change);
      
      // Get the token from localStorage
      const token = localStorage.getItem('token');
      
      if (!token) {
        throw new Error('Authentication required. Please log in.');
      }
      
      // Find the cart item associated with this product
      const response = await axios.get(`${API_BASE_URL}/api/cart`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      
      // Find the cart item ID for this product
      const cartData = response.data;
      const cartItem = cartData.items.find(item => item.productId._id === bookId || item.productId === bookId);
      
      if (!cartItem) {
        throw new Error("Item not found in cart");
      }
      
      if (newQty === 0) {
        // Remove from cart if quantity is 0
        await axios.delete(`${API_BASE_URL}/api/cart/${cartItem._id}`, {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });
        
        // Update local state
        const newQuantities = {...bookQuantities};
        delete newQuantities[bookId];
        setBookQuantities(newQuantities);
        setCartItems(cartItems.filter(item => item._id !== bookId));
        
        setCartSuccess("Item removed from cart");
      } else {
        // Update quantity
        await axios.put(
          `${API_BASE_URL}/api/cart/${cartItem._id}`,
          {
            quantity: newQty
          },
          {
            headers: {
              'Authorization': `Bearer ${token}`,
              'Content-Type': 'application/json'
            }
          }
        );
        
        // Update local state
        setBookQuantities(prev => ({
          ...prev,
          [bookId]: newQty
        }));
        
        setCartSuccess("Cart updated successfully");
      }
      
      // Clear success message after 3 seconds
      setTimeout(() => {
        setCartSuccess("");
      }, 3000);
    } catch (err) {
      console.error("Error updating cart:", err);
      const message = err.response?.data?.message || "Failed to update cart. Please try again.";
      setCartError(message);
      
      // Clear error message after 3 seconds
      setTimeout(() => {
        setCartError("");
      }, 3000);
    } finally {
      setCartLoading(false);
    }
  };

  // Filter books by category and search query
  const getFilteredBooks = () => {
    if (!storeBooks) return [];
    
    let filtered = storeBooks;
    
    // Filter by category
    if (activeCategory !== 'All Books') {
      filtered = filtered.filter(book => book.category === activeCategory);
    }
    
    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(book => 
        (book.title && book.title.toLowerCase().includes(query)) ||
        (book.author && book.author.toLowerCase().includes(query)) ||
        (book.category && book.category.toLowerCase().includes(query))
      );
    }
    
    return filtered;
  };

  const displayedBooks = getFilteredBooks();
  
  // Format price with rupee symbol
  const formatPrice = (price) => {
    return `₹${price}`;
  };
  
  // Handle back button click
  const handleBack = () => {
    navigate(-1);
  };

  // Fetch current cart to initialize state
  useEffect(() => {
    const fetchCart = async () => {
      try {
        const token = localStorage.getItem('token');
        
        if (!token) {
          // User not logged in, don't attempt to fetch cart
          return;
        }
        
        const response = await axios.get(`${API_BASE_URL}/api/cart`, {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });
        
        if (response.data && response.data.items) {
          // Create quantities object from the API response
          const newQuantities = {};
          const cartBooks = [];
          
          response.data.items.forEach(item => {
            // Handle both possible structures of productId (object or string)
            const productId = typeof item.productId === 'object' ? item.productId._id : item.productId;
            newQuantities[productId] = item.quantity;
            
            // Find the full book data to add to cart items
            const book = storeBooks.find(b => b._id === productId);
            if (book) {
              cartBooks.push(book);
            }
          });
          
          setBookQuantities(newQuantities);
          setCartItems(cartBooks);
        }
      } catch (err) {
        console.error("Error fetching cart:", err);
        // Don't show error to user, just initialize empty cart
      }
    };
    
    // Only fetch cart once books are loaded
    if (storeBooks.length > 0) {
      fetchCart();
    }
  }, [storeBooks]);

  // Toggle mobile search bar
  const toggleSearchBar = () => {
    setShowSearchBar(!showSearchBar);
  };

  // Toggle mobile filters
  const toggleFilters = () => {
    setShowFilters(!showFilters);
  };

  // Navigate to Shop by Demand page
  const navigateToShopByDemand = () => {
    navigate('/shop', { state: { activeTab: "demand" } });
  };

  // Error state for the entire page only if completely failed
  if (error && !store) {
    return (
      <div className="w-full min-h-screen flex items-center justify-center">
        <div className="text-center p-4">
          <div className="text-red-500 text-lg mb-2">Error</div>
          <p className="text-gray-600">{error}</p>
          <button 
            onClick={handleBack} 
            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full font-sans">
      {/* Sticky Header */}
      <div className="sticky top-0 z-50 bg-white shadow-md">
        <Header logo={toonzkartLogo} />
      </div>

      {/* Cart Status Messages */}
      {cartSuccess && (
        <div className="fixed top-16 left-0 right-0 mx-auto w-full max-w-xs md:right-4 md:left-auto md:mx-0 bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded z-50">
          <span className="block sm:inline">{cartSuccess}</span>
        </div>
      )}
      
      {cartError && (
        <div className="fixed top-16 left-0 right-0 mx-auto w-full max-w-xs md:right-4 md:left-auto md:mx-0 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded z-50">
          <span className="block sm:inline">{cartError}</span>
        </div>
      )}

      {/* Main Content */}
      <div className="w-full px-4 pt-4 md:px-6 md:pt-6">
        {/* Back Button with improved styling */}
        <button
          onClick={handleBack}
          className="flex items-center gap-1 mb-4 px-3 py-2 bg-white border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition text-sm md:text-base md:gap-2 md:px-4 shadow-sm"
        >
          <ArrowLeft size={16} />
          <span>Back</span>
        </button>
        
        {/* Enhanced Bookstore Info Card */}
        <div className="mb-6">
          {loading ? (
            <div className="p-6 bg-white rounded-lg shadow-sm">
              <div className="animate-pulse">
                <div className="h-8 bg-gray-200 rounded w-1/3 mb-2"></div>
                <div className="h-4 bg-gray-200 rounded w-2/3 mb-2"></div>
                <div className="h-4 bg-gray-200 rounded w-1/2 mb-3"></div>
              </div>
            </div>
          ) : (
            <div className="bg-white rounded-lg shadow-sm overflow-hidden">
              {/* Store Banner - could be an image in a real implementation */}
              <div className="h-24 md:h-32 bg-gradient-to-r from-blue-500 to-indigo-600 relative">
                <div className="absolute inset-0 bg-black opacity-30"></div>
                <div className="absolute bottom-0 left-0 w-full p-4 text-white">
                  <div className="flex items-start justify-between">
                    <h1 className="text-xl md:text-3xl font-bold drop-shadow-sm">{store?.storeName || "Store"}</h1>
                    
                    {/* Quick Stats Badge */}
                    <div className="flex space-x-2">
                      <div className="bg-white/90 text-blue-800 px-2 py-1 rounded-full text-xs font-medium">
                        {storeBooks.length} Books
                      </div>
                      <div className="bg-white/90 text-green-800 px-2 py-1 rounded-full text-xs font-medium">
                        Fast Delivery
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Store Content */}
              <div className="p-4 md:p-6">
                <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                  {/* Store Info */}
                  <div className="flex-1">
                    <p className="text-sm md:text-base text-gray-700 mb-3">{store?.description || "Books and more"}</p>
                    
                    <div className="flex flex-col space-y-2">
                      <div className="flex items-center text-sm text-gray-600">
                        <MapPin size={16} className="mr-2 text-blue-600 flex-shrink-0" />
                        <span>{store?.address || "Loading address..."}</span>
                      </div>
                      
                      <div className="flex items-center text-sm text-gray-600">
                        <Clock size={16} className="mr-2 text-blue-600 flex-shrink-0" />
                        <span>Open today: 9:00 AM - 8:00 PM</span>
                      </div>
                      
                      <div className="flex items-center text-sm text-gray-600">
                        <Phone size={16} className="mr-2 text-blue-600 flex-shrink-0" />
                        <span>{store?.phone || "Contact store for details"}</span>
                      </div>
                    </div>
                  </div>
                  
                  {/* Ratings Cards with enhanced design */}
                  <div className="flex md:flex-col gap-3 md:w-64">
                    <div className="flex-1 md:w-full bg-gradient-to-r from-blue-50 to-blue-100 p-3 rounded-lg border border-blue-200">
                      <div className="flex items-start">
                        <div className="bg-blue-600 text-white p-2 rounded-md mr-3">
                          <Star size={18} fill="white" />
                        </div>
                        <div>
                          <div className="flex items-baseline">
                            <span className="text-2xl font-bold text-blue-800">4.2</span>
                            <span className="text-sm text-blue-600 ml-1">/5</span>
                          </div>
                          <div className="text-xs text-gray-600">Based on 235 store ratings</div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex-1 md:w-full bg-gradient-to-r from-green-50 to-green-100 p-3 rounded-lg border border-green-200">
                      <div className="flex items-start">
                        <div className="bg-green-600 text-white p-2 rounded-md mr-3">
                          <ShoppingCart size={18} fill="white" />
                        </div>
                        <div>
                          <div className="flex items-baseline">
                            <span className="text-2xl font-bold text-green-800">4.5</span>
                            <span className="text-sm text-green-600 ml-1">/5</span>
                          </div>
                          <div className="text-xs text-gray-600">Based on 1.2K delivery ratings</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Action Buttons */}
                <div className="mt-6 flex flex-wrap gap-3">
                  <button className="flex items-center px-4 py-2 bg-white border border-gray-300 rounded-md hover:bg-gray-50 transition-colors text-sm shadow-sm">
                    <Share size={16} className="mr-2 text-blue-600" />
                    <span>Share Store</span>
                  </button>
                  
                  <button className="flex items-center px-4 py-2 bg-white border border-gray-300 rounded-md hover:bg-gray-50 transition-colors text-sm shadow-sm">
                    <Navigation size={16} className="mr-2 text-blue-600" />
                    <span>Get Directions</span>
                  </button>
                  
                  <button 
                    onClick={() => navigate('/shop', { state: { activeTab: "demand" } })}
                    className="flex items-center px-4 py-2 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-md hover:from-orange-600 hover:to-orange-700 transition-colors text-sm shadow-md ml-auto"
                  >
                    <Flame size={16} className="mr-2" />
                    <span>Shop By Demand</span>
                  </button>
                </div>
                
                {/* Delivery Info */}
                <div className="mt-4 bg-blue-50 rounded-md p-3 flex items-center text-sm text-blue-800">
                  <ShoppingCart size={16} className="mr-2 text-blue-600" />
                  <span>Free delivery on orders above ₹499</span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Browse Books Section */}
        <div className="flex flex-col md:flex-row pb-8">
          {/* Mobile filter and search bar */}
          <div className="sticky top-16 z-40 bg-white border-b pb-2 mb-4 md:hidden">
            <div className="flex justify-between items-center">
              <div className="flex items-center">
                <button 
                  onClick={toggleFilters}
                  className="flex items-center border px-3 py-1 rounded-md text-sm mr-2"
                >
                  <Filter size={14} className="mr-1" />
                  <span>Filters</span>
                </button>
                <select className="border px-3 py-1 rounded-md bg-white text-sm">
                  <option>Sort</option>
                  <option>Price: Low to High</option>
                  <option>Price: High to Low</option>
                </select>
              </div>
              <button 
                onClick={toggleSearchBar}
                className="p-2 rounded-md border"
              >
                <Search size={16} className="text-gray-500" />
              </button>
            </div>
            
            {/* Mobile search bar */}
            {showSearchBar && (
              <div className="mt-2 relative">
                <input
                  type="text"
                  placeholder="Search within store"
                  className="w-full pl-8 pr-4 py-2 border rounded-md"
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  autoFocus
                />
                <Search size={16} className="absolute left-3 top-3 text-gray-400" />
                <button 
                  className="absolute right-3 top-3 text-gray-400"
                  onClick={() => setSearchQuery('')}
                >
                  {searchQuery && <X size={16} />}
                </button>
              </div>
            )}
          </div>
          
          {/* Mobile sidebar drawer */}
          {showFilters && (
            <div className="fixed inset-0 z-50 md:hidden">
              <div 
                className="absolute inset-0 bg-black bg-opacity-50"
                onClick={toggleFilters}
              ></div>
              <div className="absolute top-0 left-0 h-full w-3/4 max-w-xs bg-white p-4 overflow-y-auto">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="font-semibold text-gray-800">Categories</h3>
                  <button onClick={toggleFilters}>
                    <X size={20} />
                  </button>
                </div>
                <ul className="mb-6">
                  {bookCategories.map(category => (
                    <li 
                      key={category.name}
                      onClick={() => handleCategoryClick(category.name)}
                      className={`p-3 cursor-pointer hover:bg-blue-50 transition-colors ${category.active ? 'bg-blue-50 border-l-4 border-blue-600 text-blue-600' : 'text-gray-700'}`}
                    >
                      {category.name} ({category.count})
                    </li>
                  ))}
                </ul>

                {/* Shop by Demand button in mobile drawer */}
                <div className="bg-gradient-to-r from-orange-100 to-yellow-100 p-3 rounded-md mb-4">
                  <h3 className="font-semibold text-orange-800 mb-2 flex items-center text-sm">
                    <Flame size={14} className="text-orange-600 mr-1" />
                    Need something specific?
                  </h3>
                  <button 
                    onClick={() => {
                      toggleFilters(); // Close the filter drawer
                      navigate('/shop', { state: { activeTab: "demand" } });
                    }}
                    className="w-full bg-orange-500 hover:bg-orange-600 text-white font-medium py-2 px-3 rounded-md transition-colors flex items-center justify-center text-sm"
                  >
                    <Flame size={14} className="mr-1" />
                    Shop by Demand
                  </button>
                </div>
              </div>
            </div>
          )}
          
          {/* Desktop Book Categories */}
          <div className="hidden md:block w-64 mr-8">
            <h3 className="font-semibold text-gray-800 mb-2 px-3">Categories</h3>
            <ul className="mb-6">
              {bookCategories.map(category => (
                <li 
                  key={category.name}
                  onClick={() => handleCategoryClick(category.name)}
                  className={`p-3 cursor-pointer hover:bg-blue-50 transition-colors ${category.active ? 'bg-blue-50 border-l-4 border-blue-600 text-blue-600' : 'text-gray-700'}`}
                >
                  {category.name} ({category.count})
                </li>
              ))}
            </ul>

            {/* New Shop by Demand button replacing the old Store Info section */}
            <div className="bg-gradient-to-r from-orange-100 to-yellow-100 p-4 rounded-md mb-6 shadow-sm">
              <h3 className="font-semibold text-orange-800 mb-3 flex items-center">
                <Flame size={18} className="text-orange-600 mr-2" />
                Looking for something special?
              </h3>
              <p className="text-sm text-gray-700 mb-4">
                Can't find what you need? Try our Shop by Demand feature to request specific books or stationery items.
              </p>
              <button 
                onClick={() => navigate('/shop', { state: { activeTab: "demand" } })}
                className="w-full bg-orange-500 hover:bg-orange-600 text-white font-medium py-2 px-4 rounded-md transition-colors flex items-center justify-center"
              >
                <Flame size={16} className="mr-2" />
                Shop by Demand
              </button>
            </div>
          </div>
          
          {/* Book Listings */}
          <div className="flex-1">
            {/* Desktop header with search and filters */}
            <div className="hidden md:flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold">{activeCategory}</h2>
              <div className="flex items-center space-x-2">
                <button className="flex items-center border px-3 py-1 rounded-md hover:bg-gray-50">
                  <Filter size={16} className="mr-1" />
                  <span>Filters</span>
                </button>
                <select className="border px-3 py-1 rounded-md bg-white">
                  <option>Sort by: Popularity</option>
                  <option>Price: Low to High</option>
                  <option>Price: High to Low</option>
                  <option>Newest Arrivals</option>
                </select>
                <div className="relative">
                  <Search size={16} className="absolute left-3 top-3 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search within store"
                    className="pl-10 pr-4 py-2 border rounded-md w-64"
                    value={searchQuery}
                    onChange={e => setSearchQuery(e.target.value)}
                  />
                </div>
              </div>
            </div>

            <div className="hidden md:flex items-center text-gray-500 mb-6">
              <div className="flex items-center mr-4">
                <ShoppingCart size={16} className="mr-1" />
                <span>Free delivery on orders above ₹499</span>
              </div>
            </div>
            
            {/* Mobile category title */}
            <div className="md:hidden mb-3">
              <h2 className="text-lg font-bold">{activeCategory}</h2>
            </div>
            
            {/* Inventory Information */}
            <div className="mb-4 p-3 md:p-4 bg-blue-50 rounded-md text-sm">
              {booksLoading ? (
                <div className="animate-pulse">
                  <div className="h-5 bg-gray-200 rounded w-1/3 mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded w-2/3 mb-2"></div>
                </div>
              ) : storeBooks.length > 0 ? (
                <>
                  <h3 className="font-bold text-blue-800 mb-1 md:mb-2">Store Inventory</h3>
                  <p className="text-gray-700 text-xs md:text-sm">
                    We have {storeBooks.length} books available in our store.
                  </p>
                </>
              ) : (
                <>
                  <h3 className="font-bold text-blue-800 mb-1 md:mb-2">No Books Available</h3>
                  <p className="text-gray-700 text-xs md:text-sm">
                    Sorry, this store currently doesn't have any books in inventory.
                  </p>
                </>
              )}
            </div>
            
            {/* Books Error Message */}
            {booksError && (
              <div className="mb-4 p-3 md:p-4 bg-red-50 rounded-md border border-red-200">
                <h3 className="font-bold text-red-800 mb-2">Error Loading Books</h3>
                <p className="text-gray-700 text-sm">{booksError}</p>
              </div>
            )}
            
            {/* Book Grid - Adjusted for mobile */}
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4">
              {booksLoading ? (
                // Loading placeholders for books
                Array(4).fill().map((_, index) => (
                  <div key={index} className="border rounded-md p-2 md:p-3 flex flex-col h-full">
                    <div className="animate-pulse">
                      <div className="h-32 md:h-40 mb-2 bg-gray-200 rounded"></div>
                      <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                      <div className="h-3 bg-gray-200 rounded w-1/2 mb-2"></div>
                      <div className="h-3 bg-gray-200 rounded w-1/3 mb-3"></div>
                      <div className="h-5 bg-gray-200 rounded w-1/4 mb-3"></div>
                      <div className="h-8 bg-gray-200 rounded w-full mt-auto"></div>
                    </div>
                  </div>
                ))
              ) : displayedBooks.length > 0 ? (
                displayedBooks.map(book => (
                  <div key={book._id} className="border rounded-md p-2 md:p-3 hover:shadow-md transition-shadow flex flex-col h-full">
                    <div className="h-32 md:h-40 mb-2 bg-gray-100 flex items-center justify-center rounded overflow-hidden">
                      {book.image ? (
                        <img 
                          src={`${book.image}`} 
                          alt={book.title} 
                          className="h-full w-full object-cover"
                          onError={(e) => {
                            e.target.onerror = null;
                            e.target.src = "https://via.placeholder.com/150x200?text=No+Image";
                          }}
                        />
                      ) : (
                        <div className="text-gray-400 text-center text-xs p-2 md:p-4 md:text-sm">No Image Available</div>
                      )}
                    </div>
                    <h4 className="font-medium text-gray-800 text-sm md:text-base line-clamp-2">{book.title}</h4>
                    <p className="text-xs md:text-sm text-gray-500 line-clamp-1">{book.author}</p>
                    <p className="text-xs text-gray-400">{book.publisher || book.category}</p>
                    <div className="flex justify-between items-center mt-1 md:mt-2">
                      <span className="font-bold text-sm md:text-base">{formatPrice(book.price)}</span>
                      {book.originalPrice && book.originalPrice > book.price && (
                        <span className="text-xs text-gray-500 line-through">
                          {formatPrice(book.originalPrice)}
                        </span>
                      )}
                    </div>
                    <div className="mt-auto pt-2 md:pt-3">
                      {!bookQuantities[book._id] ? (
                        <button 
                          onClick={() => addToCart(book)}
                          className={`w-full bg-blue-600 text-white py-1 md:py-2 px-2 md:px-3 rounded-md hover:bg-blue-700 transition-colors flex items-center justify-center text-xs md:text-sm ${cartLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
                          disabled={book.status === "Out of Stock" || cartLoading}
                        >
                          {cartLoading ? (
                            <div className="w-4 h-4 border-t-2 border-b-2 border-white rounded-full animate-spin mr-1"></div>
                          ) : (
                            <ShoppingCart size={14} className="mr-1" />
                          )}
                          <span>{book.status === "Out of Stock" ? "Out of Stock" : "Add to Cart"}</span>
                        </button>
                      ) : (
                        <div className="w-full flex items-center justify-between border border-blue-600 rounded-md">
                          <button 
                            onClick={() => updateQuantity(book._id, -1)}
                            className={`bg-blue-600 text-white py-1 px-2 md:px-3 rounded-l-md hover:bg-blue-700 transition-colors text-xs md:text-sm ${cartLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
                            disabled={cartLoading}
                          >
                            -
                          </button>
                          <span className="px-2 text-sm">{bookQuantities[book._id]}</span>
                          <button 
                            onClick={() => updateQuantity(book._id, 1)}
                            className={`bg-blue-600 text-white py-1 px-2 md:px-3 rounded-r-md hover:bg-blue-700 transition-colors text-xs md:text-sm ${cartLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
                            disabled={cartLoading}
                          >
                            +
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                ))
              ) : (
                <div className="col-span-full text-center p-4 md:p-8 bg-gray-50 rounded-md">
                  <p className="text-gray-500 text-sm md:text-base">No books found matching your criteria.</p>
                  <button
                    onClick={() => {
                      setActiveCategory('All Books');
                      setSearchQuery('');
                    }}
                    className="mt-3 text-blue-600 hover:underline text-sm"
                  >
                    Reset filters
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StoreDetails;