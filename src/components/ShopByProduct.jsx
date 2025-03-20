import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaShoppingBag, FaFilter, FaSearch, FaBook, FaPen, FaShoppingCart, FaPencilAlt, FaEraser, FaFolder, FaQuestion, FaPlus, FaMinus } from "react-icons/fa";
import axios from "axios";
import StoresViewBooks from "./StoresViewBooks";

const API_BASE_URL = "https://backend-lzb7.onrender.com";

const ShopByProduct = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("books");
  const [search, setSearch] = useState("");
  const [books, setBooks] = useState([]);
  const [stationery, setStationery] = useState([]);
  const [loadingBooks, setLoadingBooks] = useState(false);
  const [loadingStationery, setLoadingStationery] = useState(false);
  const [error, setError] = useState("");
  const [cartItems, setCartItems] = useState({});
  const [selectedBook, setSelectedBook] = useState(null);

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

  // Handle adding to cart
  const addToCart = (productId) => {
    setCartItems(prev => {
      return {
        ...prev,
        [productId]: (prev[productId] || 0) + 1
      };
    });
  };

  // Handle removing from cart
  const removeFromCart = (productId) => {
    setCartItems(prev => {
      const currentQuantity = prev[productId] || 0;
      if (currentQuantity <= 1) {
        const newCart = { ...prev };
        delete newCart[productId];
        return newCart;
      }
      return {
        ...prev,
        [productId]: currentQuantity - 1
      };
    });
  };

  // Handle clicking on a book to view stores
  const handleBookClick = (book) => {
    setSelectedBook(book);
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
  
  if (selectedBook) {
    return <StoresViewBooks 
      selectedBook={selectedBook} 
      onBack={() => setSelectedBook(null)} 
    />;
  }

  return (
    <div className="p-6 min-h-screen bg-gray-50">
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

      {/* Search & Filter Section */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-8 bg-white p-4 rounded-lg shadow-lg border border-gray-200">
        {/* Search Bar */}
        <div className="relative w-full md:w-1/3">
          <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
          <input
            type="text"
            placeholder={`Search for ${activeTab === "books" ? "books" : "stationery"}...`}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="border border-gray-300 pl-10 pr-4 py-2 rounded-md w-full focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none shadow-md"
          />
        </div>

        {/* Filter Button */}
        <button className="flex items-center gap-2 bg-blue-100 hover:bg-blue-200 text-blue-700 px-5 py-2 rounded-md transition shadow mt-4 md:mt-0">
          <FaFilter /> Filter
        </button>
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
                {/* Modified image container to properly display book covers */}
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
                  
                  <button
                    className="text-blue-600 text-sm hover:text-blue-800 hover:underline flex items-center"
                  >
                    View Stores <span className="ml-1">→</span>
                  </button>
                </div>
                
                {cartItems[book._id] && (
                  <div className="mt-2 text-sm text-green-600 font-semibold">
                    {cartItems[book._id]} in cart
                  </div>
                )}
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
                  
                  {/* Changed cart button for stationery */}
                  {!cartItems[product._id] ? (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        addToCart(product._id);
                      }}
                      disabled={product.status === "Out of Stock"}
                      className={`flex items-center gap-1 px-3 py-1 rounded-md ${
                        product.status === "Out of Stock"
                          ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                          : "bg-blue-500 text-white hover:bg-blue-600"
                      }`}
                    >
                      <FaShoppingCart className="text-sm" />
                      <span>Add to Cart</span>
                    </button>
                  ) : (
                    <div className="flex items-center border border-gray-200 rounded-md">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          removeFromCart(product._id);
                        }}
                        className="p-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-l-md"
                      >
                        <FaMinus size={12} />
                      </button>
                      <span className="px-3 py-1 text-center min-w-8">
                        {cartItems[product._id]}
                      </span>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          addToCart(product._id);
                        }}
                        className="p-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-r-md"
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