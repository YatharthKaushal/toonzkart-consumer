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
    <section className="w-full py-16 px-8 bg-gradient-to-b from-white to-blue-50">
      {/* Section Header with decorative elements */}
      <div className="text-center mb-12 relative">
        <div className="absolute top-1/2 left-0 w-full h-0.5 bg-gray-200 -z-10"></div>
        <span className="inline-block px-6 py-2 bg-blue-600 text-white text-sm font-bold rounded-full mb-3">
          OUR NETWORK
        </span>
        <h2 className="text-4xl font-bold text-gray-800 inline-block bg-white px-8">
          Retailers We are Partners With
        </h2>
        <p className="text-lg text-gray-600 mt-4 max-w-2xl mx-auto">
          Find our products at these trusted bookstores across the region
        </p>
      </div>

      {/* Retailers Cards with Animation */}
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {retailersList.map((retailer, index) => (
            <div 
              key={index} 
              className="bg-white rounded-xl p-6 transition-all duration-300 group hover:bg-blue-600 hover:text-white hover:-translate-y-2 hover:shadow-xl border border-gray-100 shadow-md relative overflow-hidden"
            >
              {/* Background Pattern */}
              <div className="absolute -right-8 -bottom-8 w-24 h-24 rounded-full bg-blue-100 opacity-20 group-hover:bg-white group-hover:opacity-10"></div>
              
              {/* Icon */}
              <div className="flex items-center justify-between mb-3">
                <div className="w-12 h-12 flex items-center justify-center bg-blue-100 text-blue-600 rounded-lg group-hover:bg-white">
                  <FaBookOpen className="text-xl" />
                </div>
                <span className="text-xs font-medium px-3 py-1 rounded-full bg-green-100 text-green-700 group-hover:bg-white">
                  Verified Partner
                </span>
              </div>

              {/* Retailer Name */}
              <h3 className="text-xl font-bold text-gray-800 group-hover:text-white mb-2">{retailer}</h3>
              
              <div className="h-0.5 w-16 bg-blue-200 group-hover:bg-blue-300 transition-all duration-300 mb-3"></div>
              
              {/* Visit Button
              <button className="flex items-center text-sm font-medium text-blue-600 group-hover:text-white mt-3">
                Visit Store <FaChevronRight className="ml-1 text-xs transition-transform group-hover:translate-x-1" />
              </button> */}
              
              {/* Decorative Store Icon */}
              <div className="absolute top-4 right-4 text-blue-200 opacity-20 group-hover:opacity-10 group-hover:text-white">
                <FaStore className="text-3xl" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default RetailerPartners;