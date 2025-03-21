import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { FaMapMarkerAlt } from "react-icons/fa";
import { ArrowLeft } from "lucide-react";

const API_BASE_URL = "https://backend-lzb7.onrender.com"; // Backend API URL

const StoresViewBooks = ({ selectedBook, onBack }) => {
  const navigate = useNavigate();
  const [stores, setStores] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Fetch stores based on book ID
  useEffect(() => {
    if (selectedBook?._id) {
      fetchStoresByBook(selectedBook._id);
    }
  }, [selectedBook]);

  const fetchStoresByBook = async (bookId) => {
    setLoading(true);
    setError("");
    try {
      const response = await axios.get(`${API_BASE_URL}/api/stores/by-book/${bookId}`);
      setStores(response.data);
    } catch (err) {
      console.error("Error fetching stores:", err);
      setError("Failed to fetch stores. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 min-h-screen bg-gray-50">
      {/* Back Button */}
      <button
        onClick={onBack}
        className="flex items-center gap-2 mb-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
      >
        <ArrowLeft size={18} />
        <span>Back</span>
      </button>

      <h2 className="text-2xl font-semibold text-gray-800 mb-6">
        {selectedBook?.title ? `Stores selling ${selectedBook.title}` : "Available Stores"}
      </h2>

      {/* Book details */}
      {selectedBook && (
        <div className="mb-6 bg-white rounded-lg p-4 shadow-md">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="w-full md:w-1/4 flex justify-center">
              {selectedBook.image ? (
                <img
                  src={`${selectedBook.image}`}
                  alt={selectedBook.title}
                  className="h-48 object-cover rounded-md"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = "https://via.placeholder.com/150x200?text=No+Image";
                  }}
                />
              ) : (
                <div className="h-48 w-36 bg-gray-100 flex items-center justify-center rounded-md">
                  <span className="text-gray-400">No Image</span>
                </div>
              )}
            </div>
            <div className="w-full md:w-3/4">
              <h3 className="text-xl font-bold">{selectedBook.title}</h3>
              <p className="text-gray-600">By {selectedBook.author}</p>
              {selectedBook.category && (
                <p className="text-gray-500 text-sm">{selectedBook.category}</p>
              )}
              <div className="mt-2">
                <span className="font-bold text-gray-900">₹{selectedBook.price}</span>
                {selectedBook.originalPrice && selectedBook.originalPrice > selectedBook.price && (
                  <span className="text-xs text-gray-500 line-through ml-2">
                    ₹{selectedBook.originalPrice}
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Loading & Error Handling */}
      {loading && (
        <div className="flex justify-center items-center py-10">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
          <span className="ml-3 text-gray-600">Loading stores...</span>
        </div>
      )}
      
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 p-4 rounded-md mb-6">
          <p>{error}</p>
        </div>
      )}

      {/* Stores Grid */}
      {!loading && (
        <>
          {stores.length > 0 ? (
            <>
              <p className="mb-4 text-gray-600">
                This book is available at {stores.length} {stores.length === 1 ? 'store' : 'stores'}:
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {stores.map((store) => (
                  <div
                    key={store._id}
                    className="border bg-white p-4 rounded-xl shadow-md hover:shadow-lg transition transform hover:-translate-y-1 cursor-pointer"
                    onClick={() => navigate(`/store/${store._id}`)}
                  >
                    <div className="h-40 bg-gray-200 rounded-md mb-3 flex items-center justify-center overflow-hidden">
                      {store.image ? (
                        <img
                          src={`${API_BASE_URL}${store.image}`}
                          alt={store.storeName}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            e.target.onerror = null;
                            e.target.src = "https://via.placeholder.com/150?text=Store";
                          }}
                        />
                      ) : (
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                        </svg>
                      )}
                    </div>
                    <h3 className="text-lg font-semibold text-gray-800">{store.storeName}</h3>
                    {store.address && (
                      <p className="text-gray-600 flex items-center mt-2">
                        <FaMapMarkerAlt className="text-red-500 mr-2 flex-shrink-0" /> {store.address}
                      </p>
                    )}
                    {store.status && (
                      <div className="mt-2">
                        <span className={`inline-block px-2 py-1 text-xs rounded-full ${
                          store.status === 'Active' ? 'bg-green-100 text-green-800' : 
                          store.status === 'Inactive' ? 'bg-red-100 text-red-800' : 
                          'bg-yellow-100 text-yellow-800'
                        }`}>
                          {store.status}
                        </span>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </>
          ) : (
            <div className="text-center py-10 bg-white rounded-lg shadow-sm">
              <div className="text-gray-400 mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2">No stores found</h3>
              <p className="text-gray-600 mb-6">
                This book is not currently available at any stores.
              </p>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default StoresViewBooks;