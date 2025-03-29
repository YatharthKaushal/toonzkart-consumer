import React, { useState, useEffect } from "react";
import { FaStore, FaBookOpen, FaChevronRight, FaMapMarkerAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const RetailerPartners = () => {
  const [stores, setStores] = useState([]);
  const [filteredStores, setFilteredStores] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedCity, setSelectedCity] = useState(localStorage.getItem('selectedCity') || "Indore");
  const [showAllCities, setShowAllCities] = useState(false);
  const navigate = useNavigate();

  // Fetch stores from API
  useEffect(() => {
    const fetchStores = async () => {
      try {
        setLoading(true);
        const response = await fetch("https://backend-lzb7.onrender.com/api/public/stores");
        
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        
        const data = await response.json();
        setStores(data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchStores();
  }, []);

  // Listen for changes to the selectedCity in localStorage
  useEffect(() => {
    const handleStorageChange = () => {
      const newCity = localStorage.getItem('selectedCity');
      if (newCity && newCity !== selectedCity) {
        setSelectedCity(newCity);
      }
    };

    // Check for changes every second
    const interval = setInterval(handleStorageChange, 1000);
    
    return () => clearInterval(interval);
  }, [selectedCity]);

  // Filter stores based on selected city
  useEffect(() => {
    if (!stores.length) return;

    let result = [...stores];
    
    if (!showAllCities) {
      // Filter stores by city name in the address
      result = stores.filter(store => 
        store.address && 
        store.address.toLowerCase().includes(selectedCity.toLowerCase())
      );
    }
    
    // Only take up to 6 stores for display
    setFilteredStores(result.slice(0, 6));
  }, [stores, selectedCity, showAllCities]);

  // Toggle between showing all cities or just the selected city
  const toggleCityFilter = () => {
    setShowAllCities(!showAllCities);
  };

  // Display loading state
  if (loading) {
    return (
      <section className="w-full py-8 md:py-16 px-4 md:px-8 bg-gradient-to-b from-white to-blue-50">
        <div className="text-center">
          <p className="text-lg text-gray-600">Loading stores...</p>
        </div>
      </section>
    );
  }

  // Display error state
  if (error) {
    return (
      <section className="w-full py-8 md:py-16 px-4 md:px-8 bg-gradient-to-b from-white to-blue-50">
        <div className="text-center">
          <p className="text-lg text-red-600">Error loading stores: {error}</p>
        </div>
      </section>
    );
  }

  return (
    <section className="w-full py-8 md:py-16 px-4 md:px-8 bg-gradient-to-b from-white to-blue-50">
      {/* Section Header with decorative elements - mobile optimized */}
      <div className="text-center mb-8 md:mb-12 relative">
        <div className="hidden md:block absolute top-1/2 left-0 w-full h-0.5 bg-gray-200 -z-10"></div>
        <span className="inline-block px-4 md:px-6 py-1 md:py-2 bg-blue-600 text-white text-xs md:text-sm font-bold rounded-full mb-2 md:mb-3">
          OUR NETWORK
        </span>
        <h2 className="text-2xl md:text-4xl font-bold text-gray-800 inline-block bg-white px-3 md:px-8">
          Retailer Partners
        </h2>
        <p className="text-base md:text-lg text-gray-600 mt-3 md:mt-4 max-w-2xl mx-auto px-2">
          Find our products at these trusted bookstores
        </p>
      </div>

      {/* City Filter Information */}
      <div className="max-w-6xl mx-auto mb-6">
        <div className="flex flex-col md:flex-row justify-between items-center bg-white rounded-lg p-4 shadow-sm border border-gray-100">
          <div className="flex items-center mb-3 md:mb-0">
            <FaMapMarkerAlt className="text-red-500 mr-2" />
            <span className="font-medium text-gray-700">
              {showAllCities ? 'Showing retailers from all cities' : `Showing retailers in ${selectedCity}`}
            </span>
          </div>
          <button 
            onClick={toggleCityFilter}
            className={`px-4 py-2 rounded-lg transition-colors ${
              showAllCities 
                ? "bg-blue-100 text-blue-700 hover:bg-blue-200" 
                : "bg-blue-600 text-white hover:bg-blue-700"
            }`}
          >
            {showAllCities ? `Show ${selectedCity} Only` : 'Show All Cities'}
          </button>
        </div>
      </div>

      {/* Retailers Cards with Animation - mobile optimized grid */}
      <div className="max-w-6xl mx-auto">
        {filteredStores.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
            {filteredStores.map((store) => (
              <div 
                key={store._id} 
                onClick={() => navigate(`/store/${store._id}`)}
                className="bg-white rounded-xl p-4 md:p-6 transition-all duration-300 group hover:bg-blue-600 hover:text-white hover:-translate-y-1 md:hover:-translate-y-2 hover:shadow-lg md:hover:shadow-xl border border-gray-100 shadow-md relative overflow-hidden cursor-pointer"
              >
                {/* Background Pattern */}
                <div className="absolute -right-8 -bottom-8 w-16 md:w-24 h-16 md:h-24 rounded-full bg-blue-100 opacity-20 group-hover:bg-white group-hover:opacity-10"></div>
                
                {/* Icon and Badge - Improved layout for small screens */}
                <div className="flex items-center justify-between mb-2 md:mb-3">
                  <div className="w-10 h-10 md:w-12 md:h-12 flex items-center justify-center bg-blue-100 text-blue-600 rounded-lg group-hover:bg-white">
                    <FaBookOpen className="text-lg md:text-xl" />
                  </div>
                  <span className={`text-xs font-medium px-2 md:px-3 py-0.5 md:py-1 rounded-full ${
                    store.status === "Active" 
                      ? "bg-green-100 text-green-700" 
                      : store.status === "Pending" 
                      ? "bg-yellow-100 text-yellow-700"
                      : "bg-red-100 text-red-700"
                  } group-hover:bg-white`}>
                    {store.status}
                  </span>
                </div>

                {/* Retailer Name - Font size adjusted for mobile */}
                <h3 className="text-lg md:text-xl font-bold text-gray-800 group-hover:text-white mb-2 line-clamp-2">
                  {store.storeName}
                </h3>
                
                <div className="h-0.5 w-12 md:w-16 bg-blue-200 group-hover:bg-blue-300 transition-all duration-300 mb-2 md:mb-3"></div>
                
                {/* Manager Name */}
                <p className="text-sm text-gray-600 group-hover:text-blue-100 mb-1">
                  Manager: {store.managerName}
                </p>
                
                {/* Address (shortened if too long) */}
                <p className="text-sm text-gray-600 group-hover:text-blue-100 line-clamp-1">
                  {store.address}
                </p>
                
                {/* Decorative Store Icon - Sized appropriately for mobile */}
                <div className="absolute top-3 md:top-4 right-3 md:right-4 text-blue-200 opacity-20 group-hover:opacity-10 group-hover:text-white">
                  <FaStore className="text-2xl md:text-3xl" />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-10 bg-white rounded-lg shadow-sm border border-gray-100">
            <FaStore className="text-4xl text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-700 mb-2">
              No retailers found in {selectedCity}
            </h3>
            <p className="text-gray-500 mb-4 max-w-md mx-auto">
              We haven't added any retail partners in this city yet, but we're expanding quickly!
            </p>
            <button 
              onClick={toggleCityFilter}
              className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Show All Cities
            </button>
          </div>
        )}
      </div>

      {/* View All Stores Link */}
      <div className="text-center mt-8 md:mt-12">
        <button 
          onClick={() => navigate('/stores')}
          className="inline-flex items-center text-blue-600 hover:text-blue-800 font-medium transition-colors"
        >
          View all retailers <FaChevronRight className="ml-1 text-sm" />
        </button>
      </div>
    </section>
  );
};

export default RetailerPartners;