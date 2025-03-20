import React from "react";
import { FaStore, FaBookOpen, FaChevronRight } from "react-icons/fa";

const retailersList = [
  "Mahesh Book Depot",
  "Gokul Vidhya Books & Stationery",
  "Bhaiyas Book Store",
  "Lekhan Pathan Book Store",
  "Amit Book Centre",
  "B3 BOOK STORE",
  "SHRI INDORE BOOK DEPOT",
  "Madaan Books Store",
  "Triveni Books & Stationery"
];

const RetailerPartners = () => {
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

      {/* Retailers Cards with Animation - mobile optimized grid */}
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
          {retailersList.map((retailer, index) => (
            <div 
              key={index} 
              className="bg-white rounded-xl p-4 md:p-6 transition-all duration-300 group hover:bg-blue-600 hover:text-white hover:-translate-y-1 md:hover:-translate-y-2 hover:shadow-lg md:hover:shadow-xl border border-gray-100 shadow-md relative overflow-hidden"
            >
              {/* Background Pattern */}
              <div className="absolute -right-8 -bottom-8 w-16 md:w-24 h-16 md:h-24 rounded-full bg-blue-100 opacity-20 group-hover:bg-white group-hover:opacity-10"></div>
              
              {/* Icon and Badge - Improved layout for small screens */}
              <div className="flex items-center justify-between mb-2 md:mb-3">
                <div className="w-10 h-10 md:w-12 md:h-12 flex items-center justify-center bg-blue-100 text-blue-600 rounded-lg group-hover:bg-white">
                  <FaBookOpen className="text-lg md:text-xl" />
                </div>
                <span className="text-xs font-medium px-2 md:px-3 py-0.5 md:py-1 rounded-full bg-green-100 text-green-700 group-hover:bg-white">
                  Partner
                </span>
              </div>

              {/* Retailer Name - Font size adjusted for mobile */}
              <h3 className="text-lg md:text-xl font-bold text-gray-800 group-hover:text-white mb-2 line-clamp-2">{retailer}</h3>
              
              <div className="h-0.5 w-12 md:w-16 bg-blue-200 group-hover:bg-blue-300 transition-all duration-300 mb-2 md:mb-3"></div>
              
              {/* Decorative Store Icon - Sized appropriately for mobile */}
              <div className="absolute top-3 md:top-4 right-3 md:right-4 text-blue-200 opacity-20 group-hover:opacity-10 group-hover:text-white">
                <FaStore className="text-2xl md:text-3xl" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default RetailerPartners;