import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import ShopBySchool from "../components/ShopBySchool";
import ShopByProduct from "../components/ShopByProduct";
import ShopByDemand from "../components/ShopByDemand";
import StoresViewBooks from "../components/StoresViewBooks";
import Header from "../components/Header";
import toonzkartLogo from "../assets/toonzkart_logo.png";

const ShopPage = () => {
  const location = useLocation();
  const [activeTab, setActiveTab] = useState("school"); // Default tab
  const [selectedBook, setSelectedBook] = useState(null);

  // Add useEffect to fetch and log the user token when component mounts
  useEffect(() => {
    const userToken = localStorage.getItem('token');
    console.log('User Token:', userToken);
  }, []);

  // Check if there's a selected book in the location state
  useEffect(() => {
    if (location.state && location.state.selectedBook) {
      setSelectedBook(location.state.selectedBook);
      setActiveTab("product"); // Automatically switch to product tab
    }
  }, [location.state]);

  // Handler for when user clicks back from StoresViewBooks
  const handleBackFromStores = () => {
    setSelectedBook(null);
  };

  return (
    <div className="w-full min-h-screen bg-gray-100">
      {/* Use the Header component */}
      <Header logo={toonzkartLogo} />

      {/* Tabs Section - Mobile Optimized */}
      <div className="flex justify-between bg-white shadow-sm py-2 overflow-x-auto no-scrollbar">
        <button
          className={`flex-1 px-2 py-2 text-xs sm:text-sm md:text-xl font-medium md:font-semibold flex flex-col sm:flex-row items-center justify-center transition-all duration-300 ${
            activeTab === "school"
              ? "text-blue-600 border-b-2 border-blue-600"
              : "text-gray-600"
          }`}
          onClick={() => {
            setActiveTab("school");
            setSelectedBook(null); // Reset selected book when switching tabs
          }}
        >
          <span className="text-lg mb-1 sm:mb-0 sm:mr-1">🏫</span>
          <span className="whitespace-nowrap">
            <span className="hidden sm:inline">Shop by </span>School
          </span>
        </button>
        <button
          className={`flex-1 px-2 py-2 text-xs sm:text-sm md:text-xl font-medium md:font-semibold flex flex-col sm:flex-row items-center justify-center transition-all duration-300 ${
            activeTab === "product"
              ? "text-blue-600 border-b-2 border-blue-600"
              : "text-gray-600"
          }`}
          onClick={() => {
            setActiveTab("product");
            setSelectedBook(null); // Reset selected book when switching tabs
          }}
        >
          <span className="text-lg mb-1 sm:mb-0 sm:mr-1">🛍️</span>
          <span className="whitespace-nowrap">
            <span className="hidden sm:inline">Shop by </span>Product
          </span>
        </button>
        <button
          className={`relative flex-1 px-2 py-2 text-xs sm:text-sm md:text-xl font-medium md:font-semibold flex flex-col sm:flex-row items-center justify-center transition-all duration-300 ${
            activeTab === "demand"
              ? "text-blue-600 border-b-2 border-blue-600"
              : "text-orange-600"
          } group`}
          onClick={() => {
            setActiveTab("demand");
            setSelectedBook(null); // Reset selected book when switching tabs
          }}
        >
          {/* Hot badge - repositioned for mobile */}
          <span className="absolute -top-1 -right-1 sm:-top-2 sm:-right-2 bg-red-500 text-white text-[8px] sm:text-xs px-1 sm:px-2 py-0.5 sm:py-1 rounded-full animate-pulse">
            HOT
          </span>
          
          {/* Subtle glow effect */}
          <span className="absolute inset-0 bg-orange-100 opacity-0 group-hover:opacity-20 rounded-md transition-opacity duration-300"></span>
          
          {/* Icon with animation */}
          <span className="text-lg mb-1 sm:mb-0 sm:mr-1 transform group-hover:scale-110 transition-transform duration-300">🔥</span> 
          
          {/* Text with USP indicator */}
          <span className="whitespace-nowrap">
            <span className="hidden sm:inline">Shop by </span>Demand
          </span>
          
          {/* Highlight that this is our USP - hidden on small screens */}
          <span className="ml-1 text-[8px] font-bold bg-yellow-200 text-yellow-800 px-1 py-0.5 rounded hidden lg:inline">
            USP
          </span>
        </button>
      </div>

      {/* Content Section */}
      <div className="w-full mx-auto bg-white shadow">
        {activeTab === "school" && <ShopBySchool />}
        {activeTab === "product" && (
          selectedBook ? (
            <StoresViewBooks selectedBook={selectedBook} onBack={handleBackFromStores} />
          ) : (
            <ShopByProduct onBookSelect={setSelectedBook} />
          )
        )}
        {activeTab === "demand" && (
          <>
            {/* Special banner above the demand component - more compact for mobile */}
            <div className="bg-gradient-to-r from-orange-100 to-yellow-100 p-2 sm:p-3 text-center">
              <p className="text-orange-800 text-xs sm:text-sm md:text-base font-medium">
                <span className="animate-bounce inline-block mr-1 sm:mr-2">🌟</span>
                Discover trending products in real-time!
                <span className="animate-bounce inline-block ml-1 sm:ml-2">🌟</span>
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