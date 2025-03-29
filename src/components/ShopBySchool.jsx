import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaSearch, FaMapMarkerAlt, FaFilter } from "react-icons/fa";
import StoresView from "./StoresView";

const ShopBySchool = () => {
  const [schools, setSchools] = useState([]); // Store all schools from API
  const [filteredSchools, setFilteredSchools] = useState([]); // Filtered schools based on city and search
  const [search, setSearch] = useState("");
  const [selectedSchool, setSelectedSchool] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedCity, setSelectedCity] = useState(localStorage.getItem('selectedCity') || "Indore");
  const [showAllCities, setShowAllCities] = useState(false);

  // Fetch schools from the backend
  useEffect(() => {
    const fetchSchools = async () => {
      try {
        const response = await axios.get("https://backend-lzb7.onrender.com/api/schools");
        setSchools(response.data);
      } catch (err) {
        setError("Failed to load schools. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchSchools();
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

  // Filter schools based on selected city and search input
  useEffect(() => {
    let result = schools;
    
    // First filter by city if not showing all cities
    if (!showAllCities) {
      result = schools.filter(school => 
        school.city && selectedCity && 
        school.city.toLowerCase() === selectedCity.toLowerCase()
      );
    }
    
    // Then filter by search term
    if (search) {
      result = result.filter(school =>
        school.name.toLowerCase().includes(search.toLowerCase())
      );
    }
    
    setFilteredSchools(result);
  }, [schools, selectedCity, search, showAllCities]);

  if (selectedSchool) {
    return <StoresView selectedSchool={selectedSchool} onBack={() => setSelectedSchool(null)} />;
  }

  return (
    <div className="p-6 min-h-screen bg-gray-50">
      {/* Search Section with City Filter Toggle */}
      <div className="flex flex-col md:flex-row justify-center items-center gap-4 mb-8 bg-white p-4 rounded-lg shadow-lg border border-gray-200">
        {/* Search Input */}
        <div className="relative w-full md:w-2/3">
          <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
          <input
            type="text"
            placeholder="Search for schools..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="border border-gray-300 pl-10 pr-4 py-2 rounded-md w-full focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none shadow-md"
          />
        </div>
        
        {/* City Filter Toggle */}
        <div className="flex items-center">
          <button 
            onClick={() => setShowAllCities(!showAllCities)}
            className={`flex items-center gap-2 px-4 py-2 rounded-md ${
              showAllCities 
                ? "bg-blue-100 text-blue-700 border border-blue-300" 
                : "bg-gray-100 text-gray-700 border border-gray-300"
            }`}
          >
            <FaFilter />
            {showAllCities ? "Showing All Cities" : `Showing ${selectedCity} Only`}
          </button>
        </div>
      </div>

      {/* Selected City Info */}
      <div className="mb-6">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold text-gray-800 flex items-center">
            <FaMapMarkerAlt className="text-red-500 mr-2" />
            {showAllCities ? "Schools in All Cities" : `Schools in ${selectedCity}`}
          </h2>
          <div className="text-sm text-gray-600">
            {filteredSchools.length} {filteredSchools.length === 1 ? 'school' : 'schools'} found
          </div>
        </div>
      </div>

      {/* Error Message */}
      {error && <div className="text-red-600 text-center my-4">{error}</div>}

      {/* Loading State */}
      {loading ? (
        <div className="text-center text-gray-700">Loading schools...</div>
      ) : filteredSchools.length === 0 ? (
        <div className="text-center py-12">
          <div className="text-gray-700 text-lg mb-2">No schools found in {selectedCity}</div>
          <button 
            onClick={() => setShowAllCities(true)}
            className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition"
          >
            Show Schools in All Cities
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredSchools.map((school) => (
            <div
              key={school._id}
              className="border bg-white p-4 rounded-xl shadow-md hover:shadow-lg transition transform hover:-translate-y-1 cursor-pointer"
              onClick={() => setSelectedSchool(school)}
            >
              <div className="h-40 bg-gray-100 rounded-md flex items-center justify-center overflow-hidden">
                {school.image ? (
                  <img
                    src={school.image}
                    alt={school.name}
                    className="max-h-full max-w-full object-contain"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = "https://via.placeholder.com/150?text=School";
                    }}
                  />
                ) : (
                  <img
                    src="https://via.placeholder.com/150?text=School"
                    alt={school.name}
                    className="max-h-full max-w-full object-contain"
                  />
                )}
              </div>

              <h3 className="text-lg font-semibold mt-3 text-gray-800">{school.name}</h3>
              <p className="text-gray-600 flex items-center">
                <FaMapMarkerAlt className="text-red-500 mr-2" /> {school.city}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ShopBySchool;