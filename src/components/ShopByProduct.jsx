import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaBook, FaPen, FaSearch, FaShoppingCart, FaPencilAlt, FaEraser, FaFolder, FaQuestion, FaPlus, FaMinus } from "react-icons/fa";
import axios from "axios";

const API_BASE_URL = "https://backend-lzb7.onrender.com";

const ShopByProduct = ({ onBookSelect }) => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("books");
  const [search, setSearch] = useState("");
  const [books, setBooks] = useState([]);
  const [stationery, setStationery] = useState([]);
  const [loadingBooks, setLoadingBooks] = useState(false);
  const [loadingStationery, setLoadingStationery] = useState(false);
  const [error, setError] = useState("");
  
  // Cart state
  const [cartItems, setCartItems] = useState({});
  const [cartLoading, setCartLoading] = useState(false);
  const [cartError, setCartError] = useState("");
  const [cartSuccess, setCartSuccess] = useState("");

  // Fetch books from API
  useEffect(() => {
    const fetchBooks = async () => {
      if (activeTab === "books") {
        setLoadingBooks(true);
        setError("");
        try {
          const response = await axios.get(`${API_BASE_URL}/api/books`);
          console.log("Books API Response:", response.data);
          setBooks(response.data);
        } catch (err) {
          console.error("Error fetching books:", err);
          setError("Failed to load books. Please try again.");
        } finally {
          setLoadingBooks(false);
        }
      }
    };

    fetchBooks();
  }, [activeTab]);

  // Fetch stationery from API
  useEffect(() => {
    const fetchStationery = async () => {
      if (activeTab === "stationery") {
        setLoadingStationery(true);
        setError("");
        try {
          const response = await axios.get(`${API_BASE_URL}/api/stationery`);
          console.log("Stationery API Response:", response.data);
          setStationery(response.data);
        } catch (err) {
          console.error("Error fetching stationery:", err);
          setError("Failed to load stationery items. Please try again.");
        } finally {
          setLoadingStationery(false);
        }
      }
    };

    fetchStationery();
  }, [activeTab]);
  
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
          
          response.data.items.forEach(item => {
            // Handle both possible structures of productId (object or string)
            const productId = typeof item.productId === 'object' ? item.productId._id : item.productId;
            newQuantities[productId] = item.quantity;
          });
          
          setCartItems(newQuantities);
        }
      } catch (err) {
        console.error("Error fetching cart:", err);
        // Don't show error to user, just initialize empty cart
      }
    };
    
    fetchCart();
  }, []);

  // Filter products based on search
  const filteredStationery = stationery.filter((product) =>
    (product.name && product.name.toLowerCase().includes(search.toLowerCase())) ||
    (product.category && product.category.toLowerCase().includes(search.toLowerCase())) ||
    (product.brand && product.brand.toLowerCase().includes(search.toLowerCase())) ||
    (product.description && product.description.toLowerCase().includes(search.toLowerCase()))
  );

  const filteredBooks = books.filter(
    (book) =>
      (book.title && book.title.toLowerCase().includes(search.toLowerCase())) ||
      (book.author && book.author.toLowerCase().includes(search.toLowerCase())) ||
      (book.category && book.category.toLowerCase().includes(search.toLowerCase()))
  );

  // Add to cart function using API
  const addToCart = async (product, productType) => {
    try {
      setCartLoading(true);
      setCartError("");
      
      // Get the token from localStorage
      const token = localStorage.getItem('token');
      
      if (!token) {
        throw new Error('Authentication required. Please log in.');
      }
      
      // Determine the category based on product type
      const category = productType === "stationery" ? "Stationery" : "Book";
      
      // Make API call to add to cart
      const response = await axios.post(
        `${API_BASE_URL}/api/cart`,
        {
          productId: product._id,
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
        
        // Update local state for UI feedback
        setCartItems(prev => ({
          ...prev,
          [product._id]: (prev[product._id] || 0) + 1
        }));
        
        const productName = productType === "stationery" ? product.name : product.title;
        setCartSuccess(`${productName || "Product"} added to cart!`);
        
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
  const updateQuantity = async (productId, change, productType) => {
    try {
      setCartLoading(true);
      setCartError("");
      
      const currentQty = cartItems[productId] || 0;
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
      const cartItem = cartData.items.find(item => 
        item.productId._id === productId || item.productId === productId
      );
      
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
        const newCartItems = {...cartItems};
        delete newCartItems[productId];
        setCartItems(newCartItems);
        
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
        setCartItems(prev => ({
          ...prev,
          [productId]: newQty
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

  // Handle clicking on a book to view stores
  const handleBookClick = (book) => {
    if (onBookSelect) {
      onBookSelect(book);
    }
  };

  // Format price with rupee symbol
  const formatPrice = (price) => {
    return `₹${price}`;
  };

  // Get category icon
  const getCategoryIcon = (category) => {
    switch (category) {
      case "Pens":
        return <FaPen className="text-blue-500" />;
      case "Pencils":
        return <FaPencilAlt className="text-gray-600" />;
      case "Notebooks":
        return <FaBook className="text-green-500" />;
      case "Erasers":
        return <FaEraser className="text-red-400" />;
      case "Markers":
        return <FaPen className="text-purple-500" />;
      case "Files & Folders":
        return <FaFolder className="text-yellow-500" />;
      case "Other":
      default:
        return <FaQuestion className="text-gray-400" />;
    }
  };

  // Loading function
  const isLoading = () => {
    return (activeTab === "books" && loadingBooks) || 
           (activeTab === "stationery" && loadingStationery);
  };

  return (
    <div className="p-6 min-h-screen bg-gray-50">
      {/* Cart Status Messages */}
      {cartSuccess && (
        <div className="fixed top-20 right-4 bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded z-50">
          <span className="block sm:inline">{cartSuccess}</span>
        </div>
      )}
      
      {cartError && (
        <div className="fixed top-20 right-4 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded z-50">
          <span className="block sm:inline">{cartError}</span>
        </div>
      )}
    
      {/* Tabs */}
      <div className="flex mb-6">
        <button
          className={`px-6 py-3 text-lg font-semibold rounded-t-lg flex items-center gap-2 ${
            activeTab === "books"
              ? "bg-white text-blue-600 border-t border-r border-l border-gray-200"
              : "bg-gray-100 text-gray-600 hover:bg-gray-200"
          }`}
          onClick={() => setActiveTab("books")}
        >
          <FaBook /> Books
        </button>
        <button
          className={`px-6 py-3 text-lg font-semibold rounded-t-lg flex items-center gap-2 ${
            activeTab === "stationery"
              ? "bg-white text-blue-600 border-t border-r border-l border-gray-200"
              : "bg-gray-100 text-gray-600 hover:bg-gray-200"
          }`}
          onClick={() => setActiveTab("stationery")}
        >
          <FaPen /> Stationery
        </button>
      </div>

      {/* Search Section */}
      <div className="flex justify-center mb-8 bg-white p-4 rounded-lg shadow-lg border border-gray-200">
        {/* Search Bar */}
        <div className="relative w-full md:w-2/3">
          <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
          <input
            type="text"
            placeholder={`Search for ${activeTab === "books" ? "books" : "stationery"}...`}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="border border-gray-300 pl-10 pr-4 py-2 rounded-md w-full focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none shadow-md"
          />
        </div>
      </div>

      {/* Loading Message */}
      {isLoading() && (
        <div className="flex justify-center items-center py-10">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
          <span className="ml-3 text-gray-600">Loading...</span>
        </div>
      )}

      {/* Error Message */}
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 p-4 rounded-md mb-6">
          <p>{error}</p>
        </div>
      )}

      {/* Books Tab Content */}
      {activeTab === "books" && !loadingBooks && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredBooks.length > 0 ? (
            filteredBooks.map((book) => (
              <div
                key={book._id}
                className="border bg-white p-4 rounded-xl shadow-md hover:shadow-lg transition transform hover:-translate-y-1 cursor-pointer"
                onClick={() => handleBookClick(book)}
              >
                {/* Image container */}
                <div className="relative h-48 mb-3 bg-gray-100 rounded-md flex items-center justify-center overflow-hidden">
                  {book.image ? (
                    <div className="w-full h-full flex items-center justify-center p-2">
                      <img
                        src={`${book.image}`}
                        alt={book.title}
                        className="max-h-full max-w-full object-contain"
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.src = "https://via.placeholder.com/150x200?text=No+Image";
                        }}
                      />
                    </div>
                  ) : (
                    <div className="text-center text-gray-400 p-4">
                      <FaBook size={30} className="mx-auto mb-2" />
                      <p>No Image Available</p>
                    </div>
                  )}
                  {book.status === "Out of Stock" && (
                    <div className="absolute top-0 right-0 bg-red-500 text-white text-xs font-bold px-2 py-1 m-2 rounded">
                      Out of Stock
                    </div>
                  )}
                </div>
                <h3 className="text-lg font-semibold text-gray-800 line-clamp-1">{book.title}</h3>
                <p className="text-gray-600 text-sm mb-1">By {book.author}</p>
                <p className="text-xs text-gray-500 mb-2">{book.category || "General"}</p>
                
                <div className="flex justify-between items-center mt-auto">
                  <div>
                    <span className="font-bold text-gray-900">{formatPrice(book.price)}</span>
                    {book.originalPrice && book.originalPrice > book.price && (
                      <span className="text-xs text-gray-500 line-through ml-2">
                        {formatPrice(book.originalPrice)}
                      </span>
                    )}
                  </div>
                  
                  {/* Cart buttons for books */}
                  {!cartItems[book._id] ? (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        addToCart(book, "book");
                      }}
                      disabled={book.status === "Out of Stock" || cartLoading}
                      className={`flex items-center gap-1 px-3 py-1 rounded-md ${
                        book.status === "Out of Stock" || cartLoading
                          ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                          : "bg-blue-500 text-white hover:bg-blue-600"
                      }`}
                    >
                      {cartLoading ? (
                        <div className="w-4 h-4 border-t-2 border-b-2 border-white rounded-full animate-spin"></div>
                      ) : (
                        <FaShoppingCart className="text-sm" />
                      )}
                      <span>{book.status === "Out of Stock" ? "Out of Stock" : "Add to Cart"}</span>
                    </button>
                  ) : (
                    <div className="flex items-center border border-gray-200 rounded-md">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          updateQuantity(book._id, -1, "book");
                        }}
                        disabled={cartLoading}
                        className={`p-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-l-md ${
                          cartLoading ? "opacity-50 cursor-not-allowed" : ""
                        }`}
                      >
                        <FaMinus size={12} />
                      </button>
                      <span className="px-3 py-1 text-center min-w-8">
                        {cartItems[book._id]}
                      </span>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          updateQuantity(book._id, 1, "book");
                        }}
                        disabled={cartLoading}
                        className={`p-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-r-md ${
                          cartLoading ? "opacity-50 cursor-not-allowed" : ""
                        }`}
                      >
                        <FaPlus size={12} />
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-full text-center py-10">
              <p className="text-gray-500 mb-4">No books found matching your search.</p>
              {search && (
                <button
                  onClick={() => setSearch("")}
                  className="text-blue-500 hover:underline"
                >
                  Clear search
                </button>
              )}
            </div>
          )}
        </div>
      )}

      {/* Stationery Tab Content */}
      {activeTab === "stationery" && !loadingStationery && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredStationery.length > 0 ? (
            filteredStationery.map((product) => (
              <div
                key={product._id}
                className="border bg-white p-4 rounded-xl shadow-md hover:shadow-lg transition transform hover:-translate-y-1"
              >
                <div className="h-48 mb-3 bg-gray-100 rounded-md flex items-center justify-center overflow-hidden">
                  {product.image ? (
                    <div className="w-full h-full flex items-center justify-center p-2">
                      <img
                        src={`${product.image}`}
                        alt={product.name}
                        className="max-h-full max-w-full object-contain"
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.src = "https://via.placeholder.com/150x200?text=No+Image";
                        }}
                      />
                    </div>
                  ) : (
                    <div className="flex flex-col items-center justify-center text-center p-4">
                      {getCategoryIcon(product.category)}
                      <span className="mt-2 text-gray-500">{product.category || "Stationery"}</span>
                    </div>
                  )}
                </div>
                <h3 className="text-lg font-semibold text-gray-800 line-clamp-1">{product.name}</h3>
                {product.brand && (
                  <p className="text-gray-600 text-sm mb-1">Brand: {product.brand}</p>
                )}
                {product.description && (
                  <p className="text-xs text-gray-500 mb-2 line-clamp-2">{product.description}</p>
                )}
                
                <div className="flex justify-between items-center mt-auto">
                  <div>
                    <span className="font-bold text-gray-900">{formatPrice(product.price)}</span>
                    {product.discount > 0 && (
                      <span className="ml-2 text-xs text-green-600 font-medium">
                        {product.discount}% OFF
                      </span>
                    )}
                  </div>
                  
                  {/* Cart buttons for stationery items - now with backend integration */}
                  {!cartItems[product._id] ? (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        addToCart(product, "stationery");
                      }}
                      disabled={product.status === "Out of Stock" || cartLoading}
                      className={`flex items-center gap-1 px-3 py-1 rounded-md ${
                        product.status === "Out of Stock" || cartLoading
                          ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                          : "bg-blue-500 text-white hover:bg-blue-600"
                      }`}
                    >
                      {cartLoading ? (
                        <div className="w-4 h-4 border-t-2 border-b-2 border-white rounded-full animate-spin"></div>
                      ) : (
                        <FaShoppingCart className="text-sm" />
                      )}
                      <span>{product.status === "Out of Stock" ? "Out of Stock" : "Add to Cart"}</span>
                    </button>
                  ) : (
                    <div className="flex items-center border border-gray-200 rounded-md">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          updateQuantity(product._id, -1, "stationery");
                        }}
                        disabled={cartLoading}
                        className={`p-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-l-md ${
                          cartLoading ? "opacity-50 cursor-not-allowed" : ""
                        }`}
                      >
                        <FaMinus size={12} />
                      </button>
                      <span className="px-3 py-1 text-center min-w-8">
                        {cartItems[product._id]}
                      </span>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          updateQuantity(product._id, 1, "stationery");
                        }}
                        disabled={cartLoading}
                        className={`p-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-r-md ${
                          cartLoading ? "opacity-50 cursor-not-allowed" : ""
                        }`}
                      >
                        <FaPlus size={12} />
                      </button>
                    </div>
                  )}
                </div>
                
                {product.status === "Low Stock" && (
                  <div className="mt-2 text-xs text-amber-600 font-medium">
                    Only {product.stock} left!
                  </div>
                )}
                
                {product.status === "Out of Stock" && (
                  <div className="mt-2 text-xs text-red-600 font-medium">
                    Out of stock
                  </div>
                )}
              </div>
            ))
          ) : (
            <div className="col-span-full text-center py-10">
              <p className="text-gray-500 mb-4">No stationery items found matching your search.</p>
              {search && (
                <button
                  onClick={() => setSearch("")}
                  className="text-blue-500 hover:underline"
                >
                  Clear search
                </button>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ShopByProduct;