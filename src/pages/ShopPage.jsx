import React, { useState, useEffect } from "react";
import ShopBySchool from "../components/ShopBySchool";
import ShopByProduct from "../components/ShopByProduct";
import ShopByDemand from "../components/ShopByDemand";
import Header from "../components/Header";
import toonzkartLogo from "../assets/toonzkart_logo.png";

const ShopPage = () => {
  const [activeTab, setActiveTab] = useState("school"); // Default tab

  // Add useEffect to fetch and log the user token when component mounts
  useEffect(() => {
    const userToken = localStorage.getItem('token');
    console.log('User Token:', userToken);
  }, []);

  return (
    <div className="w-full min-h-screen bg-gray-100">
      {/* Use the Header component */}
      <Header logo={toonzkartLogo} />

      {/* Tabs Section */}
      <div className="flex justify-center bg-white shadow-sm py-5">
        <button
          className={`px-8 py-3 mx-3 text-xl font-semibold flex items-center transition-all duration-300 ${
            activeTab === "school"
              ? "text-blue-600 border-b-4 border-blue-600"
              : "text-gray-600"
          }`}
          onClick={() => setActiveTab("school")}
        >
          🏫 Shop by School
        </button>
        <button
          className={`px-8 py-3 mx-3 text-xl font-semibold flex items-center transition-all duration-300 ${
            activeTab === "product"
              ? "text-blue-600 border-b-4 border-blue-600"
              : "text-gray-600"
          }`}
          onClick={() => setActiveTab("product")}
        >
          🛍️ Shop by Product
        </button>
        <button
          className={`relative px-8 py-3 mx-3 text-xl font-semibold flex items-center transition-all duration-300 ${
            activeTab === "demand"
              ? "text-blue-600 border-b-4 border-blue-600"
              : "text-orange-600"
          } group`}
          onClick={() => setActiveTab("demand")}
        >
          {/* Hot badge */}
          <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs px-2 py-1 rounded-full animate-pulse">
            HOT
          </span>
          
          {/* Subtle glow effect */}
          <span className="absolute inset-0 bg-orange-100 opacity-0 group-hover:opacity-20 rounded-md transition-opacity duration-300"></span>
          
          {/* Icon with animation */}
          <span className="mr-2 transform group-hover:scale-110 transition-transform duration-300">🔥</span> 
          
          {/* Text with USP indicator */}
          <span>Shop by Demand</span>
          
          {/* Highlight that this is our USP */}
          <span className="ml-2 text-xs font-bold bg-yellow-200 text-yellow-800 px-2 py-1 rounded hidden md:inline">
            OUR USP
          </span>
        </button>
      </div>

      {/* Content Section */}
      <div className="max-w-100vw mx-auto bg-white rounded-lg shadow-lg">
        {activeTab === "school" && <ShopBySchool />}
        {activeTab === "product" && <ShopByProduct />}
        {activeTab === "demand" && (
          <>
            {/* Special banner above the demand component */}
            <div className="bg-gradient-to-r from-orange-100 to-yellow-100 p-3 text-center">
              <p className="text-orange-800 font-medium">
                <span className="animate-bounce inline-block mr-2">🌟</span>
                Discover products based on real-time demand! Never miss out on trending items.
                <span className="animate-bounce inline-block ml-2">🌟</span>
              </p>
            </div>
            <ShopByDemand />
          </>
        )}
      </div>
    </div>
  );
};

export default ShopPage;