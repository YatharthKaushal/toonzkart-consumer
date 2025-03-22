import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaSearch, FaMapMarkerAlt } from "react-icons/fa";
import StoresView from "./StoresView";

const ShopBySchool = () => {
  const [schools, setSchools] = useState([]); // Store schools from API
  const [search, setSearch] = useState("");
  const [selectedSchool, setSelectedSchool] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

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

  // Filter schools based on search input
  const filteredSchools = schools.filter((school) =>
    school.name.toLowerCase().includes(search.toLowerCase())
  );

  if (selectedSchool) {
    return <StoresView selectedSchool={selectedSchool} onBack={() => setSelectedSchool(null)} />;
  }

  return (
    <div className="p-6 min-h-screen bg-gray-50">
      {/* Search Section - Filter and Sort buttons removed */}
      <div className="flex justify-center mb-8 bg-white p-4 rounded-lg shadow-lg border border-gray-200">
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
      </div>

      {/* Error Message */}
      {error && <div className="text-red-600 text-center my-4">{error}</div>}

      {/* Loading State */}
      {loading ? (
        <div className="text-center text-gray-700">Loading schools...</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredSchools.map((school) => (
            <div
              key={school._id}
              className="border bg-white p-4 rounded-xl shadow-md hover:shadow-lg transition transform hover:-translate-y-1 cursor-pointer"
              onClick={() => setSelectedSchool(school)}
            >
              <div className="h-40 bg-gray-100 rounded-md flex items-center justify-center overflow-hidden">
                <img
                  src={school.image || "https://via.placeholder.com/150"}
                  alt={school.name}
                  className="max-h-full max-w-full object-contain"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = "https://via.placeholder.com/150?text=School";
                  }}
                />
              </div>
              <h3 className="text-lg font-semibold mt-3 text-gray-800">{school.name}</h3>
              <p className="text-gray-600 flex items-center">
                <FaMapMarkerAlt className="text-red-500 mr-2" /> {school.location.city}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ShopBySchool;