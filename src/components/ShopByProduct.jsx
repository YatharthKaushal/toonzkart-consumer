import React, { useState, useEffect } from "react";
import { FaShoppingBag, FaFilter, FaSearch, FaBook, FaPen, FaShoppingCart } from "react-icons/fa";
import axios from "axios";

const stationeryProducts = [
  { id: 1, name: "Notebooks", image: "https://source.unsplash.com/150x150/?notebook,stationery" },
  { id: 2, name: "Pens & Pencils", image: "https://source.unsplash.com/150x150/?pen,pencil" },
  { id: 3, name: "Backpacks", image: "https://source.unsplash.com/150x150/?backpack,school" },
  { id: 4, name: "Art Supplies", image: "https://source.unsplash.com/150x150/?art,supplies" },
  { id: 5, name: "Calculators", image: "https://source.unsplash.com/150x150/?calculator,math" },
  { id: 6, name: "Desk Accessories", image: "https://source.unsplash.com/150x150/?desk,accessory" },
  { id: 7, name: "Sports Equipment", image: "https://source.unsplash.com/150x150/?sports,equipment" },
  { id: 8, name: "Erasers & Correction", image: "https://source.unsplash.com/150x150/?eraser,correction" },
];

const API_BASE_URL = "https://backend-lzb7.onrender.com";

const ShopByProduct = () => {
  const [activeTab, setActiveTab] = useState("books");
  const [search, setSearch] = useState("");
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [cartItems, setCartItems] = useState({});

  // Fetch books from API
  useEffect(() => {
    const fetchBooks = async () => {
      if (activeTab === "books") {
        setLoading(true);
        setError("");
        try {
          const response = await axios.get(`${API_BASE_URL}/api/books`);
          console.log("Books API Response:", response.data);
          setBooks(response.data);
        } catch (err) {
          console.error("Error fetching books:", err);
          setError("Failed to load books. Please try again.");
        } finally {
          setLoading(false);
        }
      }
    };

    fetchBooks();
  }, [activeTab]);

  // Filter products based on search
  const filteredStationery = stationeryProducts.filter((product) =>
    product.name.toLowerCase().includes(search.toLowerCase())
  );

  const filteredBooks = books.filter(
    (book) =>
      (book.title && book.title.toLowerCase().includes(search.toLowerCase())) ||
      (book.author && book.author.toLowerCase().includes(search.toLowerCase())) ||
      (book.category && book.category.toLowerCase().includes(search.toLowerCase()))
  );

  // Handle adding to cart
  const addToCart = (product, isBook = false) => {
    setCartItems(prev => {
      const id = isBook ? product._id : product.id;
      return {
        ...prev,
        [id]: (prev[id] || 0) + 1
      };
    });
  };

  // Format price with rupee symbol
  const formatPrice = (price) => {
    return `₹${price}`;
  };

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
      {loading && (
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
      {activeTab === "books" && !loading && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredBooks.length > 0 ? (
            filteredBooks.map((book) => (
              <div
                key={book._id}
                className="border bg-white p-4 rounded-xl shadow-md hover:shadow-lg transition transform hover:-translate-y-1"
              >
                <div className="relative h-48 mb-3 bg-gray-100 rounded-md flex items-center justify-center overflow-hidden">
                  {book.image ? (
                    <img
                      src={`${API_BASE_URL}${book.image}`}
                      alt={book.title}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = "https://via.placeholder.com/150x200?text=No+Image";
                      }}
                    />
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
                    onClick={() => addToCart(book, true)}
                    disabled={book.status === "Out of Stock"}
                    className={`p-2 rounded-full ${
                      book.status === "Out of Stock"
                        ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                        : "bg-blue-500 text-white hover:bg-blue-600"
                    }`}
                  >
                    <FaShoppingCart />
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
      {activeTab === "stationery" && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredStationery.length > 0 ? (
            filteredStationery.map((product) => (
              <div
                key={product.id}
                className="border bg-white p-4 rounded-xl shadow-md hover:shadow-lg transition transform hover:-translate-y-1"
              >
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-48 object-cover rounded-md mb-3"
                />
                <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
                  <FaShoppingBag className="text-blue-500" /> {product.name}
                </h3>
                
                <div className="flex justify-between items-center mt-4">
                  <span className="font-bold text-gray-900">₹199</span>
                  <button
                    onClick={() => addToCart(product)}
                    className="p-2 rounded-full bg-blue-500 text-white hover:bg-blue-600"
                  >
                    <FaShoppingCart />
                  </button>
                </div>
                
                {cartItems[product.id] && (
                  <div className="mt-2 text-sm text-green-600 font-semibold">
                    {cartItems[product.id]} in cart
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