import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaBook,
  FaPen,
  FaSearch,
  FaShoppingCart,
  FaPencilAlt,
  FaEraser,
  FaFolder,
  FaQuestion,
  FaPlus,
  FaMinus,
  FaChevronLeft,
  FaChevronRight,
  FaBookOpen,
  FaBolt,
  FaAngleLeft,
  FaAngleRight,
} from "react-icons/fa";
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
  const [cartLoadingMap, setCartLoadingMap] = useState({});

  // Fetch books from API
  useEffect(() => {
    const fetchBooks = async () => {
      if (
        activeTab === "books" ||
        activeTab === "ncertBooks" ||
        activeTab === "fastMoving"
      ) {
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
      if (
        activeTab === "stationery" ||
        activeTab === "notebooks" ||
        activeTab === "fastMoving"
      ) {
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
        const token = localStorage.getItem("token");

        if (!token) {
          // User not logged in, don't attempt to fetch cart
          return;
        }

        const response = await axios.get(`${API_BASE_URL}/api/cart`, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });

        if (response.data && response.data.items) {
          // Create quantities object from the API response
          const newQuantities = {};

          response.data.items.forEach((item) => {
            // Handle both possible structures of productId (object or string)
            const productId =
              typeof item.productId === "object"
                ? item.productId._id
                : item.productId;
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
  const filteredStationery = stationery.filter(
    (product) =>
      (product.name &&
        product.name.toLowerCase().includes(search.toLowerCase())) ||
      (product.category &&
        product.category.toLowerCase().includes(search.toLowerCase())) ||
      (product.brand &&
        product.brand.toLowerCase().includes(search.toLowerCase())) ||
      (product.description &&
        product.description.toLowerCase().includes(search.toLowerCase()))
  );

  const filteredBooks = books.filter(
    (book) =>
      (book.title && book.title.toLowerCase().includes(search.toLowerCase())) ||
      (book.author &&
        book.author.toLowerCase().includes(search.toLowerCase())) ||
      (book.category &&
        book.category.toLowerCase().includes(search.toLowerCase())) ||
      (book.description &&
        book.description.toLowerCase().includes(search.toLowerCase()))
  );

  // Filter NCERT books
  const ncertBooks = filteredBooks.filter(
    (book) => book.title && book.title.toUpperCase().includes("NCERT")
  );

  // Filter notebooks
  const notebooks = filteredStationery.filter(
    (product) => product.category === "Notebooks"
  );

  // For fast moving products
  const fastMovingItems = [...filteredBooks.slice(0, 12), ...filteredStationery.slice(0, 12)];

  // Determine which items array to use based on active tab
  let currentItems = [];

  switch (activeTab) {
    case "books":
      currentItems = filteredBooks;
      break;
    case "stationery":
      currentItems = filteredStationery;
      break;
    case "ncertBooks":
      currentItems = ncertBooks;
      break;
    case "notebooks":
      currentItems = notebooks;
      break;
    case "fastMoving":
      currentItems = fastMovingItems;
      break;
    default:
      currentItems = filteredBooks;
  }

  // Create sections from the fetched books for display
  const createBookSections = () => {
    // Use the real books data from API
    if (filteredBooks.length === 0) return [];
    
    // Categorize books for demonstration
    return [
      { 
        title: "Popular Books", 
        items: filteredBooks.slice(0, Math.min(12, filteredBooks.length))
      },
      { 
        title: "New Releases", 
        items: filteredBooks.slice(Math.min(6, filteredBooks.length), Math.min(18, filteredBooks.length))
      },
      { 
        title: "Bestsellers", 
        items: filteredBooks.slice(Math.min(12, filteredBooks.length), Math.min(24, filteredBooks.length))
      },
      { 
        title: "Recommended Reads", 
        items: filteredBooks.slice(Math.min(18, filteredBooks.length), Math.min(30, filteredBooks.length))
      }
    ].filter(section => section.items.length > 0);
  };

  // Add to cart function using API
  const addToCart = async (product, productType) => {
    const productId = product._id;

    setCartLoadingMap((prev) => ({ ...prev, [productId]: true }));
    setCartError("");

    try {
      const token = localStorage.getItem("token");
      if (!token) {
        setCartLoadingMap((prev) => ({ ...prev, [productId]: false }));
        localStorage.setItem("redirectAfterLogin", window.location.pathname);
        navigate("/login");
        return;
      }

      const category = productType === "stationery" ? "Stationery" : "Book";

      const response = await axios.post(
        `${API_BASE_URL}/api/cart`,
        {
          productId: productId,
          quantity: 1,
          category: category,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (response.data) {
        setCartItems((prev) => ({
          ...prev,
          [productId]: (prev[productId] || 0) + 1,
        }));

        const productName =
          productType === "stationery" ? product.name : product.title;
        setCartSuccess(`${productName || "Product"} added to cart!`);
        setTimeout(() => setCartSuccess(""), 3000);
      }
    } catch (err) {
      const message =
        err.response?.data?.message ||
        "Failed to add to cart. Please try again.";
      setCartError(message);
      setTimeout(() => setCartError(""), 3000);
    } finally {
      setCartLoadingMap((prev) => ({ ...prev, [productId]: false }));
    }
  };

  // Update quantity using API
  const updateQuantity = async (productId, change, productType) => {
    try {
      setCartLoading(true);
      setCartError("");

      // Get the token from localStorage
      const token = localStorage.getItem("token");

      // If user is not logged in, redirect to login page
      if (!token) {
        setCartLoading(false);
        localStorage.setItem("redirectAfterLogin", window.location.pathname);
        navigate("/login");
        return;
      }

      const currentQty = cartItems[productId] || 0;
      const newQty = Math.max(0, currentQty + change);

      // Find the cart item associated with this product
      const response = await axios.get(`${API_BASE_URL}/api/cart`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      // Find the cart item ID for this product
      const cartData = response.data;
      const cartItem = cartData.items.find(
        (item) =>
          item.productId._id === productId || item.productId === productId
      );

      if (!cartItem) {
        throw new Error("Item not found in cart");
      }

      if (newQty === 0) {
        // Remove from cart if quantity is 0
        await axios.delete(`${API_BASE_URL}/api/cart/${cartItem._id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });

        // Update local state
        const newCartItems = { ...cartItems };
        delete newCartItems[productId];
        setCartItems(newCartItems);

        setCartSuccess("Item removed from cart");
      } else {
        // Update quantity
        await axios.put(
          `${API_BASE_URL}/api/cart/${cartItem._id}`,
          {
            quantity: newQty,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );

        // Update local state
        setCartItems((prev) => ({
          ...prev,
          [productId]: newQty,
        }));

        setCartSuccess("Cart updated successfully");
      }

      // Clear success message after 3 seconds
      setTimeout(() => {
        setCartSuccess("");
      }, 3000);
    } catch (err) {
      console.error("Error updating cart:", err);
      const message =
        err.response?.data?.message ||
        "Failed to update cart. Please try again.";
      setCartError(message);

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
    return (
      (activeTab === "books" && loadingBooks) ||
      (activeTab === "stationery" && loadingStationery) ||
      (activeTab === "ncertBooks" && loadingBooks) ||
      (activeTab === "notebooks" && loadingStationery) ||
      (activeTab === "fastMoving" && (loadingBooks || loadingStationery))
    );
  };

  // Determine if an item is a book or stationery based on its properties
  const isBook = (item) => {
    return item.hasOwnProperty("title") && item.hasOwnProperty("author");
  };

  // Render a product card based on its type
  const renderProductCard = (item) => {
    const isBookItem = isBook(item);
    const productType = isBookItem ? "book" : "stationery";
    // Calculate original price for display (30% off)
    const originalPrice = Math.round(item.price * 100 / 70);

    return (
      <div
        key={item._id}
        className="bg-white rounded-md shadow-lg hover:shadow-xl transition-all flex flex-col h-full border border-gray-200"
      >
        {/* Image container - background changed to white */}
        <div className="relative h-48 bg-white rounded-t flex items-center justify-center overflow-hidden">
          {item.image ? (
            <div className="w-full h-full flex items-center justify-center p-2">
              <img
                src={`${item.image}`}
                alt={isBookItem ? item.title : item.name}
                className="max-h-full max-w-full object-contain"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src =
                    "https://via.placeholder.com/150x200?text=No+Image";
                }}
              />
            </div>
          ) : (
            <div className="text-center text-gray-400 p-4">
              {isBookItem ? (
                <FaBook size={30} className="mx-auto mb-2" />
              ) : (
                getCategoryIcon(item.category)
              )}
              <p>No Image Available</p>
            </div>
          )}
          {item.status === "Out of Stock" && (
            <div className="absolute top-0 right-0 bg-red-500 text-white text-xs font-bold px-2 py-1 m-2 rounded">
              Out of Stock
            </div>
          )}
        </div>

        <div className="p-4 flex flex-col flex-grow">
          {isBookItem ? (
            <>
              <h3 
                className="text-lg font-semibold text-gray-800 line-clamp-1 hover:cursor-pointer" 
                onClick={() => handleBookClick(item)}
              >
                {item.title}
              </h3>
              <p className="text-gray-600 text-sm mb-2">{item.author}</p>
              
              <div className="mt-auto">
                <div className="flex items-center">
                  <span className="font-bold text-gray-900">
                    {formatPrice(item.price)}
                  </span>
                  <span className="text-gray-500 line-through ml-2">
                    {formatPrice(originalPrice)}
                  </span>
                  <span className="ml-2 text-green-600 font-medium">
                    (30%)
                  </span>
                </div>

                {item.status === "Out of Stock" ? (
                  <button
                    disabled
                    className="mt-2 py-1.5 w-full bg-gray-100 text-gray-400 rounded text-sm font-medium text-center border border-gray-200 transition-colors"
                  >
                    SOLD OUT
                  </button>
                ) : (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      addToCart(item, "book");
                    }}
                    disabled={cartLoadingMap[item._id]}
                    className={`mt-2 py-1.5 w-full bg-white text-blue-600 rounded text-sm font-medium text-center border border-blue-500 hover:bg-blue-50 transition-colors ${
                      cartLoadingMap[item._id] ? "opacity-70" : ""
                    }`}
                  >
                    {cartLoadingMap[item._id] ? (
                      <div className="w-4 h-4 border-t-2 border-b-2 border-blue-500 rounded-full animate-spin mx-auto"></div>
                    ) : (
                      "ADD TO BAG"
                    )}
                  </button>
                )}
              </div>
            </>
          ) : (
            // Stationery items - same pattern but with name instead of title/author
            <>
              <h3 className="text-lg font-semibold text-gray-800 line-clamp-1">
                {item.name}
              </h3>
              {item.brand && (
                <p className="text-gray-600 text-sm mb-2">{item.brand}</p>
              )}
              
              <div className="mt-auto">
                <div className="flex items-center">
                  <span className="font-bold text-gray-900">
                    {formatPrice(item.price)}
                  </span>
                  <span className="text-gray-500 line-through ml-2">
                    {formatPrice(originalPrice)}
                  </span>
                  <span className="ml-2 text-green-600 font-medium">
                    (30%)
                  </span>
                </div>

                {item.status === "Out of Stock" ? (
                  <button
                    disabled
                    className="mt-2 py-2 w-full bg-gray-100 text-gray-400 rounded-md font-medium text-center border border-gray-200 transition-colors"
                  >
                    SOLD OUT
                  </button>
                ) : (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      addToCart(item, "stationery");
                    }}
                    disabled={cartLoadingMap[item._id]}
                    className={`mt-2 py-2 w-full bg-white text-blue-600 rounded-md font-medium text-center border border-blue-500 hover:bg-blue-50 transition-colors ${
                      cartLoadingMap[item._id] ? "opacity-70" : ""
                    }`}
                  >
                    {cartLoadingMap[item._id] ? (
                      <div className="w-5 h-5 border-t-2 border-b-2 border-blue-500 rounded-full animate-spin mx-auto"></div>
                    ) : (
                      "ADD TO BAG"
                    )}
                  </button>
                )}
              </div>
            </>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="p-6 min-h-screen bg-white">
      {/* Cart Status Messages */}
      {cartSuccess && (
        <div className="fixed top-20 right-4 bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded z-50 shadow-lg">
          <span className="block sm:inline">{cartSuccess}</span>
        </div>
      )}

      {cartError && (
        <div className="fixed top-20 right-4 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded z-50 shadow-lg">
          <span className="block sm:inline">{cartError}</span>
        </div>
      )}

      {/* Tabs - Updated with more subtle styling */}
      <div className="flex flex-wrap gap-1 mb-6 bg-white">
        <button
          className={`px-4 py-2 text-sm md:text-base font-medium rounded-t-lg flex items-center gap-1 transition-colors ${
            activeTab === "books"
              ? "bg-white text-blue-600 border-t border-r border-l border-gray-200 shadow-md"
              : "bg-white text-gray-600 hover:bg-gray-100 border border-transparent"
          }`}
          onClick={() => setActiveTab("books")}
        >
          <FaBook className="text-sm" /> Books
        </button>
        <button
          className={`px-4 py-2 text-sm md:text-base font-medium rounded-t-lg flex items-center gap-1 transition-colors ${
            activeTab === "ncertBooks"
              ? "bg-white text-blue-600 border-t border-r border-l border-gray-200 shadow-md"
              : "bg-white text-gray-600 hover:bg-gray-100 border border-transparent"
          }`}
          onClick={() => setActiveTab("ncertBooks")}
        >
          <FaBookOpen className="text-sm" /> NCERT Books
        </button>
        <button
          className={`px-4 py-2 text-sm md:text-base font-medium rounded-t-lg flex items-center gap-1 transition-colors ${
            activeTab === "stationery"
              ? "bg-white text-blue-600 border-t border-r border-l border-gray-200 shadow-md"
              : "bg-white text-gray-600 hover:bg-gray-100 border border-transparent"
          }`}
          onClick={() => setActiveTab("stationery")}
        >
          <FaPen className="text-sm" /> Stationery
        </button>
        <button
          className={`px-4 py-2 text-sm md:text-base font-medium rounded-t-lg flex items-center gap-1 transition-colors ${
            activeTab === "notebooks"
              ? "bg-white text-blue-600 border-t border-r border-l border-gray-200 shadow-md"
              : "bg-white text-gray-600 hover:bg-gray-100 border border-transparent"
          }`}
          onClick={() => setActiveTab("notebooks")}
        >
          <FaBook className="text-sm" /> Notebooks
        </button>
        <button
          className={`px-4 py-2 text-sm md:text-base font-medium rounded-t-lg flex items-center gap-1 transition-colors ${
            activeTab === "fastMoving"
              ? "bg-white text-blue-600 border-t border-r border-l border-gray-200 shadow-md"
              : "bg-white text-gray-600 hover:bg-gray-100 border border-transparent"
          }`}
          onClick={() => setActiveTab("fastMoving")}
        >
          <FaBolt className="text-sm" /> Fast Moving
        </button>
      </div>

      {/* Search Section */}
      <div className="flex flex-col justify-center mb-8 bg-white p-4 rounded-lg shadow-md border border-gray-200">
        {/* Toonzkart exclusive text */}
        <div className="text-center mb-3">
          <p className="text-blue-600 font-semibold italic">
            Exclusively Fulfilled by Toonzkart
          </p>
        </div>

        {/* Search Bar */}
        <div className="relative w-full md:w-2/3 mx-auto">
          <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
          <input
            type="text"
            placeholder={`Search for ${
              activeTab === "books" || activeTab === "ncertBooks"
                ? "books"
                : activeTab === "stationery" || activeTab === "notebooks"
                ? "stationery"
                : "products"
            }...`}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="border border-gray-300 pl-10 pr-4 py-2 rounded-md w-full focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none shadow-sm"
          />
        </div>
      </div>

      {/* Loading State - Shimmer Effect */}
      {isLoading() && (
        <>
          {search ? (
            <div className="mb-12">
              <h2 className="text-2xl font-bold text-gray-800 mb-5 relative pl-4 before:content-[''] before:w-1 before:bg-gray-300 before:absolute before:left-0 before:top-0 before:bottom-0 before:rounded-lg">
                <div className="h-8 w-48 bg-gray-200 rounded shimmer-effect"></div>
              </h2>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                {[...Array(12)].map((_, index) => (
                  <div key={`shimmer-${index}`} className="bg-white rounded-md shadow-lg border border-gray-200 overflow-hidden h-full">
                    {/* Image placeholder */}
                    <div className="h-48 bg-gray-200 shimmer-effect"></div>
                    
                    <div className="p-4">
                      {/* Title placeholder */}
                      <div className="h-6 bg-gray-200 rounded w-3/4 mb-2 shimmer-effect"></div>
                      
                      {/* Author/brand placeholder */}
                      <div className="h-4 bg-gray-200 rounded w-1/2 mb-2 shimmer-effect"></div>
                      
                      {/* Spacer */}
                      <div className="h-10"></div>
                      
                      {/* Price placeholder */}
                      <div className="flex items-center">
                        <div className="h-6 bg-gray-200 rounded w-16 shimmer-effect"></div>
                        <div className="h-4 bg-gray-200 rounded w-16 ml-2 shimmer-effect"></div>
                      </div>
                      
                      {/* Button placeholder */}
                      <div className="h-10 bg-gray-200 rounded mt-2 shimmer-effect"></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            // Show shimmer effect for book sections when not searching
            [...Array(2)].map((_, sectionIndex) => (
              <div key={`shimmer-section-${sectionIndex}`} className="mb-12">
                <h2 className="text-2xl font-bold text-gray-800 mb-5 pb-2 border-b border-gray-200 flex items-center relative">
                  <span className="bg-gray-300 w-8 h-1 absolute bottom-0 left-0 rounded-full shimmer-effect"></span>
                  <div className="h-8 w-48 bg-gray-200 rounded shimmer-effect"></div>
                </h2>
                
                <div className="relative">
                  {/* Left Arrow */}
                  <button className="absolute -left-4 top-1/2 transform -translate-y-1/2 z-10 h-8 w-8 flex items-center justify-center bg-white rounded-full shadow-md border border-gray-200">
                    <FaAngleLeft className="text-gray-500" />
                  </button>
                  
                  {/* Products row placeholder */}
                  <div className="overflow-x-auto hide-scrollbar bg-white rounded-lg p-3 border border-gray-100">
                    <div className="flex space-x-4 py-2 px-1">
                      {[...Array(6)].map((_, itemIndex) => (
                        <div key={`shimmer-section-${sectionIndex}-item-${itemIndex}`} className="min-w-[180px] max-w-[180px]">
                          <div className="bg-white rounded-md shadow-lg border border-gray-200 overflow-hidden h-full">
                            {/* Image placeholder */}
                            <div className="h-48 bg-gray-200 shimmer-effect"></div>
                            
                            <div className="p-4">
                              {/* Title placeholder */}
                              <div className="h-6 bg-gray-200 rounded w-3/4 mb-2 shimmer-effect"></div>
                              
                              {/* Author/brand placeholder */}
                              <div className="h-4 bg-gray-200 rounded w-1/2 mb-2 shimmer-effect"></div>
                              
                              {/* Spacer */}
                              <div className="h-10"></div>
                              
                              {/* Price placeholder */}
                              <div className="flex items-center">
                                <div className="h-6 bg-gray-200 rounded w-16 shimmer-effect"></div>
                                <div className="h-4 bg-gray-200 rounded w-16 ml-2 shimmer-effect"></div>
                              </div>
                              
                              {/* Button placeholder */}
                              <div className="h-10 bg-gray-200 rounded mt-2 shimmer-effect"></div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  {/* Right Arrow */}
                  <button className="absolute -right-4 top-1/2 transform -translate-y-1/2 z-10 h-8 w-8 flex items-center justify-center bg-white rounded-full shadow-md border border-gray-200">
                    <FaAngleRight className="text-gray-500" />
                  </button>
                </div>
              </div>
            ))
          )}
        </>
      )}

      {/* Error Message */}
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 p-4 rounded-md mb-6 shadow-md">
          <p>{error}</p>
        </div>
      )}

      {/* Product Sections - Enhanced headings */}
      {!isLoading() && (
        <>
          {search ? (
            // When searching, show a simple grid of search results
            <>
              <h2 className="text-2xl font-bold text-gray-800 mb-5 relative pl-4 before:content-[''] before:w-1 before:bg-blue-500 before:absolute before:left-0 before:top-0 before:bottom-0 before:rounded-lg">
                Search Results
              </h2>
              
              {currentItems.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-12">
                  {currentItems.map((item) => (
                    <div key={item._id} className="flex-shrink-0">
                      {renderProductCard(item)}
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-10">
                  <p className="text-gray-500 mb-4">
                    No items found matching your search.
                  </p>
                  <button
                    onClick={() => setSearch("")}
                    className="text-blue-500 hover:underline"
                  >
                    Clear search
                  </button>
                </div>
              )}
            </>
          ) : (
            // When not searching, show book sections based on API data with original layout
            createBookSections().map((section, sectionIndex) => (
              <div key={`section-${sectionIndex}`} className="mb-12">
                <h2 className="text-2xl font-bold text-gray-800 mb-5 pb-2 border-b border-gray-200 flex items-center relative">
                  <span className="bg-blue-500 w-8 h-1 absolute bottom-0 left-0 rounded-full"></span>
                  <span className="bg-gradient-to-r from-blue-600 to-blue-400 text-transparent bg-clip-text">{section.title}</span>
                </h2>
                
                <div className="relative">
                  {/* Left Arrow - Subtle design */}
                  <button
                    className="absolute -left-4 top-1/2 transform -translate-y-1/2 z-10 h-8 w-8 flex items-center justify-center bg-white rounded-full shadow-md border border-gray-200 hover:bg-gray-50 transition-colors"
                    aria-label="Previous"
                  >
                    <FaAngleLeft className="text-gray-500" />
                  </button>
                  
                  {/* Products row without gradient */}
                  <div className="overflow-x-auto hide-scrollbar bg-white rounded-lg p-3 border border-gray-100">
                    <div className="flex space-x-4 py-2 px-1">
                      {section.items.map((item) => (
                        <div key={item._id} className="min-w-[180px] max-w-[180px]">
                          {renderProductCard(item)}
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  {/* Right Arrow - Subtle design */}
                  <button
                    className="absolute -right-4 top-1/2 transform -translate-y-1/2 z-10 h-8 w-8 flex items-center justify-center bg-white rounded-full shadow-md border border-gray-200 hover:bg-gray-50 transition-colors"
                    aria-label="Next"
                  >
                    <FaAngleRight className="text-gray-500" />
                  </button>
                </div>
              </div>
            ))
          )}
        </>
      )}

      {/* CSS for shimmer effect */}
      <style jsx>{`
        .shimmer-effect {
          background-image: linear-gradient(
            to right,
            #f0f0f0 0%,
            #e0e0e0 20%,
            #f0f0f0 40%,
            #f0f0f0 100%
          );
          background-size: 800px 100%;
          animation: shimmer 1.5s infinite linear;
        }
        
        @keyframes shimmer {
          0% {
            background-position: -400px 0;
          }
          100% {
            background-position: 400px 0;
          }
        }
        
        .hide-scrollbar {
          -ms-overflow-style: none;  /* IE and Edge */
          scrollbar-width: none;  /* Firefox */
        }
        .hide-scrollbar::-webkit-scrollbar {
          display: none;  /* Chrome, Safari and Opera */
        }
      `}</style>
    </div>
  );
};

export default ShopByProduct;