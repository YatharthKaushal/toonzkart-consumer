import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaMapMarkerAlt, FaFilter } from 'react-icons/fa';

const ShopByStores = () => {
  const [stores, setStores] = useState([]);
  const [filteredStores, setFilteredStores] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCity, setSelectedCity] = useState(localStorage.getItem('selectedCity') || "Indore");
  const [showAllCities, setShowAllCities] = useState(false);
  const [error, setError] = useState('');

  // Fetch real data from API
  useEffect(() => {
    const fetchStores = async () => {
      try {
        const response = await fetch('https://backend-lzb7.onrender.com/api/public/stores');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setStores(data);
      } catch (error) {
        console.error('Error fetching stores:', error);
        setError('Failed to load stores. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchStores();
  }, []);

  // Listen for changes to the selectedCity in localStorage
  useEffect(() => {
    const handleStorageChange = () => {
      const newCity = localStorage.getItem('selectedCity');
      if (newCity !== selectedCity) {
        setSelectedCity(newCity);
        setShowAllCities(false); // Reset to show only selected city when city changes
      }
    };

    // Check for changes every second (localStorage doesn't have a native event listener)
    const interval = setInterval(handleStorageChange, 1000);
    
    return () => clearInterval(interval);
  }, [selectedCity]);

  // Filter stores based on city and search term
  useEffect(() => {
    let result = stores;
    
    // First filter by city if not showing all cities
    if (!showAllCities) {
      result = stores.filter(store => {
        // Check if store has address and it contains the city name
        // This assumes the address contains the city name
        return store.address && selectedCity && 
          store.address.toLowerCase().includes(selectedCity.toLowerCase());
      });
    }
    
    // Then filter by search term
    if (searchTerm) {
      result = result.filter(store => 
        (store.storeName && store.storeName.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (store.address && store.address.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }
    
    setFilteredStores(result);
  }, [stores, selectedCity, searchTerm, showAllCities]);

  return (
    <div className="py-6 px-4 md:px-8 max-w-7xl mx-auto">
      <h1 className="text-2xl md:text-3xl font-bold mb-2 text-center">Find Books at Partner Stores</h1>
      <p className="text-gray-600 mb-6 text-center">Browse our network of partner bookstores to find exactly what you need</p>
      
      {/* Search and Filter Controls */}
      <div className="mb-8">
        <div className="flex flex-col md:flex-row gap-4 justify-center items-center mb-4">
          {/* Search */}
          <div className="relative w-full md:w-2/3">
            <input
              type="text"
              placeholder="Search stores..."
              className="w-full p-3 border border-gray-300 rounded-lg pl-10 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">🔍</span>
          </div>
          
          {/* City Filter Toggle */}
          <div className="flex items-center">
            <button 
              onClick={() => setShowAllCities(!showAllCities)}
              className={`flex items-center gap-2 px-4 py-3 rounded-md ${
                showAllCities 
                  ? "bg-blue-100 text-blue-700 border border-blue-300" 
                  : "bg-gray-100 text-gray-700 border border-gray-300"
              }`}
            >
              <FaFilter />
              {showAllCities ? "All Cities" : `${selectedCity} Only`}
            </button>
          </div>
        </div>
        
        {/* Selected City Info */}
        <div className="flex items-center justify-between bg-gray-50 p-3 rounded-lg">
          <h2 className="text-lg font-semibold text-gray-800 flex items-center">
            <FaMapMarkerAlt className="text-red-500 mr-2" />
            {showAllCities ? "Stores in All Cities" : `Stores in ${selectedCity}`}
          </h2>
          <div className="text-sm text-gray-600">
            {filteredStores.length} {filteredStores.length === 1 ? 'store' : 'stores'} found
          </div>
        </div>
      </div>

      {/* Error Message */}
      {error && <div className="text-red-600 text-center my-4">{error}</div>}

      {/* Stores List */}
      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      ) : filteredStores.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredStores.map((store) => (
            <div 
              key={store._id} 
              className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200 transition-all duration-300 hover:shadow-lg"
            >
              <div className="relative">
                <img 
                  src={store.image || 'https://via.placeholder.com/400x200?text=No+Image'} 
                  alt={store.storeName} 
                  className="w-full h-48 object-cover"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = 'https://via.placeholder.com/400x200?text=No+Image';
                  }}
                />
              </div>
              
              <div className="p-4">
                <div className="flex justify-between items-start mb-2">
                  <h2 className="text-xl font-bold">{store.storeName}</h2>
                </div>
                
                <div className="flex items-center text-gray-500 mb-2">
                  <span className="mr-2">📍</span>
                  <span className="text-sm">{store.address}</span>
                </div>
                
                <div className="mb-3">
                  <span className="text-sm font-semibold text-gray-700">
                    {store.inventory && store.inventory.length > 0 
                      ? `${store.inventory.length} book${store.inventory.length !== 1 ? 's' : ''} available` 
                      : 'No books listed yet'}
                  </span>
                </div>
                
                <Link
                  to={`/store/${store._id}`}
                  className="w-full py-2 flex items-center justify-center bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
                >
                  View Store
                </Link>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-12 bg-white rounded-lg shadow-md">
          <h3 className="text-xl font-semibold text-gray-700 mb-2">
            {!showAllCities ? `No stores found in ${selectedCity}` : 'No stores match your search'}
          </h3>
          <p className="text-gray-500 mb-4">
            {!showAllCities 
              ? 'Try showing stores from all cities' 
              : 'Try adjusting your search criteria'}
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            {!showAllCities && (
              <button 
                className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                onClick={() => setShowAllCities(true)}
              >
                Show All Cities
              </button>
            )}
            {searchTerm && (
              <button 
                className="bg-gray-200 text-gray-800 px-6 py-2 rounded-lg hover:bg-gray-300 transition-colors"
                onClick={() => setSearchTerm('')}
              >
                Reset Search
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default ShopByStores;