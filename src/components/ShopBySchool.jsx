import React, { useState } from "react";
import { FaSearch, FaFilter, FaSort, FaMapMarkerAlt } from "react-icons/fa";

const schools = [
  { id: 1, name: "Greenwood High", image: "https://via.placeholder.com/150", location: "Indore" },
  { id: 2, name: "Delhi Public School", image: "https://via.placeholder.com/150", location: "Mumbai" },
  { id: 3, name: "Ryan International", image: "https://via.placeholder.com/150", location: "Delhi" },
  { id: 4, name: "National Public School", image: "https://via.placeholder.com/150", location: "Bangalore" },
  { id: 5, name: "St. Xavier’s", image: "https://via.placeholder.com/150", location: "Kolkata" },
];

const ShopBySchool = () => {
  const [search, setSearch] = useState("");

  const filteredSchools = schools.filter((school) =>
    school.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-6 min-h-screen bg-gray-50">
      {/* Search and Filter Section */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-8 bg-white p-4 rounded-lg shadow-lg border border-gray-200">
        {/* Search Input */}
        <div className="relative w-full md:w-1/3">
          <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
          <input
            type="text"
            placeholder="Search for schools..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="border border-gray-300 pl-10 pr-4 py-2 rounded-md w-full focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none shadow-md"
          />
        </div>

        {/* Filter & Sort Buttons */}
        <div className="flex gap-4 mt-4 md:mt-0">
          <button className="flex items-center gap-2 bg-blue-100 hover:bg-blue-200 text-blue-700 px-5 py-2 rounded-md transition shadow">
            <FaFilter /> Filter
          </button>
          <button className="flex items-center gap-2 bg-blue-100 hover:bg-blue-200 text-blue-700 px-5 py-2 rounded-md transition shadow">
            <FaSort /> Sort
          </button>
        </div>
      </div>

      {/* School Listings (Improved Grid Layout) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredSchools.map((school) => (
          <div
            key={school.id}
            className="border bg-white p-4 rounded-xl shadow-md hover:shadow-lg transition transform hover:-translate-y-1"
          >
            <img
              src={school.image}
              alt={school.name}
              className="w-full h-40 object-cover rounded-md"
            />
            <h3 className="text-lg font-semibold mt-3 text-gray-800">{school.name}</h3>
            <p className="text-gray-600 flex items-center">
              <FaMapMarkerAlt className="text-red-500 mr-2" /> {school.location}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ShopBySchool;
