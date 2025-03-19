import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Info, Phone, Navigation, Share, Star, Clock, FileText, Book, ShoppingCart, Filter, Search, ArrowLeft } from 'lucide-react';
import Header from '../components/Header';
import toonzkartLogo from "../assets/toonzkart_logo.png";

const API_BASE_URL = "https://backend-lzb7.onrender.com"; // Backend API URL

const StoreDetails = () => {
  // Changed from storeId to id to match the route parameter
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
  
  // Use local state for cart items and quantities
  const [cartItems, setCartItems] = useState([]);
  const [bookQuantities, setBookQuantities] = useState({});
  
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('All Books');
  const [activeSubject, setActiveSubject] = useState(null);
  const [showSchools, setShowSchools] = useState(true);

  // Fetch store details from API
  useEffect(() => {
    const fetchStoreDetails = async () => {
      setLoading(true);
      try {
        // Use id parameter instead of storeId
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
  };

  const handleSubjectClick = (subject) => {
    setActiveSubject(subject === activeSubject ? null : subject);
  };

  // Simplified add to cart function without alerts
  const addToCart = (book) => {
    // Check if book is already in cart quantities
    if (bookQuantities[book._id]) {
      // Book already has quantity, just increment it
      setBookQuantities(prev => ({
        ...prev,
        [book._id]: (prev[book._id] || 0) + 1
      }));
      return;
    }
    
    // Add book to quantities with initial count of 1
    setBookQuantities(prev => ({
      ...prev,
      [book._id]: 1
    }));
    
    // Add to cart items if not already there
    setCartItems(prev => [...prev, book]);
  };
  
  // Simplified quantity update function without alerts
  const updateQuantity = (bookId, change) => {
    const currentQty = bookQuantities[bookId] || 0;
    const newQty = Math.max(0, currentQty + change);
    
    if (newQty === 0) {
      // Remove from quantities
      const newQuantities = {...bookQuantities};
      delete newQuantities[bookId];
      setBookQuantities(newQuantities);
      
      // Remove from cart
      setCartItems(cartItems.filter(item => item._id !== bookId));
    } else {
      // Update quantity
      setBookQuantities(prev => ({
        ...prev,
        [bookId]: newQty
      }));
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

  // Format store hours for display
  const formatStoreHours = (hours) => {
    return hours || "9am – 8:30pm"; // Default if not provided
  };
  
  // Format price with rupee symbol
  const formatPrice = (price) => {
    return `₹${price}`;
  };
  
  // Handle back button click
  const handleBack = () => {
    navigate(-1);
  };

  // Error state for the entire page only if completely failed
  if (error && !store) {
    return (
      <div className="w-full min-h-screen flex items-center justify-center">
        <div className="text-center">
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

      <div className="w-full px-6 pt-6">
        {/* Back Button */}
        <button
          onClick={handleBack}
          className="flex items-center gap-2 mb-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
        >
          <ArrowLeft size={18} />
          <span>Back</span>
        </button>
        
        {/* Bookstore Info */}
        <div className="mb-6 relative">
          {loading ? (
            <div className="p-6 bg-white rounded-md shadow-sm">
              <div className="animate-pulse">
                <div className="h-8 bg-gray-200 rounded w-1/3 mb-2"></div>
                <div className="h-4 bg-gray-200 rounded w-2/3 mb-2"></div>
                <div className="h-4 bg-gray-200 rounded w-1/2 mb-3"></div>
                <div className="h-4 bg-gray-200 rounded w-3/4 mb-4"></div>
                <div className="flex space-x-2 mb-6">
                  <div className="h-10 bg-gray-200 rounded w-24"></div>
                  <div className="h-10 bg-gray-200 rounded w-24"></div>
                  <div className="h-10 bg-gray-200 rounded w-24"></div>
                  <div className="h-10 bg-gray-200 rounded w-32"></div>
                </div>
              </div>
            </div>
          ) : (
            <>
              <h1 className="text-3xl font-bold mb-1">{store?.storeName || "Store"}</h1>
              <p className="text-gray-600 mb-1">{store?.description || "Books and more"}</p>
              <p className="text-gray-500 mb-3">{store?.address || "Loading address..."}</p>
              
              <div className="flex items-center mb-4">
                <div className="flex items-center">
                  <Clock size={16} className="text-gray-400 mr-1" />
                  <span className="text-gray-500 mr-1">Open now -</span>
                  <span className="text-gray-700">{formatStoreHours(store?.storeHours)} (Today)</span>
                  <Info size={16} className="text-gray-400 ml-1" />
                </div>
                <span className="mx-3 text-gray-300">|</span>
                <div className="flex items-center">
                  <Phone size={16} className="text-gray-400 mr-1" />
                  <span className="text-blue-600 hover:underline cursor-pointer">{store?.phoneNumber || "N/A"}</span>
                </div>
              </div>
              
              <div className="flex space-x-2 mb-6">
                <button className="flex items-center px-4 py-2 border rounded-md hover:bg-blue-50 transition-colors">
                  <Navigation size={16} className="mr-1 text-blue-600" />
                  <span>Direction</span>
                </button>
                <button className="flex items-center px-4 py-2 border rounded-md hover:bg-blue-50 transition-colors">
                  <Share size={16} className="mr-1 text-blue-600" />
                  <span>Share</span>
                </button>
                <button className="flex items-center px-4 py-2 border rounded-md hover:bg-blue-50 transition-colors">
                  <FileText size={16} className="mr-1 text-blue-600" />
                  <span>Reviews</span>
                </button>
                <button className="flex items-center px-4 py-2 border rounded-md hover:bg-blue-50 transition-colors">
                  <Book size={16} className="mr-1 text-blue-600" />
                  <span>Book an Appointment</span>
                </button>
              </div>
            </>
          )}

          {/* Ratings Section - Fixed alignment */}
          <div className="absolute top-0 right-0 flex space-x-4">
            {loading ? (
              <div className="flex space-x-4">
                <div className="w-28 h-16 bg-gray-200 rounded animate-pulse"></div>
                <div className="w-28 h-16 bg-gray-200 rounded animate-pulse"></div>
              </div>
            ) : (
              <>
                <div className="bg-blue-600 text-white p-2 rounded flex items-center">
                  <span className="font-bold mr-1">4.2</span>
                  <Star size={16} fill="white" />
                  <div className="ml-2 text-xs">
                    <div>235</div>
                    <div>Store Ratings</div>
                  </div>
                </div>
                <div className="bg-green-600 text-white p-2 rounded flex items-center">
                  <span className="font-bold mr-1">4.5</span>
                  <Star size={16} fill="white" />
                  <div className="ml-2 text-xs">
                    <div>1.2K</div>
                    <div>Delivery Ratings</div>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>

        {/* Browse Books Section */}
        <div className="flex pb-8">
          {/* Book Categories */}
          <div className="w-64 mr-8">
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

            {/* Store Information */}
            <div className="bg-blue-50 p-4 rounded-md mb-6">
              <h3 className="font-semibold text-gray-800 mb-2">Store Info</h3>
              {loading ? (
                <div className="animate-pulse">
                  <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded w-1/2 mb-2"></div>
                </div>
              ) : (
                <div className="text-sm">
                  <p className="mb-1"><span className="font-medium">Manager:</span> {store?.managerName || "Not specified"}</p>
                  <p className="mb-1"><span className="font-medium">Email:</span> {store?.email || "Not specified"}</p>
                  <p className="mb-1"><span className="font-medium">Phone:</span> {store?.phoneNumber || "Not specified"}</p>
                  <p className="mb-1"><span className="font-medium">Website:</span> {store?.website || "Not specified"}</p>
                </div>
              )}
            </div>
          </div>
          
          {/* Book Listings */}
          <div className="flex-1">
            <div className="flex justify-between items-center mb-4">
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
              </div>
            </div>

            <div className="flex items-center text-gray-500 mb-6">
              <div className="flex items-center mr-4">
                <ShoppingCart size={16} className="mr-1" />
                <span>Free delivery on orders above ₹499</span>
              </div>
              <div className="flex items-center">
                <Clock size={16} className="mr-1" />
                <span>Delivery in 24-48 hrs</span>
              </div>
              
              <div className="ml-auto">
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
            
            {/* Inventory Information */}
            <div className="mb-6 p-4 bg-blue-50 rounded-md">
              {booksLoading ? (
                <div className="animate-pulse">
                  <div className="h-6 bg-gray-200 rounded w-1/3 mb-3"></div>
                  <div className="h-4 bg-gray-200 rounded w-2/3 mb-3"></div>
                </div>
              ) : storeBooks.length > 0 ? (
                <>
                  <h3 className="font-bold text-blue-800 mb-2">Store Inventory</h3>
                  <p className="text-gray-700 mb-2">
                    We have {storeBooks.length} books available in our store.
                  </p>
                </>
              ) : (
                <>
                  <h3 className="font-bold text-blue-800 mb-2">No Books Available</h3>
                  <p className="text-gray-700 mb-2">
                    Sorry, this store currently doesn't have any books in inventory.
                  </p>
                </>
              )}
            </div>
            
            {/* Books Error Message */}
            {booksError && (
              <div className="mb-6 p-4 bg-red-50 rounded-md border border-red-200">
                <h3 className="font-bold text-red-800 mb-2">Error Loading Books</h3>
                <p className="text-gray-700">{booksError}</p>
              </div>
            )}
            
            {/* Book Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {booksLoading ? (
                // Loading placeholders for books
                Array(4).fill().map((_, index) => (
                  <div key={index} className="border rounded-md p-3 flex flex-col h-full">
                    <div className="animate-pulse">
                      <div className="h-40 mb-2 bg-gray-200 rounded"></div>
                      <div className="h-5 bg-gray-200 rounded w-3/4 mb-2"></div>
                      <div className="h-4 bg-gray-200 rounded w-1/2 mb-2"></div>
                      <div className="h-3 bg-gray-200 rounded w-1/3 mb-3"></div>
                      <div className="h-5 bg-gray-200 rounded w-1/4 mb-3"></div>
                      <div className="h-10 bg-gray-200 rounded w-full mt-auto"></div>
                    </div>
                  </div>
                ))
              ) : displayedBooks.length > 0 ? (
                displayedBooks.map(book => (
                  <div key={book._id} className="border rounded-md p-3 hover:shadow-md transition-shadow flex flex-col h-full">
                    <div className="h-40 mb-2 bg-gray-100 flex items-center justify-center rounded overflow-hidden">
                      {book.image ? (
                        <img 
                          src={`${API_BASE_URL}${book.image}`} 
                          alt={book.title} 
                          className="h-full w-full object-cover"
                          onError={(e) => {
                            e.target.onerror = null;
                            e.target.src = "https://via.placeholder.com/150x200?text=No+Image";
                          }}
                        />
                      ) : (
                        <div className="text-gray-400 text-center p-4">No Image Available</div>
                      )}
                    </div>
                    <h4 className="font-medium text-gray-800 line-clamp-2">{book.title}</h4>
                    <p className="text-sm text-gray-500">{book.author}</p>
                    <p className="text-xs text-gray-400">{book.publisher || book.category}</p>
                    <div className="flex justify-between items-center mt-2">
                      <span className="font-bold">{formatPrice(book.price)}</span>
                      {book.originalPrice && book.originalPrice > book.price && (
                        <span className="text-xs text-gray-500 line-through">
                          {formatPrice(book.originalPrice)}
                        </span>
                      )}
                    </div>
                    <div className="mt-auto pt-3">
                      {!bookQuantities[book._id] ? (
                        <button 
                          onClick={() => addToCart(book)}
                          className="w-full bg-blue-600 text-white py-2 px-3 rounded-md hover:bg-blue-700 transition-colors flex items-center justify-center"
                          disabled={book.status === "Out of Stock"}
                        >
                          <ShoppingCart size={16} className="mr-2" />
                          <span>{book.status === "Out of Stock" ? "Out of Stock" : "Add to Cart"}</span>
                        </button>
                      ) : (
                        <div className="w-full flex items-center justify-between border border-blue-600 rounded-md">
                          <button 
                            onClick={() => updateQuantity(book._id, -1)}
                            className="bg-blue-600 text-white py-1 px-3 rounded-l-md hover:bg-blue-700 transition-colors"
                          >
                            -
                          </button>
                          <span className="px-3">{bookQuantities[book._id]}</span>
                          <button 
                            onClick={() => updateQuantity(book._id, 1)}
                            className="bg-blue-600 text-white py-1 px-3 rounded-r-md hover:bg-blue-700 transition-colors"
                          >
                            +
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                ))
              ) : (
                <div className="col-span-full text-center p-8 bg-gray-50 rounded-md">
                  <p className="text-gray-500">No books found matching your criteria.</p>
                  <button
                    onClick={() => {
                      setActiveCategory('All Books');
                      setSearchQuery('');
                    }}
                    className="mt-4 text-blue-600 hover:underline"
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